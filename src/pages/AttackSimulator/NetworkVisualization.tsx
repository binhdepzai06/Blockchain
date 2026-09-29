import type {
  AttackNode,
  NetworkLink,
} from "../../types/attack";

interface Props {
  nodes: AttackNode[];
  links: NetworkLink[];
}

function getNodeColor(node: AttackNode) {
  if (!node.online) {
    return "bg-slate-700";
  }

  if (node.role === "ATTACKER") {
    return "bg-red-500 shadow-[0_0_24px_rgba(239,68,68,0.55)]";
  }

  if (node.role === "TARGET") {
    return "bg-amber-400 shadow-[0_0_24px_rgba(251,191,36,0.55)]";
  }

  return "bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.35)]";
}

export default function NetworkVisualization({
  nodes,
  links,
}: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Live Network
          </div>

          <h3 className="mt-1 text-lg font-bold text-white">
            Peer-to-Peer Topology
          </h3>
        </div>

        <div className="flex gap-3 text-[10px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            Honest
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Attacker
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Target
          </span>
        </div>
      </div>

      <div className="relative h-[390px] overflow-hidden rounded-2xl border border-white/5 bg-[#050816]">
        {/* GRID */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* LINKS */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {links.map((link, index) => {
            const source = nodes.find(
              (node) =>
                node.id === link.source,
            );

            const target = nodes.find(
              (node) =>
                node.id === link.target,
            );

            if (!source || !target) {
              return null;
            }

            return (
              <line
                key={`${link.source}-${link.target}-${index}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={
                  link.attackerControlled
                    ? "rgba(239,68,68,.75)"
                    : "rgba(100,116,139,.35)"
                }
                strokeWidth={
                  link.attackerControlled
                    ? "0.8"
                    : "0.45"
                }
                strokeDasharray={
                  link.attackerControlled
                    ? "2 1"
                    : undefined
                }
              />
            );
          })}
        </svg>

        {/* NODES */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform:
                "translate(-50%, -50%)",
            }}
          >
            <div className="relative flex flex-col items-center">
              <div
                className={`h-5 w-5 rounded-full border-2 border-[#050816] transition-all duration-500 ${getNodeColor(
                  node,
                )}`}
              />

              <div
                className={`mt-1 whitespace-nowrap rounded-md border px-1.5 py-0.5 text-[8px] font-semibold ${
                  node.role === "ATTACKER"
                    ? "border-red-400/20 bg-red-500/10 text-red-300"
                    : node.role === "TARGET"
                      ? "border-amber-400/20 bg-amber-500/10 text-amber-300"
                      : "border-white/5 bg-black/40 text-slate-500"
                }`}
              >
                {node.id}
              </div>
            </div>
          </div>
        ))}

        {/* STATUS */}
        <div className="absolute bottom-3 left-3 rounded-xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md">
          <div className="text-[9px] uppercase tracking-widest text-slate-600">
            Network State
          </div>

          <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            {nodes.length} active nodes
          </div>
        </div>
      </div>
    </section>
  );
}