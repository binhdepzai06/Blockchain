export interface StakePool {
  id: string;
  name: string;
  stake: number;
  online: boolean;
}

export interface CardanoSlotResult {
  slot: number;
  leaderPoolId: string;
  leaderPoolName: string;
  producedBlock: boolean;
}

export interface CardanoEpochResult {
  epoch: number;
  slots: number;
  totalStake: number;
  slotResults: CardanoSlotResult[];
  blockCountByPool: Record<string, number>;
}