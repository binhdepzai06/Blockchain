import { ArrowDown, ArrowUp, Pencil, ReceiptText } from "lucide-react";
import type { Transaction } from "../../types/transaction";

interface TransactionListProps {
  transactions: Transaction[];
  onEditAmount: (index: number, amount: number) => void;
  tamperedIndex: number | null;
}

export default function TransactionList({
  transactions,
  onEditAmount,
  tamperedIndex,
}: TransactionListProps) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-[#070b16]">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <ReceiptText size={16} className="text-cyan-400" />
          Giao dịch
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Mỗi giao dịch tạo ra một hash lá: H1, H2, H3...
        </p>
      </div>

      <div className="divide-y divide-white/[0.06]">
        {transactions.map((tx, index) => {
          const tampered = tamperedIndex === index;

          return (
            <div
              key={tx.id}
              className={`px-5 py-4 transition ${
                tampered ? "bg-red-400/[0.04]" : "hover:bg-white/[0.02]"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold ${
                      tampered
                        ? "bg-red-400/10 text-red-300"
                        : "bg-white/[0.05] text-slate-400"
                    }`}
                  >
                    T{index + 1}
                  </span>
                  <div>
                    <div className="text-xs font-medium text-slate-200">
                      {tx.from}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-600">
                      <ArrowDown size={10} />
                      {tx.to}
                    </div>
                  </div>
                </div>

                {tampered && (
                  <span className="rounded-full border border-red-400/20 bg-red-400/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-red-300">
                    đã sửa
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <ArrowUp
                    size={12}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={tx.amount}
                    onChange={(e) =>
                      onEditAmount(index, Number(e.target.value))
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/10 py-2.5 pl-8 pr-3 font-mono text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/40"
                  />
                </div>
                <div className="rounded-xl border border-white/10 px-3 py-2.5 text-[10px] text-slate-500">
                  Số lượng
                </div>
                <Pencil size={13} className="text-slate-700" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
