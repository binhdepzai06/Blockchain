import type { Block } from "../../types/blockchain";
import type { Transaction } from "../../types/transaction";

import { createGenesisBlock } from "./genesis";
import {
  validateChain,
  computeTotalWork,
} from "./mining";
import { BlockchainEngine } from "../blockchain/blockchain";
import {
  applyTx,
  createLedgerState,
  getBalance,
  validateLedger,
  verifyTransaction,
  type TxVerifyResult,
} from "../blockchain/txVerify";
import { createCoinbaseTransaction } from "../blockchain/wallet";

type NetworkMessage =
  | {
      type: "ANNOUNCE";
      nodeId: string;
      height: number;
    }
  | {
      type: "NEW_TX";
      tx: Transaction;
    }
  | {
      type: "NEW_CHAIN";
      nodeId: string;
      chain: Block[];
    }
  | {
      type: "SYNC_REQUEST";
      fromNodeId: string;
    }
  | {
      type: "SYNC_RESPONSE";
      toNodeId: string;
      chain: Block[];
    };

export interface PeerInfo {
  nodeId: string;
  height: number;
  lastSeen: number;
}

export type LogEntry = {
  time: number;
  message: string;
  kind: "info" | "success" | "error" | "fork";
};

export interface TxAuditEntry {
  time: number;
  tx: Transaction;
  origin: "local" | "network";
  result: TxVerifyResult;
}

export class FullNode {
  id: string;

    private core = new BlockchainEngine(4);

  get chain(): Block[] {
    return this.core.chain;
  }

  get difficulty(): number {
    return this.core.difficulty;
  }

  set difficulty(value: number) {
    this.core.setDifficulty(value);
  }

  mempool: Transaction[] = [];

  // Nhật ký kiểm tra Tx gần nhất (kèm từng bước ✔/✘) để hiển thị lên UI.
  txAudit: TxAuditEntry[] = [];

  // Xếp hàng xử lý Tx tuần tự: verify là async, nếu 2 Tx double-spend đến
  // cùng lúc mà xử lý song song thì cả hai có thể cùng "đủ số dư".
  private txQueue: Promise<unknown> = Promise.resolve();

  peers: Map<string, PeerInfo> = new Map();

  log: LogEntry[] = [];

  private channel: BroadcastChannel;

  private listeners: (() => void)[] = [];

  private announceTimer?: number;

  private pruneTimer?: number;

  constructor() {
    this.id =
      sessionStorage.getItem("cryptolab-node-id") ??
      crypto.randomUUID().slice(0, 6);

    sessionStorage.setItem("cryptolab-node-id", this.id);

    this.channel = new BroadcastChannel("cryptolab-network");

    this.channel.onmessage = (event) => {
      void this.handleMessage(event.data as NetworkMessage);
    };
  }

  // =========================================================
  // SUBSCRIBE / NOTIFY
  // =========================================================

  subscribe(listener: () => void) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(
        (listenerItem) => listenerItem !== listener
      );
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  // =========================================================
  // LOG
  // =========================================================

  private addLog(
    message: string,
    kind: LogEntry["kind"] = "info"
  ) {
    this.log = [
      {
        time: Date.now(),
        message,
        kind,
      },
      ...this.log,
    ].slice(0, 40);

    this.notify();
  }

  // =========================================================
  // INITIALIZE NODE
  // =========================================================

