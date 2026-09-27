import type {
  Delegator,
  SolanaValidator,
  SolanaVoteResult,
  ValidatorVote,
  ValidatorVoteResult,
} from "../../types/solana";

export function calculateEffectiveStake(
  validator: SolanaValidator,
  delegators: Delegator[],
): number {
  const delegatedStake = delegators
    .filter(
      (delegator) =>
        delegator.validatorId === validator.id,
    )
    .reduce(
      (sum, delegator) =>
        sum + Math.max(0, delegator.stake),
      0,
    );

  return Math.max(0, validator.ownStake) + delegatedStake;
}

export function simulateStakeWeightedVote(
  validators: SolanaValidator[],
  delegators: Delegator[],
  votes: ValidatorVote[],
): SolanaVoteResult {
  const activeValidators = validators.filter(
    (validator) => validator.online,
  );

  if (activeValidators.length === 0) {
    throw new Error("No online validators are available.");
  }

  const validatorResults: ValidatorVoteResult[] =
    activeValidators.map((validator) => {
      const vote = votes.find(
        (item) => item.validatorId === validator.id,
      );

      if (!vote) {
        throw new Error(
          `Missing vote for ${validator.name}.`,
        );
      }

      return {
        validatorId: validator.id,
        validatorName: validator.name,
        effectiveStake: calculateEffectiveStake(
          validator,
          delegators,
        ),
        choice: vote.choice,
      };
    });

  const totalVotingStake = validatorResults.reduce(
    (sum, result) => sum + result.effectiveStake,
    0,
  );

  if (totalVotingStake <= 0) {
    throw new Error(
      "Total voting stake must be greater than 0.",
    );
  }

  const approveStake = validatorResults
    .filter((result) => result.choice === "approve")
    .reduce(
      (sum, result) => sum + result.effectiveStake,
      0,
    );

  const rejectStake = validatorResults
    .filter((result) => result.choice === "reject")
    .reduce(
      (sum, result) => sum + result.effectiveStake,
      0,
    );

  const approvePercentage =
    (approveStake / totalVotingStake) * 100;

  const rejectPercentage =
    (rejectStake / totalVotingStake) * 100;

  const consensusReached =
    approveStake / totalVotingStake >= 2 / 3;

  return {
    totalVotingStake,
    approveStake,
    rejectStake,
    approvePercentage,
    rejectPercentage,
    consensusReached,
    validatorResults,
  };
}
