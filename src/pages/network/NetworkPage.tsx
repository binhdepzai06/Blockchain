import { useState } from "react";
import { Network as NetworkIcon, Play, ShieldCheck } from "lucide-react";

import { networkNodes } from "../../lib/network/node";
import { networkEdges } from "../../lib/network/network";
import { computePropagationWaves } from "../../lib/network/propagation";

export default function NetworkPage() {
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());
  const [isRunning, setIsRunning] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const isEdgeActive = (a: string, b: string) =>
    activeNodes.has(a) && activeNodes.has(b);

  const runSimulation = async () => {
    setIsRunning(true);
    setActiveNodes(new Set());
    setLog([]);

    const waves = computePropagationWaves("A");

    for (let i = 0; i < waves.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 700));

      setActiveNodes((prev) => {
        const next = new Set(prev);
        waves[i].forEach((id) => next.add(id));
        return next;
      });

      setLog((prev) => [
        ...prev,
        `Đợt ${i + 1}: transaction đến ${waves[i]
          .map((id) => `Node ${id}`)
          .join(", ")}`,
      ]);
    }

    setIsRunning(false);
  };

  const getNode = (id: string) => networkNodes.find((n) => n.id === id)!;

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
            Một transaction được phát ra từ Node A và lan truyền qua các node
            trong mạng cho đến khi tới Validator.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* GRAPH */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-white">Sơ đồ mạng</h2>
              <button
                onClick={runSimulation}
                disabled={isRunning}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:opacity-50"
              >
                <Play size={15} />
                {isRunning ? "Đang lan truyền..." : "Phát transaction từ Node A"}
              </button>
            </div>

            <svg viewBox="0 0 300 420" className="w-full max-w-sm mx-auto">
              {networkEdges.map(([a, b], i) => {
                const nodeA = getNode(a);
                const nodeB = getNode(b);
                const active = isEdgeActive(a, b);

                return (
                  <line
                    key={i}
                    x1={nodeA.x}
                    y1={nodeA.y}
                    x2={nodeB.x}
                    y2={nodeB.y}
                    stroke={active ? "#60a5fa" : "rgba(255,255,255,0.15)"}
                    strokeWidth={active ? 2.5 : 1.5}
                  />
                );
              })}

              {networkNodes.map((node) => {
                const active = activeNodes.has(node.id);

                return (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.isValidator ? 28 : 24}
                      fill={
                        active
                          ? node.isValidator
                            ? "#34d399"
                            : "#3b82f6"
                          : "#0f1629"
                      }
                      stroke={
                        node.isValidator ? "#34d399" : "rgba(255,255,255,0.3)"
                      }
                      strokeWidth={2}
                    />
                    <text
                      x={node.x}
                      y={node.y + 5}
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

            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-500" /> Node thường
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-400" /> Validator
              </span>
            </div>
          </section>

          {/* LOG */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-4 font-semibold text-white">Nhật ký lan truyền</h2>

            <div className="space-y-2">
              {log.length === 0 && (
                <p className="text-sm text-slate-500">
                  Bấm nút mô phỏng để xem transaction lan truyền qua từng
                  node.
                </p>
              )}

              {log.map((entry, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/5 bg-[#050816] px-4 py-2.5 text-xs text-slate-300"
                >
                  {entry}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}