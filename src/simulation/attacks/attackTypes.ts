import type { AttackType } from "../../types/attack";

export interface AttackDefinition {
  id: AttackType;
  name: string;
  shortName: string;
  description: string;
  category: string;
  difficulty: "Cơ bản" | "Trung bình" | "Nâng cao";
  danger: "Trung bình" | "Cao" | "Nghiêm trọng";
}

export const ATTACK_DEFINITIONS: AttackDefinition[] = [
  {
    id: "51_PERCENT",
    name: "Tấn công 51%",
    shortName: "51%",
    description:
      "1 kẻ tấn công nắm hơn 50% sức mạnh đào của mạng, đủ để tự viết lại lịch sử giao dịch.",
    category: "Tấn công đồng thuận",
    difficulty: "Nâng cao",
    danger: "Nghiêm trọng",
  },

  {
    id: "DOUBLE_SPEND",
    name: "Chi tiêu gấp đôi",
    shortName: "Double Spend",
    description:
      "Dùng cùng 1 số tiền để tạo 2 giao dịch khác nhau, cố gắng 'tiêu' được cả hai.",
    category: "Tấn công giao dịch",
    difficulty: "Trung bình",
    danger: "Cao",
  },

  {
    id: "SYBIL",
    name: "Tấn công Sybil",
    shortName: "Sybil",
    description:
      "Tạo hàng loạt Node giả để chiếm phần lớn mạng ngang hàng, giống tạo nhiều tài khoản ảo.",
    category: "Tấn công mạng lưới",
    difficulty: "Nâng cao",
    danger: "Nghiêm trọng",
  },

  {
    id: "ECLIPSE",
    name: "Tấn công Eclipse",
    shortName: "Eclipse",
    description:
      "Cô lập 1 Node bằng cách chiếm hết các kết nối xung quanh nó, khiến nó chỉ 'nghe' được kẻ tấn công.",
    category: "Tấn công mạng lưới",
    difficulty: "Nâng cao",
    danger: "Cao",
  },

  {
    id: "SELFISH_MINING",
    name: "Đào ích kỷ",
    shortName: "Selfish Mining",
    description:
      "Giấu Block vừa đào được thay vì công bố ngay, để chiếm lợi thế không công bằng trước các thợ đào khác.",
    category: "Tấn công đào Block",
    difficulty: "Nâng cao",
    danger: "Cao",
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