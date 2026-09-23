export type NodeType = "node" | "validator";

export type BroadcastType = "transaction" | "block";

export interface NetworkNode {
  id: string;
  name: string;
  online: boolean;
  type?: NodeType;
  isValidator?: boolean;
  x?: number;
  y?: number;
}

export interface NetworkConnection {
  id?: string;
  source: string;
  target: string;
  latency: number;
}

export interface NetworkMessage {
  id: string;
  type: BroadcastType;
  source: string;
  target: string;
  timestamp: number;
}

export interface PropagationEvent {
  nodeId: string;
  receivedAt: number;
  fromNodeId?: string;
}

export interface SimulationResult {
  type: BroadcastType;
  startNodeId: string;
  events: PropagationEvent[];
  totalPropagationTime: number;
  reachedNodes: number;
}
