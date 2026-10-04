import type { AttackState } from "../../types/attack";
import { createBlock, createEvent } from "./attackEngine";

export function initializeDoubleSpendAttack(
  state: AttackState,
): AttackState {
  return {
    ...state,

    resultTitle: "Mô phỏng chi tiêu gấp đôi",
    resultDescription:
      "Mô phỏng hai giao dịch sử dụng cùng một nguồn tiền: Alice → Bob và Alice → Charlie.",

    events: [
      ...state.events,
      createEvent(
        "Alice has 10 BTC available.",
        "INFO",
      ),
      createEvent(
        "Attacker prepares two conflicting transactions.",
        "ACTION",
      ),
    ],
  };
}

export function stepDoubleSpendAttack(
  state: AttackState,
): AttackState {
  const step = state.currentStep + 1;

  const events = [...state.events];
  const publicChain = [...state.publicChain];

  if (step === 1) {
    events.push(
      createEvent(
        "Transaction TX-001 created: Alice → Bob, 10 BTC.",
        "ACTION",
      ),
    );
  }

  if (step === 2) {
    events.push(
      createEvent(
        "Bob's wallet receives TX-001.",
        "INFO",
      ),
    );
  }

  if (step === 3) {
    events.push(
      createEvent(
        "Conflicting transaction TX-002 created: Alice → Charlie, 10 BTC.",
        "WARNING",
      ),
    );
  }

  if (step === 4) {
    events.push(
      createEvent(
        "Network detects two transactions spending the same input.",
        "WARNING",
      ),
    );
  }

  if (step === 5) {
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
        `Block #${block.height} confirms TX-001.`,
        "SUCCESS",
      ),
    );
  }

  if (step === 6) {
    events.push(
      createEvent(
        "TX-002 becomes invalid because the same input was already spent.",
        "ERROR",
      ),
    );
  }

  if (step >= 7) {
    events.push(
      createEvent(
        "Double-spend conflict resolved by transaction validation and chain state.",
        "SUCCESS",
      ),
    );
  }

  const progress = Math.min(
    100,
    step * 14,
  );

  const finished = step >= 7;

  return {
    ...state,

    status:
      finished
        ? "SUCCESS"
        : "RUNNING",

    currentStep: step,

    publicChain,

    events: events.slice(-60),

    attackConditionReached:
      step >= 4,

    metrics: {
      ...state.metrics,
      blocksMined: publicChain.length,
      publicChainLength: publicChain.length,
      honestBlocks: publicChain.length,
      attackProgress: progress,
    },

    resultTitle:
      finished
        ? "Phát hiện 2 giao dịch tranh chấp cùng 1 số tiền!"
        : "Đang xử lý giao dịch xung đột...",

    resultDescription:
      finished
        ? "Hai transaction sử dụng cùng nguồn tiền không thể cùng tồn tại trong cùng một trạng thái UTXO hợp lệ."
        : "Hệ thống đang mô phỏng quá trình tạo, truyền và xác thực các transaction xung đột.",

    resultImpact:
      step >= 4
        ? "HIGH"
        : "MEDIUM",
  };
}