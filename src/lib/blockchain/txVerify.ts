import type { Block } from "../../types/blockchain";
import type { Transaction } from "../../types/transaction";
import { verifySignature } from "../crypto/signature";
import {
  ADDRESS_REGEX,
  BLOCK_REWARD,
  COINBASE,
  addressFromPublicKey,
  importPublicKey,
  txSigningPayload,
} from "./wallet";

export interface TxCheck {
  name: string;
  ok: boolean;
  detail: string;
}

export interface TxVerifyResult {
  valid: boolean;
  reason?: string;
  checks: TxCheck[];
}

export interface LedgerState {
  seenIds: Set<string>;
  balances: Map<string, number>;
}

// "confirmed": Tx đã nằm trong Block → người gửi trừ, người nhận được cộng.
// "pending":   Tx đang ở Mempool    → chỉ TRỪ người gửi (giữ chỗ), chưa cộng
//              người nhận, vì tiền chưa xác nhận thì chưa được tiêu.
export function applyTx(
  state: LedgerState,
  tx: Transaction,
  mode: "confirmed" | "pending"
) {
  state.seenIds.add(tx.id);

  if (tx.from !== COINBASE) {
    state.balances.set(tx.from, (state.balances.get(tx.from) ?? 0) - tx.amount);
  }

  if (mode === "confirmed") {
    state.balances.set(tx.to, (state.balances.get(tx.to) ?? 0) + tx.amount);
  }
}

export function createLedgerState(
  chain: Block[],
  mempool: Transaction[] = []
): LedgerState {
  const state: LedgerState = { seenIds: new Set(), balances: new Map() };

  for (const block of chain) {
    for (const tx of block.transactions) applyTx(state, tx, "confirmed");
  }
  for (const tx of mempool) applyTx(state, tx, "pending");

  return state;
}

export function getBalance(state: LedgerState, address: string): number {
  return state.balances.get(address) ?? 0;
}

export async function verifyTransaction(
  tx: Transaction,
  state: LedgerState
): Promise<TxVerifyResult> {
  const checks: TxCheck[] = [];

  const fail = (name: string, detail: string): TxVerifyResult => {
    checks.push({ name, ok: false, detail });
    return { valid: false, reason: `${name}: ${detail}`, checks };
  };
  const pass = (name: string, detail: string) =>
    checks.push({ name, ok: true, detail });

  // 1. Định dạng ------------------------------------------------------
  const t = tx as Partial<Transaction> | null;
  if (
    !t ||
    typeof t.id !== "string" || t.id.length === 0 ||
    typeof t.from !== "string" ||
    typeof t.to !== "string" ||
    typeof t.amount !== "number" ||
    typeof t.timestamp !== "number" ||
    !Number.isFinite(t.timestamp)
  ) {
    return fail("Định dạng", "thiếu hoặc sai kiểu dữ liệu các trường bắt buộc");
  }
  if (t.from === COINBASE) {
    return fail("Định dạng", "COINBASE chỉ do Miner tạo trong Block, không gửi qua mạng");
  }
  if (!Number.isFinite(t.amount) || t.amount <= 0 || t.amount > 1_000_000) {
    return fail("Định dạng", "số tiền phải > 0 và hợp lệ");
  }
  if (!ADDRESS_REGEX.test(t.to)) {
    return fail("Định dạng", "địa chỉ nhận không đúng chuẩn 0x + 40 hex");
  }
  if (t.from === t.to) {
    return fail("Định dạng", "người gửi và người nhận trùng nhau");
  }
  if (!t.publicKey || !t.signature) {
    return fail("Định dạng", "thiếu Public Key hoặc Signature");
  }
  pass("Định dạng", "đủ trường, số tiền & địa chỉ hợp lệ");

  // 2. Public Key -----------------------------------------------------
  let key: CryptoKey;
  try {
    key = await importPublicKey(t.publicKey);
    pass("Public Key", "đọc được khóa ECDSA P-256");
  } catch {
    return fail("Public Key", "không phải khóa ECDSA P-256 hợp lệ");
  }

  // 3. Địa chỉ gửi phải sinh ra từ chính Public Key đính kèm ----------
  const derived = await addressFromPublicKey(t.publicKey);
  if (derived !== t.from) {
    return fail("Khớp địa chỉ", "Public Key không thuộc về địa chỉ người gửi");
  }
  pass("Khớp địa chỉ", "hash(Public Key) trùng địa chỉ người gửi");

  // 4. Chữ ký ---------------------------------------------------------
  let sigOk = false;
  try {
    sigOk = await verifySignature(
      key,
      txSigningPayload(t as Transaction),
      t.signature
    );
  } catch {
    sigOk = false;
  }
  if (!sigOk) {
    return fail("Chữ ký số", "INVALID — dữ liệu bị sửa hoặc không ký bằng Private Key đúng");
  }
  pass("Chữ ký số", "ECDSA verify = VALID");

  // 5. Trùng lặp / replay ---------------------------------------------
  if (state.seenIds.has(t.id)) {
    return fail("Replay / trùng lặp", "giao dịch này đã có trong Mempool hoặc Blockchain");
  }
  pass("Replay / trùng lặp", "id chưa từng xuất hiện");

  // 6. Số dư ----------------------------------------------------------
  const available = getBalance(state, t.from);
  if (available < t.amount) {
    return fail(
      "Số dư",
      `không đủ: khả dụng ${available}, cần ${t.amount} (đã trừ các Tx đang chờ)`
    );
  }
  pass("Số dư", `khả dụng ${available} ≥ ${t.amount}`);

  return { valid: true, checks };
}

// Duyệt lại toàn bộ sổ cái: mọi Tx trong mọi Block phải hợp lệ, mỗi Block
// có đúng 1 coinbase ở đầu, và không ai bị âm số dư tại bất kỳ thời điểm nào.
export async function validateLedger(
  chain: Block[]
): Promise<{ valid: boolean; reason?: string }> {
  const state: LedgerState = { seenIds: new Set(), balances: new Map() };

  for (let i = 1; i < chain.length; i++) {
    const block = chain[i];
    const txs = block.transactions;

    if (txs.length === 0 || txs[0].from !== COINBASE) {
      return { valid: false, reason: `Block #${block.index}: thiếu coinbase ở đầu Block` };
    }

    for (let j = 0; j < txs.length; j++) {
      const tx = txs[j];

      if (tx.from === COINBASE) {
        const bad =
          j !== 0 ? "coinbase phải duy nhất và đứng đầu"
          : tx.amount !== BLOCK_REWARD ? `phần thưởng phải đúng ${BLOCK_REWARD}`
          : !ADDRESS_REGEX.test(tx.to) ? "địa chỉ nhận thưởng không hợp lệ"
          : state.seenIds.has(tx.id) ? "coinbase trùng id"
          : null;
        if (bad) return { valid: false, reason: `Block #${block.index}: ${bad}` };
      } else {
        const result = await verifyTransaction(tx, state);
        if (!result.valid) {
          return {
            valid: false,
            reason: `Block #${block.index}, Tx ${String(tx.id).slice(0, 8)}: ${result.reason}`,
          };
        }
      }

      applyTx(state, tx, "confirmed");
    }
  }

  return { valid: true };
}
