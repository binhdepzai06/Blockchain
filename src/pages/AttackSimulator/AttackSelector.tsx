import {
  CircleAlert,
  Coins,
  Network,
  ShieldAlert,
  Zap,
} from "lucide-react";

import type { AttackType } from "../../types/attack";
import { ATTACK_DEFINITIONS } from "../../simulation/attacks/attackTypes";

interface Props {
  selected: AttackType;
  onSelect: (type: AttackType) => void;
}

const icons = {
  "51_PERCENT": ShieldAlert,
  DOUBLE_SPEND: Coins,
  SYBIL: Network,
  ECLIPSE: CircleAlert,
  SELFISH_MINING: Zap,
};

export default function AttackSelector({
  selected,
  onSelect,
}: Props) {
  return (
    <aside className="w-full lg:w-[310px]">
      <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-4">
        <div className="mb-4">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">
            Phòng Lab An Ninh
          </div>

          <h2 className="mt-1 text-lg font-bold text-white">
            Chọn kịch bản tấn công
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Mỗi kịch bản mô phỏng 1 cách kẻ xấu có thể
            tìm cách phá vỡ blockchain.
          </p>
        </div>

        <div className="space-y-2">
          {ATTACK_DEFINITIONS.map((attack) => {
            const Icon = icons[attack.id];

            const active =
              selected === attack.id;

            return (
              <button
                key={attack.id}
                type="button"
                onClick={() =>
                  onSelect(attack.id)
                }
                className={`group w-full rounded-2xl border p-3 text-left transition ${
                  active
                    ? "border-blue-400/30 bg-blue-500/10"
                    : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      active
                        ? "bg-blue-500/15 text-blue-300"
                        : "bg-white/5 text-slate-500 group-hover:text-slate-300"
                    }`}
                  >
                    <Icon size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-white">
                        {attack.name}
                      </span>

                      <span className="text-[9px] uppercase tracking-wider text-slate-600">
                        {attack.difficulty}
                      </span>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {attack.description}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-lg bg-white/5 px-2 py-1 text-[9px] uppercase tracking-wider text-slate-500">
                        {attack.category}
                      </span>

                      <span className="rounded-lg bg-red-500/5 px-2 py-1 text-[9px] uppercase tracking-wider text-red-400/70">
                        {attack.danger}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}