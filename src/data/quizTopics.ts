import { HASH_SHA256_54_QUESTIONS } from "./hashSha256Questions";
import { MINING_POW_53_QUESTIONS } from "./miningPowQuestions";
import { RSA_50_QUESTIONS } from "./rsaQuestions";
import { MERKLE_50_QUESTIONS } from "./merkleQuestions";
import { BLOCKCHAIN_BASICS_50_QUESTIONS } from "./blockchainBasicsQuestions";
import { CRYPTOGRAPHY_50_QUESTIONS } from "./cryptographyQuestions";
import { P2P_NODES_50_QUESTIONS } from "./p2pNodesQuestions";
import { SMART_CONTRACT_50_QUESTIONS } from "./smartContractQuestions";
import { SECURITY_50_QUESTIONS } from "./securityQuestions";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  difficulty: "easy" | "medium" | "hard";
  explanation?: string;
}

export interface QuizTopicMeta {
  id: string;
  secCode: string;
  category: string;
  title: string;
  icon: string;
  iconType?: "text" | "emoji";
  description: string;
  totalQuestions: number;
  distribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  overallStats: {
    easyTotal: number;
    mediumTotal: number;
    hardTotal: number;
    answered: number;
    correct: number;
  };
  questions: QuizQuestion[];
}

