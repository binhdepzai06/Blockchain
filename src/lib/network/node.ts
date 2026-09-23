export interface NetworkNode {
  id: string;
  label: string;
  x: number;
  y: number;
  isValidator?: boolean;
}

export const networkNodes: NetworkNode[] = [
  { id: "A", label: "Node A", x: 150, y: 80 },
  { id: "B", label: "Node B", x: 60, y: 220 },
  { id: "C", label: "Node C", x: 240, y: 220 },
  { id: "D", label: "Node D", x: 60, y: 360 },
  { id: "E", label: "Node E", x: 240, y: 360, isValidator: true },
];