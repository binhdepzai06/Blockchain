export type AttackType =
  | "51_PERCENT"
  | "DOUBLE_SPEND"
  | "SYBIL"
  | "ECLIPSE"
  | "SELFISH_MINING";

export type AttackStatus =
  | "IDLE"
  | "RUNNING"
  | "SUCCESS"
  | "FAILED"
  | "STOPPED";

export type ImpactLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type NodeRole = "HONEST" | "ATTACKER" | "TARGET";

export interface AttackNode {
  id: string;
  x: number;
  y: number;
  role: NodeRole;
  online: boolean;
  connected: boolean;
  peers: string[];
}

export interface NetworkLink {
  source: string;
  target: string;
  attackerControlled: boolean;
  active: boolean;
}

export interface SimulatedBlock {
  id: string;
  height: number;
  hash: string;
  previousHash: string;
  miner: "HONEST" | "ATTACKER";
  timestamp: number;
  chain: "PUBLIC" | "PRIVATE";
  confirmed: boolean;
}

export interface AttackEvent {
  id: string;
  timestamp: number;
  message: string;
  type:
    | "INFO"
    | "ACTION"
    | "WARNING"
    | "SUCCESS"
    | "ERROR";
}

export interface AttackParameters {
  hashPower: number;
  attackerNodes: number;
  targetNode: string;
  attackSpeed: number;
  confirmations: number;
}

export interface AttackMetrics {
  blocksMined: number;
  attackerBlocks: number;
  honestBlocks: number;
  affectedNodes: number;
  controlledNodes: number;
  networkControl: number;
  privateChainLength: number;
  publicChainLength: number;
  attackProgress: number;
}

export interface AttackState {
  attackType: AttackType;
  status: AttackStatus;

  nodes: AttackNode[];
  links: NetworkLink[];

  publicChain: SimulatedBlock[];
  privateChain: SimulatedBlock[];

  events: AttackEvent[];

  metrics: AttackMetrics;

  parameters: AttackParameters;

  currentStep: number;

  attackConditionReached: boolean;

  resultTitle: string;
  resultDescription: string;
  resultImpact: ImpactLevel;
}