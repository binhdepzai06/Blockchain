import { computeBlockHash } from "./mining";
import type { Block } from "../../types/blockchain";

// Timestamp CỐ ĐỊNH để mọi Node tính ra hash Genesis giống hệt nhau
const GENESIS_TIMESTAMP = 1700000000000;

export async function createGenesisBlock(): Promise<Block> {
  const genesis: Block = {
    index: 0,
    timestamp: GENESIS_TIMESTAMP,
    transactions: [],
    previousHash: "0",
    hash: "",
    nonce: 0,
    data: "Genesis Block",
    merkleRoot: await sha256Empty(),
  };

  genesis.hash = await computeBlockHash(genesis);
  return genesis;
}

async function sha256Empty(): Promise<string> {
  const { buildMerkleTree } = await import("../blockchain/merkle");
  const { root } = await buildMerkleTree([]);
  return root;
}