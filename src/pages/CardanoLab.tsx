import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import { simulateCardanoEpoch } from "../lib/cardano/cardanoSimulator";
import type {
  CardanoEpochResult,
  StakePool,
} from "../types/cardano";

const initialPools: StakePool[] = [
  {
    id: "pool-a",
    name: "Pool A",
    stake: 100,
    online: true,
  },
  {
    id: "pool-b",
    name: "Pool B",
    stake: 500,
    online: true,
  },
  {
    id: "pool-c",
    name: "Pool C",
    stake: 250,
    online: true,
  },
];

export default function CardanoLab() {
  const [pools, setPools] =
    useState<StakePool[]>(initialPools);

  const [epoch, setEpoch] = useState(1);
  const [slots, setSlots] = useState(20);

  const [result, setResult] =
    useState<CardanoEpochResult | null>(null);

  const [error, setError] = useState("");

  const [newPoolName, setNewPoolName] =
    useState("");

  const [newPoolStake, setNewPoolStake] =
    useState(100);

  const resetResult = () => {
    setResult(null);
    setError("");
  };

  const handleEpochChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setEpoch(Number(event.target.value));
    resetResult();
  };

  const handleSlotsChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setSlots(Number(event.target.value));
    resetResult();
  };

  const handleNewPoolNameChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setNewPoolName(event.target.value);
  };

  const handleNewPoolStakeChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setNewPoolStake(Number(event.target.value));
  };

  const handleAddPool = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (newPoolStake <= 0) {
      setError("Stake must be greater than 0.");
      return;
    }

    const id = `pool-${Date.now()}`;

    const newPool: StakePool = {
      id,
      name:
        newPoolName.trim() ||
        `Pool ${pools.length + 1}`,
      stake: newPoolStake,
      online: true,
    };

    setPools((currentPools) => [
      ...currentPools,
      newPool,
    ]);

    setNewPoolName("");
    setNewPoolStake(100);
    resetResult();
  };

  const handlePoolStakeChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const poolId =
      event.currentTarget.dataset.poolId;

    if (!poolId) {
      return;
    }

    const stake = Number(event.target.value);

    setPools((currentPools) =>
      currentPools.map((pool) =>
        pool.id === poolId
          ? {
              ...pool,
              stake,
            }
          : pool,
      ),
    );

    resetResult();
  };

  const handleTogglePool = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const poolId =
      event.currentTarget.dataset.poolId;

    if (!poolId) {
      return;
    }

    setPools((currentPools) =>
      currentPools.map((pool) =>
        pool.id === poolId
          ? {
              ...pool,
              online: !pool.online,
            }
          : pool,
      ),
    );

    resetResult();
  };

  const handleRemovePool = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const poolId =
      event.currentTarget.dataset.poolId;

    if (!poolId) {
      return;
    }

    setPools((currentPools) =>
      currentPools.filter(
        (pool) => pool.id !== poolId,
      ),
    );

    resetResult();
  };

  const handleRunSimulation = () => {
    try {
      setError("");

      const simulationResult =
        simulateCardanoEpoch(
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

  const totalConfiguredStake = pools.reduce(
    (sum, pool) =>
      sum + (pool.online ? pool.stake : 0),
    0,
  );

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
        <h1>Cardano Simulator</h1>

        <p>
          Epoch → Slots → Stake Pools → Stake →
          Slot Leader → Block
        </p>

        <p
          style={{
            color: "#a1a1aa",
          }}
        >
          Simplified educational simulation of
          stake-weighted slot leader selection.
        </p>
      </header>

      <section>
        <h2>Epoch Configuration</h2>

        <div
          style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <label>
            Epoch
            <input
              type="number"
              min="0"
              value={epoch}
              onChange={handleEpochChange}
              style={{
                marginLeft: "10px",
                padding: "8px",
                width: "100px",
              }}
            />
          </label>

          <label>
            Slots
            <input
              type="number"
              min="1"
              max="500"
              value={slots}
              onChange={handleSlotsChange}
              style={{
                marginLeft: "10px",
                padding: "8px",
                width: "100px",
              }}
            />
          </label>
        </div>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2>Stake Pools</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {pools.map((pool) => {
            const percentage =
              totalConfiguredStake > 0 &&
              pool.online
                ? (
                    (pool.stake /
                      totalConfiguredStake) *
                    100
                  ).toFixed(1)
                : "0.0";

            return (
              <article
                key={pool.id}
                style={{
                  padding: "18px",
                  border:
                    "1px solid #3f3f46",
                  borderRadius: "12px",
                  background: "#18181b",
                }}
              >
                <h3>{pool.name}</h3>

                <p>
                  Status:{" "}
                  <strong
                    style={{
                      color: pool.online
                        ? "#4ade80"
                        : "#f87171",
                    }}
                  >
                    {pool.online
                      ? "Online"
                      : "Offline"}
                  </strong>
                </p>

                <label>
                  Stake
                  <input
                    data-pool-id={pool.id}
                    type="number"
                    min="0"
                    value={pool.stake}
                    onChange={
                      handlePoolStakeChange
                    }
                    style={{
                      width: "100px",
                      marginLeft: "8px",
                      padding: "6px",
                    }}
                  />
                </label>

                <p>
                  Stake share:{" "}
                  <strong>
                    {percentage}%
                  </strong>
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    data-pool-id={pool.id}
                    onClick={handleTogglePool}
                  >
                    Set{" "}
                    {pool.online
                      ? "Offline"
                      : "Online"}
                  </button>

                  <button
                    type="button"
                    data-pool-id={pool.id}
                    onClick={handleRemovePool}
                  >
                    Remove
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2>Add Stake Pool</h2>

        <form
          onSubmit={handleAddPool}
          style={{
            padding: "20px",
            background: "#18181b",
            border:
              "1px solid #3f3f46",
            borderRadius: "12px",
          }}
        >
          <input
            type="text"
            value={newPoolName}
            onChange={handleNewPoolNameChange}
            placeholder="Pool name"
            style={{
              padding: "8px",
              marginRight: "10px",
            }}
          />

          <input
            type="number"
            min="1"
            value={newPoolStake}
            onChange={handleNewPoolStakeChange}
            style={{
              padding: "8px",
              width: "120px",
              marginRight: "10px",
            }}
          />

          <button type="submit">
            Add Pool
          </button>
        </form>
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
          onClick={handleRunSimulation}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Run Epoch Simulation
        </button>
      </section>

      {result && (
        <>
          <section style={{ marginTop: "32px" }}>
            <h2>Epoch Result</h2>

            <p>
              Epoch:{" "}
              <strong>{result.epoch}</strong>
            </p>

            <p>
              Slots simulated:{" "}
              <strong>{result.slots}</strong>
            </p>

            <p>
              Active stake:{" "}
              <strong>
                {result.totalStake}
              </strong>
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2>Blocks Produced</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "12px",
              }}
            >
              {pools.map((pool) => (
                <article
                  key={pool.id}
                  style={{
                    padding: "16px",
                    background: "#18181b",
                    border:
                      "1px solid #3f3f46",
                    borderRadius: "10px",
                  }}
                >
                  <strong>{pool.name}</strong>

                  <p>
                    {
                      result.blockCountByPool[
                        pool.id
                      ]
                    }{" "}
                    blocks
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2>Slot Leaders</h2>

            <div
              style={{
                maxHeight: "420px",
                overflowY: "auto",
                border:
                  "1px solid #3f3f46",
                borderRadius: "12px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "10px",
                      }}
                    >
                      Slot
                    </th>

                    <th
                      style={{
                        padding: "10px",
                      }}
                    >
                      Slot Leader
                    </th>

                    <th
                      style={{
                        padding: "10px",
                      }}
                    >
                      Result
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {result.slotResults.map(
                    (slotResult) => (
                      <tr
                        key={`slot-${slotResult.slot}`}
                      >
                        <td
                          style={{
                            padding: "10px",
                            textAlign:
                              "center",
                          }}
                        >
                          {slotResult.slot}
                        </td>

                        <td
                          style={{
                            padding: "10px",
                            textAlign:
                              "center",
                          }}
                        >
                          {
                            slotResult.leaderPoolName
                          }
                        </td>

                        <td
                          style={{
                            padding: "10px",
                            textAlign:
                              "center",
                            color:
                              "#4ade80",
                          }}
                        >
                          Block produced
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </main>
  );
}