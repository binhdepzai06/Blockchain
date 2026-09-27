export type VoteChoice = "approve" | "reject";

export interface SolanaValidator {
  id: string;
  name: string;
  ownStake: number;
  online: boolean;
}

export interface Delegator {
  id: string;
  name: string;
  stake: number;
  validatorId: string;
}

export interface ValidatorVote {
  validatorId: string;
  choice: VoteChoice;
}

export interface ValidatorVoteResult {
  validatorId: string;
  validatorName: string;
  effectiveStake: number;
  choice: VoteChoice;
}

export interface SolanaVoteResult {
  totalVotingStake: number;
  approveStake: number;
  rejectStake: number;
  approvePercentage: number;
  rejectPercentage: number;
  consensusReached: boolean;
  validatorResults: ValidatorVoteResult[];
}