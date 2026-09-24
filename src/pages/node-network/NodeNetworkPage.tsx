import { useEffect, useState } from "react";
import {
  Activity,
  Hammer,
  RefreshCw,
  Send,
  Server,
} from "lucide-react";

import { fullNode } from "../../lib/network/fullNode";

export default function NodeNetworkPage() {
  const [, forceUpdate] = useState(0);
  const [from, setFrom] = useState("Alice");
  const [to, setTo] = useState("Bob");
  const [amount, setAmount] = useState(10);
  const [isMining, setIsMining] = useState(false);
  const [miningAttempts, setMiningAttempts] = useState(0);

  useEffect(() => {
    const unsubscribe = fullNode.subscribe(() => forceUpdate((n) => n + 1));
    fullNode.initialize();
    return unsubscribe;
  }, []);

  const handleCreateTx = () => {
    if (!from.trim() || !to.trim() || amount <= 0) return;
    fullNode.createTransaction(from.trim(), to.trim(), amount);
  };

  const handleMine = async () => {
    setIsMining(true);
    setMiningAttempts(0);
    await fullNode.mineAndBroadcast((attempts) => setMiningAttempts(attempts));
    setIsMining(false);
  };

  const peerList = Array.from(fullNode.peers.values());

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1300px]">

        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            <Server size={16} />
            Full Node Network
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Multi-Node Simulator
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Mở trang này ở <strong className="text-white">2-3 tab trình duyệt khác nhau</strong> —
            mỗi tab là 1 Full Node độc lập, tự đồng bộ với nhau qua BroadcastChannel.
          </p>
        </div>

        {/* NODE INFO */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <InfoCard label="Node ID (tab này)" value={fullNode.id} accent="text-blue-400" />
          <InfoCard label="Chain Height" value={fullNode.chain.length - 1} accent="text-emerald-400" />
          <InfoCard label="Tổng công việc PoW" value={fullNode.getTotalWork().toLocaleString()} accent="text-orange-400" />
          <InfoCard label="Mempool" value={fullNode.mempool.length} accent="text-yellow-400" />
          <InfoCard label="Node khác đang thấy" value={peerList.length} accent="text-purple-400" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* CREATE TX + MINE */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-4 font-semibold text-white">Tạo & Mine</h2>

            <div className="mb-4 space-y-2">
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="From"
                className="w-full rounded-xl border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white outline-none"
              />
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="To"
                className="w-full rounded-xl border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white outline-none"
              />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white outline-none"
              />
            </div>

            <button
              onClick={handleCreateTx}
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              <Send size={15} />
              Tạo giao dịch
            </button>

            <button
              onClick={handleMine}
              disabled={isMining || fullNode.mempool.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:opacity-40"
            >
              {isMining ? <RefreshCw size={15} className="animate-spin" /> : <Hammer size={15} />}
              {isMining ? `Đang mine... (${miningAttempts})` : `Mine Block (${fullNode.mempool.length} tx)`}
            </button>
          </section>

          {/* PEERS */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-4 font-semibold text-white">Các Node trong mạng</h2>

            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-xl border border-blue-400/20 bg-blue-400/10 px-4 py-2.5 text-sm">
                <span className="text-blue-300">{fullNode.id} (bạn)</span>
                <span className="text-slate-400">Height {fullNode.chain.length - 1}</span>
              </div>

              {peerList.length === 0 && (
                <p className="text-sm text-slate-500">
                  Chưa thấy Node nào khác. Mở thêm tab mới cùng trang này để test.
                </p>
              )}

              {peerList.map((peer) => (
                <div
                  key={peer.nodeId}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-[#050816] px-4 py-2.5 text-sm"
                >
                  <span className="text-slate-300">{peer.nodeId}</span>
                  <span className="text-slate-500">Height {peer.height}</span>
                </div>
              ))}
            </div>
          </section>

          {/* LOG */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-4 flex items-center gap-2">
              <Activity size={16} className="text-slate-400" />
              <h2 className="font-semibold text-white">Nhật ký Node</h2>
            </div>

            <div className="max-h-[400px] space-y-2 overflow-y-auto">
              {fullNode.log.length === 0 && (
                <p className="text-sm text-slate-500">Chưa có hoạt động nào.</p>
              )}

              {fullNode.log.map((entry, i) => (
                <div
                  key={i}
                  className={`rounded-lg border px-3 py-2 text-xs ${
                    entry.kind === "success"
                        ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-300"
                        : entry.kind === "error"
                        ? "border-red-400/20 bg-red-400/5 text-red-300"
                        : entry.kind === "fork"
                        ? "border-purple-400/30 bg-purple-400/10 text-purple-300"
                        : "border-white/5 bg-[#050816] text-slate-400"
                    }`}
                >
                  {entry.message}
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className={`text-2xl font-bold ${accent}`}>{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}