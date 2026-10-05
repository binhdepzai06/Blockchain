import { useEffect, useState } from "react";
import {
  Blocks,
  CheckCircle2,
  Database,
  Hammer,
  Link2,
  RefreshCw,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { blockchain } from "../../lib/blockchain/instance";
import type { Block } from "../../types/blockchain";

const DIFFICULTY_OPTIONS = [1, 2, 3, 4, 5];

export default function BlockchainPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [difficulty, setDifficulty] = useState(blockchain.difficulty);
  const [isMining, setIsMining] = useState(false);
  const [miningAttempts, setMiningAttempts] = useState(0);

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

    // Lắng nghe blockchain dùng chung: nếu Block mới được mine từ trang
    // Transaction (hoặc tab khác đang mở), trang này tự cập nhật theo,
    // không cần F5.
    const unsubscribe = blockchain.subscribe(() => {
      refreshBlockchain();
    });

    return unsubscribe;
  }, []);

  const changeDifficulty = (value: number) => {
    setDifficulty(value);
    blockchain.setDifficulty(value);
  };

  const mineBlock = async () => {
    if (isMining) {
      return;
    }

    const blockData = data.trim() || `Block data ${blocks.length}`;

    setIsMining(true);
    setMiningAttempts(0);

    try {
      // Block rỗng (không giao dịch) — trang này chỉ để minh họa
      // hash-chain + PoW, giao dịch thật được tạo ở trang Transaction.
      await blockchain.mineBlock([], blockData, (attempts) => {
        setMiningAttempts(attempts);
      });

      setData("");

      await validateBlockchain();
    } finally {
      setIsMining(false);
    }
  };

  const editBlockData = (index: number, newData: string) => {
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
                Mine New Block
              </h2>

              <p className="text-sm text-slate-500">
                Tìm một Nonce sao cho Hash bắt đầu bằng {difficulty} số 0
                (Proof-of-Work thật, không phải giả lập)
              </p>
            </div>

          </div>

          {/* DIFFICULTY */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs uppercase tracking-wider text-slate-500">
              Difficulty
            </span>

            {DIFFICULTY_OPTIONS.map((level) => (
              <button
                key={level}
                onClick={() => changeDifficulty(level)}
                disabled={isMining}
                className={`h-9 w-9 rounded-xl text-sm font-semibold transition ${
                  difficulty === level
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 md:flex-row">

            <input
              value={data}
              onChange={(event) =>
                setData(event.target.value)
              }
              disabled={isMining}
              placeholder="Nhập dữ liệu cho Block..."
              className="flex-1 rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-400/50 disabled:opacity-60"
            />

            <button
              onClick={mineBlock}
              disabled={isMining}
              className="flex min-w-[190px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isMining ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Mining... ({miningAttempts.toLocaleString()})
                </>
              ) : (
                <>
                  <Hammer size={18} />
                  Mine Block
                </>
              )}
            </button>

          </div>

        </section>

        {/* HEADER vs BODY */}
        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-sm leading-6 text-slate-400">
          <div className="mb-2 font-semibold text-white">
            Block Header vs Block Body
          </div>
          <p>
            <span className="text-blue-300">Hash của Block = SHA-256(Header)</span>{" "}
            với Header gồm version, previousHash, merkleRoot, timestamp,
            difficulty, nonce (và dataHash cho ghi chú tự do). Body (danh sách
            giao dịch, blockHeight, transactionCount) <em>không</em> được băm
            trực tiếp: giao dịch được bảo vệ gián tiếp qua{" "}
            <span className="text-blue-300">merkleRoot</span>, nên sửa giao dịch
            thì Root khác và Block INVALID. Hai trường{" "}
            <span className="text-slate-300">blockHeight / transactionCount</span>{" "}
            chỉ là metadata để tra cứu, đồng bộ và hiển thị nhanh — node luôn tự
            kiểm tra lại chứ không tin chúng.
          </p>
        </section>

        {/* BLOCKCHAIN */}
        <div className="space-y-5">

          {blocks.map((block, index) => (
            <BlockCard
              key={block.index}
              block={block}
              chain={blocks}
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
  chain: Block[];
  index: number;
  onEdit: (index: number, data: string) => void;
  onRecalculate: (index: number) => void;
}

function BlockCard({
  block,
  chain,
  index,
  onEdit,
  onRecalculate,
}: BlockCardProps) {
  const [ownValid, setOwnValid] = useState(true);
  const [brokenFrom, setBrokenFrom] = useState(-1);

  // Block chỉ thực sự hợp lệ khi chính nó VÀ mọi Block trước nó đều hợp lệ.
  const afterBreak = brokenFrom !== -1 && block.index > brokenFrom;
  const valid = ownValid && !afterBreak;

  useEffect(() => {
    const check = async () => {
      // Dùng đúng logic kiểm tra của engine (bao gồm cả merkleRoot,
      // difficulty và liên kết previousHash) thay vì tự tính hash lại ở
      // UI — tránh 2 công thức hash lệch nhau dẫn tới badge sai.
      const isValidBlock = await blockchain.getBlockValidity(block.index);

      setOwnValid(isValidBlock);
      setBrokenFrom(await blockchain.findFirstInvalidBlock());
    };

    check();
  }, [block, chain]);

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
              {afterBreak
                ? `INVALID — chuỗi đứt từ Block #${brokenFrom}`
                : "INVALID BLOCK"}
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

      {/* HEADER / BODY FIELDS */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-blue-400/15 bg-blue-400/[0.03] p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
            Header (được băm)
          </div>
          <Field label="Version" value={block.version} />
          <Field label="Merkle Root" value={shortHash(block.merkleRoot)} />
          <Field label="Data Hash" value={shortHash(block.dataHash)} />
          <Field label="Timestamp" value={block.timestamp} />
          <Field label="Difficulty" value={block.difficulty ?? 0} />
          <Field label="Nonce" value={block.nonce} />
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#050816] p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Body (cam kết qua Header)
          </div>
          <Field label="Block Height" value={block.index} />
          <Field label="Transaction Count" value={block.transactionCount} />
          <Field label="Transactions thực tế" value={block.transactions.length} />
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-5 flex flex-col justify-between gap-4 border-t border-white/5 pt-5 md:flex-row md:items-center">

        <div className="text-xs text-slate-500">
          Hash = SHA-256(Header)
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

const shortHash = (hash: string) =>
  hash.length > 20 ? `${hash.slice(0, 10)}…${hash.slice(-6)}` : hash;

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between gap-3 py-0.5 font-mono text-xs">
      <span className="text-slate-500">{label}</span>
      <span className="break-all text-right text-slate-300">{value}</span>
    </div>
  );
}
