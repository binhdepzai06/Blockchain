import { Check, ChevronRight, Hash, GitBranch, ShieldCheck } from "lucide-react";

interface MerkleExplanationProps {
  selectedHash: string | null;
  selectedLevel: number | null;
  selectedNodeIndex: number | null;
  levels: string[][];
}

export default function MerkleExplanation({
  selectedHash,
  selectedLevel,
  selectedNodeIndex,
  levels,
}: MerkleExplanationProps) {
  const isRoot = selectedLevel === levels.length - 1;
  const left =
    selectedLevel !== null && selectedLevel > 0
      ? levels[selectedLevel - 1]?.[selectedNodeIndex! * 2]
      : null;
  const right =
    selectedLevel !== null && selectedLevel > 0
      ? levels[selectedLevel - 1]?.[selectedNodeIndex! * 2 + 1] ??
        left
      : null;

  return (
    <aside className="rounded-[28px] border border-white/10 bg-[#070b16]">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Hash size={16} className="text-cyan-400" />
          Chi tiết node
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Chọn một node trên cây để xem cách nó được tạo.
        </p>
      </div>

      {!selectedHash ? (
        <div className="flex min-h-[250px] flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <GitBranch size={22} className="text-slate-600" />
          </div>
          <p className="text-sm text-slate-400">Chưa chọn node</p>
          <p className="mt-1 max-w-[230px] text-xs leading-5 text-slate-600">
            Nhấn vào bất kỳ hash nào trên cây để xem quan hệ giữa các node.
          </p>
        </div>
      ) : (
        <div className="space-y-5 p-5">
          <div>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
              {isRoot ? "Merkle Root" : `Level ${selectedLevel}`}
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-4 font-mono text-xs leading-5 text-cyan-200">
              {selectedHash}
            </div>
          </div>

          {selectedLevel === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-white">
                <Check size={14} className="text-emerald-400" />
                Hash lá
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Đây là H1, H2, H3... tương ứng với T1, T2, T3... Mỗi giao dịch được băm bằng SHA-256 để tạo hash lá.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-slate-600">
                  <span className="h-px flex-1 bg-white/10" />
                  Hash đầu vào
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <HashRow label="TRÁI" hash={left} />
                <HashRow label="PHẢI" hash={right} duplicated={right === left} />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Công thức
                </div>
                <div className="font-mono text-[11px] leading-5 text-slate-400">
                  SHA-256(
                  <span className="text-cyan-300">{left?.slice(0, 10)}...</span>
                  {" + "}
                  <span className="text-cyan-300">{right?.slice(0, 10)}...</span>
                  )
                </div>
              </div>
            </>
          )}

          {isRoot && (
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4">
              <ShieldCheck size={17} className="mt-0.5 shrink-0 text-emerald-400" />
              <div>
                <div className="text-xs font-semibold text-emerald-300">
                  Dấu vân tay duy nhất
                </div>
                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  Root đại diện cho toàn bộ tập transaction trong block.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-[10px] text-slate-600">
            <ChevronRight size={12} />
            Thay đổi một giao dịch → hash lá và các hash cha trên đường đi cũng thay đổi.
          </div>
        </div>
      )}
    </aside>
  );
}

function HashRow({
  label,
  hash,
  duplicated,
}: {
  label: string;
  hash: string | null;
  duplicated?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/10 p-3">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[9px] font-semibold tracking-wider text-slate-600">
          {label}
        </span>
        {duplicated && (
          <span className="text-[9px] text-amber-400/80">gấp đôi</span>
        )}
      </div>
      <div className="break-all font-mono text-[10px] leading-4 text-slate-400">
        {hash ?? "—"}
      </div>
    </div>
  );
}
