import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import {
  Activity,
  Link2,
  Network as NetworkIcon,
  Play,
  Plus,
  ShieldCheck,
  Trash2,
  Unlink,
} from "lucide-react";

import { simulatePropagation } from "../../lib/network/networkSimulator";
import type {
  BroadcastType,
  NetworkConnection,
  NetworkNode,
  SimulationResult,
} from "../../types/network";

const initialNodes: NetworkNode[] = [
  {
    id: "A",
    name: "Node A",
    type: "validator",
    online: true,
    isValidator: true,
    x: 150,
    y: 55,
  },
  {
    id: "B",
    name: "Node B",
    type: "node",
    online: true,
    isValidator: false,
    x: 65,
    y: 180,
  },
  {
    id: "C",
    name: "Node C",
    type: "validator",
    online: true,
    isValidator: true,
    x: 235,
    y: 180,
  },
  {
    id: "D",
    name: "Node D",
    type: "node",
    online: true,
    isValidator: false,
    x: 65,
    y: 330,
  },
  {
    id: "E",
    name: "Node E",
    type: "validator",
    online: true,
    isValidator: true,
    x: 235,
    y: 330,
  },
];

const initialConnections: NetworkConnection[] = [
  { id: "AB", source: "A", target: "B", latency: 120 },
  { id: "AC", source: "A", target: "C", latency: 80 },
  { id: "BD", source: "B", target: "D", latency: 100 },
  { id: "CE", source: "C", target: "E", latency: 90 },
  { id: "DE", source: "D", target: "E", latency: 70 },
];

const extraPositions = [
  { x: 150, y: 210 },
  { x: 30, y: 100 },
  { x: 270, y: 100 },
  { x: 30, y: 390 },
  { x: 270, y: 390 },
];

function getNextNodeId(nodes: NetworkNode[]) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (const letter of alphabet) {
    if (!nodes.some((node) => node.id === letter)) {
      return letter;
    }
  }

  return `N${nodes.length + 1}`;
}

