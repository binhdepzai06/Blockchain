import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CircleHelp,
  GitBranch,
  Play,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import { blockchain } from "../../lib/blockchain/instance";
import { buildMerkleTree } from "../../lib/blockchain/merkle";
import type { Block } from "../../types/blockchain";
import type { Transaction } from "../../types/transaction";
import MerkleExplanation from "./MerkleExplanation";
import MerkleTree from "./MerkleTree";
import MerkleProofPanel from "./MerkleProofPanel";
import TransactionList from "./TransactionList";

export default function MerklePage() {
  const [blockIndex, setBlockIndex] = useState<number | null>(null);
  const [sandboxTxs, setSandboxTxs] = useState<Transaction[]>([]);
  const [levels, setLevels] = useState<string[][]>([]);
  const [root, setRoot] = useState("");
  const [originalRoot, setOriginalRoot] = useState("");
  const [blocksWithTx, setBlocksWithTx] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuilding, setIsBuilding] = useState(false);
  const [visibleLevels, setVisibleLevels] = useState(99);
  const [selectedHash, setSelectedHash] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number | null>(
    null
  );
  const [tamperedIndex, setTamperedIndex] = useState<number | null>(null);
  const [proofIndex, setProofIndex] = useState(0);

  const refreshBlocksWithTx = () => {
    const withTx = blockchain.chain.filter(
      (block) => block.transactions.length > 0
    );
    setBlocksWithTx(withTx);
    return withTx;
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      await blockchain.initialize();
      if (!mounted) return;

      const withTx = refreshBlocksWithTx();

      if (withTx.length > 0) {
        await selectBlock(withTx[0].index);
      }

      if (mounted) setIsLoading(false);
    };

    init();

    const unsubscribe = blockchain.subscribe(refreshBlocksWithTx);

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const selectBlock = async (index: number) => {
    const block = blockchain.chain[index];
    if (!block) return;

    setBlockIndex(index);
    setSandboxTxs(block.transactions);
    setOriginalRoot(block.merkleRoot);
    setTamperedIndex(null);
    setProofIndex(0);
    setSelectedHash(null);
    setSelectedLevel(null);
    setSelectedNodeIndex(null);
    setVisibleLevels(99);

    const result = await buildMerkleTree(block.transactions);
    setLevels(result.levels);
    setRoot(result.root);
  };

  const rebuild = async (transactions: Transaction[], animate = true) => {
    setIsBuilding(true);

    if (animate) {
      setVisibleLevels(1);
      await new Promise((resolve) => setTimeout(resolve, 180));
    }

    const result = await buildMerkleTree(transactions);
    setLevels(result.levels);
    setRoot(result.root);

    if (animate) {
      for (let i = 2; i <= result.levels.length; i++) {
        setVisibleLevels(i);
        await new Promise((resolve) => setTimeout(resolve, 260));
      }
    } else {
      setVisibleLevels(99);
    }

    setIsBuilding(false);
  };

  const editTransaction = async (txIndex: number, newAmount: number) => {
    const updated = sandboxTxs.map((tx, i) =>
      i === txIndex ? { ...tx, amount: newAmount } : tx
    );

    setSandboxTxs(updated);
    setTamperedIndex(
      updated[txIndex]?.amount !== blockchain.chain[blockIndex ?? -1]?.transactions[txIndex]?.amount
        ? txIndex
        : null
    );

    await rebuild(updated, false);
  };

  const simulateTampering = async () => {
    if (sandboxTxs.length === 0) return;

    const targetIndex = sandboxTxs.length > 1 ? 1 : 0;
    const target = sandboxTxs[targetIndex];

    const changedAmount =
      target.amount === 50 ? 75 : target.amount === 5 ? 50 : target.amount + 45;

    const updated = sandboxTxs.map((tx, index) =>
      index === targetIndex ? { ...tx, amount: changedAmount } : tx
    );

    setSandboxTxs(updated);
    setTamperedIndex(targetIndex);
    await rebuild(updated, true);
  };

  const reset = async () => {
    if (blockIndex === null) return;
    await selectBlock(blockIndex);
  };

  const selectNode = (hash: string, levelIndex: number, nodeIndex: number) => {
    setSelectedHash(hash);
    setSelectedLevel(levelIndex);
    setSelectedNodeIndex(nodeIndex);
  };

  const tamperedHashes = useMemo(() => {
    if (tamperedIndex === null || !levels.length) return new Set<string>();

    const set = new Set<string>();
    const leafHash = levels[0]?.[tamperedIndex];
    if (leafHash) set.add(leafHash);

    let nodeIndex = tamperedIndex;
    for (let level = 1; level < levels.length; level++) {
      nodeIndex = Math.floor(nodeIndex / 2);
      const hash = levels[level]?.[nodeIndex];
      if (hash) set.add(hash);
    }

    return set;
  }, [levels, tamperedIndex]);

  // Các node nằm trên đường Merkle Proof của giao dịch đang chọn:
  // chính nó, hash anh em ở mỗi tầng và các node cha lên tới Root.
  const proofNodes = useMemo(() => {
    const set = new Set<string>();
    if (!levels.length || proofIndex >= (levels[0]?.length ?? 0)) return set;

    let index = proofIndex;
    for (let level = 0; level < levels.length; level++) {
      set.add(`${level}-${index}`);
      if (level < levels.length - 1) {
        const sibling = index % 2 === 1 ? index - 1 : index + 1;
        set.add(`${level}-${Math.min(sibling, levels[level].length - 1)}`);
      }
      index = Math.floor(index / 2);
    }
    return set;
  }, [levels, proofIndex]);

  const originalTransactions =
    blockIndex !== null ? (blockchain.chain[blockIndex]?.transactions ?? []) : [];

  const isValid = root === originalRoot;
  const changed = !isValid;
  const txCount = sandboxTxs.length;
  const treeHeight = levels.length;

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-72px)] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <GitBranch className="animate-pulse text-cyan-400" size={20} />
          Đang tạo không gian Cây Merkle...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-7">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              <GitBranch size={13} className="text-cyan-400" />
              Cây Merkle
            </span>
            <span className="text-xs text-slate-700">/</span>
            <span className="text-xs text-slate-600">
              Mô phỏng tính toàn vẹn dữ liệu
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Một thay đổi — một Merkle Root khác.
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Trực quan hóa cách các giao dịch được băm theo từng tầng để tạo ra một Merkle Root duy nhất cho Block.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => rebuild(sandboxTxs, true)}
                disabled={isBuilding || sandboxTxs.length === 0}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Play size={14} />
                Tạo cây
              </button>
              <button
                onClick={simulateTampering}
                disabled={isBuilding || sandboxTxs.length === 0}
                className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-2.5 text-xs font-medium text-red-300 transition hover:bg-red-400/[0.1] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <AlertTriangle size={14} />
                Mô phỏng sửa dữ liệu
              </button>
              <button
                onClick={reset}
                disabled={isBuilding || blockIndex === null}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-slate-500 transition hover:text-white disabled:opacity-40"
              >
                <RotateCcw size={14} />
                Đặt lại
              </button>
            </div>
          </div>
        </header>

        {blocksWithTx.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="mb-5 flex items-center gap-2 overflow-x-auto pb-1">
              {blocksWithTx.map((block) => (
                <button
                  key={block.index}
                  onClick={() => selectBlock(block.index)}
                  className={`shrink-0 rounded-xl border px-3.5 py-2 text-xs transition ${
                    blockIndex === block.index
                      ? "border-cyan-400/30 bg-cyan-400/[0.08] text-cyan-200"
                      : "border-white/10 bg-white/[0.025] text-slate-500 hover:text-slate-200"
                  }`}
                >
                  Block #{block.index}
                  <span className="ml-2 text-[10px] opacity-50">
                    {block.transactions.length} giao dịch
                  </span>
                </button>
              ))}
            </div>

            <section className="mb-5 grid gap-3 sm:grid-cols-3">
              <Metric label="Giao dịch" value={String(txCount)} />
              <Metric label="Số tầng" value={String(treeHeight)} />
              <Metric
                label="Toàn vẹn dữ liệu"
                value={isValid ? "Đã xác minh" : "Đã thay đổi"}
                danger={changed}
              />
            </section>

            <div className="grid gap-5 xl:grid-cols-[330px_minmax(0,1fr)_310px]">
              <TransactionList
                transactions={sandboxTxs}
                onEditAmount={editTransaction}
                tamperedIndex={tamperedIndex}
              />

              <div className="min-w-0">
                <MerkleTree
                  levels={levels}
                  selectedHash={selectedHash}
                  tamperedHashes={tamperedHashes}
                  visibleLevels={visibleLevels}
                  proofNodes={proofNodes}
                  onSelect={selectNode}
                />

                <div
                  className={`mt-4 rounded-[24px] border p-4 ${
                    isValid
                      ? "border-emerald-400/15 bg-emerald-400/[0.04]"
                      : "border-red-400/20 bg-red-400/[0.05]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isValid ? (
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />
                    ) : (
                      <AlertTriangle
                        size={18}
                        className="mt-0.5 shrink-0 text-red-400"
                      />
                    )}
                    <div className="min-w-0">
                      <div
                        className={`text-xs font-semibold ${
                          isValid ? "text-emerald-300" : "text-red-300"
                        }`}
                      >
                        {isValid
                          ? "Merkle Root khớp với Block"
                          : "Merkle Root đã thay đổi — dữ liệu đã bị sửa"}
                      </div>
                      <div className="mt-1 break-all font-mono text-[10px] leading-5 text-slate-500">
                        {root}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <MerkleExplanation
                selectedHash={selectedHash}
                selectedLevel={selectedLevel}
                selectedNodeIndex={selectedNodeIndex}
                levels={levels}
              />
            </div>

            <MerkleProofPanel
              originalTransactions={originalTransactions}
              claimedTransactions={sandboxTxs}
              headerRoot={originalRoot}
              selectedIndex={proofIndex}
              onSelectIndex={setProofIndex}
            />

            <section className="mt-5 rounded-[28px] border border-white/10 bg-[#070b16] p-5 md:p-6">
              <div className="mb-5 flex items-center gap-2">
                <CircleHelp size={16} className="text-cyan-400" />
                <h2 className="text-sm font-semibold text-white">
                  Cách xây dựng Cây Merkle
                </h2>
              </div>

              <div className="grid gap-3 md:grid-cols-4">
                <Step number="01" title="Băm các giao dịch">
                  Mỗi giao dịch được chuyển thành một hash SHA-256: H1, H2, H3...
                </Step>
                <Step number="02" title="Ghép các hash">
                  Hai hash cạnh nhau được ghép thành một cặp. Nếu số hash là lẻ, hash cuối được dùng lại một lần.
                </Step>
                <Step number="03" title="Băm lần nữa">
                  Băm cặp hash để tạo node cha ở tầng trên.
                </Step>
                <Step number="04" title="Tạo Merkle Root">
                  Lặp lại cho đến khi chỉ còn một Merkle Root.
                </Step>
              </div>

              <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:flex-row md:items-center">
                <ShieldCheck size={18} className="shrink-0 text-cyan-400" />
                <p className="text-xs leading-5 text-slate-500">
                  <span className="font-medium text-slate-300">
                    Ý tưởng demo:
                  </span>{" "}
                  sửa một amount ở bên trái rồi quan sát leaf hash, parent
                  hashes và Merkle Root thay đổi. Đây là cách trực quan nhất để
                  giải thích tính toàn vẹn dữ liệu của Cây Merkle.
                </p>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.14em] text-slate-600">
        {label}
      </div>
      <div
        className={`mt-1 text-sm font-semibold ${
          danger ? "text-red-300" : "text-slate-200"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] text-cyan-400">{number}</span>
        <span className="h-px w-8 bg-white/10" />
      </div>
      <div className="text-xs font-semibold text-slate-300">{title}</div>
      <p className="mt-1.5 text-[11px] leading-5 text-slate-600">{children}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[#070b16] p-10 text-center">
      <GitBranch size={26} className="mx-auto text-slate-600" />
      <h2 className="mt-4 text-sm font-semibold text-white">
        Chưa có Block chứa giao dịch
      </h2>
      <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500">
        Hãy tạo và mine một vài giao dịch ở trang Transaction trước. Cây Merkle sẽ tự lấy dữ liệu từ các Block có giao dịch.
      </p>
    </div>
  );
}