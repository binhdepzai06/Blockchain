import { sha256 } from "../crypto/hash";
import { buildMerkleTree } from "../blockchain/merkle";
import type { Block } from "../../types/blockchain";
import type { Transaction } from "../../types/transaction";

export async function computeBlockHash(block: Block): Promise<string> {
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

export async function mineFullBlock(
  previousBlock: Block,
  transactions: Transaction[],
  difficulty: number,
  onProgress?: (attempts: number) => void
): Promise<Block> {
  const target = "0".repeat(difficulty);
  const { root: merkleRoot } = await buildMerkleTree(transactions);

  let nonce = 0;

  while (true) {
    const candidate: Block = {
      index: previousBlock.index + 1,
      timestamp: Date.now(),
      transactions,
      previousHash: previousBlock.hash,
      hash: "",
      nonce,
      data: `Block chứa ${transactions.length} giao dịch`,
      merkleRoot,
    };

    const hash = await computeBlockHash(candidate);

    if (hash.startsWith(target)) {
      candidate.hash = hash;
      return candidate;
    }

    nonce++;

    if (onProgress && nonce % 40 === 0) {
      onProgress(nonce);
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
}

export async function validateBlock(
  block: Block,
  previousBlock: Block,
  difficulty: number
): Promise<{ valid: boolean; reason?: string }> {
  const target = "0".repeat(difficulty);

  if (!block.hash.startsWith(target)) {
    return { valid: false, reason: "Hash không đạt độ khó PoW" };
  }

  const recalculatedHash = await computeBlockHash(block);
  if (recalculatedHash !== block.hash) {
    return { valid: false, reason: "Hash không khớp với dữ liệu Block" };
  }

  const { root: recalculatedRoot } = await buildMerkleTree(block.transactions);
  if (recalculatedRoot !== block.merkleRoot) {
    return { valid: false, reason: "Merkle Root không khớp" };
  }

  if (block.previousHash !== previousBlock.hash) {
    return { valid: false, reason: "Previous Hash không khớp với chain hiện tại" };
  }

  if (block.index !== previousBlock.index + 1) {
    return { valid: false, reason: "Sai thứ tự index" };
  }

  return { valid: true };
}