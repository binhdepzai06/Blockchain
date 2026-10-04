import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Coins,
  Hammer,
  HelpCircle,
  RefreshCw,
  Scale,
  ShieldCheck,
  Trophy,
  Zap,
} from "lucide-react";

import { mineBlock } from "../../lib/consensus/pow";
import {
  getSelectionChance,
  selectValidator,
  type Validator,
} from "../../lib/consensus/pos";
import { consensusComparison } from "../../lib/consensus/comparison";

type Tab = "overview" | "pow" | "pos" | "compare";

const initialValidators: Validator[] = [
  { name: "Validator A", stake: 1000 },
  { name: "Validator B", stake: 5000 },
  { name: "Validator C", stake: 2500 },
];

export default function ConsensusPage() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="min-h-[calc(100vh-72px)] px-5 py-8 lg:px-8">
      <div className="mx-auto max-w-[1180px]">

        {/* HEADER */}
        <header className="mb-7">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            <Scale size={15} />
            CryptoLab · Consensus
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Cơ chế đồng thuận
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Blockchain có nhiều node cùng hoạt động. Consensus giúp mạng
            quyết định ai được tạo Block tiếp theo và Block nào được chấp nhận.
          </p>
        </header>

        {/* MAIN NAV */}
        <div className="mb-7 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.025] p-1.5 md:grid-cols-4">
          <TabButton
            active={tab === "overview"}
            onClick={() => setTab("overview")}
            icon={HelpCircle}
          >
            Tổng quan
          </TabButton>

          <TabButton
            active={tab === "pow"}
            onClick={() => setTab("pow")}
            icon={Hammer}
          >
            Proof of Work
          </TabButton>

          <TabButton
            active={tab === "pos"}
            onClick={() => setTab("pos")}
            icon={Coins}
          >
            Proof of Stake
          </TabButton>

          <TabButton
            active={tab === "compare"}
            onClick={() => setTab("compare")}
            icon={Scale}
          >
            So sánh
          </TabButton>
        </div>

        {tab === "overview" && <Overview />}

        {tab === "pow" && <PowDemo />}

        {tab === "pos" && <PosDemo />}

        {tab === "compare" && <CompareTable />}
      </div>
    </div>
  );
}

