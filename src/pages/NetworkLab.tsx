import { useState } from "react";
import NetworkGraph from "../components/network/NetworkGraph";
import { simulatePropagation } from "../lib/network/networkSimulator";
import type {
  BroadcastType,
  NetworkConnection,
  NetworkNode,
  SimulationResult,
} from "../types/network";

const initialNodes: NetworkNode[] = [
  {
    id: "A",
    name: "Node A",
    online: true,
    isValidator: true,
    x: 50,
    y: 15,
  },
  {
    id: "B",
    name: "Node B",
    online: true,
    isValidator: false,
    x: 20,
    y: 45,
  },
  {
    id: "C",
    name: "Node C",
    online: true,
    isValidator: true,
    x: 80,
    y: 45,
  },
  {
    id: "D",
    name: "Node D",
    online: true,
    isValidator: false,
    x: 30,
    y: 80,
  },
  {
    id: "E",
    name: "Node E",
    online: true,
    isValidator: true,
    x: 70,
    y: 80,
  },
];

const demoConnections: NetworkConnection[] = [
  {
    id: "AB",
    source: "A",
    target: "B",
    latency: 120,
  },
  {
    id: "AC",
    source: "A",
    target: "C",
    latency: 80,
  },
  {
    id: "BD",
    source: "B",
    target: "D",
    latency: 100,
  },
  {
    id: "CE",
    source: "C",
    target: "E",
    latency: 90,
  },
  {
    id: "DE",
    source: "D",
    target: "E",
    latency: 70,
  },
];

export default function NetworkLab() {
  const [nodes, setNodes] = useState<NetworkNode[]>(initialNodes);
  const [startNodeId, setStartNodeId] = useState("A");
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState("");

  const runSimulation = (type: BroadcastType) => {
    try {
      setError("");

      const simulationResult = simulatePropagation(
        startNodeId,
        type,
        nodes,
        demoConnections,
      );

      setResult(simulationResult);
    } catch (simulationError) {
      setResult(null);

      if (simulationError instanceof Error) {
        setError(simulationError.message);
      } else {
        setError("Simulation failed.");
      }
    }
  };

  const handleTransactionBroadcast = () => {
    runSimulation("transaction");
  };

  const handleBlockBroadcast = () => {
    runSimulation("block");
  };

  const handleStartNodeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setStartNodeId(event.target.value);
    setResult(null);
    setError("");
  };

  const handleToggleNode = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const nodeId = event.currentTarget.dataset.nodeId;

    if (!nodeId) {
      return;
    }

    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              online: !node.online,
            }
          : node,
      ),
    );

    setResult(null);
    setError("");
  };

  return (
    <main
      style={{
        padding: "32px",
        color: "#ffffff",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <header style={{ textAlign: "center" }}>
        <h1>Network Simulator</h1>

        <p>
          Simulate how transactions and blocks propagate between blockchain
          nodes with different network latencies.
        </p>
      </header>

      <NetworkGraph
        nodes={nodes}
        connections={demoConnections}
        result={result}
      />

      <section style={{ marginTop: "32px" }}>
        <h2>Network Nodes</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: "16px",
          }}
        >
          {nodes.map((node) => (
            <article
              key={node.id}
              style={{
                padding: "16px",
                border: "1px solid #444",
                borderRadius: "12px",
                background: "#18181b",
              }}
            >
              <h3>{node.name}</h3>

              <p>
                Status:{" "}
                <strong
                  style={{
                    color: node.online ? "#4ade80" : "#f87171",
                  }}
                >
                  {node.online ? "Online" : "Offline"}
                </strong>
              </p>

              <p>
                Role: {node.isValidator ? "Validator" : "Node"}
              </p>

              <button
                type="button"
                data-node-id={node.id}
                onClick={handleToggleNode}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                Set {node.online ? "Offline" : "Online"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2>Connections</h2>

        {demoConnections.map((connection) => (
          <p key={connection.id}>
            {connection.source} → {connection.target}:{" "}
            {connection.latency} ms
          </p>
        ))}
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2>Broadcast Simulation</h2>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="start-node">
            Start Node:{" "}
          </label>

          <select
            id="start-node"
            value={startNodeId}
            onChange={handleStartNodeChange}
            style={{
              padding: "8px",
              marginLeft: "8px",
            }}
          >
            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
                {node.name} {node.online ? "" : "(Offline)"}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p
            role="alert"
            style={{
              color: "#f87171",
              fontWeight: 600,
            }}
          >
            {error}
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={handleTransactionBroadcast}
            style={{
              padding: "10px 16px",
              cursor: "pointer",
            }}
          >
            Broadcast Transaction
          </button>

          <button
            type="button"
            onClick={handleBlockBroadcast}
            style={{
              padding: "10px 16px",
              cursor: "pointer",
            }}
          >
            Broadcast Block
          </button>
        </div>
      </section>

      {result && (
        <section style={{ marginTop: "32px" }}>
          <h2>Propagation Result</h2>

          <p>
            Type: <strong>{result.type}</strong>
          </p>

          <p>
            Start node: <strong>{result.startNodeId}</strong>
          </p>

          <p>
            Reached nodes:{" "}
            <strong>
              {result.reachedNodes}/{nodes.length}
            </strong>
          </p>

          <p>
            Total propagation time:{" "}
            <strong>{result.totalPropagationTime} ms</strong>
          </p>

          <h3>Propagation Order</h3>

          <ol>
            {result.events.map((event) => (
              <li key={event.nodeId}>
                {event.nodeId} received at {event.receivedAt} ms
                {event.fromNodeId
                  ? ` from Node ${event.fromNodeId}`
                  : " (origin)"}
              </li>
            ))}
          </ol>
        </section>
      )}
    </main>
  );
}