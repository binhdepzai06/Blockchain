import type { AttackState } from "../../types/attack";
import {
  createBlock,
  createEvent,
} from "./attackEngine";

export function initializeFiftyOneAttack(
  state: AttackState,
): AttackState {
  return {
    ...state,

    resultTitle: "Mô phỏng tấn công 51%",
    resultDescription:
      "Attacker sẽ cạnh tranh với honest miners bằng hash power. Khi attacker có hơn 50% hash power, khả năng tạo private chain dài hơn tăng lên.",
    resultImpact: "CRITICAL",

    events: [
      ...state.events,
      createEvent(
        `Attacker hash power configured at ${state.parameters.hashPower}%.`,
        "INFO",
      ),
      createEvent(
        "Honest miners are maintaining the public chain.",
        "INFO",
      ),
    ],
  };
}

export function stepFiftyOneAttack(
  state: AttackState,
): AttackState {
  const step = state.currentStep + 1;

  let publicChain = [...state.publicChain];
  let privateChain = [...state.privateChain];

  const events = [...state.events];

  const attackerPower = state.parameters.hashPower;
  const attackerWins =
    attackerPower > 50;

  if (step === 1) {
    events.push(
      createEvent(
        "Attacker starts mining a private branch.",
        "ACTION",
      ),
    );
  }

  const attackerMines =
    Math.random() * 100 < attackerPower;

  if (attackerMines) {
    const previous =
      privateChain.length > 0
        ? privateChain[privateChain.length - 1].hash
        : publicChain[publicChain.length - 1].hash;

    const height =
      privateChain.length > 0
        ? privateChain[privateChain.length - 1].height + 1
        : publicChain[publicChain.length - 1].height + 1;

    const block = createBlock(
      height,
      previous,
      "ATTACKER",
      "PRIVATE",
    );

    privateChain.push(block);

    events.push(
      createEvent(
        `Attacker mined private block #${height}.`,
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
        `Honest network mined public block #${block.height}.`,
        "INFO",
      ),
    );
  }

  const privateLength = privateChain.length;
  const publicLength = publicChain.length;

  let attackConditionReached =
    privateLength >= 3 &&
    attackerWins;

  if (
    attackConditionReached &&
    step % 4 === 0
  ) {
    events.push(
      createEvent(
        "⚠ Attacker private chain is now competing with the public chain.",
        "WARNING",
      ),
    );
  }

  if (
    attackConditionReached &&
    privateLength >= 5
  ) {
    events.push(
      createEvent(
        "⚠ 51% attack condition reached: attacker controls majority hash power.",
        "SUCCESS",
      ),
    );
  }

  const progress = Math.min(
    100,
    Math.round(
      (privateLength /
        Math.max(1, publicLength)) *
        100,
    ),
  );

  return {
    ...state,

    status:
      attackConditionReached
        ? "SUCCESS"
        : "RUNNING",

    publicChain,
    privateChain,

    events: events.slice(-60),

    currentStep: step,

    attackConditionReached,

    metrics: {
      ...state.metrics,
      blocksMined:
        publicChain.length + privateChain.length,
      attackerBlocks: privateLength,
      honestBlocks: publicChain.length,
      privateChainLength: privateLength,
      publicChainLength: publicLength,
      attackProgress: progress,
    },

    resultTitle:
      attackConditionReached
        ? "Kẻ tấn công đã chiếm hơn 50% sức mạnh đào!"
        : "Đang âm thầm đào chuỗi riêng...",

    resultDescription:
      attackConditionReached
        ? "Attacker đang sở hữu hơn 50% hash power trong mô phỏng. Điều này cho phép attacker có khả năng tạo chain thay thế hoặc tổ chức lại lịch sử giao dịch tùy điều kiện mạng."
        : "Attacker đang duy trì một private chain trong khi honest miners tiếp tục xây dựng public chain.",

    resultImpact:
      attackConditionReached
        ? "CRITICAL"
        : "HIGH",
  };
}