  async initialize() {
        await this.core.initialize();

    // Kiểm tra Genesis
    const expectedGenesis = createGenesisBlock();

    if (this.core.chain[0].hash !== expectedGenesis.hash) {
      console.error("GENESIS MISMATCH", {
        nodeId: this.id,
        localGenesis: this.core.chain[0].hash,
        expectedGenesis: expectedGenesis.hash,
      });

      // Reset về Genesis chuẩn
      this.core.replaceChain([expectedGenesis]);
    }

    // Yêu cầu các Node khác gửi chain
    this.channel.postMessage({
      type: "SYNC_REQUEST",
      fromNodeId: this.id,
    } satisfies NetworkMessage);

    this.announce();

    // Tránh tạo nhiều interval nếu initialize bị gọi nhiều lần
    if (!this.announceTimer) {
      this.announceTimer = window.setInterval(() => {
        this.announce();
      }, 3000);
    }

    if (!this.pruneTimer) {
      this.pruneTimer = window.setInterval(() => {
        this.pruneStalePeers();
      }, 5000);
    }

    this.notify();
  }

  // =========================================================
  // ANNOUNCE
  // =========================================================

  private announce() {
    this.channel.postMessage({
      type: "ANNOUNCE",
      nodeId: this.id,
      height: this.chain.length - 1,
    } satisfies NetworkMessage);
  }

  // =========================================================
  // REMOVE DEAD PEERS
  // =========================================================

  private pruneStalePeers() {
    const now = Date.now();

    let changed = false;

    this.peers.forEach((peer, id) => {
      if (now - peer.lastSeen > 8000) {
        this.peers.delete(id);
        changed = true;
      }
    });

    if (changed) {
      this.notify();
    }
  }

  // =========================================================
  // LATEST BLOCK
  // =========================================================

  private getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  // =========================================================
  // TOTAL POW WORK
  // =========================================================

  getTotalWork(): number {
    return computeTotalWork(this.chain);
  }

  // =========================================================
  // SỔ CÁI / SỐ DƯ
  // =========================================================

  // Số dư đã xác nhận trên chain
  getConfirmedBalance(address: string): number {
    return getBalance(createLedgerState(this.chain), address);
  }

  // Số dư có thể tiêu = đã xác nhận − các Tx đang chờ trong Mempool
  getAvailableBalance(address: string): number {
    return getBalance(createLedgerState(this.chain, this.mempool), address);
  }

  // =========================================================
  // NHẬN / VERIFY TRANSACTION (P4)
  // Dùng chung cho Tx do chính node tạo và Tx nhận từ mạng, để mọi node
  // áp dụng ĐÚNG MỘT bộ luật. VALID → Mempool, INVALID → REJECT.
  // =========================================================

  private receiveTx(
    tx: Transaction,
    origin: "local" | "network"
  ): Promise<TxVerifyResult> {
    const task = this.txQueue.then(async () => {
      const state = createLedgerState(this.chain, this.mempool);
      const result = await verifyTransaction(tx, state);

      this.txAudit = [
        { time: Date.now(), tx, origin, result },
        ...this.txAudit,
      ].slice(0, 12);

      const label = `${String(tx?.from).slice(0, 8)}… → ${String(tx?.to).slice(0, 8)}… (${tx?.amount})`;

      if (result.valid) {
        this.mempool.push(tx);
        this.addLog(`✔ Tx hợp lệ → Mempool: ${label}`, "success");
      } else {
        this.addLog(`✘ REJECT Tx ${label} — ${result.reason}`, "error");
      }

      this.notify();
      return result;
    });

    this.txQueue = task.catch(() => undefined);
    return task;
  }

  // Bước 3–5 của luồng end-to-end: broadcast Tx đã ký, node verify rồi mới
  // cho vào Mempool. `forceBroadcast` dùng cho demo tấn công: Tx sai vẫn
  // được phát ra để chứng minh CÁC NODE KHÁC cũng từ chối nó.
  async submitTransaction(
    tx: Transaction,
    options: { forceBroadcast?: boolean } = {}
  ): Promise<TxVerifyResult> {
    const result = await this.receiveTx(tx, "local");

    if (result.valid || options.forceBroadcast) {
      this.channel.postMessage({
        type: "NEW_TX",
        tx,
      } satisfies NetworkMessage);
    }

    return result;
  }

