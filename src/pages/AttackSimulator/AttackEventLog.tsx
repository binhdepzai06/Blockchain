import type { AttackEvent } from "../../types/attack";

interface Props {
  events: AttackEvent[];
}

function eventColor(
  type: AttackEvent["type"],
) {
  switch (type) {
    case "SUCCESS":
      return "text-emerald-300";

    case "WARNING":
      return "text-amber-300";

    case "ERROR":
      return "text-red-300";

    case "ACTION":
      return "text-blue-300";

    default:
      return "text-slate-400";
  }
}

export default function AttackEventLog({
  events,
}: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Runtime Events
          </div>

          <h3 className="mt-1 text-lg font-bold text-white">
            Live Event Log
          </h3>
        </div>

        <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-slate-500">
          {events.length} events
        </span>
      </div>

      <div className="max-h-[280px] space-y-1 overflow-y-auto pr-1">
        {events
          .slice()
          .reverse()
          .map((event) => (
            <div
              key={event.id}
              className="flex gap-3 rounded-xl border border-transparent px-3 py-2 transition hover:border-white/5 hover:bg-white/[0.02]"
            >
              <span className="shrink-0 font-mono text-[10px] text-slate-600">
                {new Date(
                  event.timestamp,
                ).toLocaleTimeString(
                  "vi-VN",
                )}
              </span>

              <span
                className={`text-xs ${eventColor(
                  event.type,
                )}`}
              >
                {event.message}
              </span>
            </div>
          ))}
      </div>
    </section>
  );
}