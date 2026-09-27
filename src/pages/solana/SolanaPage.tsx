import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import {
  Activity,
  Info,
  Plus,
  Trash2,
  Vote,
  Zap,
} from "lucide-react";

import {
  calculateEffectiveStake,
  simulateStakeWeightedVote,
} from "../../lib/solana/solanaSimulator";

import type {
  Delegator,
  SolanaValidator,
  SolanaVoteResult,
  ValidatorVote,
  VoteChoice,
} from "../../types/solana";

interface Slot {
  slot: number;
  leader: string;
  txCount: number;
}

const slotValidators = [
  "Validator-1",
  "Validator-2",
  "Validator-3",
  "Validator-4",
];

function generateSlots(count: number): Slot[] {
  return Array.from({ length: count }, (_, index) => ({
    slot: index + 1,
    leader:
      slotValidators[
        Math.floor(Math.random() * slotValidators.length)
      ],
    txCount: Math.floor(Math.random() * 2000) + 200,
  }));
}

const initialValidators: SolanaValidator[] = [
  {
    id: "validator-a",
    name: "Validator A",
    ownStake: 200,
    online: true,
  },
  {
    id: "validator-b",
    name: "Validator B",
    ownStake: 100,
    online: true,
  },
  {
    id: "validator-c",
    name: "Validator C",
    ownStake: 150,
    online: true,
  },
];

const initialDelegators: Delegator[] = [
  {
    id: "delegator-alice",
    name: "Alice",
    stake: 100,
    validatorId: "validator-a",
  },
  {
    id: "delegator-bob",
    name: "Bob",
    stake: 300,
    validatorId: "validator-b",
  },
  {
    id: "delegator-carol",
    name: "Carol",
    stake: 150,
    validatorId: "validator-c",
  },
];

const initialVotes: ValidatorVote[] = [
  {
    validatorId: "validator-a",
    choice: "approve",
  },
  {
    validatorId: "validator-b",
    choice: "approve",
  },
  {
    validatorId: "validator-c",
    choice: "reject",
  },
];