  // Sau khi chain đổi (mine/reorg), loại các Tx trong Mempool không còn hợp lệ
  private async pruneMempool() {
    const state = createLedgerState(this.chain);
    const kept: Transaction[] = [];

    for (const tx of this.mempool) {
      const result = await verifyTransaction(tx, state);
      if (result.valid) {
        kept.push(tx);
        applyTx(state, tx, "pending");
      } else {
        this.addLog(`Loại Tx khỏi Mempool: ${result.reason}`, "info");
      }
    }

    this.mempool = kept;
  }

  // =========================================================
  // MINE BLOCK
  // =========================================================

  async mineAndBroadcast(
    minerAddress: string,
    onProgress?: (attempts: number) => void
  ) {
    // Chờ các Tx đang được verify xong, rồi dọn Mempool trước khi lấy Tx
    await this.txQueue;
    await this.pruneMempool();

    // -------------------------------------------------------
    // Snapshot transactions: coinbase (thưởng Miner) + Tx từ Mempool
    // -------------------------------------------------------

    const txsToMine = [
      createCoinbaseTransaction(minerAddress),
      ...this.mempool,
    ];

    // -------------------------------------------------------
    // Snapshot blockchain tip
    // -------------------------------------------------------

    const previousBlock = this.getLatestBlock();

    const miningTipHash = previousBlock.hash;

    const miningTipIndex = previousBlock.index;

    this.addLog(
      `Bắt đầu mine Block #${previousBlock.index + 1} với ${txsToMine.length} giao dịch...`,
      "info"
    );

    // -------------------------------------------------------
    // Mine
    // -------------------------------------------------------

        const block = await this.core.mineCandidate(
      txsToMine,
      undefined,
      onProgress
    );

    // -------------------------------------------------------
    // QUAN TRỌNG:
    // Kiểm tra chain có thay đổi trong lúc mining không
    // -------------------------------------------------------

    const currentTip = this.getLatestBlock();

    if (
      currentTip.hash !== miningTipHash ||
      currentTip.index !== miningTipIndex
    ) {
      this.addLog(
        `⚠ Hủy Block #${block.index}: chain đã thay đổi trong lúc mining`,
        "fork"
      );

      return;
    }

    // -------------------------------------------------------
    // Validate block trước khi thêm
    // -------------------------------------------------------

    const validation = await this.validateNewBlock(block);

    if (!validation.valid) {
      this.addLog(
        `Block #${block.index} không hợp lệ sau khi mine: ${validation.reason}`,
        "error"
      );

      return;
    }

    // -------------------------------------------------------
    // Thêm block vào local chain
    // -------------------------------------------------------

        this.core.pushBlock(block);

    // -------------------------------------------------------
    // Xóa transaction đã mine khỏi mempool
    // -------------------------------------------------------

    const minedTxIds = new Set(
      txsToMine.map((tx) => tx.id)
    );

    this.mempool = this.mempool.filter(
      (tx) => !minedTxIds.has(tx.id)
    );

    // -------------------------------------------------------
    // Log
    // -------------------------------------------------------

    this.addLog(
      `Đã mine thành công Block #${block.index}, đang broadcast toàn bộ chain...`,
      "success"
    );

    // -------------------------------------------------------
    // Broadcast chain
    // -------------------------------------------------------

    this.channel.postMessage({
      type: "NEW_CHAIN",
      nodeId: this.id,
      chain: this.cloneChain(this.chain),
    } satisfies NetworkMessage);

    this.announce();

    this.notify();
  }

  // =========================================================
  // VALIDATE NEWLY MINED BLOCK
  // =========================================================