export default function NetworkPage() {
  const [nodes, setNodes] = useState<NetworkNode[]>(initialNodes);
  const [connections, setConnections] =
    useState<NetworkConnection[]>(initialConnections);

  const [startNodeId, setStartNodeId] = useState("A");
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());

  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");

  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeValidator, setNewNodeValidator] = useState(false);

  const [connectionSource, setConnectionSource] = useState("A");
  const [connectionTarget, setConnectionTarget] = useState("B");
  const [connectionLatency, setConnectionLatency] = useState(100);

  useEffect(() => {
    setActiveNodes(new Set());

    if (!result) {
      setIsRunning(false);
      return;
    }

    setIsRunning(true);

    const animationScale = 5;
    const timers: number[] = [];

    result.events.forEach((event) => {
      const timer = window.setTimeout(() => {
        setActiveNodes((current) => {
          const next = new Set(current);
          next.add(event.nodeId);
          return next;
        });
      }, event.receivedAt * animationScale);

      timers.push(timer);
    });

    const finishTimer = window.setTimeout(() => {
      setIsRunning(false);
    }, result.totalPropagationTime * animationScale + 250);

    timers.push(finishTimer);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [result]);

  const resetSimulation = () => {
    setResult(null);
    setActiveNodes(new Set());
    setError("");
    setIsRunning(false);
  };

  const runSimulation = (type: BroadcastType) => {
    try {
      setError("");
      setActiveNodes(new Set());

      const simulationResult = simulatePropagation(
        startNodeId,
        type,
        nodes,
        connections,
      );

      setResult(simulationResult);
    } catch (simulationError) {
      setResult(null);
      setActiveNodes(new Set());

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

  const handleAddNode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = getNextNodeId(nodes);

    const position =
      extraPositions[
        Math.max(0, nodes.length - initialNodes.length) %
          extraPositions.length
      ];

    const newNode: NetworkNode = {
      id,
      name: newNodeName.trim() || `Node ${id}`,
      online: true,
      type: newNodeValidator ? "validator" : "node",
      isValidator: newNodeValidator,
      x: position.x,
      y: position.y,
    };

    setNodes((current) => [...current, newNode]);

    if (nodes.length === 0) {
      setStartNodeId(id);
      setConnectionSource(id);
      setConnectionTarget(id);
    } else if (nodes.length === 1) {
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

    setNodes((current) =>
      current.map((node) =>
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

  const handleToggleValidator = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const nodeId = event.currentTarget.dataset.nodeId;

    if (!nodeId) {
      return;
    }

    setNodes((current) =>
      current.map((node) => {
        if (node.id !== nodeId) {
          return node;
        }

        const isValidator =
          !(node.isValidator ?? node.type === "validator");

        return {
          ...node,
          isValidator,
          type: isValidator ? "validator" : "node",
        };
      }),
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

    const updatedNodes = nodes.filter((node) => node.id !== nodeId);

    setNodes(updatedNodes);

    setConnections((current) =>
      current.filter(
        (connection) =>
          connection.source !== nodeId &&
          connection.target !== nodeId,
      ),
    );

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

  const handleConnectNodes = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (connectionSource === connectionTarget) {
      setError("Một node không thể kết nối với chính nó.");
      return;
    }

    if (!Number.isFinite(connectionLatency) || connectionLatency < 0) {
      setError("Latency phải lớn hơn hoặc bằng 0.");
      return;
    }

    const alreadyExists = connections.some(
      (connection) =>
        (connection.source === connectionSource &&
          connection.target === connectionTarget) ||
        (connection.source === connectionTarget &&
          connection.target === connectionSource),
    );

    if (alreadyExists) {
      setError("Hai node này đã được kết nối.");
      return;
    }

    const newConnection: NetworkConnection = {
      id: `${connectionSource}-${connectionTarget}-${Date.now()}`,
      source: connectionSource,
      target: connectionTarget,
      latency: connectionLatency,
    };

    setConnections((current) => [...current, newConnection]);

    resetSimulation();
  };

  const handleDisconnect = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const connectionId = event.currentTarget.dataset.connectionId;

    if (!connectionId) {
      return;
    }

    setConnections((current) =>
      current.filter((connection) => connection.id !== connectionId),
    );

    resetSimulation();
  };

  const visibleEvents =
    result?.events.filter((event) => activeNodes.has(event.nodeId)) ?? [];

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            <NetworkIcon size={16} />
            Network Laboratory
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Network Propagation
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Thay đổi topology, latency, trạng thái node và quan sát transaction
            hoặc block lan truyền qua mạng blockchain.
          </p>
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-3">
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-semibold text-white">Sơ đồ mạng</h2>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleTransactionBroadcast}
                  disabled={isRunning || nodes.length === 0}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:opacity-50"
                >
                  <Play size={15} />
                  Transaction
                </button>

                <button
                  type="button"
                  onClick={handleBlockBroadcast}
                  disabled={isRunning || nodes.length === 0}
                  className="flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-400/10 px-4 py-2.5 text-sm font-semibold text-purple-200 disabled:opacity-50"
                >
                  <Activity size={15} />
                  Block
                </button>
              </div>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <label
                htmlFor="network-start-node"
                className="text-sm text-slate-400"
              >
                Node bắt đầu
              </label>

              <select
                id="network-start-node"
                value={startNodeId}
                onChange={handleStartNodeChange}
                disabled={nodes.length === 0}
                className="rounded-xl border border-white/10 bg-[#050816] px-3 py-2 text-sm text-white outline-none"
              >
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.name} {node.online ? "" : "(Offline)"}
                  </option>
                ))}
              </select>
            </div>

            <svg viewBox="0 0 300 420" className="mx-auto w-full max-w-sm">
              {connections.map((connection) => {
                const nodeA = nodes.find(
                  (node) => node.id === connection.source,
                );

                const nodeB = nodes.find(
                  (node) => node.id === connection.target,
                );

                if (!nodeA || !nodeB) {
                  return null;
                }

                const x1 = nodeA.x ?? 150;
                const y1 = nodeA.y ?? 210;
                const x2 = nodeB.x ?? 150;
                const y2 = nodeB.y ?? 210;

                const active =
                  activeNodes.has(nodeA.id) && activeNodes.has(nodeB.id);

                return (
                  <g key={connection.id ?? `${connection.source}-${connection.target}`}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={active ? "#60a5fa" : "rgba(255,255,255,0.15)"}
                      strokeWidth={active ? 3 : 1.5}
                    />

                    <text
                      x={(x1 + x2) / 2}
                      y={(y1 + y2) / 2 - 6}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#94a3b8"
                    >
                      {connection.latency}ms
                    </text>
                  </g>
                );
              })}

              {nodes.map((node) => {
                const active = activeNodes.has(node.id);

                const isValidator =
                  node.isValidator ?? node.type === "validator";

                return (
                  <g key={node.id}>
                    <circle
                      cx={node.x ?? 150}
                      cy={node.y ?? 210}
                      r={isValidator ? 28 : 24}
                      fill={
                        !node.online
                          ? "#3f1d2e"
                          : active
                            ? isValidator
                              ? "#34d399"
                              : "#3b82f6"
                            : "#0f1629"
                      }
                      stroke={
                        !node.online
                          ? "#fb7185"
                          : isValidator
                            ? "#34d399"
                            : "rgba(255,255,255,0.3)"
                      }
                      strokeWidth={2}
                    />

                    <text
                      x={node.x ?? 150}
                      y={(node.y ?? 210) + 5}
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="600"
                      fill="white"
                    >
                      {node.id}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-500" />
                Node thường
              </span>

              <span className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-400" />
                Validator
              </span>

              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                Offline
              </span>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-4 font-semibold text-white">
              Nhật ký lan truyền
            </h2>

            <div className="space-y-2">
              {visibleEvents.length === 0 && (
                <p className="text-sm leading-6 text-slate-500">
                  Chọn node bắt đầu rồi chạy Transaction hoặc Block.
                </p>
              )}

              {visibleEvents.map((event, index) => (
                <div
                  key={event.nodeId}
                  className="rounded-xl border border-white/5 bg-[#050816] px-4 py-2.5 text-xs text-slate-300"
                >
                  Đợt {index + 1}: Node {event.nodeId} nhận dữ liệu tại{" "}
                  {event.receivedAt}ms
                  {event.fromNodeId
                    ? ` từ Node ${event.fromNodeId}`
                    : " — nguồn phát"}
                </div>
              ))}
            </div>

            {result && (
              <div className="mt-5 space-y-2 rounded-2xl border border-blue-400/10 bg-blue-400/5 p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Loại dữ liệu</span>
                  <span className="font-semibold text-white">
                    {result.type}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Node nhận được</span>
                  <span className="font-semibold text-white">
                    {result.reachedNodes}/{nodes.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Tổng thời gian</span>
                  <span className="font-semibold text-white">
                    {result.totalPropagationTime}ms
                  </span>
                </div>
              </div>
            )}
          </section>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-rose-400/20 bg-rose-400/5 px-5 py-3 text-sm text-rose-300">
            {error}
          </div>
        )}

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-5 font-semibold text-white">
            Quản lý Network
          </h2>

          <div className="grid gap-6 lg:grid-cols-2">
            <form
              onSubmit={handleAddNode}
              className="rounded-2xl border border-white/5 bg-[#050816] p-5"
            >
              <div className="mb-4 flex items-center gap-2 font-semibold text-white">
                <Plus size={16} />
                Add Node
              </div>

              <input
                type="text"
                value={newNodeName}
                onChange={(event) => setNewNodeName(event.target.value)}
                placeholder="Tên node"
                className="mb-4 w-full rounded-xl border border-white/10 bg-[#0b1020] px-4 py-3 text-sm text-white outline-none"
              />

              <label className="flex items-center gap-2 text-sm text-slate-400">
                <input
                  type="checkbox"
                  checked={newNodeValidator}
                  onChange={(event) =>
                    setNewNodeValidator(event.target.checked)
                  }
                />
                Validator
              </label>

              <button
                type="submit"
                className="mt-4 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white"
              >
                Add Node
              </button>
            </form>

            <form
              onSubmit={handleConnectNodes}
              className="rounded-2xl border border-white/5 bg-[#050816] p-5"
            >
              <div className="mb-4 flex items-center gap-2 font-semibold text-white">
                <Link2 size={16} />
                Connect Nodes
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <select
                  value={connectionSource}
                  onChange={(event) =>
                    setConnectionSource(event.target.value)
                  }
                  className="rounded-xl border border-white/10 bg-[#0b1020] px-3 py-3 text-sm text-white"
                >
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.name}
                    </option>
                  ))}
                </select>

                <select
                  value={connectionTarget}
                  onChange={(event) =>
                    setConnectionTarget(event.target.value)
                  }
                  className="rounded-xl border border-white/10 bg-[#0b1020] px-3 py-3 text-sm text-white"
                >
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.name}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="number"
                min="0"
                value={connectionLatency}
                onChange={(event) =>
                  setConnectionLatency(Number(event.target.value))
                }
                className="mt-3 w-full rounded-xl border border-white/10 bg-[#0b1020] px-4 py-3 text-sm text-white"
              />

              <button
                type="submit"
                disabled={nodes.length < 2}
                className="mt-4 rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
              >
                Connect
              </button>
            </form>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-4 font-semibold text-white">Nodes</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {nodes.map((node) => {
              const isValidator =
                node.isValidator ?? node.type === "validator";

              return (
                <article
                  key={node.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">
                        {node.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        ID: {node.id}
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        node.online
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-rose-400/10 text-rose-300"
                      }`}
                    >
                      {node.online ? "Online" : "Offline"}
                    </span>
                  </div>

                  <div className="mb-4 text-sm text-slate-400">
                    Role: {isValidator ? "Validator" : "Node"}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      data-node-id={node.id}
                      onClick={handleToggleNode}
                      className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300"
                    >
                      {node.online ? "Set Offline" : "Set Online"}
                    </button>

                    <button
                      type="button"
                      data-node-id={node.id}
                      onClick={handleToggleValidator}
                      className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300"
                    >
                      Toggle Role
                    </button>

                    <button
                      type="button"
                      data-node-id={node.id}
                      onClick={handleRemoveNode}
                      className="flex items-center gap-1 rounded-lg border border-rose-400/20 px-3 py-2 text-xs text-rose-300"
                    >
                      <Trash2 size={12} />
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-4 font-semibold text-white">Connections</h2>

          <div className="space-y-2">
            {connections.map((connection) => (
              <div
                key={connection.id ?? `${connection.source}-${connection.target}`}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-[#050816] px-4 py-3"
              >
                <span className="text-sm text-slate-300">
                  {connection.source} ↔ {connection.target} —{" "}
                  {connection.latency}ms
                </span>

                <button
                  type="button"
                  data-connection-id={connection.id}
                  onClick={handleDisconnect}
                  className="flex items-center gap-1 text-xs text-rose-300"
                >
                  <Unlink size={13} />
                  Disconnect
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}