import { useState } from "react";
import {
  Coins,
  Hammer,
  RefreshCw,
  Scale,
  Trophy,
} from "lucide-react";

import { mineBlock } from "../../lib/consensus/pow";
import {
  getSelectionChance,
  selectValidator,
  type Validator,
} from "../../lib/consensus/pos";
import { consensusComparison } from "../../lib/consensus/comparison";

type Tab = "pow" | "pos" | "compare";

const initialValidators: Validator[] = [
  { name: "Validator A", stake: 1000 },
  { name: "Validator B", stake: 5000 },
  { name: "Validator C", stake: 2500 },
];

export default function ConsensusPage() {
  const [tab, setTab] = useState<Tab>("pow");

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-sm text-orange-300">
            <Scale size={16} />
            Consensus Laboratory
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Proof of Work vs Proof of Stake
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Hai cơ chế đồng thuận phổ biến nhất trong blockchain — thử tự
            đào một Block, hoặc mô phỏng việc chọn Validator theo stake.
          </p>
        </div>

        {/* TABS */}
        <div className="mb-8 flex gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-1.5">
          <TabButton active={tab === "pow"} onClick={() => setTab("pow")} icon={Hammer}>
            Proof of Work
          </TabButton>
          <TabButton active={tab === "pos"} onClick={() => setTab("pos")} icon={Coins}>
            Proof of Stake
          </TabButton>
          <TabButton active={tab === "compare"} onClick={() => setTab("compare")} icon={Scale}>
            So sánh
          </TabButton>
        </div>

        {tab === "pow" && <PowDemo />}
        {tab === "pos" && <PosDemo />}
        {tab === "compare" && <CompareTable />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ size?: number }>;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
        active
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          : "text-slate-400 hover:text-white"
      }`}
    >
      <Icon size={16} />
      {children}
    </button>
  );
}

// ============ POW DEMO ============

function PowDemo() {
  const [difficulty, setDifficulty] = useState(3);
  const [isMining, setIsMining] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [currentHash, setCurrentHash] = useState("");
  const [result, setResult] = useState<{
    nonce: number;
    hash: string;
    attempts: number;
    timeMs: number;
  } | null>(null);

  const startMining = async () => {
    setIsMining(true);
    setResult(null);
    setAttempts(0);

    const mined = await mineBlock("CryptoLab Block Data", difficulty, (a, h) => {
      setAttempts(a);
      setCurrentHash(h);
    });

    setResult(mined);
    setIsMining(false);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="font-semibold text-white">Đào Block (Mining)</h2>
          <p className="text-sm text-slate-500">
            Tìm nonce sao cho hash bắt đầu bằng {difficulty} số 0
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-400">Độ khó:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            disabled={isMining}
            className="rounded-xl border border-white/10 bg-[#050816] px-3 py-2 text-sm text-white outline-none"
          >
            {[1, 2, 3, 4, 5].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <button
            onClick={startMining}
            disabled={isMining}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:opacity-50"
          >
            {isMining ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <Hammer size={16} />
            )}
            {isMining ? "Đang đào..." : "Bắt đầu đào"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-[#050816] p-5">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-slate-500">Số lần thử (nonce)</span>
          <span className="font-mono text-white">{attempts.toLocaleString()}</span>
        </div>

        <div className="break-all font-mono text-xs text-slate-400">
          {currentHash || "..."}
        </div>
      </div>

      {result && (
        <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
          <div className="mb-2 flex items-center gap-2 font-semibold text-emerald-400">
            <Trophy size={18} />
            Đã tìm thấy Block hợp lệ!
          </div>
          <div className="grid gap-2 text-sm text-slate-300 md:grid-cols-3">
            <div>Nonce: <strong className="text-white">{result.nonce}</strong></div>
            <div>Số lần thử: <strong className="text-white">{result.attempts.toLocaleString()}</strong></div>
            <div>Thời gian: <strong className="text-white">{result.timeMs.toFixed(0)}ms</strong></div>
          </div>
          <div className="mt-3 break-all font-mono text-xs text-emerald-300">
            {result.hash}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ POS DEMO ============

function PosDemo() {
  const [validators, setValidators] = useState<Validator[]>(initialValidators);
  const [selected, setSelected] = useState<Validator | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const runSelection = () => {
    const winner = selectValidator(validators);
    setSelected(winner);
    setHistory((prev) => [winner.name, ...prev].slice(0, 10));
  };

  const updateStake = (index: number, stake: number) => {
    setValidators((prev) =>
      prev.map((v, i) => (i === index ? { ...v, stake } : v))
    );
    setSelected(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-5 font-semibold text-white">Validators & Stake</h2>

        <div className="space-y-4">
          {validators.map((v, i) => (
            <div key={v.name} className="rounded-2xl border border-white/5 bg-[#050816] p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-white">{v.name}</span>
                <span className="text-blue-300">
                  {getSelectionChance(v, validators).toFixed(1)}% cơ hội
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={10000}
                step={100}
                value={v.stake}
                onChange={(e) => updateStake(i, Number(e.target.value))}
                className="w-full"
              />
              <div className="mt-1 text-right text-xs text-slate-500">
                Stake: {v.stake.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={runSelection}
          className="mt-5 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 py-3 text-sm font-semibold text-white transition hover:scale-[1.01]"
        >
          Chọn Validator tạo Block tiếp theo
        </button>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-5 font-semibold text-white">Kết quả</h2>

        {selected ? (
          <div className="mb-5 flex items-center gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
            <Trophy size={24} className="text-emerald-400" />
            <div>
              <div className="text-xs text-slate-500">Được chọn tạo Block</div>
              <div className="text-lg font-semibold text-emerald-400">
                {selected.name}
              </div>
            </div>
          </div>
        ) : (
          <p className="mb-5 text-sm text-slate-500">
            Bấm nút bên trái để chạy mô phỏng chọn Validator.
          </p>
        )}

        <div className="text-xs uppercase tracking-wider text-slate-500">
          Lịch sử 10 lần gần nhất
        </div>
        <div className="mt-3 space-y-2">
          {history.length === 0 && (
            <p className="text-sm text-slate-600">Chưa có lịch sử.</p>
          )}
          {history.map((name, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-[#050816] px-4 py-2 text-sm text-slate-300"
            >
              {name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ============ COMPARE TABLE ============

function CompareTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-slate-500">
            <th className="p-5 font-medium">Tiêu chí</th>
            <th className="p-5 font-medium text-orange-400">Proof of Work</th>
            <th className="p-5 font-medium text-blue-400">Proof of Stake</th>
          </tr>
        </thead>
        <tbody>
          {consensusComparison.map((row) => (
            <tr key={row.metric} className="border-b border-white/5 last:border-0">
              <td className="p-5 font-medium text-white">{row.metric}</td>
              <td className="p-5 text-slate-400">{row.pow}</td>
              <td className="p-5 text-slate-400">{row.pos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}