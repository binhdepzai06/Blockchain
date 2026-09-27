import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
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

const initialConnections: NetworkConnection[] = [
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

const extraPositions = [
  { x: 10, y: 20 },
  { x: 90, y: 20 },
  { x: 10, y: 75 },
  { x: 90, y: 75 },
  { x: 50, y: 50 },
  { x: 50, y: 92 },
  { x: 15, y: 92 },
  { x: 85, y: 92 },
];

function getNextNodeId(nodes: NetworkNode[]): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (const letter of alphabet) {
    if (!nodes.some((node) => node.id === letter)) {
      return letter;
    }
  }

  return `N${nodes.length + 1}`;
}

function getNewNodePosition(nodes: NetworkNode[]) {
  const extraIndex = Math.max(0, nodes.length - initialNodes.length);

  return (
    extraPositions[extraIndex % extraPositions.length] ?? {
      x: 50,
      y: 50,
    }
  );
}

export default function NetworkLab() {
  const [nodes, setNodes] = useState<NetworkNode[]>(initialNodes);

  const [connections, setConnections] =
    useState<NetworkConnection[]>(initialConnections);

  const [startNodeId, setStartNodeId] = useState("A");

  const [result, setResult] =
    useState<SimulationResult | null>(null);

  const [error, setError] = useState("");

  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeValidator, setNewNodeValidator] = useState(false);

  const [connectionSource, setConnectionSource] = useState("A");
  const [connectionTarget, setConnectionTarget] = useState("B");
  const [connectionLatency, setConnectionLatency] = useState(100);

  const resetSimulation = () => {
    setResult(null);
    setError("");
  };

  const runSimulation = (type: BroadcastType) => {
    try {
      setError("");

      const simulationResult = simulatePropagation(
        startNodeId,
        type,
        nodes,
        connections,
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
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setStartNodeId(event.target.value);
    resetSimulation();
  };

  const handleNewNodeNameChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setNewNodeName(event.target.value);
  };

  const handleValidatorChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setNewNodeValidator(event.target.checked);
  };

  const handleAddNode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = getNextNodeId(nodes);
    const position = getNewNodePosition(nodes);

    const name =
      newNodeName.trim() !== ""
        ? newNodeName.trim()
        : `Node ${id}`;

    const newNode: NetworkNode = {
      id,
      name,
      online: true,
      isValidator: newNodeValidator,
      x: position.x,
      y: position.y,
    };

    const updatedNodes = [...nodes, newNode];

    setNodes(updatedNodes);

    if (nodes.length === 0) {
      setStartNodeId(id);
      setConnectionSource(id);
      setConnectionTarget(id);
    }

    setNewNodeName("");
    setNewNodeValidator(false);
    resetSimulation();
  };

  const handleToggleNode = (
    event: MouseEvent<HTMLButtonElement>,
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

    resetSimulation();
  };

  const handleRemoveNode = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const nodeId = event.currentTarget.dataset.nodeId;

    if (!nodeId) {
      return;
    }

    const updatedNodes = nodes.filter(
      (node) => node.id !== nodeId,
    );

    const updatedConnections = connections.filter(
      (connection) =>
        connection.source !== nodeId &&
        connection.target !== nodeId,
    );

    setNodes(updatedNodes);
    setConnections(updatedConnections);

    if (startNodeId === nodeId) {
      setStartNodeId(updatedNodes[0]?.id ?? "");
    }

    if (connectionSource === nodeId) {
      setConnectionSource(updatedNodes[0]?.id ?? "");
    }

    if (connectionTarget === nodeId) {
      setConnectionTarget(
        updatedNodes[1]?.id ?? updatedNodes[0]?.id ?? "",
      );
    }

    resetSimulation();
  };

  const handleConnectionSourceChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setConnectionSource(event.target.value);
  };

  const handleConnectionTargetChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setConnectionTarget(event.target.value);
  };

  const handleLatencyChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setConnectionLatency(Number(event.target.value));
  };

  const handleConnectNodes = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    if (!connectionSource || !connectionTarget) {
      setError("Please select two nodes.");
      return;
    }

    if (connectionSource === connectionTarget) {
      setError("A node cannot connect to itself.");
      return;
    }

    if (
      !Number.isFinite(connectionLatency) ||
      connectionLatency < 0
    ) {
      setError("Latency must be 0 or greater.");
      return;
    }

    const alreadyConnected = connections.some(
      (connection) =>
        (connection.source === connectionSource &&
          connection.target === connectionTarget) ||
        (connection.source === connectionTarget &&
          connection.target === connectionSource),
    );

    if (alreadyConnected) {
      setError("These nodes are already connected.");
      return;
    }

    const connectionId =
      connectionSource < connectionTarget
        ? `${connectionSource}${connectionTarget}`
        : `${connectionTarget}${connectionSource}`;

    const newConnection: NetworkConnection = {
      id: `${connectionId}-${Date.now()}`,
      source: connectionSource,
      target: connectionTarget,
      latency: connectionLatency,
    };

    setConnections((currentConnections) => [
      ...currentConnections,
      newConnection,
    ]);

    resetSimulation();
  };

  const handleDisconnect = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const connectionId =
      event.currentTarget.dataset.connectionId;

    if (!connectionId) {
      return;
    }

    setConnections((currentConnections) =>
      currentConnections.filter(
        (connection) => connection.id !== connectionId,
      ),
    );

    resetSimulation();
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
      <header
        style={{
          textAlign: "center",
          marginBottom: "32px",
        }}
      >
        <h1>Network Simulator</h1>

        <p>
          Simulate how transactions and blocks propagate between
          blockchain nodes with different network latencies.
        </p>
      </header>

      <NetworkGraph
        nodes={nodes}
        connections={connections}
        result={result}
      />

      <section style={{ marginTop: "32px" }}>
        <h2>Network Management</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          <form
            onSubmit={handleAddNode}
            style={{
              padding: "20px",
              border: "1px solid #3f3f46",
              borderRadius: "12px",
              background: "#18181b",
            }}
          >
            <h3>Add Node</h3>

            <label htmlFor="new-node-name">
              Node name
            </label>

            <input
              id="new-node-name"
              type="text"
              value={newNodeName}
              onChange={handleNewNodeNameChange}
              placeholder="Example: My Node"
              style={{
                display: "block",
                width: "100%",
                marginTop: "8px",
                marginBottom: "14px",
                padding: "9px",
                boxSizing: "border-box",
              }}
            />

            <label>
              <input
                type="checkbox"
                checked={newNodeValidator}
                onChange={handleValidatorChange}
              />{" "}
              Validator
            </label>

            <div style={{ marginTop: "16px" }}>
              <button
                type="submit"
                style={{
                  padding: "9px 14px",
                  cursor: "pointer",
                }}
              >
                Add Node
              </button>
            </div>
          </form>

          <form
            onSubmit={handleConnectNodes}
            style={{
              padding: "20px",
              border: "1px solid #3f3f46",
              borderRadius: "12px",
              background: "#18181b",
            }}
          >
            <h3>Connect Nodes</h3>

            <div style={{ marginBottom: "12px" }}>
              <label htmlFor="connection-source">
                From
              </label>

              <select
                id="connection-source"
                value={connectionSource}
                onChange={handleConnectionSourceChange}
                style={{
                  marginLeft: "8px",
                  padding: "7px",
                }}
              >
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label htmlFor="connection-target">
                To
              </label>

              <select
                id="connection-target"
                value={connectionTarget}
                onChange={handleConnectionTargetChange}
                style={{
                  marginLeft: "8px",
                  padding: "7px",
                }}
              >
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="connection-latency">
                Latency
              </label>

              <input
                id="connection-latency"
                type="number"
                min="0"
                value={connectionLatency}
                onChange={handleLatencyChange}
                style={{
                  width: "90px",
                  marginLeft: "8px",
                  padding: "7px",
                }}
              />

              <span> ms</span>
            </div>

            <button
              type="submit"
              disabled={nodes.length < 2}
              style={{
                padding: "9px 14px",
                cursor:
                  nodes.length < 2
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Connect
            </button>
          </form>
        </div>
      </section>

      {error && (
        <p
          role="alert"
          style={{
            marginTop: "20px",
            padding: "12px",
            color: "#fca5a5",
            background: "#450a0a",
            border: "1px solid #7f1d1d",
            borderRadius: "8px",
          }}
        >
          {error}
        </p>
      )}

      <section style={{ marginTop: "32px" }}>
        <h2>Network Nodes</h2>

        {nodes.length === 0 ? (
          <p>No nodes in the network.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(190px, 1fr))",
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

                <p>ID: {node.id}</p>

                <p>
                  Status:{" "}
                  <strong
                    style={{
                      color: node.online
                        ? "#4ade80"
                        : "#f87171",
                    }}
                  >
                    {node.online
                      ? "Online"
                      : "Offline"}
                  </strong>
                </p>

                <p>
                  Role:{" "}
                  {node.isValidator
                    ? "Validator"
                    : "Node"}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    data-node-id={node.id}
                    onClick={handleToggleNode}
                    style={{
                      padding: "8px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Set{" "}
                    {node.online
                      ? "Offline"
                      : "Online"}
                  </button>

                  <button
                    type="button"
                    data-node-id={node.id}
                    onClick={handleRemoveNode}
                    style={{
                      padding: "8px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2>Connections</h2>

        {connections.length === 0 ? (
          <p>No connections.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "10px",
            }}
          >
            {connections.map((connection) => (
              <div
                key={connection.id}
                style={{
                  padding: "12px",
                  border: "1px solid #3f3f46",
                  borderRadius: "10px",
                  background: "#18181b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <span>
                  <strong>
                    {connection.source} ↔{" "}
                    {connection.target}
                  </strong>
                  {" — "}
                  {connection.latency} ms
                </span>

                <button
                  type="button"
                  data-connection-id={connection.id}
                  onClick={handleDisconnect}
                  style={{
                    padding: "7px 10px",
                    cursor: "pointer",
                  }}
                >
                  Disconnect
                </button>
              </div>
            ))}
          </div>
        )}
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
            disabled={nodes.length === 0}
            style={{
              padding: "8px",
              marginLeft: "8px",
            }}
          >
            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
                {node.name}{" "}
                {node.online
                  ? ""
                  : "(Offline)"}
              </option>
            ))}
          </select>
        </div>

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
            disabled={nodes.length === 0}
            style={{
              padding: "10px 16px",
              cursor:
                nodes.length === 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Broadcast Transaction
          </button>

          <button
            type="button"
            onClick={handleBlockBroadcast}
            disabled={nodes.length === 0}
            style={{
              padding: "10px 16px",
              cursor:
                nodes.length === 0
                  ? "not-allowed"
                  : "pointer",
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
            Start node:{" "}
            <strong>{result.startNodeId}</strong>
          </p>

          <p>
            Reached nodes:{" "}
            <strong>
              {result.reachedNodes}/{nodes.length}
            </strong>
          </p>

          <p>
            Total propagation time:{" "}
            <strong>
              {result.totalPropagationTime} ms
            </strong>
          </p>

          <h3>Propagation Order</h3>

          <ol>
            {result.events.map((event) => (
              <li key={event.nodeId}>
                {event.nodeId} received at{" "}
                {event.receivedAt} ms
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