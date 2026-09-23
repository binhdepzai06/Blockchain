import { getNeighbors } from "./network";

// Trả về danh sách các "đợt" (wave) node nhận được transaction, dùng BFS
export function computePropagationWaves(startNodeId: string): string[][] {
  const visited = new Set<string>([startNodeId]);
  const waves: string[][] = [[startNodeId]];

  let currentWave = [startNodeId];

  while (currentWave.length > 0) {
    const nextWave: string[] = [];

    for (const nodeId of currentWave) {
      for (const neighbor of getNeighbors(nodeId)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          nextWave.push(neighbor);
        }
      }
    }

    if (nextWave.length > 0) {
      waves.push(nextWave);
    }

    currentWave = nextWave;
  }

  return waves;
}