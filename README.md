# CryptoLab — Nền tảng mô phỏng Blockchain tương tác

CryptoLab là ứng dụng web giúp người học hiểu blockchain bằng cách **tự thao tác**:
băm dữ liệu, nối block, ký giao dịch, đào block (PoW), chạy nhiều Full Node và
thử tấn công để xem hệ thống phát hiện thế nào. Toàn bộ chạy ở phía trình duyệt
(React + TypeScript), không cần backend.

## Cài đặt & chạy

Yêu cầu: Node.js 20+ và npm.

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # chạy unit test (Vitest)
npm run build      # kiểm tra kiểu + build production
npm run lint       # oxlint
```

Đăng nhập Google (Firebase) là tùy chọn và đã có cấu hình mặc định. Muốn dùng project
Firebase riêng, sao chép `.env.example` thành `.env` rồi điền các biến `VITE_FIREBASE_*`.

## Đối chiếu với đề cương (P1 → P11)

| Project | Nội dung | Trang demo (route) | Mã nguồn chính |
|---|---|---|---|
| P1 | SHA-256, avalanche, một chiều, collision | Hash (`/hash`) | `src/lib/crypto/hash.ts` |
| P2 | Block, `previousHash`, phát hiện sửa dữ liệu | Blockchain (`/blockchain`) | `src/lib/blockchain/blockchain.ts` |
| P3 | Cặp khóa ECDSA, ký và verify | Chữ ký số (`/signature`) | `src/lib/crypto/signature.ts` |
| P4 | Mempool, kiểm tra giao dịch trước khi nhận | Full Node Network (`/node-network`) | `src/lib/blockchain/txVerify.ts`, `wallet.ts` |
| P5 | Merkle Tree, Merkle Root, **Merkle Proof** | Merkle Tree (`/merkle`) | `src/lib/blockchain/merkle.ts` |
| P6 | Block Header / Body | Blockchain (`/blockchain`) | `src/lib/blockchain/blockHeader.ts` |
| P7 | Proof of Work, nonce, difficulty | Consensus (`/consensus`), Full Node Network | `src/lib/network/mining.ts` |
| P8 | Mạng nhiều Full Node, đồng bộ chain | Full Node Network (`/node-network`) | `src/lib/network/fullNode.ts` |
| P9 | Mining từ Mempool, đồng thuận khi nhận block | Full Node Network | `src/lib/network/fullNode.ts` |
| P10 | Fork, chọn chain có tổng công việc lớn nhất | Full Node Network | `computeTotalWork` trong `mining.ts` |
| P11 | Tấn công và cơ chế phát hiện | Xem bảng dưới | — |

Ngoài đề cương, dự án còn có: Network Simulator, Cardano, Solana, Smart Contract, Quiz
và Attack Simulator (51%, Double Spend theo reorg, Sybil, Eclipse, Selfish Mining).

### Các kịch bản tấn công của P11 demo ở đâu?

| Kịch bản | Cách demo | Kết quả |
|---|---|---|
| Sửa Transaction sau khi ký | Node Network → "Sửa số tiền ×10 sau khi ký" | Từ chối ở bước *Chữ ký số* |
| Sửa dữ liệu Block | Blockchain → sửa data → "Recalculate Hash" | Các block phía sau INVALID (chuỗi đứt) |
| Sửa 1 giao dịch trong Merkle Tree | Merkle → sửa số tiền giao dịch | Root đổi, Block và Merkle Proof INVALID |
| Giả mạo giao dịch (không có Private Key) | Node Network → "Giả danh ví khác" | Từ chối ở bước *Chữ ký số* |
| Double Spending | Node Network → gửi 2 giao dịch, mỗi cái hơn nửa số dư | Giao dịch thứ hai bị từ chối ở bước *Số dư* |
| Replay | Node Network → "Gửi lại Tx cũ" | Từ chối ở bước *Replay* |

## Luồng giao dịch end-to-end (trang Full Node Network)

1. Tạo ví: sinh cặp khóa ECDSA P-256. Địa chỉ = `0x` + 40 hex đầu của SHA-256(Public Key).
2. Người gửi ký `[id, from, to, amount, timestamp]` bằng Private Key.
3. Broadcast giao dịch kèm Public Key tới các node.
4. Mỗi node kiểm tra 6 điều kiện: định dạng → Public Key hợp lệ → địa chỉ khớp Public Key →
   chữ ký → không trùng/replay → đủ số dư (đã trừ các giao dịch đang chờ trong Mempool).
5. Hợp lệ thì vào Mempool, sai thì REJECT kèm lý do (xem bảng kiểm tra từng bước trên UI).
6. Miner lấy giao dịch từ Mempool, thêm giao dịch thưởng (coinbase, 50 coin) rồi làm PoW.
7. Block được broadcast. Node khác kiểm tra `previousHash`, Merkle Root, PoW, chữ ký và số dư
   của mọi giao dịch; hợp lệ thì thêm vào chain và xóa giao dịch đó khỏi Mempool.

### Chạy demo nhiều node

Mỗi **tab trình duyệt là một Full Node**; các tab đồng bộ qua `BroadcastChannel`, ví dùng chung
qua `localStorage`.

1. Mở `/node-network` ở 2–3 tab. Ở một tab tạo ví Alice và Bob.
2. Chọn Alice, bấm *Mine* để nhận thưởng 50 coin.
3. Alice ký và gửi cho Bob; quan sát bảng kiểm tra ở mọi tab.
4. Thử các nút tấn công, rồi *Mine* để chốt giao dịch vào block.

## Thiết kế block

- **Header** (được băm): `version`, `previousHash`, `merkleRoot`, `timestamp`, `difficulty`,
  `nonce`, `dataHash`. Hash của block = SHA-256(Header).
- **Body**: danh sách giao dịch, `blockHeight` (trường `index`), `transactionCount`. Body được bảo
  vệ gián tiếp qua `merkleRoot`; `transactionCount` luôn được kiểm tra lại, không tin giá trị ghi sẵn.
- `dataHash` cam kết ghi chú tự do của block, tương tự thông điệp coinbase của Bitcoin.

## Cấu trúc thư mục

```
src/
  lib/crypto/       hash.ts, signature.ts
  lib/blockchain/   blockchain.ts, blockHeader.ts, merkle.ts, wallet.ts, txVerify.ts
  lib/network/      fullNode.ts, mining.ts, genesis.ts, ...
  lib/consensus/    pow.ts, pos.ts
  pages/            mỗi trang demo một thư mục
  tests/            unit test (Vitest)
```

## Kiểm thử

`npm test` chạy 49 test cho P1–P7: test vector SHA-256 và avalanche, ECDSA ký/verify,
Merkle Root và Merkle Proof (mọi kích thước cây 1–20), PoW theo từng difficulty, phát hiện sửa
dữ liệu block/giao dịch, và kiểm tra giao dịch (chữ ký giả, replay, vượt số dư, double-spend).

## Giới hạn đã biết

- Đây là **mô phỏng giáo dục**: các node là tab trình duyệt trong cùng một máy, không phải mạng P2P thật.
- Private Key lưu trong `localStorage` cho tiện học tập; ví thật không bao giờ lưu như vậy.
- Chain chỉ lưu trong bộ nhớ, tải lại trang sẽ mất. Difficulty thấp để demo nhanh.
- Cấu hình Firebase phía client là công khai theo thiết kế; cần đặt Security Rules phù hợp
  trên Firebase Console nếu dùng project thật.

## Nhóm thực hiện

Xem trang **Nhóm** (`/team`) trong ứng dụng để biết phần việc của từng thành viên.
