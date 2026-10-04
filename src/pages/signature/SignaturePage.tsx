import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Key,
  PenLine,
  RotateCcw,
  ShieldCheck,
  Skull,
  User,
  XCircle,
} from "lucide-react";

import {
  generateKeyPair,
  signMessage,
  verifySignature,
} from "../../lib/crypto/signature";

type Step = "keys" | "signed" | "verified";

export default function SignaturePage() {
  const [keyPair, setKeyPair] = useState<CryptoKeyPair | null>(null);
  const [publicKeyDisplay, setPublicKeyDisplay] = useState("");

  const from = "Alice";
  const to = "Bob";
  const [amount, setAmount] = useState(10);
  const [signedAmount, setSignedAmount] = useState<number | null>(null);

  const [signature, setSignature] = useState("");
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [wasAttacked, setWasAttacked] = useState(false);

  const step: Step = signature
    ? verifyResult !== null
      ? "verified"
      : "signed"
    : "keys";

  const getMessage = (amountToUse: number) =>
    JSON.stringify({ from, to, amount: amountToUse });

  const handleGenerateKeys = async () => {
    const result = await generateKeyPair();
    setKeyPair(result.keyPair);
    setPublicKeyDisplay(result.publicKeyDisplay);

    setSignature("");
    setVerifyResult(null);
    setSignedAmount(null);
    setWasAttacked(false);
  };

  const handleSign = async () => {
    if (!keyPair) return;

    const message = getMessage(amount);
    const sig = await signMessage(keyPair.privateKey, message);

    setSignature(sig);
    setSignedAmount(amount);
    setVerifyResult(null);
    setWasAttacked(false);
  };

  const handleVerify = async () => {
    if (!keyPair || !signature || signedAmount === null) return;

    const message = getMessage(amount);
    const result = await verifySignature(keyPair.publicKey, message, signature);

    setVerifyResult(result);
  };

  const handleMalloryAttack = async () => {
    if (!keyPair || !signature || signedAmount === null) return;

    const tamperedAmount = signedAmount + 500 + Math.floor(Math.random() * 500);

    setAmount(tamperedAmount);

    const message = getMessage(tamperedAmount);
    const result = await verifySignature(keyPair.publicKey, message, signature);

    setVerifyResult(result);
    setWasAttacked(true);
  };

  const handleReset = () => {
    setKeyPair(null);
    setPublicKeyDisplay("");
    setAmount(10);
    setSignedAmount(null);
    setSignature("");
    setVerifyResult(null);
    setWasAttacked(false);
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
            Alice muốn gửi tiền cho Bob. Cô ấy{" "}
            <strong className="text-white">ký</strong> giao dịch bằng khoá bí
            mật của mình, ai cũng có thể{" "}
            <strong className="text-white">xác thực</strong> bằng khoá công
            khai — nhưng chỉ Alice mới ký được.
          </p>
        </div>

        <div className="mb-8 flex items-center justify-center gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
          <ActorBadge icon={User} name="Alice" color="blue" sub="Người gửi" />
          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="text-slate-600" size={28} />
            <span className="text-xs text-slate-500">{amount} BTC</span>
          </div>
          <ActorBadge icon={User} name="Bob" color="emerald" sub="Người nhận" />
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <StepBadge number={1} title="Tạo khoá" active={step === "keys"} done={!!keyPair} />
          <StepBadge number={2} title="Ký giao dịch" active={step === "signed" && !!keyPair} done={!!signature} />
          <StepBadge number={3} title="Xác thực" active={step === "verified"} done={verifyResult !== null} />
        </div>

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
              <Key size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-white">Bước 1 — Alice tạo cặp khoá</h2>
              <p className="text-sm text-slate-500">
                Khoá riêng (Private Key): chỉ Alice giữ, dùng để ký. Khoá
                công khai (Public Key): ai cũng xem được, dùng để kiểm tra.
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerateKeys}
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
          >
            Tạo cặp khoá cho Alice
          </button>

          {publicKeyDisplay && (
            <div className="mt-4 rounded-2xl border border-white/5 bg-[#050816] p-4">
              <div className="mb-1 text-xs uppercase tracking-wider text-slate-500">
                Khoá công khai của Alice (ai cũng xem được)
              </div>
              <div className="break-all font-mono text-xs text-blue-300">{publicKeyDisplay}</div>
            </div>
          )}
        </section>

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/10 text-purple-400">
              <PenLine size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-white">Bước 2 — Alice ký giao dịch</h2>
              <p className="text-sm text-slate-500">
                Nội dung giao dịch + Khoá riêng → ra một chữ ký duy nhất
              </p>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm text-slate-400">Số tiền gửi:</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-32 rounded-2xl border border-white/10 bg-[#050816] px-4 py-2 text-sm text-white outline-none focus:border-blue-400/50"
            />
            <span className="text-sm text-slate-500">BTC</span>
          </div>

          <button
            onClick={handleSign}
            disabled={!keyPair}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Ký giao dịch bằng Khoá riêng
          </button>

          {signature && (
            <div className="mt-4 rounded-2xl border border-white/5 bg-[#050816] p-4">
              <div className="mb-1 text-xs uppercase tracking-wider text-slate-500">
                Chữ ký (đã ký lúc số tiền = {signedAmount} BTC)
              </div>
              <div className="break-all font-mono text-xs text-purple-300">{signature}</div>
            </div>
          )}
        </section>

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-white">Bước 3 — Mạng lưới xác thực</h2>
              <p className="text-sm text-slate-500">
                Dùng Khoá công khai của Alice để kiểm tra chữ ký có khớp với giao dịch hiện tại không
              </p>
            </div>
          </div>

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
                verifyResult ? "border-emerald-400/20 bg-emerald-400/10" : "border-red-400/20 bg-red-400/10"
              }`}
            >
              {verifyResult ? (
                <CheckCircle2 size={22} className="text-emerald-400" />
              ) : (
                <XCircle size={22} className="text-red-400" />
              )}
              <div>
                <div className={`font-semibold ${verifyResult ? "text-emerald-400" : "text-red-400"}`}>
                  {verifyResult ? "HỢP LỆ — giao dịch chưa bị thay đổi" : "KHÔNG HỢP LỆ — giao dịch đã bị can thiệp!"}
                </div>
                {wasAttacked && (
                  <div className="mt-1 text-xs text-slate-400">
                    Số tiền hiện tại ({amount} BTC) khác với lúc Alice ký ({signedAmount} BTC) — chữ ký lập tức không còn khớp.
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-red-400/20 bg-red-400/[0.03] p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-400/10 text-red-400">
              <Skull size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-white">Demo: Mallory chặn & sửa giao dịch</h2>
              <p className="text-sm text-slate-500">
                Mallory chặn giao dịch giữa đường, đổi số tiền Bob nhận được — xem chữ ký có phát hiện ra không
              </p>
            </div>
          </div>

          <button
            onClick={handleMalloryAttack}
            disabled={!signature}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <AlertTriangle size={16} />
            Mallory giả mạo giao dịch
          </button>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Vì chữ ký được tính từ đúng nội dung giao dịch gốc, chỉ cần đổi 1
            con số, chữ ký cũ không còn khớp với dữ liệu mới nữa — mạng lưới
            phát hiện giả mạo ngay lập tức, không cần ai đi so sánh thủ công.
          </p>

          <button
            onClick={handleReset}
            className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <RotateCcw size={13} />
            Làm lại từ đầu (demo lần nữa)
          </button>
        </section>
      </div>
    </div>
  );
}

function ActorBadge({
  icon: Icon,
  name,
  sub,
  color,
}: {
  icon: React.ComponentType<{ size?: number }>;
  name: string;
  sub: string;
  color: "blue" | "emerald";
}) {
  const colorMap = {
    blue: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    emerald: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${colorMap[color]}`}>
        <Icon size={24} />
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold text-white">{name}</div>
        <div className="text-xs text-slate-500">{sub}</div>
      </div>
    </div>
  );
}

function StepBadge({
  number,
  title,
  active,
  done,
}: {
  number: number;
  title: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
        done
          ? "border-emerald-400/30 bg-emerald-400/[0.06]"
          : active
          ? "border-blue-400/30 bg-blue-400/[0.06]"
          : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          done ? "bg-emerald-400/20 text-emerald-400" : active ? "bg-blue-400/20 text-blue-400" : "bg-white/5 text-slate-500"
        }`}
      >
        {done ? <CheckCircle2 size={16} /> : number}
      </div>
      <span className={`text-sm font-medium ${done || active ? "text-white" : "text-slate-500"}`}>{title}</span>
    </div>
  );
}