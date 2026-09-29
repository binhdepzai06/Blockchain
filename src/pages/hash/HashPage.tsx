import { useEffect, useState } from "react";
import {
  Copy,
  Hash,
  KeyRound,
  Lock,
  RotateCcw,
  Ruler,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Waves,
} from "lucide-react";

import {
  bruteForceFind,
  compareBits,
  findCollision,
  generatePinCandidates,
  sha256,
  weakHash16,
} from "../../lib/crypto/hash";

// =========================================================
// PAGE
// =========================================================

interface HistoryEntry {
  input: string;
  hash: string;
}

export default function HashPage() {
  const [input, setInput] = useState("Hello Blockchain");
  const [hash, setHash] = useState("");
  const [isHashing, setIsHashing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const generateHash = async () => {
    setIsHashing(true);

    try {
      const result = await sha256(input);

      setHash(result);

      setHistory((prev) => [{ input, hash: result }, ...prev].slice(0, 8));
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

    setTimeout(() => setCopied(false), 1500);
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
            Không chỉ băm dữ liệu — mỗi khu vực bên dưới CHỨNG MINH bằng
            code thật một tính chất của hàm băm: độ dài đầu ra cố định,
            tính một chiều, tính kháng va chạm, và hiệu ứng Avalanche.
          </p>
        </div>

        {/* PLAYGROUND */}
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Input</h2>
                <p className="mt-1 text-sm text-slate-500">Dữ liệu đầu vào</p>
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
              className="min-h-[160px] w-full resize-none rounded-2xl border border-white/10 bg-[#050816] p-5 text-sm leading-7 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/10"
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

          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  SHA-256 Output
                </h2>
                <p className="mt-1 text-sm text-slate-500">Kết quả hàm băm</p>
              </div>
            </div>

            <div className="min-h-[160px] rounded-2xl border border-white/10 bg-[#050816] p-5">
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
                <div className="flex h-full min-h-[120px] items-center justify-center text-center">
                  <div>
                    <Hash size={40} className="mx-auto mb-4 text-slate-700" />
                    <p className="text-sm text-slate-500">Chưa có hash</p>
                    <p className="mt-1 text-xs text-slate-600">
                      Nhấn Generate SHA-256 Hash
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* TÍNH CHẤT 1: ĐỘ DÀI CỐ ĐỊNH */}
        <FixedLengthSection history={history} />

        {/* TÍNH CHẤT 2: MỘT CHIỀU */}
        <OneWaySection />

        {/* TÍNH CHẤT 3: KHÁNG VA CHẠM */}
        <CollisionSection />

        {/* TÍNH CHẤT 4: AVALANCHE */}
        <AvalancheSection />
      </div>
    </div>
  );
}

// =========================================================
// TÍNH CHẤT 1 — ĐỘ DÀI ĐẦU RA CỐ ĐỊNH
// =========================================================

function FixedLengthSection({ history }: { history: HistoryEntry[] }) {
  return (
    <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <SectionHeader
        icon={<Ruler size={20} />}
        color="blue"
        title="Tính chất 1 — Độ dài đầu ra cố định"
        description="Hash mỗi đoạn text khác nhau ở Playground bên trên, rồi nhìn bảng dưới đây: input dài bao nhiêu ký tự cũng được, output luôn đúng 64 ký tự hex (256 bit)."
      />

      {history.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-[#050816] p-5 text-sm text-slate-500">
          Chưa có dữ liệu — hãy bấm "Generate SHA-256 Hash" ở Playground bên
          trên vài lần với các đoạn text độ dài khác nhau.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Input</th>
                <th className="px-4 py-3">Độ dài input</th>
                <th className="px-4 py-3">Độ dài output</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, i) => (
                <tr
                  key={i}
                  className="border-t border-white/5 bg-[#050816] font-mono"
                >
                  <td className="max-w-[280px] truncate px-4 py-3 text-slate-300">
                    {entry.input || "(rỗng)"}
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {entry.input.length} ký tự
                  </td>
                  <td className="px-4 py-3 font-semibold text-emerald-400">
                    64 hex / 256 bit
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

// =========================================================
// TÍNH CHẤT 2 — TÍNH MỘT CHIỀU
// =========================================================

function OneWaySection() {
  const [pinLength, setPinLength] = useState(3);
  const [secretHash, setSecretHash] = useState("");
  const [isCracking, setIsCracking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [foundAnswer, setFoundAnswer] = useState<string | null>(null);
  const [elapsedMs, setElapsedMs] = useState<number | null>(null);

  const generateSecret = async (length: number) => {
    const pin = Math.floor(Math.random() * Math.pow(10, length))
      .toString()
      .padStart(length, "0");

    const hashed = await sha256(pin);

    setSecretHash(hashed);
    setFoundAnswer(null);
    setAttempts(0);
    setElapsedMs(null);
  };

  useEffect(() => {
    generateSecret(pinLength);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinLength]);

  const startCrack = async () => {
    if (isCracking) return;

    setIsCracking(true);
    setFoundAnswer(null);
    setAttempts(0);

    const candidates = generatePinCandidates(pinLength);
    const startedAt = performance.now();

    const result = await bruteForceFind(secretHash, candidates, sha256, (a) =>
      setAttempts(a)
    );

    setAttempts(result.attempts);
    setFoundAnswer(result.answer ?? null);
    setElapsedMs(performance.now() - startedAt);
    setIsCracking(false);
  };

  const totalCombinations = Math.pow(10, pinLength);

  return (
    <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <SectionHeader
        icon={<Lock size={20} />}
        color="purple"
        title="Tính chất 2 — Tính một chiều"
        description="Máy có 1 hash bí mật của Bob và phải TỰ THỬ từng khả năng, hash rồi so sánh — không có cách nào tính ngược trực tiếp từ hash ra PIN gốc."
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs uppercase tracking-wider text-slate-500">
          Độ dài PIN
        </span>
        {[2, 3, 4].map((len) => (
          <button
            key={len}
            onClick={() => setPinLength(len)}
            disabled={isCracking}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              pinLength === len
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {len} chữ số
          </button>
        ))}

        <span className="ml-2 text-xs text-slate-500">
          ({totalCombinations.toLocaleString()} khả năng)
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#050816] p-5">
          <div className="mb-2 text-xs uppercase tracking-wider text-slate-500">
            Hash bí mật của Bob (bạn không thấy PIN gốc)
          </div>
          <div className="break-all font-mono text-xs text-purple-300">
            {secretHash}
          </div>

          <button
            onClick={() => generateSecret(pinLength)}
            disabled={isCracking}
            className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 disabled:opacity-50"
          >
            <RotateCcw size={14} />
            Tạo bí mật mới
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#050816] p-5">
          <button
            onClick={startCrack}
            disabled={isCracking}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <KeyRound size={16} />
            {isCracking
              ? `Đang dò... (${attempts.toLocaleString()}/${totalCombinations.toLocaleString()})`
              : "Bắt đầu dò tìm (Brute-force)"}
          </button>

          {foundAnswer !== null && (
            <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm">
              <div className="text-emerald-400">
                Đã tìm ra PIN:{" "}
                <strong className="font-mono">{foundAnswer}</strong>
              </div>
              <div className="mt-1 text-xs text-slate-400">
                Mất {attempts.toLocaleString()} lần thử ·{" "}
                {elapsedMs !== null ? Math.round(elapsedMs) : 0} ms
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        Với {pinLength} chữ số chỉ có {totalCombinations.toLocaleString()} khả
        năng nên máy dò ra gần như tức thì. Một mật khẩu 8 ký tự chữ+số có
        khoảng 218.000.000.000.000.000 khả năng — không máy nào dò hết nổi.
        Đó là lý do hàm băm được gọi là <strong>một chiều</strong>: verify
        (thử rồi so sánh) thì làm được, tính ngược trực tiếp thì không.
      </p>
    </section>
  );
}

// =========================================================
// TÍNH CHẤT 3 — KHÁNG VA CHẠM
// =========================================================

function CollisionSection() {
  const WEAK_CAP = 6000;
  const STRONG_CAP = 4000;

  const [phase, setPhase] = useState<"idle" | "weak" | "strong" | "done">(
    "idle"
  );
  const [weakAttempts, setWeakAttempts] = useState(0);
  const [weakResult, setWeakResult] = useState<{
    found: boolean;
    attempts: number;
    input1?: string;
    input2?: string;
    hash?: string;
  } | null>(null);

  const [strongAttempts, setStrongAttempts] = useState(0);
  const [strongResult, setStrongResult] = useState<{
    found: boolean;
    attempts: number;
  } | null>(null);

  const isRunning = phase === "weak" || phase === "strong";

  const runRace = async () => {
    setWeakResult(null);
    setStrongResult(null);
    setWeakAttempts(0);
    setStrongAttempts(0);

    setPhase("weak");
    const weak = await findCollision(weakHash16, WEAK_CAP, setWeakAttempts);
    setWeakResult(weak);

    setPhase("strong");
    const strong = await findCollision(sha256, STRONG_CAP, setStrongAttempts);
    setStrongResult(strong);

    setPhase("done");
  };

  return (
    <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <SectionHeader
        icon={<ShieldAlert size={20} />}
        color="red"
        title="Tính chất 3 — Tính kháng va chạm"
        description="Ném random input liên tục vào 1 hàm băm cho tới khi 2 input khác nhau vô tình ra cùng 1 hash (va chạm). So sánh hash 16-bit tự chế vs SHA-256 thật (256-bit)."
      />

      <button
        onClick={runRace}
        disabled={isRunning}
        className="mb-5 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Sparkles size={16} />
        {isRunning ? "Đang chạy thử va chạm..." : "Chạy thử va chạm"}
      </button>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* WEAK HASH */}
        <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.04] p-5">
          <div className="mb-2 text-sm font-semibold text-white">
            Hash yếu (demo, 16-bit)
          </div>
          <div className="mb-3 text-xs text-slate-500">
            Chỉ 65.536 giá trị đầu ra có thể
          </div>

          {phase === "weak" && (
            <div className="text-xs text-slate-400">
              Đang thử... {weakAttempts.toLocaleString()} / {WEAK_CAP.toLocaleString()}
            </div>
          )}

          {weakResult && (
            <div className="space-y-2 text-xs">
              {weakResult.found ? (
                <>
                  <div className="font-semibold text-red-400">
                    Va chạm sau {weakResult.attempts.toLocaleString()} lần
                    thử!
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#050816] p-3 font-mono">
                    <div className="truncate text-slate-300">
                      {weakResult.input1}
                    </div>
                    <div className="truncate text-slate-300">
                      {weakResult.input2}
                    </div>
                    <div className="mt-1 text-red-300">
                      → cùng hash: {weakResult.hash}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-slate-400">
                  Chưa tìm thấy sau {weakResult.attempts.toLocaleString()} lần
                  thử.
                </div>
              )}
            </div>
          )}
        </div>

        {/* STRONG HASH */}
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-5">
          <div className="mb-2 text-sm font-semibold text-white">
            SHA-256 (thật, 256-bit)
          </div>
          <div className="mb-3 text-xs text-slate-500">
            2^256 giá trị đầu ra có thể
          </div>

          {phase === "strong" && (
            <div className="text-xs text-slate-400">
              Đang thử... {strongAttempts.toLocaleString()} /{" "}
              {STRONG_CAP.toLocaleString()}
            </div>
          )}

          {strongResult && (
            <div className="text-xs">
              {strongResult.found ? (
                <div className="font-semibold text-red-400">
                  Va chạm! (gần như không thể xảy ra ở SHA-256 thật)
                </div>
              ) : (
                <div className="text-emerald-400">
                  Chưa tìm thấy va chạm nào sau{" "}
                  {strongResult.attempts.toLocaleString()} lần thử ngẫu
                  nhiên.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        Với không gian chỉ 65.536 giá trị, theo nghịch lý ngày sinh
        (birthday paradox), va chạm thường xuất hiện chỉ sau vài trăm lần
        thử. Với SHA-256, số lần thử trung bình cần để có 50% cơ hội tìm ra
        va chạm là khoảng 2^128 — một con số có 39 chữ số, nhiều hơn số
        nguyên tử ước tính trong vũ trụ quan sát được.
      </p>
    </section>
  );
}

// =========================================================
// TÍNH CHẤT 4 — HIỆU ỨNG AVALANCHE
// =========================================================

function flipOneChar(text: string): string {
  if (text.length === 0) return text;

  const index = Math.floor(Math.random() * text.length);
  const char = text[index];
  const code = char.charCodeAt(0);

  let newChar: string;

  if (/[a-z]/.test(char)) {
    newChar = char.toUpperCase();
  } else if (/[A-Z]/.test(char)) {
    newChar = char.toLowerCase();
  } else {
    newChar = String.fromCharCode(code + 1);
  }

  return text.slice(0, index) + newChar + text.slice(index + 1);
}

function AvalancheSection() {
  const [original, setOriginal] = useState("Blockchain la tuong lai");
  const [modified, setModified] = useState("Blockchain la tuong lai");
  const [hashA, setHashA] = useState("");
  const [hashB, setHashB] = useState("");

  useEffect(() => {
    let cancelled = false;

    sha256(original).then((h) => {
      if (!cancelled) setHashA(h);
    });

    return () => {
      cancelled = true;
    };
  }, [original]);

  useEffect(() => {
    let cancelled = false;

    sha256(modified).then((h) => {
      if (!cancelled) setHashB(h);
    });

    return () => {
      cancelled = true;
    };
  }, [modified]);

  const diff = hashA && hashB ? compareBits(hashA, hashB) : null;

  return (
    <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <SectionHeader
        icon={<Waves size={20} />}
        color="emerald"
        title="Tính chất 4 — Hiệu ứng Avalanche"
        description="Chỉ đổi 1 ký tự trong input, rồi nhìn hash thay đổi hoàn toàn ở mức bit — đúng nghĩa 'lở tuyết', không có kiểu thay đổi nhỏ tương ứng thay đổi nhỏ."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-wider text-slate-500">
            Bản gốc
          </label>
          <textarea
            value={original}
            onChange={(e) => {
              setOriginal(e.target.value);
              setModified(e.target.value);
            }}
            className="min-h-[90px] w-full resize-none rounded-2xl border border-white/10 bg-[#050816] p-4 text-sm text-white outline-none focus:border-emerald-400/50"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs uppercase tracking-wider text-slate-500">
              Bản đã đổi (sửa tay hoặc bấm nút)
            </label>
            <button
              onClick={() => setModified(flipOneChar(original))}
              className="flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-[11px] text-slate-300 hover:bg-white/10"
            >
              <RotateCcw size={12} />
              Đổi 1 ký tự ngẫu nhiên
            </button>
          </div>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            className="min-h-[90px] w-full resize-none rounded-2xl border border-white/10 bg-[#050816] p-4 text-sm text-white outline-none focus:border-emerald-400/50"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <HashDiffLine label="Hash gốc" hash={hashA} other={hashB} />
        <HashDiffLine label="Hash đã đổi" hash={hashB} other={hashA} />
      </div>

      {diff && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#050816] p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-slate-300">
              Số bit khác nhau trong 256 bit
            </span>
            <span
              className={`rounded-full px-3 py-1 text-sm font-bold ${
                diff.diffPercent > 35 && diff.diffPercent < 65
                  ? "bg-emerald-400/10 text-emerald-400"
                  : "bg-yellow-400/10 text-yellow-400"
              }`}
            >
              {diff.diffCount}/256 (~{diff.diffPercent.toFixed(1)}%)
            </span>
          </div>

          <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-[2px]">
            {diff.diffMask.map((differs, i) => (
              <div
                key={i}
                title={`bit ${i}: ${differs ? "khác" : "giống"}`}
                className={`aspect-square rounded-[2px] ${
                  differs ? "bg-emerald-400" : "bg-white/10"
                }`}
              />
            ))}
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Ô sáng = bit khác nhau giữa 2 hash, ô tối = bit giống nhau. Một
            hàm băm tốt sẽ cho ra tỉ lệ dao động quanh 50%, bất kể input chỉ
            đổi 1 ký tự hay đổi toàn bộ.
          </p>
        </div>
      )}
    </section>
  );
}

function HashDiffLine({
  label,
  hash,
  other,
}: {
  label: string;
  hash: string;
  other: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#050816] p-4">
      <div className="mb-2 text-xs uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="break-all font-mono text-xs leading-6">
        {hash.split("").map((char, i) => (
          <span
            key={i}
            className={
              other[i] !== char ? "text-red-400" : "text-slate-400"
            }
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

// =========================================================
// SHARED: SECTION HEADER
// =========================================================

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-400/10 text-blue-400",
  purple: "bg-purple-400/10 text-purple-400",
  red: "bg-red-400/10 text-red-400",
  emerald: "bg-emerald-400/10 text-emerald-400",
};

function SectionHeader({
  icon,
  color,
  title,
  description,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${COLOR_MAP[color]}`}
      >
        {icon}
      </div>
      <div>
        <h2 className="font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}