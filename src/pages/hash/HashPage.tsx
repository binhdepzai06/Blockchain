import { useState } from "react";
import { Copy, Hash, RotateCcw, ShieldCheck } from "lucide-react";

import { sha256 } from "../../lib/crypto/hash";

export default function HashPage() {
  const [input, setInput] = useState("Hello Blockchain");
  const [hash, setHash] = useState("");
  const [isHashing, setIsHashing] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateHash = async () => {
    setIsHashing(true);

    try {
      const result = await sha256(input);
      setHash(result);
    } finally {
      setIsHashing(false);
    }
  };

  const reset = () => {
    setInput("Hello Blockchain");
    setHash("");
    setCopied(false);
  };

  const copyHash = async () => {
    if (!hash) return;

    await navigator.clipboard.writeText(hash);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">

      <div className="mx-auto max-w-[1200px]">

        {/* HEADER */}
        <div className="mb-10">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            <Hash size={16} />
            Cryptography Laboratory
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            SHA-256 Hash Laboratory
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            Nhập dữ liệu và quan sát cách hàm băm SHA-256 chuyển đổi
            dữ liệu đầu vào thành một giá trị hash có độ dài cố định.
          </p>

        </div>

        {/* MAIN CARD */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* INPUT */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Input
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Dữ liệu đầu vào
                </p>
              </div>

              <button
                onClick={reset}
                className="rounded-xl border border-white/10 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                title="Reset"
              >
                <RotateCcw size={17} />
              </button>

            </div>

            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Nhập dữ liệu cần hash..."
              className="min-h-[220px] w-full resize-none rounded-2xl border border-white/10 bg-[#050816] p-5 text-sm leading-7 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/10"
            />

            <div className="mt-3 flex justify-between text-xs text-slate-500">
              <span>Characters</span>
              <span>{input.length}</span>
            </div>

            <button
              onClick={generateHash}
              disabled={isHashing}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-5 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isHashing ? "Generating Hash..." : "Generate SHA-256 Hash"}
            </button>

          </section>

          {/* OUTPUT */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <ShieldCheck size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  SHA-256 Output
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Kết quả hàm băm
                </p>
              </div>

            </div>

            <div className="min-h-[220px] rounded-2xl border border-white/10 bg-[#050816] p-5">

              {hash ? (
                <div className="flex h-full flex-col justify-between gap-6">

                  <div>

                    <div className="mb-3 text-xs uppercase tracking-wider text-slate-500">
                      SHA-256 Hash
                    </div>

                    <div className="break-all font-mono text-sm leading-7 text-blue-300">
                      {hash}
                    </div>

                  </div>

                  <button
                    onClick={copyHash}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                  >
                    <Copy size={16} />

                    {copied ? "Copied!" : "Copy Hash"}
                  </button>

                </div>
              ) : (
                <div className="flex h-full min-h-[180px] items-center justify-center text-center">

                  <div>

                    <Hash
                      size={40}
                      className="mx-auto mb-4 text-slate-700"
                    />

                    <p className="text-sm text-slate-500">
                      Chưa có hash
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Nhấn Generate SHA-256 Hash
                    </p>

                  </div>

                </div>
              )}

            </div>

            {/* INFO */}
            <div className="mt-5 grid grid-cols-2 gap-3">

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-xs text-slate-500">
                  Algorithm
                </div>

                <div className="mt-1 font-semibold text-white">
                  SHA-256
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-xs text-slate-500">
                  Output
                </div>

                <div className="mt-1 font-semibold text-white">
                  256 bits
                </div>
              </div>

            </div>

          </section>

        </div>

        {/* EDUCATIONAL SECTION */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.02] p-6">

          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">

            <div className="rounded-2xl border border-white/10 bg-[#050816] p-5 text-center">

              <div className="text-xs uppercase tracking-wider text-slate-500">
                Input
              </div>

              <div className="mt-3 font-mono text-sm text-white">
                {input || "(empty)"}
              </div>

            </div>

            <div className="text-center">

              <div className="text-2xl text-blue-400">
                ↓
              </div>

              <div className="my-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold text-blue-300">
                SHA-256
              </div>

              <div className="text-2xl text-blue-400">
                ↓
              </div>

            </div>

            <div className="rounded-2xl border border-white/10 bg-[#050816] p-5 text-center">

              <div className="text-xs uppercase tracking-wider text-slate-500">
                Hash
              </div>

              <div className="mt-3 break-all font-mono text-sm text-blue-300">
                {hash || "Generate hash first"}
              </div>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
}