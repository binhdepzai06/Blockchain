import type { AttackState } from "../../types/attack";
import {
  createBlock,
  createEvent,
} from "./attackEngine";

export function initializeSelfishMiningAttack(
  state: AttackState,
): AttackState {
  return {
    ...state,

    resultTitle: "Selfish Mining Simulation",

    resultDescription:
      "Attacker giữ block trong private chain thay vì công bố ngay, sau đó lựa chọn thời điểm publish để cạnh tranh với public chain.",

    events: [
      ...state.events,
      createEvent(
        "Selfish miner starts withholding newly mined blocks.",
        "ACTION",
      ),
    ],
  };
}

export function stepSelfishMiningAttack(
  state: AttackState,
): AttackState {
  const step = state.currentStep + 1;

  let publicChain = [...state.publicChain];
  let privateChain = [...state.privateChain];

  const events = [...state.events];

  const attackerPower =
    state.parameters.hashPower;

  const attackerMines =
    Math.random() * 100 <
    attackerPower;

  if (attackerMines) {
    const previous =
      privateChain.length > 0
        ? privateChain[privateChain.length - 1]
        : publicChain[publicChain.length - 1];

    const block = createBlock(
      previous.height + 1,
      previous.hash,
      "ATTACKER",
      "PRIVATE",
    );

    privateChain.push(block);

    events.push(
      createEvent(
        `Selfish miner found block #${block.height} and withheld it.`,
        "ACTION",
      ),
    );
  } else {
    const previous =
      publicChain[publicChain.length - 1];

    const block = createBlock(
      previous.height + 1,
      previous.hash,
      "HONEST",
      "PUBLIC",
    );

    publicChain.push(block);

    events.push(
      createEvent(
        `Honest network published block #${block.height}.`,
        "INFO",
      ),
    );
  }

  if (
    privateChain.length >= 2 &&
    step % 4 === 0
  ) {
    events.push(
      createEvent(
        "Selfish miner publishes part of the private chain.",
        "WARNING",
      ),
    );

    const latestPrivate =
      privateChain[privateChain.length - 1];

    publicChain.push({
      ...latestPrivate,
      chain: "PUBLIC",
      confirmed: true,
    });

    privateChain = [];

    events.push(
      createEvent(
        `Private block #${latestPrivate.height} entered the public chain.`,
        "SUCCESS",
      ),
    );
  }

  const progress = Math.min(
    100,
    Math.round(
      (privateChain.length /
        4) *
        100,
    ),
  );

  const conditionReached =
    step >= 8 &&
    state.parameters.hashPower >= 30;

  if (conditionReached) {
    events.push(
      createEvent(
        "Selfish mining strategy demonstrated: attacker repeatedly withholds and selectively publishes blocks.",
        "SUCCESS",
      ),
    );
  }

  return {
    ...state,

    status:
      conditionReached
        ? "SUCCESS"
        : "RUNNING",

    publicChain,
    privateChain,

    events: events.slice(-60),

    currentStep: step,

    attackConditionReached:
      conditionReached,

    metrics: {
      ...state.metrics,
      blocksMined:
        publicChain.length +
        privateChain.length,
      attackerBlocks:
        privateChain.length,
      honestBlocks:
        publicChain.length,
      privateChainLength:
        privateChain.length,
      publicChainLength:
        publicChain.length,
      attackProgress:
        Math.max(
          progress,
          conditionReached
            ? 100
            : progress,
        ),
    },

    resultTitle:
      conditionReached
        ? "Selfish Mining Pattern Demonstrated"
        : "Private Chain Growing",

    resultDescription:
      "Private chain và public chain đang được mô phỏng riêng biệt. Attacker không công bố block ngay lập tức.",

    resultImpact:
      conditionReached
        ? "HIGH"
        : "MEDIUM",
  };
}