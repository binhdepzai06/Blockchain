import type { Block } from "../../types/blockchain";
import { BLOCK_VERSION, GENESIS_DATA_HASH } from "../blockchain/blockHeader";

// Toàn bộ giá trị đều CỐ ĐỊNH CỨNG — để mọi Node có Genesis Block
// giống hệt nhau tuyệt đối, không phụ thuộc vào việc tính hash "sống"
// mỗi lần khởi động (tránh sai lệch dù chỉ 1 bit).
export function createGenesisBlock(): Block {
  return {
    version: BLOCK_VERSION,
    index: 0,
    timestamp: 1700000000000,
    transactions: [],
    transactionCount: 0,
    dataHash: GENESIS_DATA_HASH,
    previousHash: "0",
    hash: "genesis000000000000000000000000000000000000000000000000000000",
    nonce: 0,
    data: "Genesis Block",
    merkleRoot: "genesis-empty-merkle-root",
    difficulty: 0,
  };
}