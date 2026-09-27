import { sha256 } from "../crypto/hash";
import { buildMerkleTree } from "../blockchain/merkle";

import type { Block } from "../../types/blockchain";
import type { Transaction } from "../../types/transaction";

// =========================================================
// COMPUTE BLOCK HASH
// =========================================================

export async function computeBlockHash(
  block: Block
): Promise<string> {
  const blockData = JSON.stringify({
    index: block.index,
    timestamp: block.timestamp,
    transactions: block.transactions,
    previousHash: block.previousHash,
    nonce: block.nonce,
    data: block.data,
    merkleRoot: block.merkleRoot,
    difficulty: block.difficulty,
  });

  return sha256(blockData);
}

// =========================================================
// MINE FULL BLOCK
// =========================================================

export async function mineFullBlock(
  previousBlock: Block,
  transactions: Transaction[],
  difficulty: number,
  onProgress?: (attempts: number) => void
): Promise<Block> {
  const target = "0".repeat(difficulty);

  const { root: merkleRoot } =
    await buildMerkleTree(transactions);

  let nonce = 0;

  while (true) {
    const candidate: Block = {
      index: previousBlock.index + 1,

      timestamp: Date.now(),

      transactions,

      previousHash:
        previousBlock.hash,

      hash: "",

      nonce,

      data:
        `Block chứa ${transactions.length} giao dịch`,

      merkleRoot,

      difficulty,
    };

    const hash =
      await computeBlockHash(candidate);

    if (hash.startsWith(target)) {
      candidate.hash = hash;

      return candidate;
    }

    nonce++;

    if (
      onProgress &&
      nonce % 40 === 0
    ) {
      onProgress(nonce);

      // Cho UI có cơ hội render
      await new Promise<void>(
        (resolve) =>
          setTimeout(resolve, 0)
      );
    }
  }
}

// =========================================================
// VALIDATE BLOCK
// =========================================================

export async function validateBlock(
  block: Block,
  previousBlock: Block
): Promise<{
  valid: boolean;
  reason?: string;
}> {
  // -------------------------------------------------------
  // 1. Index
  // -------------------------------------------------------

  if (
    block.index !==
    previousBlock.index + 1
  ) {
    return {
      valid: false,
      reason:
        `Sai thứ tự index: ` +
        `Block #${block.index}, ` +
        `Previous #${previousBlock.index}`,
    };
  }

  // -------------------------------------------------------
  // 2. Previous Hash
  // -------------------------------------------------------

  if (
    block.previousHash !==
    previousBlock.hash
  ) {
    return {
      valid: false,
      reason:
        `Previous Hash không khớp | ` +
        `block.previousHash=${block.previousHash} | ` +
        `previousBlock.hash=${previousBlock.hash}`,
    };
  }

  // -------------------------------------------------------
  // 3. Merkle Root
  // -------------------------------------------------------

  const {
    root: recalculatedRoot,
  } = await buildMerkleTree(
    block.transactions
  );

  if (
    recalculatedRoot !==
    block.merkleRoot
  ) {
    return {
      valid: false,
      reason:
        "Merkle Root không khớp",
    };
  }

  // -------------------------------------------------------
  // 4. Recalculate Hash
  // -------------------------------------------------------

  const recalculatedHash =
    await computeBlockHash(block);

  if (
    recalculatedHash !==
    block.hash
  ) {
    return {
      valid: false,
      reason:
        "Hash không khớp với dữ liệu Block (bị giả mạo)",
    };
  }

  // -------------------------------------------------------
  // 5. Proof of Work
  // -------------------------------------------------------

  const difficulty =
    block.difficulty ?? 0;

  const target =
    "0".repeat(difficulty);

  if (
    !block.hash.startsWith(target)
  ) {
    return {
      valid: false,
      reason:
        `Hash không đạt độ khó PoW ${difficulty}`,
    };
  }

  return {
    valid: true,
  };
}

// =========================================================
// VALIDATE CHAIN
// =========================================================

export async function validateChain(
  chain: Block[]
): Promise<{
  valid: boolean;
  reason?: string;
}> {
  if (chain.length === 0) {
    return {
      valid: false,
      reason:
        "Blockchain rỗng",
    };
  }

  for (
    let i = 1;
    i < chain.length;
    i++
  ) {
    const result =
      await validateBlock(
        chain[i],
        chain[i - 1]
      );

    if (!result.valid) {
      return {
        valid: false,
        reason:
          `Block #${chain[i].index}: ${result.reason}`,
      };
    }
  }

  return {
    valid: true,
  };
}

// =========================================================
// CUMULATIVE PROOF-OF-WORK
// =========================================================

export function computeTotalWork(
  chain: Block[]
): number {
  return chain.reduce(
    (sum, block) => {
      const difficulty =
        block.difficulty ?? 0;

      return (
        sum +
        Math.pow(16, difficulty)
      );
    },
    0
  );
}