import { sha256 } from "../crypto/hash";
import { buildMerkleTree } from "./merkle";
import type { Block, BlockHeader } from "../../types/blockchain";

export const BLOCK_VERSION = 1;

// Genesis được cố định cứng nên dataHash cũng cố định cứng.
export const GENESIS_DATA_HASH = "genesis-empty-data-hash";

export async function hashBlockData(data?: string): Promise<string> {
  return sha256(data ?? "");
}

// Thứ tự trường được cố định để mọi node băm ra cùng một chuỗi.
export function getBlockHeader(block: Block): BlockHeader {
  return {
    version: block.version,
    previousHash: block.previousHash,
    merkleRoot: block.merkleRoot,
    timestamp: block.timestamp,
    difficulty: block.difficulty ?? 0,
    nonce: block.nonce,
    dataHash: block.dataHash,
  };
}

export async function computeHeaderHash(header: BlockHeader): Promise<string> {
  return sha256(JSON.stringify(header));
}

// Body phải khớp với những gì Header đã cam kết. Vì hash chỉ tính trên
// Header, nếu bỏ bước này thì sửa Body sẽ không bị phát hiện.
export async function validateBlockBody(
  block: Block
): Promise<{ valid: boolean; reason?: string }> {
  if (block.version !== BLOCK_VERSION) {
    return { valid: false, reason: `Version ${block.version} không được hỗ trợ` };
  }

  if (block.transactionCount !== block.transactions.length) {
    return {
      valid: false,
      reason: `transactionCount (${block.transactionCount}) ≠ số giao dịch thực tế (${block.transactions.length})`,
    };
  }

  const { root } = await buildMerkleTree(block.transactions);

  if (root !== block.merkleRoot) {
    return { valid: false, reason: "Merkle Root không khớp với danh sách giao dịch" };
  }

  if ((await hashBlockData(block.data)) !== block.dataHash) {
    return { valid: false, reason: "Data không khớp dataHash trong Header" };
  }

  return { valid: true };
}
