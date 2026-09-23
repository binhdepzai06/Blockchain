import type { Transaction } from "./transaction";

export interface Block {
  index: number;
  timestamp: number;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;
  data?: string;
  merkleRoot: string;
}

export interface BlockchainState {
  blocks: Block[];
  isValid: boolean;
}