  private async validateNewBlock(
    block: Block
  ): Promise<{ valid: boolean; reason?: string }> {
    const previousBlock = this.getLatestBlock();

    if (!previousBlock) {
      return {
        valid: false,
        reason: "Không có Previous Block",
      };
    }

    if (
      block.previousHash !==
      previousBlock.hash
    ) {
      return {
        valid: false,
        reason:
          `Previous Hash không khớp | ` +
          `block.previousHash=${block.previousHash} | ` +
          `previousBlock.hash=${previousBlock.hash}`,
      };
    }

    if (
      block.index !==
      previousBlock.index + 1
    ) {
      return {
        valid: false,
        reason: "Sai Block Index",
      };
    }

    // Chữ ký, số dư, replay, coinbase của mọi Tx trong chain + block mới
    const ledger = await validateLedger([...this.chain, block]);

    if (!ledger.valid) {
      return ledger;
    }

    return {
      valid: true,
    };
  }

  // =========================================================
  // MESSAGE HANDLER
  // =========================================================

  private async handleMessage(
    message: NetworkMessage
  ) {
    switch (message.type) {
      // -----------------------------------------------------
      // ANNOUNCE
      // -----------------------------------------------------

      case "ANNOUNCE": {
        if (message.nodeId === this.id) {
          return;
        }

        this.peers.set(message.nodeId, {
          nodeId: message.nodeId,
          height: message.height,
          lastSeen: Date.now(),
        });

        this.notify();

        break;
      }

      // -----------------------------------------------------
      // NEW TRANSACTION
      // -----------------------------------------------------

      case "NEW_TX": {
        await this.receiveTx(message.tx, "network");

        break;
      }

      // -----------------------------------------------------
      // NEW CHAIN
      // -----------------------------------------------------

      case "NEW_CHAIN": {
        if (message.nodeId === this.id) {
          return;
        }

        await this.considerChain(
          message.chain,
          message.nodeId
        );

        break;
      }

      // -----------------------------------------------------
      // SYNC REQUEST
      // -----------------------------------------------------

      case "SYNC_REQUEST": {
        if (
          message.fromNodeId === this.id
        ) {
          return;
        }

        this.channel.postMessage({
          type: "SYNC_RESPONSE",
          toNodeId: message.fromNodeId,
          chain: this.cloneChain(this.chain),
        } satisfies NetworkMessage);

        break;
      }

      // -----------------------------------------------------
      // SYNC RESPONSE
      // -----------------------------------------------------

      case "SYNC_RESPONSE": {
        if (
          message.toNodeId !== this.id
        ) {
          return;
        }

        await this.considerChain(
          message.chain,
          "mạng (đồng bộ ban đầu)"
        );

        break;
      }
    }
  }

  // =========================================================
  // CONSIDER INCOMING CHAIN
  // =========================================================

