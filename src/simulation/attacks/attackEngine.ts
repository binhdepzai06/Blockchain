import type {
  AttackEvent,
  AttackNode,
  AttackParameters,
  AttackState,
  AttackType,
  NetworkLink,
  SimulatedBlock,
} from "../../types/attack";

import {
  initializeFiftyOneAttack,
  stepFiftyOneAttack,
} from "./fiftyOnePercentAttack";

import {
  initializeDoubleSpendAttack,
  stepDoubleSpendAttack,
} from "./doubleSpendAttack";

import {
  initializeSybilAttack,
  stepSybilAttack,
} from "./sybilAttack";

import {
  initializeEclipseAttack,
  stepEclipseAttack,
} from "./eclipseAttack";

import {
  initializeSelfishMiningAttack,
  stepSelfishMiningAttack,
} from "./selfishMiningAttack";

function createId(prefix: string, number: number) {
  return `${prefix}-${number}`;
}

function createHash(seed: string) {
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash).toString(16).padStart(8, "0");
}

export function createBaseNodes(): AttackNode[] {
  const positions = [
    [15, 25],
    [32, 15],
    [50, 25],
    [68, 15],
    [85, 30],
    [22, 55],
    [42, 48],
    [62, 55],
    [82, 55],
    [32, 82],
    [52, 78],
    [72, 82],
  ];

  return positions.map(([x, y], index) => ({
    id: `Node-${String(index + 1).padStart(2, "0")}`,
    x,
    y,
    role: "HONEST",
    online: true,
    connected: true,
    peers: [],
  }));
}

export function createBaseLinks(
  nodes: AttackNode[],
): NetworkLink[] {
  const links: NetworkLink[] = [];

  const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 5],
    [1, 6],
    [2, 6],
    [2, 7],
    [3, 7],
    [4, 8],
    [5, 6],
    [6, 7],
    [7, 8],
    [5, 9],
    [6, 10],
    [7, 10],
    [8, 11],
    [9, 10],
    [10, 11],
  ];

  connections.forEach(([source, target]) => {
    links.push({
      source: nodes[source].id,
      target: nodes[target].id,
      attackerControlled: false,
      active: true,
    });
  });

  return links;
}

function createGenesisChain(): SimulatedBlock[] {
  const blocks: SimulatedBlock[] = [];

  let previousHash = "00000000";

  for (let i = 0; i < 8; i++) {
    const hash = createHash(`genesis-${i}-${previousHash}`);

    blocks.push({
      id: `block-${i}`,
      height: i,
      hash,
      previousHash,
      miner: "HONEST",
      timestamp: Date.now() - (8 - i) * 10000,
      chain: "PUBLIC",
      confirmed: true,
    });

    previousHash = hash;
  }

  return blocks;
}

export function createBlock(
  height: number,
  previousHash: string,
  miner: "HONEST" | "ATTACKER",
  chain: "PUBLIC" | "PRIVATE",
): SimulatedBlock {
  const hash = createHash(
    `${height}-${previousHash}-${miner}-${chain}`,
  );

  return {
    id: createId("block", height),
    height,
    hash,
    previousHash,
    miner,
    timestamp: Date.now(),
    chain,
    confirmed: chain === "PUBLIC",
  };
}

export function createEvent(
  message: string,
  type: AttackEvent["type"] = "INFO",
): AttackEvent {
  return {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    message,
    type,
  };
}

export function createInitialState(
  attackType: AttackType,
  parameters?: Partial<AttackParameters>,
): AttackState {
  const nodes = createBaseNodes();
  const links = createBaseLinks(nodes);

  const finalParameters: AttackParameters = {
    hashPower: parameters?.hashPower ?? 60,
    attackerNodes: parameters?.attackerNodes ?? 5,
    targetNode: parameters?.targetNode ?? "Node-03",
    attackSpeed: parameters?.attackSpeed ?? 1,
    confirmations: parameters?.confirmations ?? 3,
  };

  const baseState: AttackState = {
    attackType,
    status: "IDLE",

    nodes,
    links,

    publicChain: createGenesisChain(),
    privateChain: [],

    events: [
      createEvent(
        "Blockchain network initialized.",
        "INFO",
      ),
      createEvent(
        `Attack laboratory ready for ${attackType}.`,
        "INFO",
      ),
    ],

    metrics: {
      blocksMined: 8,
      attackerBlocks: 0,
      honestBlocks: 8,
      affectedNodes: 0,
      controlledNodes: 0,
      networkControl: 0,
      privateChainLength: 0,
      publicChainLength: 8,
      attackProgress: 0,
    },

    parameters: finalParameters,

    currentStep: 0,

    attackConditionReached: false,

    resultTitle: "Simulation Ready",
    resultDescription:
      "Chọn START ATTACK để bắt đầu mô phỏng.",
    resultImpact: "LOW",
  };

  switch (attackType) {
    case "51_PERCENT":
      return initializeFiftyOneAttack(baseState);

    case "DOUBLE_SPEND":
      return initializeDoubleSpendAttack(baseState);

    case "SYBIL":
      return initializeSybilAttack(baseState);

    case "ECLIPSE":
      return initializeEclipseAttack(baseState);

    case "SELFISH_MINING":
      return initializeSelfishMiningAttack(baseState);

    default:
      return baseState;
  }
}

export function stepAttack(
  state: AttackState,
): AttackState {
  if (state.status === "STOPPED") {
    return state;
  }

  switch (state.attackType) {
    case "51_PERCENT":
      return stepFiftyOneAttack(state);

    case "DOUBLE_SPEND":
      return stepDoubleSpendAttack(state);

    case "SYBIL":
      return stepSybilAttack(state);

    case "ECLIPSE":
      return stepEclipseAttack(state);

    case "SELFISH_MINING":
      return stepSelfishMiningAttack(state);

    default:
      return state;
  }
}