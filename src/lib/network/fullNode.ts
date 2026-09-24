import type { Block } from "../../types/blockchain";
import type { Transaction } from "../../types/transaction";
import { createGenesisBlock } from "./genesis";
import { mineFullBlock, validateBlock } from "./mining";

type NetworkMessage =
  | { type: "ANNOUNCE"; nodeId: string; height: number }
  | { type: "NEW_TX"; tx: Transaction }
  | { type: "NEW_BLOCK"; block: Block }
  | { type: "SYNC_REQUEST"; fromNodeId: string }
  | { type: "SYNC_RESPONSE"; toNodeId: string; chain: Block[] };

export interface PeerInfo {
  nodeId: string;
  height: number;
  lastSeen: number;
}

export type LogEntry = { time: number; message: string; kind: "info" | "success" | "error" };

export class FullNode {
  id: string;
  chain: Block[] = [];
  mempool: Transaction[] = [];
  difficulty = 3;
  peers: Map<string, PeerInfo> = new Map();
  log: LogEntry[] = [];

  private channel: BroadcastChannel;
  private listeners: (() => void)[] = [];

  constructor() {
    this.id = sessionStorage.getItem("cryptolab-node-id") ?? crypto.randomUUID().slice(0, 6);
    sessionStorage.setItem("cryptolab-node-id", this.id);

    this.channel = new BroadcastChannel("cryptolab-network");
    this.channel.onmessage = (event) => this.handleMessage(event.data as NetworkMessage);
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  private addLog(message: string, kind: LogEntry["kind"] = "info") {
    this.log = [{ time: Date.now(), message, kind }, ...this.log].slice(0, 30);
    this.notify();
  }

  async initialize() {
    if (this.chain.length === 0) {
      const genesis = await createGenesisBlock();
      this.chain = [genesis];
    }

    this.announce();
    setInterval(() => this.announce(), 3000);
    setInterval(() => this.pruneStalePeers(), 5000);

    this.notify();
  }

  private announce() {
    this.channel.postMessage({
      type: "ANNOUNCE",
      nodeId: this.id,
      height: this.chain.length - 1,
    } satisfies NetworkMessage);
  }

  private pruneStalePeers() {
    const now = Date.now();
    let changed = false;
    this.peers.forEach((peer, id) => {
      if (now - peer.lastSeen > 8000) {
        this.peers.delete(id);
        changed = true;
      }
    });
    if (changed) this.notify();
  }

  private getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  createTransaction(from: string, to: string, amount: number) {
    const tx: Transaction = {
      id: crypto.randomUUID(),
      from,
      to,
      amount,
      timestamp: Date.now(),
    };

    this.mempool.push(tx);
    this.channel.postMessage({ type: "NEW_TX", tx } satisfies NetworkMessage);
    this.addLog(`Bạn tạo giao dịch: ${from} → ${to} (${amount})`, "info");
    this.notify();
  }

  async mineAndBroadcast(onProgress?: (attempts: number) => void) {
    if (this.mempool.length === 0) {
      this.addLog("Mempool trống, không có gì để mine", "error");
      return;
    }

    this.addLog(`Bắt đầu mine Block #${this.chain.length} với ${this.mempool.length} giao dịch...`, "info");

    const txsToMine = [...this.mempool];
    const block = await mineFullBlock(this.getLatestBlock(), txsToMine, this.difficulty, onProgress);

    this.chain.push(block);
    this.mempool = this.mempool.filter((tx) => !txsToMine.some((t) => t.id === tx.id));

    this.addLog(`Đã mine thành công Block #${block.index}, đang broadcast...`, "success");
    this.channel.postMessage({ type: "NEW_BLOCK", block } satisfies NetworkMessage);
    this.notify();
  }

  private async handleMessage(message: NetworkMessage) {
    switch (message.type) {
      case "ANNOUNCE": {
        if (message.nodeId === this.id) return;
        this.peers.set(message.nodeId, {
          nodeId: message.nodeId,
          height: message.height,
          lastSeen: Date.now(),
        });
        this.notify();
        break;
      }

      case "NEW_TX": {
        if (this.mempool.some((tx) => tx.id === message.tx.id)) return;
        this.mempool.push(message.tx);
        this.addLog(`Nhận giao dịch mới từ mạng: ${message.tx.from} → ${message.tx.to}`, "info");
        break;
      }

      case "NEW_BLOCK": {
        await this.handleIncomingBlock(message.block);
        break;
      }

      case "SYNC_REQUEST": {
        if (message.fromNodeId === this.id) return;
        this.channel.postMessage({
          type: "SYNC_RESPONSE",
          toNodeId: message.fromNodeId,
          chain: this.chain,
        } satisfies NetworkMessage);
        break;
      }

      case "SYNC_RESPONSE": {
        if (message.toNodeId !== this.id) return;
        if (message.chain.length > this.chain.length) {
          this.chain = message.chain;
          this.addLog(`Đồng bộ chain thành công, height = ${this.chain.length - 1}`, "success");
          this.notify();
        }
        break;
      }
    }
  }

  private async handleIncomingBlock(block: Block) {
    const latest = this.getLatestBlock();

    // Block đã có rồi, hoặc cũ hơn chain hiện tại -> bỏ qua (fork xử lý ở phần P10)
    if (block.index <= latest.index) {
      return;
    }

    // Node đang bị lùi lại quá xa (bị miss nhiều Block) -> yêu cầu đồng bộ toàn bộ chain
    if (block.index > latest.index + 1) {
      this.addLog(`Đang chậm hơn mạng, yêu cầu đồng bộ...`, "info");
      this.channel.postMessage({ type: "SYNC_REQUEST", fromNodeId: this.id } satisfies NetworkMessage);
      return;
    }

    const result = await validateBlock(block, latest, this.difficulty);

    if (!result.valid) {
      this.addLog(`Từ chối Block #${block.index}: ${result.reason}`, "error");
      return;
    }

    this.chain.push(block);
    this.mempool = this.mempool.filter(
      (tx) => !block.transactions.some((btx) => btx.id === tx.id)
    );

    this.addLog(`Chấp nhận Block #${block.index} từ mạng`, "success");
    this.notify();
  }
}

export const fullNode = new FullNode();