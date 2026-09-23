import { useState } from "react";
import {
  CheckCircle2,
  Key,
  PenLine,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import {
  generateKeyPair,
  signMessage,
  verifySignature,
} from "../../lib/crypto/signature";

export default function SignaturePage() {
  const [keyPair, setKeyPair] = useState<CryptoKeyPair | null>(null);
  const [publicKeyDisplay, setPublicKeyDisplay] = useState("");

  const [from] = useState("Alice");
  const [to, setTo] = useState("Bob");
  const [amount, setAmount] = useState(10);
  const [signedAmount, setSignedAmount] = useState<number | null>(null);

  const [signature, setSignature] = useState("");
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);

  const getMessage = (amountToUse: number) =>
    JSON.stringify({ from, to, amount: amountToUse });

  const handleGenerateKeys = async () => {
    const result = await generateKeyPair();
    setKeyPair(result.keyPair);
    setPublicKeyDisplay(result.publicKeyDisplay);

    setSignature("");
    setVerifyResult(null);
    setSignedAmount(null);
  };

  const handleSign = async () => {
    if (!keyPair) return;

    const message = getMessage(amount);
    const sig = await signMessage(keyPair.privateKey, message);

    setSignature(sig);
    setSignedAmount(amount);
    setVerifyResult(null);
  };

  const handleVerify = async () => {
    if (!keyPair || !signature || signedAmount === null) return;

    // Xác thực dựa trên dữ liệu HIỆN TẠI (amount có thể đã bị sửa sau khi ký)
    const message = getMessage(amount);
    const result = await verifySignature(keyPair.publicKey, message, signature);

    setVerifyResult(result);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
            <ShieldCheck size={16} />
            Digital Signature Laboratory
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Chữ ký số
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Tạo cặp khóa, ký một giao dịch bằng Private Key, xác thực bằng
            Public Key. Thử sửa dữ liệu sau khi ký để xem chữ ký thất bại.
          </p>
        </div>

        {/* STEP 1: KEYS */}
        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
              <Key size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-white">
                Bước 1 — Tạo cặp khóa cho Alice
              </h2>
              <p className="text-sm text-slate-500">
                Private Key dùng để ký, Public Key dùng để xác thực
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerateKeys}
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
          >
            Tạo cặp khóa mới
          </button>

          {publicKeyDisplay && (
            <div className="mt-4 rounded-2xl border border-white/5 bg-[#050816] p-4">
              <div className="mb-1 text-xs uppercase tracking-wider text-slate-500">
                Public Key (Alice)
              </div>
              <div className="break-all font-mono text-xs text-blue-300">
                {publicKeyDisplay}
              </div>
            </div>
          )}
        </section>

        {/* STEP 2: SIGN */}
        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/10 text-purple-400">
              <PenLine size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-white">
                Bước 2 — Ký giao dịch
              </h2>
              <p className="text-sm text-slate-500">
                Alice ký một giao dịch bằng Private Key của mình
              </p>
            </div>
          </div>

          <div className="mb-4 grid gap-3 md:grid-cols-3">
            <input
              value={from}
              disabled
              className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-slate-500"
            />
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Đến (To)"
              className="rounded-2xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-400/50"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="rounded-2xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-white outline-none focus:border-blue-400/50"
            />
          </div>

          <button
            onClick={handleSign}
            disabled={!keyPair}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Ký giao dịch bằng Private Key
          </button>

          {signature && (
            <div className="mt-4 rounded-2xl border border-white/5 bg-[#050816] p-4">
              <div className="mb-1 text-xs uppercase tracking-wider text-slate-500">
                Chữ ký (đã ký khi amount = {signedAmount})
              </div>
              <div className="break-all font-mono text-xs text-purple-300">
                {signature}
              </div>
            </div>
          )}
        </section>

        {/* STEP 3: VERIFY */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-white">
                Bước 3 — Xác thực
              </h2>
              <p className="text-sm text-slate-500">
                Mạng lưới dùng Public Key để kiểm tra chữ ký có hợp lệ không
              </p>
            </div>
          </div>

          <p className="mb-4 text-sm text-slate-400">
            Thử sửa số <strong className="text-white">amount</strong> ở Bước
            2 (không ký lại), rồi bấm Xác thực bên dưới để xem chữ ký thất
            bại.
          </p>

          <button
            onClick={handleVerify}
            disabled={!signature}
            className="rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Xác thực chữ ký
          </button>

          {verifyResult !== null && (
            <div
              className={`mt-4 flex items-center gap-3 rounded-2xl border px-5 py-4 ${
                verifyResult
                  ? "border-emerald-400/20 bg-emerald-400/10"
                  : "border-red-400/20 bg-red-400/10"
              }`}
            >
              {verifyResult ? (
                <CheckCircle2 size={20} className="text-emerald-400" />
              ) : (
                <XCircle size={20} className="text-red-400" />
              )}
              <span
                className={`font-semibold ${
                  verifyResult ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {verifyResult
                  ? "Chữ ký hợp lệ — dữ liệu chưa bị thay đổi"
                  : "Chữ ký KHÔNG hợp lệ — dữ liệu đã bị giả mạo"}
              </span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}