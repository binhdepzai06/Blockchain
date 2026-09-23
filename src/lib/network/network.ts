export const networkEdges: [string, string][] = [
  ["A", "B"],
  ["A", "C"],
  ["B", "C"],
  ["B", "D"],
  ["C", "E"],
  ["D", "E"],
];

export function getNeighbors(nodeId: string): string[] {
  const neighbors: string[] = [];

  for (const [a, b] of networkEdges) {
    if (a === nodeId) neighbors.push(b);
    if (b === nodeId) neighbors.push(a);
  }

  return neighbors;
}