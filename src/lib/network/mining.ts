import { buildMerkleTree } from "../blockchain/merkle";
import {
  BLOCK_VERSION,
  computeHeaderHash,
  getBlockHeader,
  hashBlockData,
  validateBlockBody,
} from "../blockchain/blockHeader";

import type { Block } from "../../types/blockchain";
import type { Transaction } from "../../types/transaction";

// =========================================================
// COMPUTE BLOCK HASH
// =========================================================

export async function computeBlockHash(
  block: Block
): Promise<string> {
  // Hash của Block = SHA-256(Header). Body không được băm trực tiếp.
  return computeHeaderHash(getBlockHeader(block));
}

// =========================================================
// MINE FULL BLOCK
// =========================================================

export async function mineFullBlock(
  previousBlock: Block,
  transactions: Transaction[],
  difficulty: number,
  onProgress?: (attempts: number) => void,
  data?: string
): Promise<Block> {
  const target = "0".repeat(difficulty);

  const { root: merkleRoot } =
    await buildMerkleTree(transactions);

  const blockData =
    data ?? `Block chứa ${transactions.length} giao dịch`;

  const dataHash = await hashBlockData(blockData);

  let nonce = 0;

  while (true) {
    const candidate: Block = {
      version: BLOCK_VERSION,

      index: previousBlock.index + 1,

      timestamp: Date.now(),

      transactions,

      transactionCount: transactions.length,

      dataHash,

      previousHash:
        previousBlock.hash,

      hash: "",

      nonce,

      data: blockData,

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
  // 3. Body phải khớp Header (version, txCount, Merkle Root, dataHash)
  // -------------------------------------------------------

  const body = await validateBlockBody(block);

  if (!body.valid) {
    return {
      valid: false,
      reason: body.reason,
    };
  }

  // -------------------------------------------------------
  // 4. Hash phải bằng SHA-256(Header)
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
        "Hash không khớp với Header (bị giả mạo)",
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