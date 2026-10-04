import type { AttackNode, AttackState } from "../../types/attack";
import { createEvent } from "./attackEngine";

export function initializeSybilAttack(
  state: AttackState,
): AttackState {
  return {
    ...state,

    resultTitle: "Mô phỏng tấn công Sybil",

    resultDescription:
      "Attacker sẽ tạo thêm nhiều node giả để tăng tỷ lệ identity do attacker kiểm soát.",

    events: [
      ...state.events,
      createEvent(
        "Attacker begins creating Sybil identities.",
        "ACTION",
      ),
    ],
  };
}

function createSybilNode(
  index: number,
): AttackNode {
  const positions = [
    [10, 10],
    [25, 35],
    [45, 8],
    [70, 35],
    [90, 12],
    [15, 70],
    [38, 90],
    [60, 12],
    [88, 70],
    [70, 92],
  ];

  const position =
    positions[index % positions.length];

  return {
    id: `Sybil-${String(index + 1).padStart(2, "0")}`,
    x: position[0],
    y: position[1],
    role: "ATTACKER",
    online: true,
    connected: true,
    peers: [],
  };
}

export function stepSybilAttack(
  state: AttackState,
): AttackState {
  const step = state.currentStep + 1;

  const nodes = [...state.nodes];
  const links = [...state.links];
  const events = [...state.events];

  const desiredNodes =
    state.parameters.attackerNodes;

  const currentSybilCount =
    nodes.filter(
      (node) => node.role === "ATTACKER",
    ).length;

  if (
    currentSybilCount < desiredNodes
  ) {
    const newNode =
      createSybilNode(currentSybilCount);

    nodes.push(newNode);

    const honestNode =
      nodes.find(
        (node) => node.role === "HONEST",
      );

    if (honestNode) {
      links.push({
        source: newNode.id,
        target: honestNode.id,
        attackerControlled: true,
        active: true,
      });
    }

    events.push(
      createEvent(
        `Sybil identity ${newNode.id} joined the network.`,
        "ACTION",
      ),
    );
  }

  const totalNodes = nodes.length;

  const controlledNodes =
    nodes.filter(
      (node) => node.role === "ATTACKER",
    ).length;

  const ratio =
    totalNodes === 0
      ? 0
      : Math.round(
          (controlledNodes /
            totalNodes) *
            100,
        );

  const conditionReached =
    ratio >= 40;

  if (
    conditionReached &&
    step % 2 === 0
  ) {
    events.push(
      createEvent(
        `⚠ Sybil identities now represent ${ratio}% of visible nodes.`,
        "WARNING",
      ),
    );
  }

  if (
    conditionReached &&
    ratio >= 50
  ) {
    events.push(
      createEvent(
        "Sybil dominance threshold reached in the simulation.",
        "SUCCESS",
      ),
    );
  }

  const progress = Math.min(
    100,
    Math.round(
      (controlledNodes /
        Math.max(1, desiredNodes)) *
        100,
    ),
  );

  return {
    ...state,

    status:
      conditionReached
        ? "SUCCESS"
        : "RUNNING",

    nodes,
    links,

    events: events.slice(-60),

    currentStep: step,

    attackConditionReached:
      conditionReached,

    metrics: {
      ...state.metrics,
      affectedNodes: controlledNodes,
      controlledNodes,
      networkControl: ratio,
      attackProgress: progress,
    },

    resultTitle:
      conditionReached
        ? "Node giả đã chiếm phần lớn mạng lưới!"
        : "Các Node giả đang gia nhập mạng...",

    resultDescription:
      `Attacker hiện kiểm soát ${controlledNodes}/${totalNodes} node hiển thị trong simulation.`,

    resultImpact:
      conditionReached
        ? "CRITICAL"
        : "HIGH",
  };
}