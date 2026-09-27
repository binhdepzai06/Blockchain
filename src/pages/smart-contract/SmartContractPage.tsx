import { useState } from "react";
import { Code2, PlayCircle, Terminal } from "lucide-react";

type ContractFunction = "deposit" | "transfer" | "withdraw";

interface ExecutionStep {
  label: string;
  detail: string;
}

const balances: Record<string, number> = {
  Alice: 500,
  Bob: 200,
};

export default function SmartContractPage() {
  const [func, setFunc] = useState<ContractFunction>("transfer");
  const [from, setFrom] = useState("Alice");
  const [to, setTo] = useState("Bob");
  const [amount, setAmount] = useState(10);

  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [state, setState] = useState({ ...balances });

  const gasFor: Record<ContractFunction, number> = {
    deposit: 21000,
    transfer: 21000,
    withdraw: 25000,
  };

  const execute = async () => {
    setIsRunning(true);
    setSteps([]);

    const push = async (label: string, detail: string) => {
      await new Promise((r) => setTimeout(r, 500));
      setSteps((prev) => [...prev, { label, detail }]);
    };

    await push("Transaction Created", `${func}() được gọi bởi ${from}`);
    await push("Gas Estimated", `${gasFor[func].toLocaleString()} gas`);
    await push("Network", "Transaction lan truyền tới các node");
    await push("Validator", "Validator xác thực transaction");

    setState((prev) => {
      const next = { ...prev };

      if (func === "deposit") {
        next[from] = (next[from] ?? 0) + amount;
      } else if (func === "withdraw") {
        next[from] = (next[from] ?? 0) - amount;
      } else if (func === "transfer") {
        next[from] = (next[from] ?? 0) - amount;
        next[to] = (next[to] ?? 0) + amount;
      }

      return next;
    });

    await push("State Updated", "Số dư trên smart contract đã được cập nhật");
    await push("Block Confirmed", "Transaction đã được ghi vào Block");

    setIsRunning(false);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
            <Code2 size={16} />
            Smart Contract Laboratory
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Smart Contract Simulator
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Gọi một hàm trên smart contract và xem toàn bộ vòng đời của
            transaction, từ tạo giao dịch đến khi state được cập nhật.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* FORM */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-5 font-semibold text-white">Gọi hàm Contract</h2>

            <div className="mb-4">
              <label className="mb-2 block text-xs text-slate-500">Function</label>
              <div className="flex gap-2">
                {(["deposit", "transfer", "withdraw"] as ContractFunction[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFunc(f)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                      func === f
                        ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white"
                        : "border border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    {f}()
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs text-slate-500">From</label>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white outline-none"
                >
                  {Object.keys(state).map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>

              {func === "transfer" && (
                <div>
                  <label className="mb-2 block text-xs text-slate-500">To</label>
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white outline-none"
                  >
                    {Object.keys(state).map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-xs text-slate-500">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-[#050816] px-3 py-2.5 text-sm text-white outline-none"
              />
            </div>

            <div className="mb-5 rounded-xl border border-white/5 bg-[#050816] px-4 py-2.5 text-xs text-slate-500">
              Ước tính gas: <span className="text-white">{gasFor[func].toLocaleString()}</span>
            </div>

            <button
              onClick={execute}
              disabled={isRunning}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 py-3 font-semibold text-white transition hover:scale-[1.01] disabled:opacity-50"
            >
              <PlayCircle size={18} />
              {isRunning ? "Đang thực thi..." : "Execute Contract"}
            </button>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {Object.entries(state).map(([name, balance]) => (
                <div key={name} className="rounded-xl border border-white/5 bg-[#050816] p-3 text-center">
                  <div className="text-xs text-slate-500">{name}</div>
                  <div className="font-mono text-lg text-white">{balance}</div>
                </div>
              ))}
            </div>
          </section>

          {/* EXECUTION LOG */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-center gap-3">
              <Terminal size={18} className="text-slate-400" />
              <h2 className="font-semibold text-white">Execution Log</h2>
            </div>

            <div className="space-y-3">
              {steps.length === 0 && (
                <p className="text-sm text-slate-500">
                  Bấm "Execute Contract" để xem từng bước xử lý.
                </p>
              )}

              {steps.map((s, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-[#050816] p-3">
                  <div className="text-sm font-medium text-emerald-400">{s.label}</div>
                  <div className="text-xs text-slate-500">{s.detail}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}