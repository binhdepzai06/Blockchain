import { useMemo } from "react";
import { GitBranch, Layers3 } from "lucide-react";

interface MerkleTreeProps {
  levels: string[][];
  selectedHash: string | null;
  tamperedHashes: Set<string>;
  visibleLevels: number;
  onSelect: (hash: string, levelIndex: number, nodeIndex: number) => void;
}

export default function MerkleTree({
  levels,
  selectedHash,
  tamperedHashes,
  visibleLevels,
  onSelect,
}: MerkleTreeProps) {
  const displayLevels = useMemo(
    () => levels.slice(0, Math.max(1, visibleLevels)),
    [levels, visibleLevels]
  );

  const totalLeaves = levels[0]?.length ?? 0;

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#070b16]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <GitBranch size={16} className="text-cyan-400" />
            Cây Merkle
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {totalLeaves} giao dịch · Cây băm SHA-256
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-slate-400">
          <Layers3 size={13} />
          Tầng {displayLevels.length}/{levels.length}
        </div>
      </div>

      <div className="relative overflow-x-auto px-4 py-8 md:px-8">
        <div className="mx-auto flex min-w-[680px] flex-col gap-7">
          {displayLevels
            .map((level, levelIndex) => ({ level, levelIndex }))
            .reverse()
            .map(({ level, levelIndex }) => {
              const isRoot = levelIndex === levels.length - 1;
              const label =
                isRoot
                  ? "ROOT"
                  : levelIndex === 0
                    ? "LÁ — HASH GIAO DỊCH"
                    : `TẦNG ${levelIndex}`;

              return (
                <div key={levelIndex} className="relative">
                  <div className="mb-3 flex items-center justify-center gap-2">
                    <span className="h-px w-8 bg-white/10" />
                    <span className="text-[10px] font-semibold tracking-[0.18em] text-slate-600">
                      {label}
                    </span>
                    <span className="h-px w-8 bg-white/10" />
                  </div>

                  <div className="flex justify-center gap-3">
                    {level.map((hash, nodeIndex) => {
                      const selected = selectedHash === hash;
                      const tampered = tamperedHashes.has(hash);
                      const duplicated =
                        levelIndex > 0 &&
                        levels[levelIndex - 1]?.length % 2 === 1 &&
                        nodeIndex === level.length - 1 &&
                        levels[levelIndex - 1]?.length > 1;

                      return (
                        <button
                          key={`${levelIndex}-${nodeIndex}-${hash}`}
                          onClick={() => onSelect(hash, levelIndex, nodeIndex)}
                          className={`group relative w-[132px] shrink-0 rounded-2xl border p-3 text-left transition-all duration-200 ${
                            selected
                              ? "border-cyan-400/60 bg-cyan-400/[0.08] shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
                              : tampered
                                ? "border-red-400/50 bg-red-400/[0.07]"
                                : isRoot
                                  ? "border-emerald-400/30 bg-emerald-400/[0.06] hover:border-emerald-300/60"
                                  : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]"
                          }`}
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span
                              className={`text-[9px] font-semibold tracking-wider ${
                                isRoot
                                  ? "text-emerald-400"
                                  : tampered
                                    ? "text-red-400"
                                    : "text-slate-600"
                              }`}
                            >
                              {isRoot ? "MERKLE ROOT" : getNodeLabel(levelIndex, nodeIndex, levels)}
                            </span>
                            {tampered && (
                              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                            )}
                          </div>

                          <div className="break-all font-mono text-[10px] leading-4 text-slate-300">
                            {hash.slice(0, 18)}...
                          </div>

                          {duplicated && (
                            <div className="mt-2 text-[9px] text-amber-400/80">
                              Gấp đôi hash cuối
                            </div>
                          )}

                          <div className="mt-2 text-[9px] text-slate-600 transition group-hover:text-slate-400">
                            Nhấn để xem chi tiết
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}


function getNodeLabel(levelIndex: number, nodeIndex: number, levels: string[][]) {
  if (levelIndex === 0) return `H${nodeIndex + 1}`;

  const childStart = nodeIndex * 2;
  const leftLabel = getNodeLabel(levelIndex - 1, childStart, levels);
  const rightIndex = childStart + 1;
  const rightLabel =
    rightIndex < (levels[levelIndex - 1]?.length ?? 0)
      ? getNodeLabel(levelIndex - 1, rightIndex, levels)
      : leftLabel;

  const compact = `${leftLabel.replace(/^H/, "")}${rightLabel.replace(/^H/, "")}`;
  return `H${compact}`;
}
