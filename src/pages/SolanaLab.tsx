import {
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import {
  calculateEffectiveStake,
  simulateStakeWeightedVote,
} from "../lib/solana/solanaSimulator";
import type {
  Delegator,
  SolanaValidator,
  SolanaVoteResult,
  ValidatorVote,
  VoteChoice,
} from "../types/solana";

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

export default function SolanaLab() {
  const [validators, setValidators] =
    useState<SolanaValidator[]>(initialValidators);

  const [delegators, setDelegators] =
    useState<Delegator[]>(initialDelegators);

  const [votes, setVotes] =
    useState<ValidatorVote[]>(initialVotes);

  const [result, setResult] =
    useState<SolanaVoteResult | null>(null);

  const [error, setError] = useState("");

  const resetResult = () => {
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

    const stake = Number(event.target.value);

    setValidators((currentValidators) =>
      currentValidators.map((validator) =>
        validator.id === validatorId
          ? {
              ...validator,
              ownStake: stake,
            }
          : validator,
      ),
    );

    resetResult();
  };

  const handleToggleValidator = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const validatorId =
      event.currentTarget.dataset.validatorId;

    if (!validatorId) {
      return;
    }

    setValidators((currentValidators) =>
      currentValidators.map((validator) =>
        validator.id === validatorId
          ? {
              ...validator,
              online: !validator.online,
            }
          : validator,
      ),
    );

    resetResult();
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

    setVotes((currentVotes) =>
      currentVotes.map((vote) =>
        vote.validatorId === validatorId
          ? {
              ...vote,
              choice,
            }
          : vote,
      ),
    );

    resetResult();
  };

  const handleDelegatorStakeChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const delegatorId =
      event.currentTarget.dataset.delegatorId;

    if (!delegatorId) {
      return;
    }

    const stake = Number(event.target.value);

    setDelegators((currentDelegators) =>
      currentDelegators.map((delegator) =>
        delegator.id === delegatorId
          ? {
              ...delegator,
              stake,
            }
          : delegator,
      ),
    );

    resetResult();
  };

  const handleDelegationChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const delegatorId =
      event.currentTarget.dataset.delegatorId;

    if (!delegatorId) {
      return;
    }

    const validatorId = event.target.value;

    setDelegators((currentDelegators) =>
      currentDelegators.map((delegator) =>
        delegator.id === delegatorId
          ? {
              ...delegator,
              validatorId,
            }
          : delegator,
      ),
    );

    resetResult();
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
    <main
      style={{
        padding: "32px",
        maxWidth: "1200px",
        margin: "0 auto",
        color: "#ffffff",
      }}
    >
      <header
        style={{
          textAlign: "center",
          marginBottom: "32px",
        }}
      >
        <h1>Solana Simulator</h1>

        <p>
          Delegator → Stake → Validator →
          Stake-weighted Voting → Block Consensus
        </p>

        <p style={{ color: "#a1a1aa" }}>
          Simplified educational simulation.
          This is not a full implementation of Solana consensus.
        </p>
      </header>

      <section>
        <h2>Validators</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
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
              )?.choice ?? "reject";

            return (
              <article
                key={validator.id}
                style={{
                  padding: "18px",
                  background: "#18181b",
                  border: "1px solid #3f3f46",
                  borderRadius: "12px",
                }}
              >
                <h3>{validator.name}</h3>

                <p>
                  Status:{" "}
                  <strong
                    style={{
                      color: validator.online
                        ? "#4ade80"
                        : "#f87171",
                    }}
                  >
                    {validator.online
                      ? "Online"
                      : "Offline"}
                  </strong>
                </p>

                <label>
                  Own Stake
                  <input
                    data-validator-id={validator.id}
                    type="number"
                    min="0"
                    value={validator.ownStake}
                    onChange={
                      handleValidatorStakeChange
                    }
                    style={{
                      marginLeft: "8px",
                      width: "100px",
                      padding: "6px",
                    }}
                  />
                </label>

                <p>
                  Delegated Stake:{" "}
                  <strong>{delegatedStake}</strong>
                </p>

                <p>
                  Effective Stake:{" "}
                  <strong>{effectiveStake}</strong>
                </p>

                <label>
                  Vote
                  <select
                    data-validator-id={validator.id}
                    value={vote}
                    onChange={handleVoteChange}
                    style={{
                      marginLeft: "8px",
                      padding: "6px",
                    }}
                  >
                    <option value="approve">
                      Approve
                    </option>

                    <option value="reject">
                      Reject
                    </option>
                  </select>
                </label>

                <div style={{ marginTop: "14px" }}>
                  <button
                    type="button"
                    data-validator-id={validator.id}
                    onClick={handleToggleValidator}
                  >
                    Set{" "}
                    {validator.online
                      ? "Offline"
                      : "Online"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2>Delegators</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          {delegators.map((delegator) => (
            <article
              key={delegator.id}
              style={{
                padding: "18px",
                background: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: "12px",
              }}
            >
              <h3>{delegator.name}</h3>

              <label>
                Stake
                <input
                  data-delegator-id={delegator.id}
                  type="number"
                  min="0"
                  value={delegator.stake}
                  onChange={
                    handleDelegatorStakeChange
                  }
                  style={{
                    marginLeft: "8px",
                    width: "100px",
                    padding: "6px",
                  }}
                />
              </label>

              <div style={{ marginTop: "14px" }}>
                <label>
                  Delegate to
                  <select
                    data-delegator-id={delegator.id}
                    value={delegator.validatorId}
                    onChange={
                      handleDelegationChange
                    }
                    style={{
                      marginLeft: "8px",
                      padding: "6px",
                    }}
                  >
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
              </div>
            </article>
          ))}
        </div>
      </section>

      {error && (
        <p
          role="alert"
          style={{
            marginTop: "24px",
            padding: "12px",
            color: "#fca5a5",
            background: "#450a0a",
            borderRadius: "8px",
          }}
        >
          {error}
        </p>
      )}

      <section
        style={{
          marginTop: "32px",
          textAlign: "center",
        }}
      >
        <button
          type="button"
          onClick={handleRunVote}
          style={{
            padding: "12px 24px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Run Stake-Weighted Vote
        </button>
      </section>

      {result && (
        <section style={{ marginTop: "32px" }}>
          <h2>Consensus Result</h2>

          <p>
            Total voting stake:{" "}
            <strong>
              {result.totalVotingStake}
            </strong>
          </p>

          <p>
            Approve stake:{" "}
            <strong>
              {result.approveStake} (
              {result.approvePercentage.toFixed(1)}%)
            </strong>
          </p>

          <p>
            Reject stake:{" "}
            <strong>
              {result.rejectStake} (
              {result.rejectPercentage.toFixed(1)}%)
            </strong>
          </p>

          <div
            style={{
              width: "100%",
              height: "28px",
              background: "#27272a",
              borderRadius: "999px",
              overflow: "hidden",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                width: `${result.approvePercentage}%`,
                height: "100%",
                background: "#22c55e",
                transition: "width 0.3s ease",
              }}
            />
          </div>

          <h3
            style={{
              marginTop: "24px",
              color: result.consensusReached
                ? "#4ade80"
                : "#f87171",
            }}
          >
            {result.consensusReached
              ? "Consensus reached — Block accepted"
              : "Consensus not reached — Block rejected"}
          </h3>

          <p style={{ color: "#a1a1aa" }}>
            Educational rule: at least two-thirds
            of active voting stake must approve.
          </p>

          <h3>Validator Voting Weight</h3>

          <div
            style={{
              display: "grid",
              gap: "10px",
            }}
          >
            {result.validatorResults.map(
              (validatorResult) => (
                <div
                  key={validatorResult.validatorId}
                  style={{
                    padding: "12px",
                    background: "#18181b",
                    border: "1px solid #3f3f46",
                    borderRadius: "10px",
                  }}
                >
                  <strong>
                    {validatorResult.validatorName}
                  </strong>

                  {" — "}

                  Stake weight:{" "}
                  {validatorResult.effectiveStake}

                  {" — "}

                  <span
                    style={{
                      color:
                        validatorResult.choice ===
                        "approve"
                          ? "#4ade80"
                          : "#f87171",
                    }}
                  >
                    {validatorResult.choice.toUpperCase()}
                  </span>
                </div>
              ),
            )}
          </div>
        </section>
      )}
    </main>
  );
}