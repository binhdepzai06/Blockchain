export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;

  // Chữ ký số ECDSA (base64) trên [id, from, to, amount, timestamp].
  // Optional để các trang demo cũ (Merkle, Hash-chain...) vẫn dùng được
  // giao dịch "đơn giản"; FullNode mới BẮT BUỘC có đủ 2 trường này.
  publicKey?: string;
  signature?: string;
}