export default function SolanaPage() {
  const [slots, setSlots] = useState<Slot[]>(generateSlots(8));

  const [validators, setValidators] =
    useState<SolanaValidator[]>(initialValidators);

  const [delegators, setDelegators] =
    useState<Delegator[]>(initialDelegators);

  const [votes, setVotes] =
    useState<ValidatorVote[]>(initialVotes);

  const [result, setResult] =
    useState<SolanaVoteResult | null>(null);

  const [error, setError] = useState("");

  const [newValidatorName, setNewValidatorName] =
    useState("");

  const [newValidatorStake, setNewValidatorStake] =
    useState(100);

  const totalTx = slots.reduce(
    (sum, slot) => sum + slot.txCount,
    0,
  );

  const resetVoteResult = () => {
    setResult(null);
    setError("");
  };

  const handleValidatorStakeChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const validatorId =
      event.currentTarget.dataset.validatorId;

    if (!validatorId) {
      return;
    }

    const ownStake = Math.max(
      0,
      Number(event.target.value),
    );

    setValidators((current) =>
      current.map((validator) =>
        validator.id === validatorId
          ? { ...validator, ownStake }
          : validator,
      ),
    );

    resetVoteResult();
  };

  const handleToggleValidator = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const validatorId =
      event.currentTarget.dataset.validatorId;

    if (!validatorId) {
      return;
    }

    setValidators((current) =>
      current.map((validator) =>
        validator.id === validatorId
          ? {
              ...validator,
              online: !validator.online,
            }
          : validator,
      ),
    );

    resetVoteResult();
  };

  const handleVoteChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const validatorId =
      event.currentTarget.dataset.validatorId;

    if (!validatorId) {
      return;
    }

    const choice = event.target.value as VoteChoice;

    setVotes((current) =>
      current.map((vote) =>
        vote.validatorId === validatorId
          ? { ...vote, choice }
          : vote,
      ),
    );

    resetVoteResult();
  };

  const handleDelegatorStakeChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const delegatorId =
      event.currentTarget.dataset.delegatorId;

    if (!delegatorId) {
      return;
    }

    const stake = Math.max(
      0,
      Number(event.target.value),
    );

    setDelegators((current) =>
      current.map((delegator) =>
        delegator.id === delegatorId
          ? { ...delegator, stake }
          : delegator,
      ),
    );

    resetVoteResult();
  };

  const handleDelegationChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const delegatorId =
      event.currentTarget.dataset.delegatorId;

    if (!delegatorId) {
      return;
    }

    setDelegators((current) =>
      current.map((delegator) =>
        delegator.id === delegatorId
          ? {
              ...delegator,
              validatorId: event.target.value,
            }
          : delegator,
      ),
    );

    resetVoteResult();
  };

  const handleAddValidator = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (newValidatorStake < 0) {
      setError("Stake không được âm.");
      return;
    }

    const id = `validator-${Date.now()}`;

    const validator: SolanaValidator = {
      id,
      name:
        newValidatorName.trim() ||
        `Validator ${validators.length + 1}`,
      ownStake: newValidatorStake,
      online: true,
    };

    setValidators((current) => [
      ...current,
      validator,
    ]);

    setVotes((current) => [
      ...current,
      {
        validatorId: id,
        choice: "approve",
      },
    ]);

    setNewValidatorName("");
    setNewValidatorStake(100);

    resetVoteResult();
  };

  const handleRemoveValidator = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const validatorId =
      event.currentTarget.dataset.validatorId;

    if (!validatorId) {
      return;
    }

    const remainingValidators = validators.filter(
      (validator) => validator.id !== validatorId,
    );

    const fallbackValidatorId =
      remainingValidators[0]?.id ?? "";

    setValidators(remainingValidators);

    setVotes((current) =>
      current.filter(
        (vote) => vote.validatorId !== validatorId,
      ),
    );

    setDelegators((current) =>
      current.map((delegator) =>
        delegator.validatorId === validatorId
          ? {
              ...delegator,
              validatorId: fallbackValidatorId,
            }
          : delegator,
      ),
    );

    resetVoteResult();
  };

  const handleRunVote = () => {
    try {
      setError("");

      const simulationResult =
        simulateStakeWeightedVote(
          validators,
          delegators,
          votes,
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
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-sm text-purple-300">
            <Zap size={16} />
            Educational Simulation — không phải dữ liệu mạng thật
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Solana — Slot, Validator & Voting
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            Quan sát Slot/Block Production và thử thay đổi Validator,
            Stake, Delegation để xem stake-weighted voting thay đổi.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-2 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-3 text-sm text-yellow-300">
          <Info size={16} />
          Toàn bộ dữ liệu là mô phỏng phục vụ học tập, không kết nối
          mạng Solana thật.
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatBox
            label="Tổng số Slot"
            value={slots.length.toString()}
          />

          <StatBox
            label="Tổng Transaction"
            value={totalTx.toLocaleString()}
          />

          <StatBox
            label="TX trung bình / Slot"
            value={Math.round(
              totalTx / slots.length,
            ).toString()}
          />

          <StatBox
            label="Số Validator"
            value={validators.length.toString()}
          />
        </div>

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-white">
              Slot gần nhất
            </h2>

            <button
              type="button"
              onClick={() => setSlots(generateSlots(8))}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >
              <Activity size={15} />
              Tạo slot mới
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            {slots.map((slot) => (
              <div
                key={slot.slot}
                className="rounded-2xl border border-white/5 bg-[#050816] p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Slot #{slot.slot}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>

                <div className="mb-1 text-sm font-semibold text-white">
                  {slot.leader}
                </div>

                <div className="text-xs text-purple-300">
                  {slot.txCount.toLocaleString()} tx
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex items-center gap-2">
            <Vote size={18} className="text-purple-300" />

            <h2 className="font-semibold text-white">
              Stake-Weighted Voting Experiment
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {validators.map((validator) => {
              const delegatedStake = delegators
                .filter(
                  (delegator) =>
                    delegator.validatorId === validator.id,
                )
                .reduce(
                  (sum, delegator) =>
                    sum + delegator.stake,
                  0,
                );

              const effectiveStake =
                calculateEffectiveStake(
                  validator,
                  delegators,
                );

              const vote =
                votes.find(
                  (item) =>
                    item.validatorId === validator.id,
                )?.choice ?? "approve";

              return (
                <article
                  key={validator.id}
                  className="rounded-2xl border border-white/5 bg-[#050816] p-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-white">
                      {validator.name}
                    </h3>

                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        validator.online
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-rose-400/10 text-rose-300"
                      }`}
                    >
                      {validator.online
                        ? "Online"
                        : "Offline"}
                    </span>
                  </div>

                  <label className="text-xs text-slate-500">
                    Own Stake
                    <input
                      type="number"
                      min="0"
                      data-validator-id={validator.id}
                      value={validator.ownStake}
                      onChange={handleValidatorStakeChange}
                      className="mt-2 block w-full rounded-xl border border-white/10 bg-[#0b1020] px-3 py-2 text-sm text-white"
                    />
                  </label>

                  <div className="mt-3 text-sm text-slate-400">
                    Delegated Stake:{" "}
                    <strong className="text-white">
                      {delegatedStake}
                    </strong>
                  </div>

                  <div className="mt-1 text-sm text-slate-400">
                    Effective Stake:{" "}
                    <strong className="text-purple-300">
                      {effectiveStake}
                    </strong>
                  </div>

                  <label className="mt-4 block text-xs text-slate-500">
                    Vote
                    <select
                      data-validator-id={validator.id}
                      value={vote}
                      onChange={handleVoteChange}
                      className="mt-2 block w-full rounded-xl border border-white/10 bg-[#0b1020] px-3 py-2 text-sm text-white"
                    >
                      <option value="approve">
                        Approve
                      </option>

                      <option value="reject">
                        Reject
                      </option>
                    </select>
                  </label>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      data-validator-id={validator.id}
                      onClick={handleToggleValidator}
                      className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300"
                    >
                      {validator.online
                        ? "Set Offline"
                        : "Set Online"}
                    </button>

                    <button
                      type="button"
                      data-validator-id={validator.id}
                      onClick={handleRemoveValidator}
                      className="flex items-center gap-1 rounded-lg border border-rose-400/20 px-3 py-2 text-xs text-rose-300"
                    >
                      <Trash2 size={12} />
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-5 font-semibold text-white">
            Delegators
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {delegators.map((delegator) => (
              <article
                key={delegator.id}
                className="rounded-2xl border border-white/5 bg-[#050816] p-5"
              >
                <h3 className="mb-4 font-semibold text-white">
                  {delegator.name}
                </h3>

                <label className="text-xs text-slate-500">
                  Stake
                  <input
                    type="number"
                    min="0"
                    data-delegator-id={delegator.id}
                    value={delegator.stake}
                    onChange={handleDelegatorStakeChange}
                    className="mt-2 block w-full rounded-xl border border-white/10 bg-[#0b1020] px-3 py-2 text-sm text-white"
                  />
                </label>

                <label className="mt-4 block text-xs text-slate-500">
                  Delegate to
                  <select
                    data-delegator-id={delegator.id}
                    value={delegator.validatorId}
                    onChange={handleDelegationChange}
                    className="mt-2 block w-full rounded-xl border border-white/10 bg-[#0b1020] px-3 py-2 text-sm text-white"
                  >
                    {validators.length === 0 && (
                      <option value="">
                        No validator
                      </option>
                    )}

                    {validators.map((validator) => (
                      <option
                        key={validator.id}
                        value={validator.id}
                      >
                        {validator.name}
                      </option>
                    ))}
                  </select>
                </label>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4 flex items-center gap-2 font-semibold text-white">
            <Plus size={16} />
            Add Validator
          </div>

          <form
            onSubmit={handleAddValidator}
            className="grid gap-3 md:grid-cols-3"
          >
            <input
              type="text"
              value={newValidatorName}
              onChange={(event) =>
                setNewValidatorName(event.target.value)
              }
              placeholder="Validator name"
              className="rounded-xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-white"
            />

            <input
              type="number"
              min="0"
              value={newValidatorStake}
              onChange={(event) =>
                setNewValidatorStake(
                  Number(event.target.value),
                )
              }
              className="rounded-xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-white"
            />

            <button
              type="submit"
              className="rounded-xl bg-purple-500 px-4 py-3 font-semibold text-white"
            >
              Add Validator
            </button>
          </form>
        </section>

        {error && (
          <div className="mb-6 rounded-2xl border border-rose-400/20 bg-rose-400/5 px-5 py-3 text-sm text-rose-300">
            {error}
          </div>
        )}

        <section className="mb-6 text-center">
          <button
            type="button"
            onClick={handleRunVote}
            className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-7 py-3 font-semibold text-white"
          >
            Run Stake-Weighted Vote
          </button>
        </section>

        {result && (
          <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-5 font-semibold text-white">
              Consensus Result
            </h2>

            <div className="mb-5 grid gap-4 md:grid-cols-3">
              <StatBox
                label="Total Voting Stake"
                value={result.totalVotingStake.toString()}
              />

              <StatBox
                label="Approve"
                value={`${result.approveStake} (${result.approvePercentage.toFixed(
                  1,
                )}%)`}
              />

              <StatBox
                label="Reject"
                value={`${result.rejectStake} (${result.rejectPercentage.toFixed(
                  1,
                )}%)`}
              />
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full bg-emerald-400 transition-all"
                style={{
                  width: `${result.approvePercentage}%`,
                }}
              />
            </div>

            <div
              className={`mt-5 rounded-2xl border p-4 text-center font-semibold ${
                result.consensusReached
                  ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-300"
                  : "border-rose-400/20 bg-rose-400/5 text-rose-300"
              }`}
            >
              {result.consensusReached
                ? "Consensus reached — Block accepted"
                : "Consensus not reached — Block rejected"}
            </div>

            <div className="mt-5 space-y-2">
              {result.validatorResults.map(
                (validatorResult) => (
                  <div
                    key={validatorResult.validatorId}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/5 bg-[#050816] px-4 py-3 text-sm"
                  >
                    <span className="font-semibold text-white">
                      {validatorResult.validatorName}
                    </span>

                    <span className="text-slate-400">
                      Stake weight:{" "}
                      {validatorResult.effectiveStake}
                    </span>

                    <span
                      className={
                        validatorResult.choice ===
                        "approve"
                          ? "text-emerald-300"
                          : "text-rose-300"
                      }
                    >
                      {validatorResult.choice.toUpperCase()}
                    </span>
                  </div>
                ),
              )}
            </div>
          </section>
        )}

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-4 font-semibold text-white">
            Ý nghĩa thí nghiệm
          </h2>

          <p className="text-sm leading-6 text-slate-400">
            Delegator thay đổi stake hoặc chuyển delegation sẽ làm thay đổi
            voting weight của validator. Trong mô phỏng này, block được chấp
            nhận khi ít nhất 2/3 tổng stake đang tham gia voting chọn
            Approve.
          </p>
        </section>
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
      <div className="text-2xl font-bold text-white">
        {value}
      </div>

      <div className="text-xs text-slate-500">
        {label}
      </div>
    </div>
  );
}