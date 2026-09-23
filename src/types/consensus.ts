export type ConsensusType = "PoW" | "PoS";

export interface Validator {
  id: string;
  name: string;
  stake: number;
  online: boolean;
}

export interface MiningResult {
  nonce: number;
  hash: string;
  attempts: number;
  duration: number;
}

export interface ConsensusResult {
  type: ConsensusType;
  success: boolean;
  message: string;
}