import type {
  BroadcastType,
  NetworkConnection,
  NetworkNode,
  PropagationEvent,
  SimulationResult,
} from "../../types/network";

export function simulatePropagation(
  startNodeId: string,
  type: BroadcastType,
  nodes: NetworkNode[],
  connections: NetworkConnection[],
): SimulationResult {
  const startNode = nodes.find((node) => node.id === startNodeId);

  if (!startNode) {
    throw new Error("Start node does not exist.");
  }

  if (!startNode.online) {
    throw new Error("Start node is offline.");
  }

  const arrivalTimes = new Map<string, number>();
  const previousNode = new Map<string, string | undefined>();

  for (const node of nodes) {
    arrivalTimes.set(node.id, Infinity);
  }

  arrivalTimes.set(startNodeId, 0);

  const queue: Array<{
    nodeId: string;
    time: number;
  }> = [
    {
      nodeId: startNodeId,
      time: 0,
    },
  ];

  const visited = new Set<string>();

  while (queue.length > 0) {
    queue.sort((a, b) => a.time - b.time);

    const current = queue.shift();

    if (!current) {
      break;
    }

    if (visited.has(current.nodeId)) {
      continue;
    }

    visited.add(current.nodeId);

    const connectedEdges = connections.filter(
      (connection) =>
        connection.source === current.nodeId ||
        connection.target === current.nodeId,
    );

    for (const connection of connectedEdges) {
      if (connection.latency < 0) {
        continue;
      }

      const neighborId =
        connection.source === current.nodeId
          ? connection.target
          : connection.source;

      const neighbor = nodes.find((node) => node.id === neighborId);

      if (!neighbor || !neighbor.online) {
        continue;
      }

      const newArrivalTime = current.time + connection.latency;

      const oldArrivalTime =
        arrivalTimes.get(neighborId) ?? Infinity;

      if (newArrivalTime < oldArrivalTime) {
        arrivalTimes.set(neighborId, newArrivalTime);
        previousNode.set(neighborId, current.nodeId);

        queue.push({
          nodeId: neighborId,
          time: newArrivalTime,
        });
      }
    }
  }

  const events: PropagationEvent[] = [];

  for (const node of nodes) {
    const receivedAt = arrivalTimes.get(node.id);

    if (receivedAt !== undefined && receivedAt !== Infinity) {
      events.push({
        nodeId: node.id,
        receivedAt,
        fromNodeId: previousNode.get(node.id),
      });
    }
  }

  events.sort((a, b) => a.receivedAt - b.receivedAt);

  const totalPropagationTime =
    events.length > 0
      ? Math.max(...events.map((event) => event.receivedAt))
      : 0;

  return {
    type,
    startNodeId,
    events,
    totalPropagationTime,
    reachedNodes: events.length,
  };
}
