import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import {
  Info,
  Landmark,
  Play,
  Plus,
  Trash2,
  Users,
} from "lucide-react";

import { simulateCardanoEpoch } from "../../lib/cardano/cardanoSimulator";
import type {
  CardanoEpochResult,
  StakePool,
} from "../../types/cardano";

interface CardanoPool extends StakePool {
  ticker: string;
  delegators: number;
  margin: number;
}

const initialPools: CardanoPool[] = [
  {
    id: "alpha",
    name: "Pool Alpha",
    ticker: "ALPHA",
    stake: 4_200_000,
    delegators: 312,
    margin: 2,
    online: true,
  },
  {
    id: "beta",
    name: "Pool Beta",
    ticker: "BETA",
    stake: 1_800_000,
    delegators: 145,
    margin: 1.5,
    online: true,
  },
  {
    id: "gamma",
    name: "Pool Gamma",
    ticker: "GAMMA",
    stake: 7_500_000,
    delegators: 590,
    margin: 3,
    online: true,
  },
];

export default function CardanoPage() {
  const [pools, setPools] = useState<CardanoPool[]>(initialPools);

  const [selectedPoolId, setSelectedPoolId] = useState("alpha");
  const [delegateAmount, setDelegateAmount] = useState(1000);

  const [epoch, setEpoch] = useState(1);
  const [slots, setSlots] = useState(20);

  const [result, setResult] =
    useState<CardanoEpochResult | null>(null);

  const [error, setError] = useState("");

  const [newPoolName, setNewPoolName] = useState("");
  const [newPoolStake, setNewPoolStake] = useState(100_000);

  const selectedPool =
    pools.find((pool) => pool.id === selectedPoolId) ?? pools[0];

  const totalNetworkStake = pools.reduce(
    (sum, pool) => sum + Math.max(0, pool.stake),
    0,
  );

  const estimatedShare =
    selectedPool && selectedPool.stake + delegateAmount > 0
      ? (delegateAmount /
          (selectedPool.stake + delegateAmount)) *
        100
      : 0;

  const resetResult = () => {
    setResult(null);
    setError("");
  };

  const handleSelectPool = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const poolId = event.currentTarget.dataset.poolId;

    if (poolId) {
      setSelectedPoolId(poolId);
    }
  };

  const handlePoolStakeChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const poolId = event.currentTarget.dataset.poolId;

    if (!poolId) {
      return;
    }

    const stake = Math.max(0, Number(event.target.value));

    setPools((current) =>
      current.map((pool) =>
        pool.id === poolId ? { ...pool, stake } : pool,
      ),
    );

    resetResult();
  };

  const handleTogglePool = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const poolId = event.currentTarget.dataset.poolId;

    if (!poolId) {
      return;
    }

    setPools((current) =>
      current.map((pool) =>
        pool.id === poolId
          ? { ...pool, online: !pool.online }
          : pool,
      ),
    );

    resetResult();
  };

  const handleRemovePool = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const poolId = event.currentTarget.dataset.poolId;

    if (!poolId) {
      return;
    }

    const updatedPools = pools.filter((pool) => pool.id !== poolId);

    setPools(updatedPools);

    if (selectedPoolId === poolId) {
      setSelectedPoolId(updatedPools[0]?.id ?? "");
    }

    resetResult();
  };

  const handleAddPool = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPoolStake <= 0) {
      setError("Stake phải lớn hơn 0.");
      return;
    }

    const id = `pool-${Date.now()}`;

    const newPool: CardanoPool = {
      id,
      name: newPoolName.trim() || `Pool ${pools.length + 1}`,
      ticker: `P${pools.length + 1}`,
      stake: newPoolStake,
      delegators: 0,
      margin: 2,
      online: true,
    };

    setPools((current) => [...current, newPool]);

    if (pools.length === 0) {
      setSelectedPoolId(id);
    }

    setNewPoolName("");
    setNewPoolStake(100_000);
    resetResult();
  };

  const handleRunEpoch = () => {
    try {
      setError("");

      const simulationResult = simulateCardanoEpoch(
        epoch,
        slots,
        pools,
      );

      setResult(simulationResult);
    } catch (simulationError) {
      setResult(null);

      if (simulationError instanceof Error) {
        setError(simulationError.message);
      } else {
        setError("Simulation failed.");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            <Landmark size={16} />
            Educational Simulation — không phải dữ liệu mạng thật
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Cardano — Stake Pool & Epoch
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Mô phỏng luồng Epoch → Slots → Stake Pools → Stake → Slot
            Leader → Block.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-2 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-3 text-sm text-yellow-300">
          <Info size={16} />
          Đây là mô phỏng giáo dục đơn giản, không phải triển khai đầy đủ
          Ouroboros và không kết nối mạng Cardano thật.
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-3">
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
            <h2 className="mb-5 font-semibold text-white">
              Danh sách Stake Pool
            </h2>

            <div className="space-y-3">
              {pools.map((pool) => {
                const share =
                  totalNetworkStake > 0
                    ? (pool.stake / totalNetworkStake) * 100
                    : 0;

                const active = selectedPool?.id === pool.id;

                return (
                  <button
                    key={pool.id}
                    type="button"
                    data-pool-id={pool.id}
                    onClick={handleSelectPool}
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
                        <Users size={12} />
                        {pool.delegators} delegators
                      </span>

                      <span>
                        {pool.stake.toLocaleString()} ADA (
                        {share.toFixed(1)}%)
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-purple-400/20 bg-purple-400/[0.04] p-6">
            <h2 className="mb-4 font-semibold text-white">
              Mô phỏng Delegate
            </h2>

            {selectedPool ? (
              <>
                <label className="mb-2 block text-xs text-slate-500">
                  Số ADA delegate vào {selectedPool.name}
                </label>

                <input
                  type="number"
                  value={delegateAmount}
                  onChange={(event) =>
                    setDelegateAmount(Number(event.target.value))
                  }
                  className="mb-5 w-full rounded-2xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-white outline-none focus:border-purple-400/50"
                />

                <div className="space-y-3 rounded-2xl border border-white/5 bg-[#050816] p-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Tỉ lệ đóng góp của bạn
                    </span>

                    <span className="text-white">
                      {estimatedShare.toFixed(4)}%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Margin của pool
                    </span>

                    <span className="text-white">
                      {selectedPool.margin}%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Tổng stake sau delegate
                    </span>

                    <span className="text-white">
                      {(
                        selectedPool.stake + delegateAmount
                      ).toLocaleString()}{" "}
                      ADA
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500">
                Chưa có Stake Pool.
              </p>
            )}
          </section>
        </div>

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-5 font-semibold text-white">
            Epoch / Slot Leader Experiment
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="text-sm text-slate-400">
              Epoch
              <input
                type="number"
                min="0"
                value={epoch}
                onChange={(event) =>
                  setEpoch(Number(event.target.value))
                }
                className="mt-2 block w-full rounded-xl border border-white/10 bg-[#050816] px-4 py-3 text-white"
              />
            </label>

            <label className="text-sm text-slate-400">
              Số Slot
              <input
                type="number"
                min="1"
                max="500"
                value={slots}
                onChange={(event) =>
                  setSlots(Number(event.target.value))
                }
                className="mt-2 block w-full rounded-xl border border-white/10 bg-[#050816] px-4 py-3 text-white"
              />
            </label>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleRunEpoch}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3 font-semibold text-white"
              >
                <Play size={15} />
                Run Epoch
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/5 px-4 py-3 text-sm text-rose-300">
              {error}
            </div>
          )}

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {pools.map((pool) => (
              <article
                key={pool.id}
                className="rounded-2xl border border-white/5 bg-[#050816] p-4"
              >
                <div className="mb-3 font-semibold text-white">
                  {pool.name}
                </div>

                <label className="text-xs text-slate-500">
                  Stake
                  <input
                    type="number"
                    min="0"
                    data-pool-id={pool.id}
                    value={pool.stake}
                    onChange={handlePoolStakeChange}
                    className="mt-2 block w-full rounded-xl border border-white/10 bg-[#0b1020] px-3 py-2 text-sm text-white"
                  />
                </label>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    data-pool-id={pool.id}
                    onClick={handleTogglePool}
                    className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300"
                  >
                    {pool.online ? "Set Offline" : "Set Online"}
                  </button>

                  <button
                    type="button"
                    data-pool-id={pool.id}
                    onClick={handleRemovePool}
                    className="flex items-center gap-1 rounded-lg border border-rose-400/20 px-3 py-2 text-xs text-rose-300"
                  >
                    <Trash2 size={12} />
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4 flex items-center gap-2 font-semibold text-white">
            <Plus size={16} />
            Add Stake Pool
          </div>

          <form
            onSubmit={handleAddPool}
            className="grid gap-3 md:grid-cols-3"
          >
            <input
              type="text"
              value={newPoolName}
              onChange={(event) => setNewPoolName(event.target.value)}
              placeholder="Tên Pool"
              className="rounded-xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-white"
            />

            <input
              type="number"
              min="1"
              value={newPoolStake}
              onChange={(event) =>
                setNewPoolStake(Number(event.target.value))
              }
              className="rounded-xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-white"
            />

            <button
              type="submit"
              className="rounded-xl bg-purple-500 px-4 py-3 font-semibold text-white"
            >
              Add Pool
            </button>
          </form>
        </section>

        {result && (
          <>
            <section className="mb-6 grid gap-4 md:grid-cols-3">
              <StatBox
                label="Epoch"
                value={result.epoch.toString()}
              />

              <StatBox
                label="Slots mô phỏng"
                value={result.slots.toString()}
              />

              <StatBox
                label="Active Stake"
                value={result.totalStake.toLocaleString()}
              />
            </section>

            <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="mb-4 font-semibold text-white">
                Blocks Produced
              </h2>

              <div className="grid gap-3 md:grid-cols-3">
                {pools.map((pool) => (
                  <div
                    key={pool.id}
                    className="rounded-2xl border border-white/5 bg-[#050816] p-4"
                  >
                    <div className="font-semibold text-white">
                      {pool.name}
                    </div>

                    <div className="mt-2 text-2xl font-bold text-purple-300">
                      {result.blockCountByPool[pool.id] ?? 0}
                    </div>

                    <div className="text-xs text-slate-500">
                      block
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="mb-4 font-semibold text-white">
                Slot Leaders
              </h2>

              <div className="max-h-[420px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="text-slate-500">
                    <tr>
                      <th className="px-3 py-2 text-left">
                        Slot
                      </th>
                      <th className="px-3 py-2 text-left">
                        Leader
                      </th>
                      <th className="px-3 py-2 text-left">
                        Result
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {result.slotResults.map((slotResult) => (
                      <tr
                        key={slotResult.slot}
                        className="border-t border-white/5"
                      >
                        <td className="px-3 py-3 text-white">
                          #{slotResult.slot}
                        </td>

                        <td className="px-3 py-3 text-purple-300">
                          {slotResult.leaderPoolName}
                        </td>

                        <td className="px-3 py-3 text-emerald-300">
                          Block produced
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}