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