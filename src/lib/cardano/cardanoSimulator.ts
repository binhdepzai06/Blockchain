import type {
  CardanoEpochResult,
  CardanoSlotResult,
  StakePool,
} from "../../types/cardano";

export function selectStakePool(
  pools: StakePool[],
): StakePool {
  const eligiblePools = pools.filter(
    (pool) => pool.online && pool.stake > 0,
  );

  if (eligiblePools.length === 0) {
    throw new Error(
      "No online stake pool with positive stake is available.",
    );
  }

  const totalStake = eligiblePools.reduce(
    (sum, pool) => sum + pool.stake,
    0,
  );

  let randomValue = Math.random() * totalStake;

  for (const pool of eligiblePools) {
    randomValue -= pool.stake;

    if (randomValue <= 0) {
      return pool;
    }
  }

  return eligiblePools[eligiblePools.length - 1];
}

export function simulateCardanoEpoch(
  epoch: number,
  slots: number,
  pools: StakePool[],
): CardanoEpochResult {
  if (!Number.isInteger(epoch) || epoch < 0) {
    throw new Error("Epoch must be 0 or greater.");
  }

  if (!Number.isInteger(slots) || slots < 1) {
    throw new Error(
      "Number of slots must be at least 1.",
    );
  }

  const activePools = pools.filter(
    (pool) => pool.online && pool.stake > 0,
  );

  if (activePools.length === 0) {
    throw new Error(
      "At least one online stake pool must have stake.",
    );
  }

  const totalStake = activePools.reduce(
    (sum, pool) => sum + pool.stake,
    0,
  );

  const slotResults: CardanoSlotResult[] = [];
  const blockCountByPool: Record<string, number> = {};

  for (const pool of pools) {
    blockCountByPool[pool.id] = 0;
  }

  for (let slot = 1; slot <= slots; slot += 1) {
    const leader = selectStakePool(pools);

    slotResults.push({
      slot,
      leaderPoolId: leader.id,
      leaderPoolName: leader.name,
      producedBlock: true,
    });

    blockCountByPool[leader.id] =
      (blockCountByPool[leader.id] ?? 0) + 1;
  }

  return {
    epoch,
    slots,
    totalStake,
    slotResults,
    blockCountByPool,
  };
}