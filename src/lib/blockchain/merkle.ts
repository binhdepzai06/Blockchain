import { sha256 } from "../crypto/hash";
import type { Transaction } from "../../types/transaction";

export interface MerkleTreeResult {
  levels: string[][];
  root: string;
}

export async function buildMerkleTree(
  transactions: Transaction[]
): Promise<MerkleTreeResult> {
  if (transactions.length === 0) {
    const emptyHash = await sha256("EMPTY_BLOCK");
    return { levels: [[emptyHash]], root: emptyHash };
  }

  let currentLevel: string[] = [];

  for (const tx of transactions) {
    const txString = JSON.stringify(tx);
    currentLevel.push(await sha256(txString));
  }

  const levels: string[][] = [currentLevel];

  while (currentLevel.length > 1) {
    const nextLevel: string[] = [];

    for (let i = 0; i < currentLevel.length; i += 2) {
      const left = currentLevel[i];
      const right = currentLevel[i + 1] ?? left; // nếu lẻ, nhân đôi cái cuối

      const combined = await sha256(left + right);
      nextLevel.push(combined);
    }

    levels.push(nextLevel);
    currentLevel = nextLevel;
  }

  return { levels, root: currentLevel[0] };
}

// =========================================================
// MERKLE PROOF (P5)
// Chứng minh 1 giao dịch thuộc Block chỉ bằng ~log2(n) hash "anh em"
// dọc đường từ lá lên Root, thay vì phải có cả n giao dịch.
// =========================================================

export interface MerkleProofStep {
  siblingHash: string;
  // Vị trí của hash anh em khi ghép: "left" → sibling + current
  position: "left" | "right";
}

export interface MerkleProof {
  txIndex: number;
  leafHash: string;
  steps: MerkleProofStep[];
  root: string;
}

export async function hashTransaction(tx: Transaction): Promise<string> {
  return sha256(JSON.stringify(tx));
}

export function generateMerkleProof(
  levels: string[][],
  txIndex: number
): MerkleProof | null {
  const leaves = levels[0];

  if (!leaves || txIndex < 0 || txIndex >= leaves.length) {
    return null;
  }

  const steps: MerkleProofStep[] = [];
  let index = txIndex;

  for (let l = 0; l < levels.length - 1; l++) {
    const level = levels[l];
    const isRightChild = index % 2 === 1;
    const siblingIndex = isRightChild ? index - 1 : index + 1;

    steps.push({
      // tầng lẻ: node cuối được nhân đôi → anh em chính là nó
      siblingHash: level[siblingIndex] ?? level[index],
      position: isRightChild ? "left" : "right",
    });

    index = Math.floor(index / 2);
  }

  return {
    txIndex,
    leafHash: leaves[txIndex],
    steps,
    root: levels[levels.length - 1][0],
  };
}

export interface MerkleProofVerification {
  valid: boolean;
  // hash tính được ở từng bước: [leaf, sau bước 1, ..., root tính được]
  path: string[];
  computedRoot: string;
}

// Chỉ cần: giao dịch, proof, và Merkle Root lấy từ Block Header.
export async function verifyMerkleProof(
  tx: Transaction,
  proof: MerkleProof,
  expectedRoot: string
): Promise<MerkleProofVerification> {
  let current = await hashTransaction(tx);
  const path = [current];

  for (const step of proof.steps) {
    current = await sha256(
      step.position === "left"
        ? step.siblingHash + current
        : current + step.siblingHash
    );
    path.push(current);
  }

  return { valid: current === expectedRoot, path, computedRoot: current };
}
