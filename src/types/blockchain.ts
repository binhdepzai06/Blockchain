import type { Transaction } from "./transaction";

// Phần được BĂM để ra hash của Block. Mọi thứ trong Body muốn được bảo vệ
// đều phải "cam kết" vào Header: giao dịch qua merkleRoot, ghi chú qua dataHash.
export interface BlockHeader {
  version: number;
  previousHash: string;
  merkleRoot: string;
  timestamp: number;
  difficulty: number;
  nonce: number;
  dataHash: string;
}

export interface Block {
  // ---------------- HEADER (được băm) ----------------
  version: number;
  previousHash: string;
  merkleRoot: string;
  timestamp: number;
  difficulty?: number;
  nonce: number;
  dataHash: string;

  // Hash của Block = SHA-256(Header). KHÔNG băm Body.
  hash: string;

  // ---------------- BODY (không băm trực tiếp) ----------------
  // index chính là blockHeight: vị trí Block trong chain (Genesis = 0).
  index: number;
  transactions: Transaction[];
  // Metadata dẫn xuất, dùng để hiển thị/đồng bộ nhanh; node luôn kiểm tra
  // lại bằng transactions.length chứ không tin giá trị này.
  transactionCount: number;
  data?: string;
}

export interface BlockchainState {
  blocks: Block[];
  isValid: boolean;
}
