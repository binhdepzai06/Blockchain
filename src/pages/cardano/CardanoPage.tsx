import { useState } from "react";
import { Info, Landmark, Users } from "lucide-react";

interface StakePool {
  name: string;
  ticker: string;
  totalStake: number;
  delegators: number;
  margin: number;
}

const stakePools: StakePool[] = [
  { name: "Pool Alpha", ticker: "ALPHA", totalStake: 4_200_000, delegators: 312, margin: 2 },
  { name: "Pool Beta", ticker: "BETA", totalStake: 1_800_000, delegators: 145, margin: 1.5 },
  { name: "Pool Gamma", ticker: "GAMMA", totalStake: 7_500_000, delegators: 590, margin: 3 },
];

export default function CardanoPage() {
  const [delegateAmount, setDelegateAmount] = useState(1000);
  const [selectedPool, setSelectedPool] = useState(stakePools[0]);

  const totalNetworkStake = stakePools.reduce((s, p) => s + p.totalStake, 0);

  const estimatedShare =
    (delegateAmount / (selectedPool.totalStake + delegateAmount)) * 100;

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            <Landmark size={16} />
            Educational Simulation — không phải dữ liệu mạng thật
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Cardano — Stake Pool Delegation
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Cardano dùng cơ chế Proof of Stake gọi là Ouroboros. Chủ sở hữu
            ADA có thể "delegate" (ủy quyền) stake của mình cho một Stake
            Pool thay vì tự vận hành node.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-2 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-3 text-sm text-yellow-300">
          <Info size={16} />
          Toàn bộ số liệu trên trang này là dữ liệu mô phỏng cho mục đích học
          tập, không kết nối tới mạng Cardano thật.
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* POOLS LIST */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
            <h2 className="mb-5 font-semibold text-white">Danh sách Stake Pool</h2>

            <div className="space-y-3">
              {stakePools.map((pool) => {
                const share = (pool.totalStake / totalNetworkStake) * 100;
                const active = selectedPool.name === pool.name;

                return (
                  <button
                    key={pool.name}
                    onClick={() => setSelectedPool(pool)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-blue-400/40 bg-blue-400/10"
                        : "border-white/5 bg-[#050816] hover:border-white/20"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold text-white">
                        {pool.name} [{pool.ticker}]
                      </span>
                      <span className="text-xs text-slate-500">
                        Margin {pool.margin}%
                      </span>
                    </div>

                    <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${share}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users size={12} /> {pool.delegators} delegators
                      </span>
                      <span>{pool.totalStake.toLocaleString()} ADA ({share.toFixed(1)}%)</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* DELEGATE SIMULATOR */}
          <section className="rounded-3xl border border-purple-400/20 bg-purple-400/[0.04] p-6">
            <h2 className="mb-4 font-semibold text-white">Mô phỏng Delegate</h2>

            <label className="mb-2 block text-xs text-slate-500">
              Số ADA bạn muốn delegate vào {selectedPool.name}
            </label>
            <input
              type="number"
              value={delegateAmount}
              onChange={(e) => setDelegateAmount(Number(e.target.value))}
              className="mb-5 w-full rounded-2xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-white outline-none focus:border-purple-400/50"
            />

            <div className="space-y-3 rounded-2xl border border-white/5 bg-[#050816] p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Tỉ lệ đóng góp của bạn</span>
                <span className="text-white">{estimatedShare.toFixed(4)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Margin của pool</span>
                <span className="text-white">{selectedPool.margin}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tổng stake pool sau khi delegate</span>
                <span className="text-white">
                  {(selectedPool.totalStake + delegateAmount).toLocaleString()} ADA
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Càng nhiều người delegate vào 1 pool, tỉ lệ được chọn tạo block
              (slot leader) của pool đó càng cao — tương tự cơ chế PoS bạn
              đã thấy ở phần Consensus.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}