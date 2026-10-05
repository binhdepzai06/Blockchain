import { useEffect, useState } from "react";
import {
  Activity,
  Hammer,
  RefreshCw,
  Send,
  Server,
  ShieldAlert,
  Wallet,
} from "lucide-react";

import { fullNode } from "../../lib/network/fullNode";
import {
  buildSignedTransaction,
  createWallet,
  loadWallets,
  signWithWallet,
  txSigningPayload,
  BLOCK_REWARD,
  type WalletRecord,
} from "../../lib/blockchain/wallet";
import type { Transaction } from "../../types/transaction";

const short = (value: string) =>
  value.length > 14 ? `${value.slice(0, 8)}…${value.slice(-4)}` : value;

export default function NodeNetworkPage() {
  const [, forceUpdate] = useState(0);
  const [wallets, setWallets] = useState<WalletRecord[]>(() => loadWallets());
  const [activeAddress, setActiveAddress] = useState(
    () => loadWallets()[0]?.address ?? ""
  );
  const [newName, setNewName] = useState("Alice");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(10);
  const [lastTx, setLastTx] = useState<Transaction | null>(null);
  const [isMining, setIsMining] = useState(false);
  const [miningAttempts, setMiningAttempts] = useState(0);

  useEffect(() => {
    const unsubscribe = fullNode.subscribe(() => forceUpdate((n) => n + 1));
    fullNode.initialize();
    return unsubscribe;
  }, []);

  const active = wallets.find((w) => w.address === activeAddress);
  const receiver = to || wallets.find((w) => w.address !== activeAddress)?.address || "";

  const handleCreateWallet = async () => {
    const wallet = await createWallet(newName);
    setWallets(loadWallets());
    if (!activeAddress) setActiveAddress(wallet.address);
    setNewName(newName === "Alice" ? "Bob" : "Wallet " + (wallets.length + 2));
  };

  // Tx hợp lệ: ký bằng Private Key rồi broadcast
  const handleSend = async () => {
    if (!active || !receiver) return;
    const tx = await buildSignedTransaction(active, receiver, amount);
    setLastTx(tx);
    await fullNode.submitTransaction(tx);
  };

  // Tấn công 1: sửa số tiền SAU KHI đã ký → chữ ký không còn khớp
  const attackTamper = async () => {
    if (!active || !receiver) return;
    const tx = await buildSignedTransaction(active, receiver, amount);
    await fullNode.submitTransaction(
      { ...tx, amount: tx.amount * 10 },
      { forceBroadcast: true }
    );
  };

  // Tấn công 2: giả danh ví khác nhưng không có Private Key của họ
  const attackForge = async () => {
    const victim = wallets.find((w) => w.address !== activeAddress);
    if (!active || !victim) return;
    const unsigned = {
      id: crypto.randomUUID(),
      from: victim.address,
      to: active.address,
      amount,
      timestamp: Date.now(),
    };
    const signature = await signWithWallet(active, txSigningPayload(unsigned));
    await fullNode.submitTransaction(
      { ...unsigned, publicKey: victim.publicKey, signature },
      { forceBroadcast: true }
    );
  };

  // Tấn công 3: gửi lại nguyên Tx đã ký trước đó (replay)
  const attackReplay = async () => {
    if (!lastTx) return;
    await fullNode.submitTransaction(lastTx, { forceBroadcast: true });
  };

  const handleMine = async () => {
    if (!active) return;
    setIsMining(true);
    setMiningAttempts(0);
    await fullNode.mineAndBroadcast(active.address, (attempts) =>
      setMiningAttempts(attempts)
    );
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

          {/* WALLETS */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-4 flex items-center gap-2">
              <Wallet size={16} className="text-blue-300" />
              <h2 className="font-semibold text-white">Ví (Private/Public Key)</h2>
            </div>

            <div className="mb-3 flex gap-2">
              <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Tên ví" className="w-full rounded-xl border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white outline-none" />
              <button onClick={handleCreateWallet} className="shrink-0 rounded-xl bg-blue-500 px-4 text-sm font-semibold text-white">Tạo</button>
            </div>

            <div className="space-y-2">
              {wallets.length === 0 && (
                <p className="text-sm text-slate-500">Chưa có ví. Tạo ví Alice và Bob để bắt đầu.</p>
              )}
              {wallets.map((w) => (
                <button
                  key={w.address}
                  onClick={() => setActiveAddress(w.address)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-left text-sm ${
                    w.address === activeAddress
                      ? "border-blue-400/40 bg-blue-400/10"
                      : "border-white/5 bg-[#050816]"
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="font-semibold text-white">{w.name}</span>
                    <span className="text-emerald-300">{fullNode.getConfirmedBalance(w.address)} coin</span>
                  </div>
                  <div className="font-mono text-xs text-slate-500">{short(w.address)} · khả dụng {fullNode.getAvailableBalance(w.address)}</div>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Ví lưu trong localStorage nên dùng chung giữa các tab (mỗi tab = 1 Node).
            </p>
          </section>

          {/* SIGN + SEND + MINE */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-4 font-semibold text-white">Ký, gửi & Mine</h2>

            <div className="mb-4 space-y-2">
              <div className="text-xs text-slate-400">Người gửi: <span className="text-white">{active?.name ?? "—"}</span></div>
              <select value={receiver} onChange={(e) => setTo(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white outline-none">
                {wallets.filter((w) => w.address !== activeAddress).map((w) => (
                  <option key={w.address} value={w.address}>{w.name} ({short(w.address)})</option>
                ))}
              </select>
              <input type="number" min={1} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full rounded-xl border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white outline-none" />
            </div>

            <button onClick={handleSend} disabled={!active || !receiver} className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 disabled:opacity-40">
              <Send size={15} /> Ký & Broadcast giao dịch
            </button>

            <button
              onClick={handleMine}
              disabled={isMining || !active}
              className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:opacity-40"
            >
              {isMining ? <RefreshCw size={15} className="animate-spin" /> : <Hammer size={15} />}
              {isMining ? `Đang mine... (${miningAttempts})` : `Mine Block (${fullNode.mempool.length} tx + ${BLOCK_REWARD} thưởng)`}
            </button>

            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-red-300">
              <ShieldAlert size={14} /> Mô phỏng tấn công
            </div>
            <button onClick={attackTamper} disabled={!active || !receiver} className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/5 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-400/10 disabled:opacity-40">Sửa số tiền ×10 sau khi ký</button>
            <button onClick={attackForge} disabled={wallets.length < 2 || !active} className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/5 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-400/10 disabled:opacity-40">Giả danh ví khác (không có Private Key)</button>
            <button onClick={attackReplay} disabled={!lastTx} className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/5 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-400/10 disabled:opacity-40">Gửi lại Tx cũ (replay)</button>
            <p className="text-xs text-slate-500">Gửi 2 Tx mỗi cái &gt; nửa số dư để thử double-spend.</p>
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

          {/* MEMPOOL + AUDIT */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
            <h2 className="mb-3 font-semibold text-white">Mempool ({fullNode.mempool.length})</h2>
            <div className="mb-6 max-h-40 space-y-2 overflow-y-auto">
              {fullNode.mempool.length === 0 && (
                <p className="text-sm text-slate-500">Mempool trống.</p>
              )}
              {fullNode.mempool.map((tx) => (
                <div key={tx.id} className="rounded-xl border border-white/5 bg-[#050816] px-3 py-2 font-mono text-xs text-slate-300">
                  {short(tx.from)} → {short(tx.to)} · <span className="text-emerald-300">{tx.amount}</span> · sig {short(tx.signature ?? "")}
                </div>
              ))}
            </div>

            <h2 className="mb-3 font-semibold text-white">Kiểm tra giao dịch (từng bước)</h2>
            <div className="max-h-72 space-y-3 overflow-y-auto">
              {fullNode.txAudit.length === 0 && (
                <p className="text-sm text-slate-500">Chưa có giao dịch nào được kiểm tra.</p>
              )}
              {fullNode.txAudit.map((entry) => (
                <div
                  key={entry.time + String(entry.tx?.id)}
                  className={`rounded-xl border p-3 text-xs ${
                    entry.result.valid
                      ? "border-emerald-400/20 bg-emerald-400/5"
                      : "border-red-400/20 bg-red-400/5"
                  }`}
                >
                  <div className="mb-2 font-semibold text-white">
                    {entry.result.valid ? "VALID → Mempool" : "REJECT"} · {entry.origin === "local" ? "tạo tại node này" : "nhận từ mạng"} · {entry.tx?.amount}
                  </div>
                  {entry.result.checks.map((c) => (
                    <div key={c.name} className={c.ok ? "text-emerald-300" : "text-red-300"}>
                      {c.ok ? "✔" : "✘"} {c.name}: <span className="text-slate-400">{c.detail}</span>
                    </div>
                  ))}
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