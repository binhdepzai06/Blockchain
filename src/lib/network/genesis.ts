import type { Block } from "../../types/blockchain";

// Toàn bộ giá trị đều CỐ ĐỊNH CỨNG — để mọi Node có Genesis Block
// giống hệt nhau tuyệt đối, không phụ thuộc vào việc tính hash "sống"
// mỗi lần khởi động (tránh sai lệch dù chỉ 1 bit).
export function createGenesisBlock(): Block {
  return {
    index: 0,
    timestamp: 1700000000000,
    transactions: [],
    previousHash: "0",
    hash: "genesis000000000000000000000000000000000000000000000000000000",
    nonce: 0,
    data: "Genesis Block",
    merkleRoot: "genesis-empty-merkle-root",
    difficulty: 0,
  };
}