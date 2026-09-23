import { useEffect, useState } from "react";
import {
  Blocks,
  CheckCircle2,
  Database,
  Link2,
  Plus,
  RefreshCw,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { blockchain } from "../../lib/blockchain/instance";
import type { Block } from "../../types/blockchain";

export default function BlockchainPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const refreshBlockchain = () => {
    setBlocks([...blockchain.chain]);
  };

  const validateBlockchain = async () => {
    const valid = await blockchain.isChainValid();

    setIsValid(valid);
    refreshBlockchain();
  };

  useEffect(() => {
    const initialize = async () => {
      await blockchain.initialize();

      refreshBlockchain();

      setIsLoading(false);
    };

    initialize();
  }, []);

  const addBlock = async () => {
  const blockData =
    data.trim() || `Block data ${blocks.length}`;

  await blockchain.addBlock([], blockData);

  setData("");

  await validateBlockchain();
};

  const editBlockData = (
  index: number,
  newData: string
) => {
  const block = blockchain.chain[index];

  if (!block) {
    return;
  }

  blockchain.chain[index] = { ...block, data: newData };

  refreshBlockchain();

  setIsValid(false);
};

  const recalculateHash = async (index: number) => {
    await blockchain.recalculateBlock(index);

    await validateBlockchain();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-72px)] items-center justify-center">
        <div className="text-center">
          <RefreshCw
            className="mx-auto mb-4 animate-spin text-blue-400"
            size={32}
          />

          <p className="text-slate-400">
            Initializing Blockchain...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1300px]">

        {/* HEADER */}
        <div className="mb-8">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-sm text-purple-300">
            <Blocks size={16} />

            Blockchain Laboratory
          </div>

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                Blockchain Simulator
              </h1>

              <p className="mt-4 max-w-3xl leading-7 text-slate-400">
                Xây dựng và quan sát một Blockchain đơn giản.
                Mỗi Block liên kết với Block trước thông qua
                Previous Hash.
              </p>
            </div>

            {/* STATUS */}
            <div
              className={`flex items-center gap-3 rounded-2xl border px-5 py-3 ${
                isValid
                  ? "border-emerald-400/20 bg-emerald-400/10"
                  : "border-red-400/20 bg-red-400/10"
              }`}
            >

              {isValid ? (
                <CheckCircle2
                  size={20}
                  className="text-emerald-400"
                />
              ) : (
                <XCircle
                  size={20}
                  className="text-red-400"
                />
              )}

              <div>
                <div className="text-xs text-slate-500">
                  Blockchain Status
                </div>

                <div
                  className={`font-semibold ${
                    isValid
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {isValid ? "VALID" : "INVALID"}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* CONTROL PANEL */}
        <section className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">

          <div className="mb-5 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
              <Database size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Create New Block
              </h2>

              <p className="text-sm text-slate-500">
                Thêm một Block vào Blockchain
              </p>
            </div>

          </div>

          <div className="flex flex-col gap-3 md:flex-row">

            <input
              value={data}
              onChange={(event) =>
                setData(event.target.value)
              }
              placeholder="Nhập dữ liệu cho Block..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-400/50"
            />

            <button
              onClick={addBlock}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 font-semibold text-white transition hover:scale-[1.01]"
            >
              <Plus size={18} />
              Add Block
            </button>

          </div>

        </section>

        {/* BLOCKCHAIN */}
        <div className="space-y-5">

          {blocks.map((block, index) => (
            <BlockCard
              key={block.index}
              block={block}
              index={index}
              onEdit={editBlockData}
              onRecalculate={recalculateHash}
            />
          ))}

        </div>

        {/* VALIDATE */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.02] p-6">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  Blockchain Validation
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Kiểm tra Hash và Previous Hash của toàn bộ chain.
                </p>
              </div>

            </div>

            <button
              onClick={validateBlockchain}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              <RefreshCw size={17} />
              Validate Blockchain
            </button>

          </div>

        </section>

      </div>
    </div>
  );
}

interface BlockCardProps {
  block: Block;
  index: number;
  onEdit: (index: number, data: string) => void;
  onRecalculate: (index: number) => void;
}

function BlockCard({
  block,
  index,
  onEdit,
  onRecalculate,
}: BlockCardProps) {
  const [valid, setValid] = useState(true);

  useEffect(() => {
    const check = async () => {
      const blockHash = await calculateLocalHash(block);

      setValid(blockHash === block.hash);
    };

    check();
  }, [block]);

  return (
    <div
      className={`relative rounded-3xl border p-6 transition ${
        valid
          ? "border-white/10 bg-white/[0.03]"
          : "border-red-400/30 bg-red-400/[0.04]"
      }`}
    >

      {/* CONNECTOR */}
      {index > 0 && (
        <div className="absolute -top-5 left-1/2 hidden -translate-x-1/2 items-center justify-center md:flex">
          <div className="h-5 w-px bg-white/10" />
        </div>
      )}

      {/* HEADER */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-400/10 font-mono font-bold text-blue-400">
            #{block.index}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Block #{block.index}
            </h3>

            <p className="text-xs text-slate-500">
              {new Date(block.timestamp).toLocaleString()}
            </p>
          </div>

        </div>

        <div
          className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold ${
            valid
              ? "bg-emerald-400/10 text-emerald-400"
              : "bg-red-400/10 text-red-400"
          }`}
        >
          {valid ? (
            <>
              <CheckCircle2 size={15} />
              VALID BLOCK
            </>
          ) : (
            <>
              <XCircle size={15} />
              INVALID BLOCK
            </>
          )}
        </div>

      </div>

      {/* DATA */}
      <div className="grid gap-4 lg:grid-cols-2">

        <div className="rounded-2xl border border-white/10 bg-[#050816] p-5">

          <label className="mb-3 block text-xs uppercase tracking-wider text-slate-500">
            Block Data
          </label>

          <textarea
            value={block.data ?? ""}
            onChange={(event) =>
              onEdit(index, event.target.value)
            }
            className="min-h-[110px] w-full resize-none bg-transparent text-sm leading-6 text-white outline-none"
          />

        </div>

        <div className="space-y-4">

          {/* PREVIOUS HASH */}
          <div className="rounded-2xl border border-white/10 bg-[#050816] p-4">

            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
              <Link2 size={14} />
              Previous Hash
            </div>

            <div className="break-all font-mono text-xs leading-6 text-purple-300">
              {block.previousHash}
            </div>

          </div>

          {/* HASH */}
          <div className="rounded-2xl border border-white/10 bg-[#050816] p-4">

            <div className="mb-2 text-xs uppercase tracking-wider text-slate-500">
              Current Hash
            </div>

            <div
              className={`break-all font-mono text-xs leading-6 ${
                valid
                  ? "text-blue-300"
                  : "text-red-300"
              }`}
            >
              {block.hash}
            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="mt-5 flex flex-col justify-between gap-4 border-t border-white/5 pt-5 md:flex-row md:items-center">

        <div className="flex gap-5 text-xs text-slate-500">

          <span>
            Nonce:
            <strong className="ml-2 text-slate-300">
              {block.nonce}
            </strong>
          </span>

          <span>
            Transactions:
            <strong className="ml-2 text-slate-300">
              {block.transactions.length}
            </strong>
          </span>

        </div>

        <button
          onClick={() => onRecalculate(index)}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
        >
          <RefreshCw size={14} />
          Recalculate Hash
        </button>

      </div>

    </div>
  );
}

async function calculateLocalHash(
  block: Block
): Promise<string> {
  const { sha256 } = await import(
    "../../lib/crypto/hash"
  );

  const blockData = JSON.stringify({
    index: block.index,
    timestamp: block.timestamp,
    transactions: block.transactions,
    previousHash: block.previousHash,
    nonce: block.nonce,
    data: block.data,
  });

  return sha256(blockData);
}