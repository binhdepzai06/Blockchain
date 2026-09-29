import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Cpu,
  LockKeyhole,
  Network,
  ShieldAlert,
} from "lucide-react";

import type {
  AttackParameters,
  AttackType,
} from "../../types/attack";

import {
  createInitialState,
  stepAttack,
} from "../../simulation/attacks/attackEngine";

import AttackSelector from "./AttackSelector";
import AttackParametersPanel from "./AttackParameters";
import NetworkVisualization from "./NetworkVisualization";
import BlockchainTimeline from "./BlockchainTimeline";
import AttackEventLog from "./AttackEventLog";
import AttackResult from "./AttackResult";

const DEFAULT_PARAMETERS: AttackParameters = {
  hashPower: 60,
  attackerNodes: 5,
  targetNode: "Node-03",
  attackSpeed: 1,
  confirmations: 3,
};

export default function AttackSimulator() {
  const [attackType, setAttackType] =
    useState<AttackType>("51_PERCENT");

  const [parameters, setParameters] =
    useState<AttackParameters>(
      DEFAULT_PARAMETERS,
    );

  const [state, setState] =
    useState(() =>
      createInitialState(
        "51_PERCENT",
        DEFAULT_PARAMETERS,
      ),
    );

  const [running, setRunning] =
    useState(false);

  const targetNodes = useMemo(
    () =>
      state.nodes
        .filter(
          (node) =>
            node.role !== "ATTACKER",
        )
        .map((node) => node.id),
    [state.nodes],
  );

  function changeAttack(
    type: AttackType,
  ) {
    setAttackType(type);
    setRunning(false);

    setState(
      createInitialState(
        type,
        parameters,
      ),
    );
  }

  function updateParameters(
    changes: Partial<AttackParameters>,
  ) {
    const next = {
      ...parameters,
      ...changes,
    };

    setParameters(next);

    if (!running) {
      setState(
        createInitialState(
          attackType,
          next,
        ),
      );
    }
  }

  function startAttack() {
    setRunning(true);

    setState((current) => ({
      ...current,
      status: "RUNNING",
    }));
  }

  function stopAttack() {
    setRunning(false);

    setState((current) => ({
      ...current,
      status: "STOPPED",
    }));
  }

  function resetAttack() {
    setRunning(false);

    setState(
      createInitialState(
        attackType,
        parameters,
      ),
    );
  }

  function stepSimulation() {
    setState((current) => {
      const next = stepAttack({
        ...current,
        status: "RUNNING",
      });

      if (
        next.status === "SUCCESS"
      ) {
        setRunning(false);
      }

      return next;
    });
  }

  useEffect(() => {
    if (!running) {
      return;
    }

    const intervalTime =
      Math.max(
        300,
        1100 /
          parameters.attackSpeed,
      );

    const interval =
      window.setInterval(() => {
        setState((current) => {
          const next =
            stepAttack(current);

          if (
            next.status === "SUCCESS"
          ) {
            setRunning(false);
          }

          return next;
        });
      }, intervalTime);

    return () =>
      window.clearInterval(
        interval,
      );
  }, [
    running,
    parameters.attackSpeed,
  ]);

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[-15%] h-[420px] w-[420px] rounded-full bg-blue-500/[0.07] blur-[120px]" />

        <div className="absolute right-[5%] top-[30%] h-[360px] w-[360px] rounded-full bg-purple-500/[0.05] blur-[120px]" />

        <div className="absolute bottom-[-10%] left-[40%] h-[300px] w-[300px] rounded-full bg-cyan-500/[0.04] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 py-8 lg:px-8">
        {/* HEADER */}
        <header className="mb-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10">
                  <ShieldAlert
                    size={19}
                    className="text-red-400"
                  />
                </div>

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">
                  Blockchain Security Laboratory
                </span>
              </div>

              <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                Attack{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Simulator
                </span>
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                Môi trường mô phỏng trực quan các cơ
                chế tấn công và lỗ hổng bảo mật trong
                blockchain network. Quan sát network,
                transaction, mining và chain state theo
                thời gian thực.
              </p>
            </div>

            {/* HEADER STATS */}
            <div className="grid grid-cols-3 gap-2">
              <HeaderStat
                icon={<Network size={15} />}
                label="Nodes"
                value={String(
                  state.nodes.length,
                )}
              />

              <HeaderStat
                icon={<Cpu size={15} />}
                label="Blocks"
                value={String(
                  state.publicChain.length,
                )}
              />

              <HeaderStat
                icon={
                  <Activity size={15} />
                }
                label="Step"
                value={String(
                  state.currentStep,
                )}
              />
            </div>
          </div>
        </header>

        {/* MAIN GRID */}
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* LEFT */}
          <AttackSelector
            selected={attackType}
            onSelect={changeAttack}
          />

          {/* RIGHT */}
          <div className="min-w-0 flex-1 space-y-5">
            {/* NETWORK */}
            <NetworkVisualization
              nodes={state.nodes}
              links={state.links}
            />

            {/* PARAMETERS */}
            <AttackParametersPanel
              parameters={parameters}
              status={state.status}
              targetNodes={targetNodes}
              onChange={updateParameters}
              onStart={startAttack}
              onStep={stepSimulation}
              onStop={stopAttack}
              onReset={resetAttack}
            />

            {/* BLOCKCHAIN */}
            <BlockchainTimeline
              publicChain={
                state.publicChain
              }
              privateChain={
                state.privateChain
              }
            />

            {/* LOG + RESULT */}
            <div className="grid gap-5 xl:grid-cols-2">
              <AttackEventLog
                events={state.events}
              />

              <AttackResult
                state={state}
              />
            </div>
          </div>
        </div>

        {/* FOOTER INFORMATION */}
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <InfoCard
            icon={
              <LockKeyhole size={17} />
            }
            title="Controlled Environment"
            description="Tất cả attack đều chạy trên dữ liệu mô phỏng của CryptoLab."
          />

          <InfoCard
            icon={<Network size={17} />}
            title="Network Visualization"
            description="Quan sát peer connections và node state trực tiếp."
          />

          <InfoCard
            icon={<Cpu size={17} />}
            title="State-Based Simulation"
            description="Attack được xử lý theo từng event và simulation step."
          />
        </div>
      </div>
    </main>
  );
}

function HeaderStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-[90px] rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-slate-600">
        {icon}
        {label}
      </div>

      <div className="mt-1 text-lg font-bold text-white">
        {value}
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
        <span className="text-blue-400">
          {icon}
        </span>

        {title}
      </div>

      <p className="mt-2 text-xs leading-5 text-slate-600">
        {description}
      </p>
    </div>
  );
}