/* =========================================================
   TAB BUTTON
========================================================= */

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
      className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-white/[0.08] text-white shadow-sm"
          : "text-slate-500 hover:bg-white/[0.035] hover:text-slate-300"
      }`}
    >
      <Icon size={16} />
      {children}
    </button>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */

function Overview() {
  return (
    <div className="space-y-5">

      {/* CORE QUESTION */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-7">
        <div className="mb-5">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
            Câu hỏi quan trọng
          </div>

          <h2 className="mt-2 text-xl font-semibold text-white md:text-2xl">
            Ai được quyền tạo Block tiếp theo?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Trong blockchain phi tập trung, không có một máy chủ trung tâm
            quyết định. Consensus là cách các node cùng thống nhất về trạng
            thái của blockchain.
          </p>
        </div>

        {/* SIMPLE FLOW */}
        <div className="grid gap-3 md:grid-cols-4">
          <FlowCard
            number="01"
            title="Giao dịch"
            description="Các giao dịch mới được tạo."
          />

          <FlowArrow />

          <FlowCard
            number="02"
            title="Consensus"
            description="Mạng xác định cách chọn người tạo Block."
          />

          <FlowArrow />

          <FlowCard
            number="03"
            title="Block"
            description="Block hợp lệ được mạng chấp nhận."
          />
        </div>
      </section>

      {/* TWO MECHANISMS */}
      <div className="grid gap-5 md:grid-cols-2">

        <MechanismCard
          icon={Hammer}
          title="Proof of Work"
          subtitle="Dùng sức mạnh tính toán"
          description="Các miner cạnh tranh bằng cách thử nhiều nonce để tìm hash đáp ứng độ khó."
          color="orange"
          points={[
            "Miner tìm nonce hợp lệ",
            "Ai tìm được trước có thể đề xuất Block",
            "Cần năng lực tính toán và năng lượng",
          ]}
        />

        <MechanismCard
          icon={Coins}
          title="Proof of Stake"
          subtitle="Dùng lượng tài sản Stake"
          description="Validator được lựa chọn dựa trên lượng stake của họ."
          color="blue"
          points={[
            "Validator khóa tài sản làm stake",
            "Stake càng lớn → xác suất được chọn càng cao",
            "Không cần cạnh tranh bằng việc đào hash",
          ]}
        />
      </div>

      {/* SIMPLE MESSAGE */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Consensus giải quyết vấn đề gì?
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Consensus giúp mạng blockchain thống nhất Block nào hợp lệ mà
              không cần một bên trung tâm quyết định.
            </p>
          </div>
        </div>
      </section>

      {/* PRESENTATION TIP */}
      <section className="rounded-2xl border border-blue-400/10 bg-blue-400/[0.025] p-6">
        <div className="flex gap-3">
          <Zap className="mt-0.5 shrink-0 text-blue-300" size={18} />

          <div>
            <div className="text-xs font-semibold text-blue-200">
              Cách giải thích khi thuyết trình
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              “Consensus là cơ chế giúp các node trong blockchain thống nhất
              với nhau. Với PoW, miner cạnh tranh bằng sức mạnh tính toán.
              Với PoS, validator được lựa chọn dựa trên stake.”
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   FLOW CARD
========================================================= */

function FlowCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/7 bg-black/10 p-4">
      <div className="text-[10px] font-bold text-slate-600">
        {number}
      </div>

      <div className="mt-2 font-semibold text-white">
        {title}
      </div>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden items-center justify-center md:flex">
      <ArrowRight size={17} className="text-slate-700" />
    </div>
  );
}

/* =========================================================
   MECHANISM CARD
========================================================= */

function MechanismCard({
  icon: Icon,
  title,
  subtitle,
  description,
  points,
  color,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  color: "orange" | "blue";
}) {
  const iconClass =
    color === "orange"
      ? "bg-orange-400/10 text-orange-300"
      : "bg-blue-400/10 text-blue-300";

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-white">{title}</h3>

          <div className="mt-1 text-xs text-slate-500">
            {subtitle}
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-400">
        {description}
      </p>

      <div className="mt-5 space-y-2">
        {points.map((point) => (
          <div
            key={point}
            className="flex items-start gap-2 text-xs text-slate-400"
          >
            <CheckCircle2
              size={14}
              className="mt-0.5 shrink-0 text-slate-600"
            />

            <span>{point}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   POW
========================================================= */

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
    if (isMining) return;

    setIsMining(true);
    setResult(null);
    setAttempts(0);
    setCurrentHash("");

    const mined = await mineBlock(
      "CryptoLab Block",
      difficulty,
      (currentAttempts, hash) => {
        setAttempts(currentAttempts);
        setCurrentHash(hash);
      }
    );

    setResult(mined);
    setIsMining(false);
  };

  return (
    <div className="space-y-5">

      {/* EXPLANATION */}
      <section className="rounded-2xl border border-orange-400/10 bg-orange-400/[0.025] p-6">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-400/10 text-orange-300">
            <Hammer size={19} />
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-orange-200">
              Proof of Work
            </div>

            <h2 className="mt-1 text-xl font-semibold text-white">
              Miner phải chứng minh mình đã làm việc
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Miner thử nhiều giá trị nonce cho đến khi tạo được hash phù hợp
              với độ khó của mạng.
            </p>
          </div>
        </div>
      </section>

      {/* SIMPLE FLOW */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
        <div className="mb-5 text-xs font-semibold uppercase tracking-wider text-slate-500">
          PoW hoạt động như thế nào?
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <FlowCard
            number="01"
            title="Block"
            description="Miner nhận dữ liệu Block."
          />

          <FlowArrow />

          <FlowCard
            number="02"
            title="Thử nonce"
            description="Miner liên tục thử các nonce khác nhau."
          />

          <FlowArrow />

          <FlowCard
            number="03"
            title="Hash hợp lệ"
            description="Hash phải đáp ứng độ khó."
          />

          <FlowArrow />

          <FlowCard
            number="04"
            title="Đề xuất Block"
            description="Miner có thể gửi Block cho mạng."
          />
        </div>
      </section>

      {/* MINING LAB */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Try it
            </div>

            <h2 className="mt-1 text-lg font-semibold text-white">
              Mô phỏng Mining
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Thử tìm một nonce tạo ra hash bắt đầu bằng{" "}
              <strong className="text-orange-300">
                {difficulty} số 0
              </strong>
              .
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={difficulty}
              onChange={(event) =>
                setDifficulty(Number(event.target.value))
              }
              disabled={isMining}
              className="rounded-lg border border-white/10 bg-[#080b12] px-3 py-2 text-xs text-white outline-none"
            >
              {[2, 3, 4].map((value) => (
                <option key={value} value={value}>
                  Difficulty {value}
                </option>
              ))}
            </select>

            <button
              onClick={startMining}
              disabled={isMining}
              className="flex items-center gap-2 rounded-lg bg-orange-400/10 px-4 py-2 text-xs font-semibold text-orange-200 transition hover:bg-orange-400/15 disabled:opacity-40"
            >
              {isMining ? (
                <RefreshCw
                  size={14}
                  className="animate-spin"
                />
              ) : (
                <Hammer size={14} />
              )}

              {isMining ? "Đang thử..." : "Bắt đầu"}
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">

          <Metric
            label="Nonce hiện tại"
            value={attempts.toLocaleString()}
          />

          <Metric
            label="Difficulty"
            value={`${difficulty} zeros`}
          />

          <Metric
            label="Trạng thái"
            value={isMining ? "Đang tìm..." : result ? "Đã tìm thấy" : "Chờ bắt đầu"}
          />
        </div>

        <div className="mt-4 rounded-xl border border-white/6 bg-black/15 p-4">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            Current Hash
          </div>

          <div className="break-all font-mono text-[11px] leading-5 text-slate-500">
            {currentHash || "Chưa có hash..."}
          </div>
        </div>

        {result && (
          <div className="mt-4 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
              <Trophy size={16} />
              Đã tìm thấy Block hợp lệ
            </div>

            <div className="mt-4 grid gap-3 text-xs md:grid-cols-3">
              <ResultItem
                label="Nonce"
                value={result.nonce.toLocaleString()}
              />

              <ResultItem
                label="Attempts"
                value={result.attempts.toLocaleString()}
              />

              <ResultItem
                label="Time"
                value={`${result.timeMs.toFixed(0)} ms`}
              />
            </div>

            <div className="mt-4 break-all font-mono text-[10px] text-emerald-300/70">
              {result.hash}
            </div>
          </div>
        )}
      </section>

      {/* KEY IDEA */}
      <KeyIdea>
        PoW không chọn miner dựa trên số coin. Miner cạnh tranh bằng sức mạnh
        tính toán để tìm ra bằng chứng công việc hợp lệ.
      </KeyIdea>
    </div>
  );
}

/* =========================================================
   POS
========================================================= */

function PosDemo() {
  const [validators, setValidators] =
    useState<Validator[]>(initialValidators);

  const [selected, setSelected] =
    useState<Validator | null>(null);

  const [round, setRound] = useState(0);

  const runSelection = () => {
    const winner = selectValidator(validators);

    setSelected(winner);
    setRound((current) => current + 1);
  };

  const updateStake = (
    index: number,
    stake: number
  ) => {
    setValidators((current) =>
      current.map((validator, i) =>
        i === index
          ? { ...validator, stake }
          : validator
      )
    );

    setSelected(null);
  };

  const totalStake = validators.reduce(
    (sum, validator) => sum + validator.stake,
    0
  );

  return (
    <div className="space-y-5">

      {/* EXPLANATION */}
      <section className="rounded-2xl border border-blue-400/10 bg-blue-400/[0.025] p-6">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
            <Coins size={19} />
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">
              Proof of Stake
            </div>

            <h2 className="mt-1 text-xl font-semibold text-white">
              Validator được chọn dựa trên Stake
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Người tham gia khóa một lượng tài sản làm stake. Trong mô phỏng
              này, stake càng lớn thì xác suất được chọn càng cao.
            </p>
          </div>
        </div>
      </section>

      {/* SIMPLE FLOW */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
        <div className="mb-5 text-xs font-semibold uppercase tracking-wider text-slate-500">
          PoS hoạt động như thế nào?
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <FlowCard
            number="01"
            title="Stake"
            description="Validator khóa tài sản."
          />

          <FlowArrow />

          <FlowCard
            number="02"
            title="Lựa chọn"
            description="Mạng chọn một Validator."
          />

          <FlowArrow />

          <FlowCard
            number="03"
            title="Tạo Block"
            description="Validator được chọn đề xuất Block."
          />

          <FlowArrow />

          <FlowCard
            number="04"
            title="Xác nhận"
            description="Mạng xác nhận Block hợp lệ."
          />
        </div>
      </section>

      {/* VALIDATOR LAB */}
      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">

        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Validator Network
              </div>

              <h2 className="mt-1 text-lg font-semibold text-white">
                Ai sẽ tạo Block?
              </h2>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-slate-600">
                Total Stake
              </div>

              <div className="mt-1 text-sm font-semibold text-white">
                {totalStake.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {validators.map((validator, index) => {
              const chance = getSelectionChance(
                validator,
                validators
              );

              const isWinner =
                selected?.name === validator.name;

              return (
                <div
                  key={validator.name}
                  className={`rounded-xl border p-4 transition ${
                    isWinner
                      ? "border-emerald-400/25 bg-emerald-400/[0.04]"
                      : "border-white/6 bg-black/10"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                          isWinner
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-white/[0.05] text-slate-400"
                        }`}
                      >
                        {validator.name
                          .replace("Validator ", "")
                          .charAt(0)}
                      </div>

                      <div>
                        <div className="text-sm font-medium text-white">
                          {validator.name}
                        </div>

                        <div className="text-[10px] text-slate-600">
                          {validator.stake.toLocaleString()} stake
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-semibold text-blue-300">
                        {chance.toFixed(1)}%
                      </div>

                      <div className="text-[10px] text-slate-600">
                        cơ hội
                      </div>
                    </div>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full bg-blue-400/60 transition-all duration-300"
                      style={{
                        width: `${chance}%`,
                      }}
                    />
                  </div>

                  <input
                    type="range"
                    min={500}
                    max={10000}
                    step={500}
                    value={validator.stake}
                    onChange={(event) =>
                      updateStake(
                        index,
                        Number(event.target.value)
                      )
                    }
                    className="mt-4 w-full accent-blue-400"
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={runSelection}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-400/10 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-400/15"
          >
            <Coins size={16} />
            Chọn Validator
          </button>
        </div>

        {/* RESULT */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Consensus Result
          </div>

          {selected ? (
            <div className="mt-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                <Trophy size={26} />
              </div>

              <div className="mt-5 text-xs text-slate-600">
                Validator được chọn
              </div>

              <h3 className="mt-1 text-2xl font-bold text-emerald-300">
                {selected.name}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Validator này được chọn để đề xuất Block trong
                Round {round}.
              </p>

              <div className="mt-6 rounded-xl border border-white/6 bg-black/10 p-4">
                <div className="text-[10px] uppercase tracking-wider text-slate-600">
                  Stake
                </div>

                <div className="mt-1 text-lg font-semibold text-white">
                  {selected.stake.toLocaleString()}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                <Coins size={22} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                Chưa chọn Validator
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Điều chỉnh stake nếu muốn, sau đó bấm
                “Chọn Validator”.
              </p>
            </div>
          )}

          <div className="mt-8 border-t border-white/6 pt-5">
            <div className="text-xs font-semibold text-slate-400">
              Điều cần nhớ
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Trong mô hình PoS đơn giản này, stake càng lớn thì
              xác suất được chọn càng cao.
            </p>
          </div>
        </div>
      </section>

      <KeyIdea>
        PoS thay việc cạnh tranh bằng sức mạnh tính toán bằng cơ chế lựa chọn
        Validator dựa trên stake.
      </KeyIdea>
    </div>
  );
}

/* =========================================================
   COMPARE
========================================================= */

function CompareTable() {
  return (
    <div className="space-y-5">

      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Quick comparison
        </div>

        <h2 className="text-xl font-semibold text-white">
          PoW và PoS khác nhau ở đâu?
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Điểm khác biệt dễ nhớ nhất là cách mạng chọn người có quyền
          đề xuất Block.
        </p>
      </section>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-5 text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Tiêu chí
                </th>

                <th className="p-5 text-xs font-semibold uppercase tracking-wider text-orange-300">
                  Proof of Work
                </th>

                <th className="p-5 text-xs font-semibold uppercase tracking-wider text-blue-300">
                  Proof of Stake
                </th>
              </tr>
            </thead>

            <tbody>
              {consensusComparison.map((row) => (
                <tr
                  key={row.metric}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="p-5 font-medium text-slate-300">
                    {row.metric}
                  </td>

                  <td className="p-5 text-slate-500">
                    {row.pow}
                  </td>

                  <td className="p-5 text-slate-500">
                    {row.pos}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <KeyIdea>
          <strong className="text-orange-200">PoW:</strong>{" "}
          Ai tìm được Proof of Work hợp lệ trước có thể đề xuất Block.
        </KeyIdea>

        <KeyIdea>
          <strong className="text-blue-200">PoS:</strong>{" "}
          Validator được lựa chọn dựa trên stake theo cơ chế của mạng.
        </KeyIdea>
      </div>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/6 bg-black/10 p-4">
      <div className="text-[10px] uppercase tracking-wider text-slate-600">
        {label}
      </div>

      <div className="mt-2 truncate text-sm font-semibold text-white">
        {value}
      </div>
    </div>
  );
}

function ResultItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-slate-600">
        {label}
      </div>

      <div className="mt-1 font-medium text-white">
        {value}
      </div>
    </div>
  );
}

function KeyIdea({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
      <div className="flex gap-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-slate-400">
          <CheckCircle2 size={15} />
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">
            Key idea
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {children}
          </p>
        </div>
      </div>
    </section>
  );
}