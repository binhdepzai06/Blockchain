import {
  Play,
  RotateCcw,
  Square,
  StepForward,
} from "lucide-react";

import type {
  AttackParameters,
  AttackStatus,
} from "../../types/attack";

interface Props {
  parameters: AttackParameters;
  status: AttackStatus;
  targetNodes: string[];

  onChange: (
    parameters: Partial<AttackParameters>,
  ) => void;

  onStart: () => void;
  onStep: () => void;
  onStop: () => void;
  onReset: () => void;
}

export default function AttackParametersPanel({
  parameters,
  status,
  targetNodes,
  onChange,
  onStart,
  onStep,
  onStop,
  onReset,
}: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Simulation Controls
          </div>

          <h3 className="mt-1 text-lg font-bold text-white">
            Attack Parameters
          </h3>
        </div>

        <div
          className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
            status === "RUNNING"
              ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
              : status === "SUCCESS"
                ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                : "border-white/10 bg-white/5 text-slate-500"
          }`}
        >
          {status}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* HASH POWER */}
        <div>
          <div className="mb-2 flex justify-between">
            <label className="text-xs font-medium text-slate-400">
              Hash Power
            </label>

            <span className="text-xs font-bold text-blue-300">
              {parameters.hashPower}%
            </span>
          </div>

          <input
            type="range"
            min="10"
            max="90"
            value={parameters.hashPower}
            onChange={(event) =>
              onChange({
                hashPower: Number(
                  event.target.value,
                ),
              })
            }
            className="w-full accent-blue-500"
          />
        </div>

        {/* ATTACKER NODES */}
        <div>
          <div className="mb-2 flex justify-between">
            <label className="text-xs font-medium text-slate-400">
              Attacker Nodes
            </label>

            <span className="text-xs font-bold text-purple-300">
              {parameters.attackerNodes}
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="10"
            value={parameters.attackerNodes}
            onChange={(event) =>
              onChange({
                attackerNodes: Number(
                  event.target.value,
                ),
              })
            }
            className="w-full accent-purple-500"
          />
        </div>

        {/* TARGET NODE */}
        <div>
          <label className="mb-2 block text-xs font-medium text-slate-400">
            Target Node
          </label>

          <select
            value={parameters.targetNode}
            onChange={(event) =>
              onChange({
                targetNode: event.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-[#080d20] px-3 py-2.5 text-sm text-slate-200 outline-none"
          >
            {targetNodes.map((node) => (
              <option
                key={node}
                value={node}
              >
                {node}
              </option>
            ))}
          </select>
        </div>

        {/* SPEED */}
        <div>
          <div className="mb-2 flex justify-between">
            <label className="text-xs font-medium text-slate-400">
              Simulation Speed
            </label>

            <span className="text-xs font-bold text-cyan-300">
              {parameters.attackSpeed}x
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="3"
            value={parameters.attackSpeed}
            onChange={(event) =>
              onChange({
                attackSpeed: Number(
                  event.target.value,
                ),
              })
            }
            className="w-full accent-cyan-500"
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onStart}
          disabled={status === "RUNNING"}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Play size={16} />
          Start Attack
        </button>

        <button
          type="button"
          onClick={onStep}
          disabled={status === "SUCCESS"}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 disabled:opacity-40"
        >
          <StepForward size={16} />
          Step
        </button>

        <button
          type="button"
          onClick={onStop}
          disabled={status !== "RUNNING"}
          className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/5 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 disabled:opacity-40"
        >
          <Square size={15} />
          Stop
        </button>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
        >
          <RotateCcw size={15} />
          Reset
        </button>
      </div>
    </section>
  );
}