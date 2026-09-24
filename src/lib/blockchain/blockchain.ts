import { buildMerkleTree } from "./merkle";
import type { Transaction } from "../../types/transaction";
import type { Block } from "../../types/blockchain";
import { createGenesisBlock } from "../network/genesis";
import { computeBlockHash } from "../network/mining";

export class BlockchainEngine {
  public chain: Block[];

  constructor() {
    this.chain = [];
  }

  async initialize() {
    if (this.chain.length > 0) {
      return;
    }

    // Tất cả blockchain đều sử dụng cùng một Genesis Block
    const genesisBlock = createGenesisBlock();

    this.chain = [genesisBlock];
  }

  async calculateHash(block: Block): Promise<string> {
    return computeBlockHash(block);
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

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

    return newBlock;
  }

  async recalculateBlock(index: number): Promise<void> {
    const block = this.chain[index];

    if (!block) {
      return;
    }

    block.hash = await this.calculateHash(block);
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