import type { AttackType } from "../../types/attack";

export interface AttackDefinition {
  id: AttackType;
  name: string;
  shortName: string;
  description: string;
  category: string;
  difficulty: "Basic" | "Intermediate" | "Advanced";
  danger: "Medium" | "High" | "Critical";
}

export const ATTACK_DEFINITIONS: AttackDefinition[] = [
  {
    id: "51_PERCENT",
    name: "51% Attack",
    shortName: "51%",
    description:
      "Mô phỏng tình huống một thực thể kiểm soát phần lớn hash power của mạng Proof-of-Work.",
    category: "Consensus Attack",
    difficulty: "Advanced",
    danger: "Critical",
  },

  {
    id: "DOUBLE_SPEND",
    name: "Double Spending",
    shortName: "Double Spend",
    description:
      "Mô phỏng việc tạo hai giao dịch sử dụng cùng một nguồn tiền và quan sát quá trình xung đột giao dịch.",
    category: "Transaction Attack",
    difficulty: "Intermediate",
    danger: "High",
  },

  {
    id: "SYBIL",
    name: "Sybil Attack",
    shortName: "Sybil",
    description:
      "Mô phỏng attacker tạo nhiều identity/node giả để chiếm tỷ lệ lớn trong mạng ngang hàng.",
    category: "Network Attack",
    difficulty: "Advanced",
    danger: "Critical",
  },

  {
    id: "ECLIPSE",
    name: "Eclipse Attack",
    shortName: "Eclipse",
    description:
      "Mô phỏng việc attacker kiểm soát phần lớn kết nối peer của một node mục tiêu.",
    category: "Network Attack",
    difficulty: "Advanced",
    danger: "High",
  },

  {
    id: "SELFISH_MINING",
    name: "Selfish Mining",
    shortName: "Selfish Mining",
    description:
      "Mô phỏng attacker giữ private chain và trì hoãn công bố block nhằm tạo lợi thế trong mining.",
    category: "Mining Attack",
    difficulty: "Advanced",
    danger: "High",
  },
];

export function getAttackDefinition(
  type: AttackType,
): AttackDefinition {
  return (
    ATTACK_DEFINITIONS.find((attack) => attack.id === type) ??
    ATTACK_DEFINITIONS[0]
  );
}