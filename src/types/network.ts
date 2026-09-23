export interface NetworkNode {
  id: string;
  name: string;
  online: boolean;
  isValidator: boolean;
  x: number;
  y: number;
}

export interface NetworkConnection {
  id: string;
  source: string;
  target: string;
  latency: number;
}

export type BroadcastType = "transaction" | "block";

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
