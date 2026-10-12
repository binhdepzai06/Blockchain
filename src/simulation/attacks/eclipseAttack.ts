import type { AttackState } from "../../types/attack";
import { createEvent } from "./attackEngine";
import { tr } from "../../i18n";

export function initializeEclipseAttack(
  state: AttackState,
): AttackState {
  return {
    ...state,

    resultTitle: tr("Mô phỏng tấn công Eclipse"),

    resultDescription:
      tr("Attacker cố gắng kiểm soát các peer connections của target node."),

    events: [
      ...state.events,
      createEvent(
        `Target node selected: ${state.parameters.targetNode}.`,
        "INFO",
      ),
      createEvent(
        "Attacker begins replacing honest peer connections.",
        "ACTION",
      ),
    ],
  };
}

export function stepEclipseAttack(
  state: AttackState,
): AttackState {
  const step = state.currentStep + 1;

  const nodes = state.nodes.map(
    (node) => ({
      ...node,
    }),
  );

  const links = state.links.map(
    (link) => ({
      ...link,
    }),
  );

  const events = [...state.events];

  const target = nodes.find(
    (node) =>
      node.id === state.parameters.targetNode,
  );

  if (!target) {
    return {
      ...state,
      status: "FAILED",
      resultTitle: tr("Không tìm thấy Node mục tiêu"),
      resultDescription:
        tr("Không tìm thấy target node."),
      resultImpact: "LOW",
    };
  }

  target.role = "TARGET";

  const targetLinks = links.filter(
    (link) =>
      link.source === target.id ||
      link.target === target.id,
  );

  const controlledCount =
    targetLinks.filter(
      (link) =>
        link.attackerControlled,
    ).length;

  const nextLink =
    targetLinks.find(
      (link) =>
        !link.attackerControlled,
    );

  if (nextLink) {
    nextLink.attackerControlled = true;

    events.push(
      createEvent(
        `Attacker replaced one honest peer connection around ${target.id}.`,
        "ACTION",
      ),
    );
  }

  const totalConnections =
    targetLinks.length;

  const newControlled =
    targetLinks.filter(
      (link) =>
        link.attackerControlled,
    ).length;

  const isolationRatio =
    totalConnections === 0
      ? 0
      : Math.round(
          (newControlled /
            totalConnections) *
            100,
        );

  if (
    newControlled > controlledCount
  ) {
    events.push(
      createEvent(
        `Target ${target.id}: ${isolationRatio}% of simulated peer links are attacker-controlled.`,
        "WARNING",
      ),
    );
  }

  const conditionReached =
    isolationRatio >= 75;

  if (conditionReached) {
    target.connected = false;

    events.push(
      createEvent(
        `⚠ ${target.id} is effectively eclipsed from honest peers.`,
        "SUCCESS",
      ),
    );
  }

  const progress = Math.min(
    100,
    isolationRatio,
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
      affectedNodes: 1,
      controlledNodes: newControlled,
      networkControl: isolationRatio,
      attackProgress: progress,
    },

    resultTitle:
      conditionReached
        ? tr("Node mục tiêu đã bị cô lập hoàn toàn!")
        : tr("Đang thay dần các kết nối xung quanh..."),

    resultDescription:
      tr("{0} đang dần mất các kết nối honest peer. {1}% kết nối mô phỏng hiện do attacker kiểm soát.", target.id, isolationRatio),

    resultImpact:
      conditionReached
        ? "HIGH"
        : "MEDIUM",
  };
}