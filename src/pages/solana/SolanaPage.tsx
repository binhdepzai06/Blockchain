import { useState } from "react";
import { Activity, Info, Zap } from "lucide-react";

interface Slot {
  slot: number;
  leader: string;
  txCount: number;
}

const validators = ["Validator-1", "Validator-2", "Validator-3", "Validator-4"];

function generateSlots(count: number): Slot[] {
  return Array.from({ length: count }, (_, i) => ({
    slot: i + 1,
    leader: validators[Math.floor(Math.random() * validators.length)],
    txCount: Math.floor(Math.random() * 2000) + 200,
  }));
}

export default function SolanaPage() {
  const [slots, setSlots] = useState<Slot[]>(generateSlots(8));

  const totalTx = slots.reduce((sum, s) => sum + s.txCount, 0);

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-sm text-purple-300">
            <Zap size={16} />
            Educational Simulation — không phải dữ liệu mạng thật
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Solana — Slot & Block Production
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Solana chia thời gian thành các "slot" cực ngắn (~400ms). Mỗi
            slot có một Validator được chỉ định trước làm "leader" để tạo
            block, giúp mạng đạt thông lượng rất cao.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-2 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-3 text-sm text-yellow-300">
          <Info size={16} />
          Số liệu bên dưới là dữ liệu mô phỏng ngẫu nhiên cho mục đích học
          tập, không kết nối tới mạng Solana thật.
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatBox label="Tổng số Slot" value={slots.length.toString()} />
          <StatBox label="Tổng Transaction" value={totalTx.toLocaleString()} />
          <StatBox label="TX trung bình / Slot" value={Math.round(totalTx / slots.length).toString()} />
          <StatBox label="Số Validator" value={validators.length.toString()} />
        </div>

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-white">Slot gần nhất</h2>
            <button
              onClick={() => setSlots(generateSlots(8))}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >
              <Activity size={15} />
              Tạo slot mới
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            {slots.map((s) => (
              <div
                key={s.slot}
                className="rounded-2xl border border-white/5 bg-[#050816] p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Slot #{s.slot}</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
                <div className="mb-1 text-sm font-semibold text-white">
                  {s.leader}
                </div>
                <div className="text-xs text-purple-300">
                  {s.txCount.toLocaleString()} tx
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-4 font-semibold text-white">
            So với mô hình đã học
          </h2>
          <p className="text-sm leading-6 text-slate-400">
            Không giống Ethereum (leader được chọn tại thời điểm cần), Solana
            xác định trước lịch trình leader cho cả một "epoch" nhờ cơ chế{" "}
            <strong className="text-white">Proof of History</strong> — một
            đồng hồ mật mã học giúp các node đồng thuận về thời gian mà
            không cần giao tiếp liên tục. Đây là lý do Solana đạt thông
            lượng giao dịch rất cao.
          </p>
        </section>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}