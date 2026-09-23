import { buildMerkleTree } from "./merkle";
import type { Transaction } from "../../types/transaction";
import type { Block } from "../../types/blockchain";
import { sha256 } from "../crypto/hash";


export class BlockchainEngine {
  public chain: Block[];

  constructor() {
    this.chain = [];
  }

  async initialize() {
  if (this.chain.length > 0) {
    return;
  }

  const { root: genesisMerkleRoot } = await buildMerkleTree([]);

  const genesisBlock: Block = {
    index: 0,
    timestamp: Date.now(),
    transactions: [],
    previousHash: "0",
    hash: "",
    nonce: 0,
    data: "Genesis Block",
    merkleRoot: genesisMerkleRoot,
  };

  genesisBlock.hash = await this.calculateHash(genesisBlock);

  this.chain = [genesisBlock];
}

  async calculateHash(block: Block): Promise<string> {
  const blockData = JSON.stringify({
    index: block.index,
    timestamp: block.timestamp,
    transactions: block.transactions,
    previousHash: block.previousHash,
    nonce: block.nonce,
    data: block.data,
    merkleRoot: block.merkleRoot,
  });

  return sha256(blockData);
}

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  async addBlock(transactions: Transaction[], data?: string): Promise<Block> {
  const previousBlock = this.getLatestBlock();

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
    for (let i = 0; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];

      const recalculatedHash = await this.calculateHash(currentBlock);

      if (currentBlock.hash !== recalculatedHash) {
        return false;
      }

      if (i > 0) {
        const previousBlock = this.chain[i - 1];

        if (
          currentBlock.previousHash !== previousBlock.hash
        ) {
          return false;
        }
      }
    }

    return true;
  }

  async getBlockValidity(index: number): Promise<boolean> {
    const block = this.chain[index];

    if (!block) {
      return false;
    }

    const calculatedHash = await this.calculateHash(block);

    if (block.hash !== calculatedHash) {
      return false;
    }

    if (index > 0) {
      const previousBlock = this.chain[index - 1];

      if (block.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}