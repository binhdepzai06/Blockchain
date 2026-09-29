import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Shield,
} from "lucide-react";

import type { AttackState } from "../../types/attack";

interface Props {
  state: AttackState;
}

export default function AttackResult({
  state,
}: Props) {
  const success =
    state.status === "SUCCESS";

  const active =
    state.status === "RUNNING";

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Security Analysis
          </div>

          <h3 className="mt-1 text-lg font-bold text-white">
            Simulation Result
          </h3>
        </div>

        {success ? (
          <CheckCircle2
            size={22}
            className="text-emerald-400"
          />
        ) : active ? (
          <Activity
            size={22}
            className="animate-pulse text-amber-400"
          />
        ) : (
          <Shield
            size={22}
            className="text-slate-500"
          />
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* RESULT */}
        <div className="rounded-2xl border border-white/5 bg-black/10 p-4">
          <div className="text-[10px] uppercase tracking-widest text-slate-600">
            Status
          </div>

          <div className="mt-2 flex items-center gap-2">
            {success ? (
              <CheckCircle2
                size={18}
                className="text-emerald-400"
              />
            ) : active ? (
              <AlertTriangle
                size={18}
                className="text-amber-400"
              />
            ) : (
              <Shield
                size={18}
                className="text-slate-500"
              />
            )}

            <span className="text-lg font-bold text-white">
              {state.resultTitle}
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {state.resultDescription}
          </p>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-2 gap-2">
          <Metric
            label="Attack Progress"
            value={`${state.metrics.attackProgress}%`}
          />

          <Metric
            label="Network Control"
            value={`${state.metrics.networkControl}%`}
          />

          <Metric
            label="Affected Nodes"
            value={String(
              state.metrics.affectedNodes,
            )}
          />

          <Metric
            label="Attacker Blocks"
            value={String(
              state.metrics.attackerBlocks,
            )}
          />
        </div>
      </div>

      {/* EDUCATIONAL NOTE */}
      <div className="mt-4 rounded-2xl border border-blue-400/10 bg-blue-500/[0.04] p-4">
        <div className="text-xs font-semibold text-blue-300">
          Educational Context
        </div>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          Đây là mô phỏng giáo dục. Các hành vi trên
          được thực hiện trong môi trường giả lập
          của CryptoLab nhằm minh họa cơ chế
          blockchain security, không thực hiện
          tấn công vào mạng blockchain thật.
        </p>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-black/10 p-3">
      <div className="text-[9px] uppercase tracking-widest text-slate-600">
        {label}
      </div>

      <div className="mt-1 text-lg font-bold text-white">
        {value}
      </div>
    </div>
  );
}