  private async considerChain(
    incomingChain: Block[],
    fromNodeId: string
  ) {
    if (incomingChain.length === 0) {
      return;
    }

    // =======================================================
    // 1. CHECK GENESIS
    // =======================================================

    const localGenesis = this.chain[0];

    const incomingGenesis = incomingChain[0];

    if (!localGenesis || !incomingGenesis) {
      this.addLog(
        `Từ chối chain từ ${fromNodeId}: thiếu Genesis Block`,
        "error"
      );

      return;
    }

    if (
      incomingGenesis.hash !==
      localGenesis.hash
    ) {
      this.addLog(
        `Từ chối chain từ ${fromNodeId}: Genesis không giống nhau`,
        "error"
      );

      console.error(
        "GENESIS MISMATCH",
        {
          nodeId: this.id,
          fromNodeId,
          localGenesis: localGenesis.hash,
          incomingGenesis: incomingGenesis.hash,
        }
      );

      return;
    }

    // =======================================================
    // 2. CHAIN CHỈ CÓ GENESIS
    // =======================================================

    if (incomingChain.length === 1) {
      return;
    }

    // =======================================================
    // 3. VALIDATE INCOMING CHAIN
    // =======================================================

    const validation =
      await validateChain(incomingChain);

    if (!validation.valid) {
      this.addLog(
        `Từ chối chain từ ${fromNodeId}: ${validation.reason}`,
        "error"
      );

      console.error(
        "CHAIN VALIDATION FAILED",
        {
          nodeId: this.id,
          fromNodeId,
          reason: validation.reason,
          incomingChain,
        }
      );

      return;
    }

    // =======================================================
    // 3b. VALIDATE LEDGER (chữ ký, số dư, replay, coinbase)
    // =======================================================

    const ledger = await validateLedger(incomingChain);

    if (!ledger.valid) {
      this.addLog(
        `Từ chối chain từ ${fromNodeId}: ${ledger.reason}`,
        "error"
      );

      return;
    }

    // =======================================================
    // 4. CALCULATE CUMULATIVE POW
    // =======================================================

    const myWork =
      computeTotalWork(this.chain);

    const incomingWork =
      computeTotalWork(incomingChain);

    // =======================================================
    // 5. CHECK SAME CHAIN
    // =======================================================

    const sameLength =
      incomingChain.length ===
      this.chain.length;

    const sameTip =
      incomingChain[
        incomingChain.length - 1
      ].hash ===
      this.getLatestBlock().hash;

    if (sameLength && sameTip) {
      return;
    }

    // =======================================================
    // 6. INCOMING CHAIN HAS MORE WORK
    // =======================================================

    if (incomingWork > myWork) {
      const isReorg =
        incomingChain.length <=
        this.chain.length;

      const oldHeight =
        this.chain.length - 1;

      const oldWork = myWork;

      // Copy chain
            this.core.replaceChain(
        this.cloneChain(incomingChain)
      );

      // =====================================================
      // Remove confirmed transactions
      // =====================================================

      const confirmedTxIds =
        new Set(
          incomingChain.flatMap(
            (block) =>
              block.transactions.map(
                (tx) => tx.id
              )
          )
        );

      this.mempool =
        this.mempool.filter(
          (tx) =>
            !confirmedTxIds.has(tx.id)
        );

      await this.pruneMempool();

      // =====================================================
      // Log
      // =====================================================

      if (isReorg) {
        this.addLog(
          `⚠ FORK: chuyển sang chain của ${fromNodeId} | ` +
            `PoW ${incomingWork} > ${oldWork}`,
          "fork"
        );
      } else {
        this.addLog(
          `Đồng bộ chain từ ${fromNodeId} | ` +
            `Height ${incomingChain.length - 1} | ` +
            `PoW ${incomingWork} | ` +
            `Height cũ ${oldHeight}`,
          "success"
        );
      }

      this.announce();

      this.notify();

      return;
    }

    // =======================================================
    // 7. MY CHAIN HAS MORE WORK
    // =======================================================

    if (incomingWork < myWork) {
      this.addLog(
        `Giữ nguyên chain của mình | ` +
          `PoW ${myWork} > ${incomingWork}`,
        "info"
      );

      return;
    }

    // =======================================================
    // 8. EQUAL WORK = FORK
    // =======================================================

    this.addLog(
      `⚠ FORK: chain từ ${fromNodeId} có ` +
        `cumulative PoW bằng nhau (${incomingWork})`,
      "fork"
    );

    console.log(
      "FORK DETECTED",
      {
        nodeId: this.id,
        fromNodeId,
        localHeight:
          this.chain.length - 1,
        incomingHeight:
          incomingChain.length - 1,
        localWork: myWork,
        incomingWork,
        localTip:
          this.getLatestBlock().hash,
        incomingTip:
          incomingChain[
            incomingChain.length - 1
          ].hash,
      }
    );
  }

  // =========================================================
  // DEEP COPY CHAIN
  // =========================================================

  private cloneChain(
    chain: Block[]
  ): Block[] {
    return chain.map((block) => ({
      ...block,

      transactions:
        block.transactions.map(
          (tx) => ({
            ...tx,
          })
        ),
    }));
  }
}

export const fullNode = new FullNode();