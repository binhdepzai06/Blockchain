import type { SimulatedBlock } from "../../types/attack";

interface Props {
  publicChain: SimulatedBlock[];
  privateChain: SimulatedBlock[];
}

function Block({
  block,
  privateBlock = false,
}: {
  block: SimulatedBlock;
  privateBlock?: boolean;
}) {
  return (
    <div
      className={`min-w-[125px] rounded-2xl border p-3 ${
        privateBlock
          ? "border-red-400/20 bg-red-500/5"
          : block.miner === "ATTACKER"
            ? "border-red-400/20 bg-red-500/5"
            : "border-blue-400/15 bg-blue-500/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-widest text-slate-500">
          Block
        </span>

        <span className="text-xs font-bold text-white">
          #{block.height}
        </span>
      </div>

      <div className="mt-2 font-mono text-[10px] text-blue-300">
        {block.hash}
      </div>

      <div className="mt-2 flex items-center justify-between text-[9px] text-slate-500">
        <span>
          {block.miner === "ATTACKER"
            ? "ATTACKER"
            : "HONEST"}
        </span>

        <span>
          {privateBlock
            ? "PRIVATE"
            : "PUBLIC"}
        </span>
      </div>
    </div>
  );
}

export default function BlockchainTimeline({
  publicChain,
  privateChain,
}: Props) {
  const visiblePublic =
    publicChain.slice(-6);

  const visiblePrivate =
    privateChain.slice(-6);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">
      <div className="mb-5">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
          Blockchain State
        </div>

        <h3 className="mt-1 text-lg font-bold text-white">
          Chain Timeline
        </h3>
      </div>

      <div className="space-y-5">
        {/* PUBLIC */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-400" />

            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Public Chain
            </span>

            <span className="text-[10px] text-slate-600">
              {publicChain.length} blocks
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {visiblePublic.map((block) => (
              <Block
                key={`${block.id}-public`}
                block={block}
              />
            ))}
          </div>
        </div>

        {/* PRIVATE */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500" />

            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Attacker Private Chain
            </span>

            <span className="text-[10px] text-slate-600">
              {privateChain.length} blocks
            </span>
          </div>

          <div className="flex min-h-[92px] gap-2 overflow-x-auto rounded-2xl border border-dashed border-red-400/10 bg-red-500/[0.02] p-2">
            {visiblePrivate.length === 0 ? (
              <div className="flex items-center px-3 text-xs text-slate-600">
                No private blocks yet.
              </div>
            ) : (
              visiblePrivate.map((block) => (
                <Block
                  key={`${block.id}-private`}
                  block={block}
                  privateBlock
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}