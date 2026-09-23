export type NodeType = "node" | "validator";

export interface NetworkNode {
  id: string;
  name: string;
  type: NodeType;
  online: boolean;
}

export interface NetworkConnection {
  source: string;
  target: string;
  latency: number;
}

export interface NetworkMessage {
  id: string;
  type: "transaction" | "block";
  source: string;
  target: string;
  timestamp: number;
}