import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  GitBranch,
  RefreshCw,
  XCircle,
} from "lucide-react";

import { blockchain } from "../../lib/blockchain/instance";
import { buildMerkleTree } from "../../lib/blockchain/merkle";
import type { Transaction } from "../../types/transaction";

export default function MerklePage() {
  const [blockIndex, setBlockIndex] = useState<number | null>(null);
  const [sandboxTxs, setSandboxTxs] = useState<Transaction[]>([]);
  const [levels, setLevels] = useState<string[][]>([]);
  const [root, setRoot] = useState("");
  const [originalRoot, setOriginalRoot] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const blocksWithTx = useMemo(
    () => blockchain.chain.filter((b) => b.transactions.length > 0),
    [blockchain.chain.length]
  );

  useEffect(() => {
    const init = async () => {
      await blockchain.initialize();

      const withTx = blockchain.chain.filter(
        (b) => b.transactions.length > 0
      );

      if (withTx.length > 0) {
        await selectBlock(withTx[0].index);
      }

      setIsLoading(false);
    };

    init();
  }, []);

  const selectBlock = async (index: number) => {
    const block = blockchain.chain[index];

    if (!block) return;

    setBlockIndex(index);
    setSandboxTxs(block.transactions);
    setOriginalRoot(block.merkleRoot);

    const result = await buildMerkleTree(block.transactions);
    setLevels(result.levels);
    setRoot(result.root);
  };

  const editTransaction = async (txIndex: number, newAmount: number) => {
    const updated = sandboxTxs.map((tx, i) =>
      i === txIndex ? { ...tx, amount: newAmount } : tx
    );

    setSandboxTxs(updated);

    const result = await buildMerkleTree(updated);
    setLevels(result.levels);
    setRoot(result.root);
  };

  const isValid = root === originalRoot;

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-72px)] items-center justify-center">
        <RefreshCw className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-sm text-purple-300">
            <GitBranch size={16} />
            Merkle Tree Laboratory
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Merkle Tree Visualizer
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Merkle Root tóm tắt toàn bộ giao dịch trong một Block. Chỉ cần
            đổi 1 giao dịch, Merkle Root sẽ thay đổi hoàn toàn.
          </p>
        </div>

        {blocksWithTx.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center text-slate-400">
            Chưa có Block nào chứa giao dịch. Hãy vào trang{" "}
            <span className="text-blue-400">Transaction</span> để tạo và
            mine vài giao dịch trước.
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap gap-2">
              {blocksWithTx.map((b) => (
                <button
                  key={b.index}
                  onClick={() => selectBlock(b.index)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    blockIndex === b.index
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
                  }`}
                >
                  Block #{b.index} ({b.transactions.length} tx)
                </button>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="mb-4 font-semibold text-white">
                  Giao dịch (Leaves)
                </h2>

                <div className="space-y-3">
                  {sandboxTxs.map((tx, i) => (
                    <div
                      key={tx.id}
                      className="rounded-2xl border border-white/5 bg-[#050816] p-3"
                    >
                      <div className="mb-2 text-xs text-slate-500">
                        {tx.from} → {tx.to}
                      </div>
                      <input
                        type="number"
                        value={tx.amount}
                        onChange={(e) =>
                          editTransaction(i, Number(e.target.value))
                        }
                        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-blue-400/50"
                      />
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
                <h2 className="mb-4 font-semibold text-white">Cây Merkle</h2>

                <div className="flex flex-col-reverse gap-4">
                  {levels.map((level, levelIndex) => (
                    <div
                      key={levelIndex}
                      className="flex flex-wrap justify-center gap-2"
                    >
                      {level.map((hash, i) => (
                        <div
                          key={i}
                          className={`rounded-xl border px-3 py-2 font-mono text-[10px] ${
                            levelIndex === levels.length - 1
                              ? isValid
                                ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                                : "border-red-400/40 bg-red-400/10 text-red-300"
                              : "border-white/10 bg-[#050816] text-blue-300"
                          }`}
                        >
                          {hash.slice(0, 16)}...
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div
                  className={`mt-6 flex items-center gap-3 rounded-2xl border px-5 py-4 ${
                    isValid
                      ? "border-emerald-400/20 bg-emerald-400/10"
                      : "border-red-400/20 bg-red-400/10"
                  }`}
                >
                  {isValid ? (
                    <CheckCircle2 size={20} className="text-emerald-400" />
                  ) : (
                    <XCircle size={20} className="text-red-400" />
                  )}

                  <div>
                    <div className="text-xs text-slate-500">
                      {isValid
                        ? "Khớp với Merkle Root gốc của Block"
                        : "KHÔNG khớp — dữ liệu đã bị thay đổi"}
                    </div>
                    <div className="break-all font-mono text-xs text-slate-300">
                      {root}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}