export const QUIZ_TOPICS: QuizTopicMeta[] = [
  {
    id: "hash-sha256",
    secCode: "SEC-01",
    category: "MẬT MÃ HỌC",
    title: "Hàm băm & SHA-256",
    icon: "#",
    iconType: "text",
    description: "Nền tảng hàm băm mật mã một chiều, hiệu ứng tuyết lở và tính kháng va chạm trong Blockchain.",
    totalQuestions: 54,
    distribution: { easy: 27, medium: 15, hard: 12 },
    overallStats: { easyTotal: 27, mediumTotal: 15, hardTotal: 12, answered: 0, correct: 0 },
    questions: HASH_SHA256_54_QUESTIONS.map((q) => ({
      id: `h${q.id}`,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      difficulty: q.difficulty,
    })),
  },
  {
    id: "mining-pow",
    secCode: "SEC-02",
    category: "CƠ CHẾ ĐỒNG THUẬN",
    title: "Khai thác & PoW",
    icon: "⛏️",
    iconType: "emoji",
    description: "Quy trình đào block, thuật toán Proof of Work, độ khó Nonce và giải quyết bài toán các vị tướng Byzantine.",
    totalQuestions: 53,
    distribution: { easy: 20, medium: 20, hard: 13 },
    overallStats: { easyTotal: 20, mediumTotal: 20, hardTotal: 13, answered: 0, correct: 0 },
    questions: MINING_POW_53_QUESTIONS.map((q) => ({
      id: `m${q.id}`,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      difficulty: q.difficulty,
    })),
  },
  {
    id: "rsa-crypto",
    secCode: "SEC-03",
    category: "MẬT MÃ BẤT ĐỐI XỨNG",
    title: "Mã hoá RSA",
    icon: "🔐",
    iconType: "emoji",
    description: "Cặp khóa công khai và bí mật, mã hóa bất đối xứng và ứng dụng chữ ký số trong xác thực giao dịch.",
    totalQuestions: 50,
    distribution: { easy: 20, medium: 18, hard: 12 },
    overallStats: { easyTotal: 20, mediumTotal: 18, hardTotal: 12, answered: 0, correct: 0 },
    questions: RSA_50_QUESTIONS.map((q) => ({
      id: `r${q.id}`,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      difficulty: q.difficulty,
    })),
  },
  {
    id: "merkle-tree",
    secCode: "SEC-04",
    category: "CẤU TRÚC DỮ LIỆU",
    title: "Cây Merkle",
    icon: "🌳",
    iconType: "emoji",
    description: "Cấu trúc Merkle Tree, Merkle Root, chứng minh SPV và tối ưu hóa xác thực giao dịch không cần tải toàn bộ block.",
    totalQuestions: 50,
    distribution: { easy: 20, medium: 20, hard: 10 },
    overallStats: { easyTotal: 20, mediumTotal: 20, hardTotal: 10, answered: 0, correct: 0 },
    questions: MERKLE_50_QUESTIONS.map((q) => ({
      id: `mk${q.id}`,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      difficulty: q.difficulty,
    })),
  },
  {
    id: "blockchain-basics",
    secCode: "SEC-05",
    category: "NỀN TẢNG BLOCKCHAIN",
    title: "Cơ bản Blockchain",
    icon: "🔗",
    iconType: "emoji",
    description: "Kiến trúc sổ cái phân tán, liên kết khối bằng hash previous, tính bất biến và lịch sử phân nhánh chain.",
    totalQuestions: 50,
    distribution: { easy: 20, medium: 20, hard: 10 },
    overallStats: { easyTotal: 20, mediumTotal: 20, hardTotal: 10, answered: 0, correct: 0 },
    questions: BLOCKCHAIN_BASICS_50_QUESTIONS.map((q) => ({
      id: `b${q.id}`,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      difficulty: q.difficulty,
    })),
  },
  {
    id: "cryptography",
    secCode: "SEC-06",
    category: "LÝ THUYẾT MẬT MÃ",
    title: "Mật mã học",
    icon: "🧮",
    iconType: "emoji",
    description: "Mã hóa cổ điển, mã hóa đối xứng AES, đường cong elliptic ECDSA và ứng dụng trong cấu trúc ví Web3.",
    totalQuestions: 50,
    distribution: { easy: 20, medium: 20, hard: 10 },
    overallStats: { easyTotal: 20, mediumTotal: 20, hardTotal: 10, answered: 0, correct: 0 },
    questions: CRYPTOGRAPHY_50_QUESTIONS.map((q) => ({
      id: `c${q.id}`,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      difficulty: q.difficulty,
    })),
  },
  {
    id: "p2p-nodes",
    secCode: "SEC-07",
    category: "MẠNG PHÂN TÁN",
    title: "Mạng P2P & Node",
    icon: "🌐",
    iconType: "emoji",
    description: "Kiến trúc mạng ngang hàng P2P, cơ chế lan truyền Gossip Protocol, Full Node, SPV Node, Mining Node và khả năng chịu lỗi.",
    totalQuestions: 50,
    distribution: { easy: 20, medium: 20, hard: 10 },
    overallStats: { easyTotal: 20, mediumTotal: 20, hardTotal: 10, answered: 0, correct: 0 },
    questions: P2P_NODES_50_QUESTIONS.map((q) => ({
      id: `p${q.id}`,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      difficulty: q.difficulty,
    })),
  },
  {
    id: "smart-contract",
    secCode: "SEC-08",
    category: "HỢP ĐỒNG THÔNG MINH",
    title: "Smart Contract",
    icon: "📜",
    iconType: "emoji",
    description: "Thực thi mã tự động, máy ảo EVM, biến trạng thái Storage, chuẩn ERC-20/721, Gas và bảo mật hợp đồng.",
    totalQuestions: 50,
    distribution: { easy: 20, medium: 20, hard: 10 },
    overallStats: { easyTotal: 20, mediumTotal: 20, hardTotal: 10, answered: 0, correct: 0 },
    questions: SMART_CONTRACT_50_QUESTIONS.map((q) => ({
      id: `sc${q.id}`,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      difficulty: q.difficulty,
    })),
  },
  {
    id: "security",
    secCode: "SEC-09",
    category: "AN TOÀN BẢO MẬT",
    title: "Bảo mật",
    icon: "🛡️",
    iconType: "emoji",
    description: "Tam giác CIA, bảo vệ Private Key, tấn công 51%, Sybil, Reentrancy, Oracle, Audit và an toàn người dùng.",
    totalQuestions: 50,
    distribution: { easy: 20, medium: 20, hard: 10 },
    overallStats: { easyTotal: 20, mediumTotal: 20, hardTotal: 10, answered: 0, correct: 0 },
    questions: SECURITY_50_QUESTIONS.map((q) => ({
      id: `sec${q.id}`,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      difficulty: q.difficulty,
    })),
  }
];
