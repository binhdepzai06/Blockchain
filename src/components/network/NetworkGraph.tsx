import { useEffect, useState } from "react";
import type {
  NetworkConnection,
  NetworkNode,
  SimulationResult,
} from "../../types/network";

interface NetworkGraphProps {
  nodes: NetworkNode[];
  connections: NetworkConnection[];
  result: SimulationResult | null;
}

const ANIMATION_SCALE = 8;

export default function NetworkGraph({
  nodes,
  connections,
  result,
}: NetworkGraphProps) {
  const [receivedNodeIds, setReceivedNodeIds] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    setReceivedNodeIds(new Set());

    if (!result) {
      return;
    }

    const timers: number[] = [];

    for (const event of result.events) {
      const timer = window.setTimeout(() => {
        setReceivedNodeIds((current) => {
          const next = new Set(current);
          next.add(event.nodeId);
          return next;
        });
      }, event.receivedAt * ANIMATION_SCALE);

      timers.push(timer);
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [result]);

  const getNode = (id: string) =>
    nodes.find((node) => node.id === id);

  return (
    <section style={{ marginTop: "32px" }}>
      <h2>Network Graph</h2>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          border: "1px solid #3f3f46",
          borderRadius: "16px",
          background: "#0f1117",
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {connections.map((connection, index) => {
            const source = getNode(connection.source);
            const target = getNode(connection.target);

            if (!source || !target) {
              return null;
            }

            const sourceX = source.x ?? 50;
            const sourceY = source.y ?? 50;
            const targetX = target.x ?? 50;
            const targetY = target.y ?? 50;

            const middleX = (sourceX + targetX) / 2;
            const middleY = (sourceY + targetY) / 2;

            const connectionActive =
              receivedNodeIds.has(source.id) &&
              receivedNodeIds.has(target.id);

            return (
              <g
                key={
                  connection.id ??
                  `${connection.source}-${connection.target}-${index}`
                }
              >
                <line
                  x1={sourceX}
                  y1={sourceY}
                  x2={targetX}
                  y2={targetY}
                  stroke={connectionActive ? "#22c55e" : "#52525b"}
                  strokeWidth={connectionActive ? "1" : "0.7"}
                  style={{
                    transition: "stroke 0.3s ease",
                  }}
                />

                <text
                  x={middleX}
                  y={middleY}
                  fill="#a1a1aa"
                  fontSize="3"
                  textAnchor="middle"
                >
                  {connection.latency} ms
                </text>
              </g>
            );
          })}
        </svg>

        {nodes.map((node) => {
          const received = receivedNodeIds.has(node.id);

          const x = node.x ?? 50;
          const y = node.y ?? 50;

          const isValidator =
            node.isValidator ?? node.type === "validator";

          return (
            <div
              key={node.id}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                width: "90px",
                minHeight: "70px",
                borderRadius: "14px",
                border: received
                  ? "2px solid #22c55e"
                  : "2px solid #52525b",
                background: received ? "#14532d" : "#18181b",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                boxShadow: received
                  ? "0 0 22px rgba(34, 197, 94, 0.7)"
                  : "none",
                transition: "all 0.35s ease",
              }}
            >
              <strong>{node.name}</strong>

              <span
                style={{
                  fontSize: "12px",
                  marginTop: "4px",
                  color: "#d4d4d8",
                }}
              >
                {isValidator ? "Validator" : "Node"}
              </span>

              {received && (
                <span
                  style={{
                    marginTop: "5px",
                    fontSize: "11px",
                    color: "#86efac",
                  }}
                >
                  Received
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}