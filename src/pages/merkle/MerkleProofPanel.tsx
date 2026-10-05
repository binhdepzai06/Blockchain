import { useEffect, useState } from "react";
import { BadgeCheck, ShieldAlert, Route } from "lucide-react";

import {
  buildMerkleTree,
  generateMerkleProof,
  verifyMerkleProof,
  type MerkleProof,
  type MerkleProofVerification,
} from "../../lib/blockchain/merkle";
import type { Transaction } from "../../types/transaction";

interface Props {
  originalTransactions: Transaction[]; // dữ liệu gốc của Block (full node giữ)
  claimedTransactions: Transaction[]; // dữ liệu đang hiển thị (có thể bị sửa)
  headerRoot: string; // Merkle Root trong Block Header
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}

const short = (hash: string) => `${hash.slice(0, 10)}…${hash.slice(-4)}`;

export default function MerkleProofPanel({
  originalTransactions,
  claimedTransactions,
  headerRoot,
  selectedIndex,
  onSelectIndex,
}: Props) {
  const [proof, setProof] = useState<MerkleProof | null>(null);
  const [result, setResult] = useState<MerkleProofVerification | null>(null);
  const [corrupt, setCorrupt] = useState(false);

  const claimedTx = claimedTransactions[selectedIndex];

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // Full node: dựng cây từ dữ liệu gốc rồi sinh proof cho 1 giao dịch
      const { levels } = await buildMerkleTree(originalTransactions);
      const generated = generateMerkleProof(levels, selectedIndex);

      if (!generated || !claimedTx) {
        if (!cancelled) {
          setProof(null);
          setResult(null);
        }
        return;
      }

      // Giả lập kẻ gian sửa 1 hash trong proof
      const used: MerkleProof =
        corrupt && generated.steps.length > 0
          ? {
              ...generated,
              steps: generated.steps.map((step, i) =>
                i === 0
                  ? {
                      ...step,
                      siblingHash:
                        (step.siblingHash[0] === "0" ? "1" : "0") +
                        step.siblingHash.slice(1),
                    }
                  : step
              ),
            }
          : generated;

      // Light client: chỉ có giao dịch + proof + Root trong Header
      const verification = await verifyMerkleProof(claimedTx, used, headerRoot);

      if (!cancelled) {
        setProof(used);
        setResult(verification);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [originalTransactions, claimedTx, headerRoot, selectedIndex, corrupt]);

  const n = originalTransactions.length;

  return (
    <section className="mt-5 rounded-[28px] border border-white/10 bg-[#070b16] p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Route size={16} className="text-cyan-400" />
          <h2 className="text-sm font-semibold text-white">
            Merkle Proof — chứng minh 1 giao dịch thuộc Block
          </h2>
        </div>

        <button
          onClick={() => setCorrupt((value) => !value)}
          className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
            corrupt
              ? "border-red-400/30 bg-red-400/10 text-red-300"
              : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.07]"
          }`}
        >
          {corrupt ? "Đang làm hỏng proof (bấm để hoàn tác)" : "Làm hỏng 1 hash trong proof"}
        </button>
      </div>

      <p className="mb-4 text-xs leading-5 text-slate-500">
        Chọn giao dịch cần chứng minh. Bên xác minh chỉ cần giao dịch, các hash
        “anh em” trên đường lên Root và Merkle Root trong Block Header — không
        cần toàn bộ {n} giao dịch. Sửa số tiền ở danh sách bên trên để thấy
        proof chuyển sang INVALID.
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {claimedTransactions.map((_, index) => (
          <button
            key={index}
            onClick={() => onSelectIndex(index)}
            className={`rounded-lg border px-3 py-1.5 text-xs transition ${
              selectedIndex === index
                ? "border-amber-400/40 bg-amber-400/10 text-amber-200"
                : "border-white/10 text-slate-500 hover:text-slate-200"
            }`}
          >
            T{index + 1}
          </button>
        ))}
      </div>

      {proof && result && claimedTx && (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-2">
            <Row label={`Hash lá H(T${selectedIndex + 1})`} value={short(result.path[0])} />

            {proof.steps.map((step, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[11px] text-slate-400"
              >
                <span className="text-slate-600">Bước {i + 1}:</span>{" "}
                hash anh em{" "}
                <span className="text-amber-300">{short(step.siblingHash)}</span>{" "}
                ({step.position === "left" ? "ghép bên trái" : "ghép bên phải"}) →{" "}
                <span className="text-cyan-300">{short(result.path[i + 1])}</span>
              </div>
            ))}

            {proof.steps.length === 0 && (
              <p className="text-xs text-slate-500">
                Block chỉ có 1 giao dịch nên hash lá chính là Merkle Root (proof rỗng).
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div
              className={`rounded-2xl border p-4 ${
                result.valid
                  ? "border-emerald-400/20 bg-emerald-400/[0.05]"
                  : "border-red-400/20 bg-red-400/[0.05]"
              }`}
            >
              <div
                className={`mb-2 flex items-center gap-2 text-sm font-semibold ${
                  result.valid ? "text-emerald-300" : "text-red-300"
                }`}
              >
                {result.valid ? <BadgeCheck size={16} /> : <ShieldAlert size={16} />}
                {result.valid ? "Proof VALID" : "Proof INVALID"}
              </div>
              <div className="break-all font-mono text-[10px] leading-5 text-slate-500">
                Root tính được: {short(result.computedRoot)}
                <br />
                Root trong Header: {short(headerRoot)}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs leading-5 text-slate-500">
              <div className="mb-1 font-semibold text-slate-300">
                Chi phí: {proof.steps.length} hash thay vì {n}
              </div>
              Số bước = ⌈log₂ n⌉ nên độ phức tạp là{" "}
              <span className="text-cyan-300">O(log n)</span>. Ví dụ 1.000
              giao dịch chỉ cần 10 hash, 1.000.000 giao dịch chỉ cần 20 hash.
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs leading-5 text-slate-500">
        <span className="font-medium text-slate-300">
          Vì sao Header chỉ lưu Root?
        </span>{" "}
        Root là “dấu vân tay” của cả danh sách giao dịch: đổi bất kỳ giao dịch
        nào thì Root đổi. Header nhỏ và cố định, nên node nhẹ (light client) chỉ
        tải Header rồi dùng Merkle Proof để kiểm tra từng giao dịch mà không
        cần tải cả Block.
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[11px] text-slate-400">
      <span className="text-slate-600">{label}:</span>{" "}
      <span className="text-cyan-300">{value}</span>
    </div>
  );
}
