import { buildMerkleTree } from "./merkle";
import type { Transaction } from "../../types/transaction";
import type { Block } from "../../types/blockchain";
import { createGenesisBlock } from "../network/genesis";
import { computeBlockHash, mineFullBlock } from "../network/mining";

export class BlockchainEngine {
  public chain: Block[];

  // Độ khó PoW mặc định cho các Block "mine" thật (không phải add nhanh).
  // Vừa đủ để thấy máy phải "cày" 1 lúc, không quá chậm gây khó chịu demo.
  public difficulty: number;

  private listeners: (() => void)[] = [];

  constructor(difficulty = 3) {
    this.chain = [];
    this.difficulty = difficulty;
  }

  // =========================================================
  // SUBSCRIBE / NOTIFY
  // Cho phép nhiều trang (Blockchain / Transaction / Merkle...) cùng
  // lắng nghe một instance blockchain duy nhất và tự re-render khi
  // có Block mới, thay vì phải F5 mới thấy dữ liệu mới nhất.
  // =========================================================

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(
        (existingListener) => existingListener !== listener
      );
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  // =========================================================
  // DIFFICULTY
  // =========================================================

  setDifficulty(difficulty: number) {
    this.difficulty = Math.min(6, Math.max(0, difficulty));
    this.notify();
  }

  // =========================================================
  // INITIALIZE
  // =========================================================

  async initialize() {
    if (this.chain.length > 0) {
      return;
    }

    // Tất cả blockchain đều sử dụng cùng một Genesis Block
    const genesisBlock = createGenesisBlock();

    this.chain = [genesisBlock];

    this.notify();
  }

  async calculateHash(block: Block): Promise<string> {
    return computeBlockHash(block);
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  // =========================================================
  // ADD BLOCK (NHANH — KHÔNG PoW)
  // Dùng cho demo "hash-chain" cơ bản: thêm Block ngay lập tức để minh
  // họa previousHash liên kết các Block, chưa cần mô phỏng tốn công mine.
  // =========================================================

  async addBlock(
    transactions: Transaction[],
    data?: string
  ): Promise<Block> {
    const previousBlock = this.getLatestBlock();

    if (!previousBlock) {
      throw new Error("Blockchain chưa được initialize");
    }

    const { root: merkleRoot } = await buildMerkleTree(transactions);

    const newBlock: Block = {
      index: previousBlock.index + 1,
      timestamp: Date.now(),
      transactions,
      previousHash: previousBlock.hash,
      hash: "",
      nonce: 0,
      data: data ?? `Block chứa ${transactions.length} giao dịch`,
      merkleRoot,
      difficulty: 0,
    };

    newBlock.hash = await this.calculateHash(newBlock);

    this.chain.push(newBlock);

    this.notify();

    return newBlock;
  }

  // =========================================================
  // MINE CANDIDATE (PoW THẬT — CHƯA PUSH)
  // Tái sử dụng đúng vòng lặp mining của FullNode (mineFullBlock) để
  // hai nơi mô phỏng PoW giống hệt nhau, không viết lại lần thứ 3.
  // Không tự push vào chain — để bên gọi (vd. FullNode) có cơ hội huỷ
  // block nếu chain đã bị thay đổi trong lúc đang mine.
  // =========================================================

  async mineCandidate(
    transactions: Transaction[],
    data?: string,
    onProgress?: (attempts: number) => void
  ): Promise<Block> {
    const previousBlock = this.getLatestBlock();

    if (!previousBlock) {
      throw new Error("Blockchain chưa được initialize");
    }

    return mineFullBlock(
      previousBlock,
      transactions,
      this.difficulty,
      onProgress,
      data
    );
  }

  // =========================================================
  // PUSH BLOCK
  // Push thẳng 1 Block có sẵn vào chain (đã mine xong, hoặc nhận từ
  // mạng qua sync/fork-resolution).
  // =========================================================

  pushBlock(block: Block) {
    this.chain.push(block);

    this.notify();
  }

  // =========================================================
  // MINE BLOCK (PoW THẬT — MINE + PUSH TRONG 1 BƯỚC)
  // Tiện ích cho các trang demo đơn giản (BlockchainPage,
  // TransactionPage), không cần tự lo việc fork.
  // Nonce hiển thị trên UI sau bước này là nonce THẬT đã tìm ra hash
  // thoả target độ khó, không còn là con số vô nghĩa luôn = 0 nữa.
  // =========================================================

  async mineBlock(
    transactions: Transaction[],
    data?: string,
    onProgress?: (attempts: number) => void
  ): Promise<Block> {
    const minedBlock = await this.mineCandidate(
      transactions,
      data,
      onProgress
    );

    this.pushBlock(minedBlock);

    return minedBlock;
  }

  // =========================================================
  // REPLACE CHAIN
  // Thay toàn bộ chain — dùng khi đồng bộ / fork resolution từ mạng.
  // =========================================================

  replaceChain(newChain: Block[]) {
    this.chain = newChain;

    this.notify();
  }

  async recalculateBlock(index: number): Promise<void> {
    const block = this.chain[index];

    if (!block) {
      return;
    }

    block.hash = await this.calculateHash(block);

    this.notify();
  }

  async isChainValid(): Promise<boolean> {
    if (this.chain.length === 0) {
      return false;
    }

    // Kiểm tra Genesis
    const expectedGenesis = createGenesisBlock();

    if (
      this.chain[0].hash !== expectedGenesis.hash ||
      this.chain[0].previousHash !== expectedGenesis.previousHash
    ) {
      return false;
    }

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      const recalculatedHash = await this.calculateHash(currentBlock);

      if (currentBlock.hash !== recalculatedHash) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      if (currentBlock.index !== previousBlock.index + 1) {
        return false;
      }
    }

    return true;
  }

  // =========================================================
  // KIỂM TRA 1 BLOCK
  // Đây là NGUỒN DUY NHẤT để biết 1 Block có "VALID" hay không.
  // Trước đây UI (BlockchainPage) tự tính hash riêng để so sánh và bị
  // lệch công thức (thiếu merkleRoot/difficulty) với hash thật của
  // Block, khiến badge VALID/INVALID hiển thị sai. Giờ mọi nơi trong
  // app đều PHẢI gọi hàm này thay vì tự tính lại hash.
  // =========================================================

  async getBlockValidity(index: number): Promise<boolean> {
    const block = this.chain[index];

    if (!block) {
      return false;
    }

    if (index === 0) {
      const genesis = createGenesisBlock();

      return (
        block.hash === genesis.hash &&
        block.previousHash === genesis.previousHash
      );
    }

    const previousBlock = this.chain[index - 1];

    const calculatedHash = await this.calculateHash(block);

    if (block.hash !== calculatedHash) {
      return false;
    }

    if (block.previousHash !== previousBlock.hash) {
      return false;
    }

    if (block.index !== previousBlock.index + 1) {
      return false;
    }

    return true;
  }
}