import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  PackagePlus,
  Send,
  Wallet,
} from "lucide-react";

import { blockchain } from "../../lib/blockchain/instance";
import {
  createTransaction,
  transactionPool,
} from "../../lib/blockchain/transaction";
import type { Transaction } from "../../types/transaction";

export default function TransactionPage() {
  const [pending, setPending] = useState<Transaction[]>([]);
  const [confirmed, setConfirmed] = useState<Transaction[]>([]);

  const [from, setFrom] = useState("Alice");
  const [to, setTo] = useState("Bob");
  const [amount, setAmount] = useState(10);

  const refresh = () => {
    setPending(transactionPool.getPending());

    const allConfirmed = blockchain.chain
      .flatMap((block) => block.transactions)
      .filter((tx) => tx);

    setConfirmed(allConfirmed);
  };

  useEffect(() => {
  const init = async () => {
    await blockchain.initialize();
    refresh();
  };

  init();
}, []);

  const handleCreateTransaction = () => {
    if (!from.trim() || !to.trim() || amount <= 0) {
      return;
    }

    const tx = createTransaction(from.trim(), to.trim(), amount);

    transactionPool.add(tx);

    refresh();
  };

  const handleMineBlock = async () => {
    const txs = transactionPool.getPending();

    if (txs.length === 0) {
      return;
    }

    await blockchain.addBlock(txs);

    transactionPool.clear();

    refresh();
  };

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1300px]">

        {/* HEADER */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            <Send size={16} />
            Transaction Laboratory
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Transaction Pool
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Tạo giao dịch, đưa vào Transaction Pool, sau đó "mine" chúng vào
            một Block thật trên Blockchain.
          </p>
        </div>

        {/* CREATE FORM */}
        <section className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
              <Wallet size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-white">
                Create New Transaction
              </h2>
              <p className="text-sm text-slate-500">
                Nhập người gửi, người nhận và số lượng
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Từ (From)"
              className="rounded-2xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-400/50"
            />
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Đến (To)"
              className="rounded-2xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-400/50"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Số lượng"
              className="rounded-2xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-400/50"
            />
            <button
              onClick={handleCreateTransaction}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01]"
            >
              <Send size={16} />
              Tạo giao dịch
            </button>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* PENDING POOL */}
          <section className="rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.03] p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                  <Clock size={20} />
                </div>
                <div>
                  <h2 className="font-semibold text-white">
                    Pending ({pending.length})
                  </h2>
                  <p className="text-sm text-slate-500">
                    Chưa được đưa vào Block
                  </p>
                </div>
              </div>

              {pending.length > 0 && (
                <button
                  onClick={handleMineBlock}
                  className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-400/20"
                >
                  <PackagePlus size={14} />
                  Mine vào Block
                </button>
              )}
            </div>

            <div className="space-y-3">
              {pending.length === 0 && (
                <p className="text-sm text-slate-500">
                  Chưa có giao dịch nào đang chờ.
                </p>
              )}

              {pending.map((tx) => (
                <TransactionRow key={tx.id} tx={tx} />
              ))}
            </div>
          </section>

          {/* CONFIRMED */}
          <section className="rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.03] p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h2 className="font-semibold text-white">
                  Confirmed ({confirmed.length})
                </h2>
                <p className="text-sm text-slate-500">
                  Đã nằm trong Blockchain
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {confirmed.length === 0 && (
                <p className="text-sm text-slate-500">
                  Chưa có giao dịch nào được xác nhận.
                </p>
              )}

              {confirmed.map((tx) => (
                <TransactionRow key={tx.id} tx={tx} confirmed />
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

function TransactionRow({
  tx,
  confirmed = false,
}: {
  tx: Transaction;
  confirmed?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#050816] px-4 py-3">
      <div className="flex items-center gap-3 text-sm">
        <span className="font-medium text-white">{tx.from}</span>
        <ArrowRight size={14} className="text-slate-600" />
        <span className="font-medium text-white">{tx.to}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-blue-300">{tx.amount}</span>
        {confirmed && <CheckCircle2 size={14} className="text-emerald-400" />}
      </div>
    </div>
  );
}