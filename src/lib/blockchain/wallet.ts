import { sha256 } from "../crypto/hash";
import { generateKeyPair, signMessage } from "../crypto/signature";
import type { Transaction } from "../../types/transaction";

export const COINBASE = "COINBASE";
export const BLOCK_REWARD = 50;
export const ADDRESS_REGEX = /^0x[0-9a-f]{40}$/;

const STORAGE_KEY = "cryptolab-wallets";
const EC = { name: "ECDSA", namedCurve: "P-256" } as const;

export interface WalletRecord {
  name: string;
  address: string;
  publicKey: string; // base64 (raw P-256)
  // Chỉ lưu localStorage cho mục đích học tập — ví thật không bao giờ làm vậy.
  privateKeyJwk: JsonWebKey;
}

// Địa chỉ = 0x + 40 hex đầu của SHA-256(publicKey). Nhờ vậy `from` bị
// "buộc" vào Public Key: không ai dùng được địa chỉ của người khác.
export async function addressFromPublicKey(publicKey: string): Promise<string> {
  return "0x" + (await sha256(publicKey)).slice(0, 40);
}

export function txSigningPayload(
  tx: Pick<Transaction, "id" | "from" | "to" | "amount" | "timestamp">
): string {
  return JSON.stringify([tx.id, tx.from, tx.to, tx.amount, tx.timestamp]);
}

export async function importPublicKey(publicKey: string): Promise<CryptoKey> {
  const binary = atob(publicKey);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return crypto.subtle.importKey("raw", bytes, EC, true, ["verify"]);
}

export function loadWallets(): WalletRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WalletRecord[]) : [];
  } catch {
    return [];
  }
}

function saveWallets(wallets: WalletRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wallets));
  } catch {
    /* bỏ qua nếu trình duyệt chặn storage */
  }
}

export async function createWallet(name: string): Promise<WalletRecord> {
  const { keyPair, publicKeyDisplay } = await generateKeyPair();
  const privateKeyJwk = await crypto.subtle.exportKey("jwk", keyPair.privateKey);

  const wallet: WalletRecord = {
    name: name.trim() || "Wallet",
    address: await addressFromPublicKey(publicKeyDisplay),
    publicKey: publicKeyDisplay,
    privateKeyJwk,
  };

  saveWallets([...loadWallets(), wallet]);
  return wallet;
}

export async function signWithWallet(
  wallet: WalletRecord,
  message: string
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "jwk",
    wallet.privateKeyJwk,
    EC,
    false,
    ["sign"]
  );
  return signMessage(key, message);
}

// Bước 2 của luồng end-to-end: tạo Transaction rồi ký bằng Private Key.
export async function buildSignedTransaction(
  wallet: WalletRecord,
  to: string,
  amount: number
): Promise<Transaction> {
  const unsigned = {
    id: crypto.randomUUID(),
    from: wallet.address,
    to,
    amount,
    timestamp: Date.now(),
  };

  return {
    ...unsigned,
    publicKey: wallet.publicKey,
    signature: await signWithWallet(wallet, txSigningPayload(unsigned)),
  };
}

// Giao dịch thưởng cho Miner — không có người gửi, không cần chữ ký.
export function createCoinbaseTransaction(minerAddress: string): Transaction {
  return {
    id: crypto.randomUUID(),
    from: COINBASE,
    to: minerAddress,
    amount: BLOCK_REWARD,
    timestamp: Date.now(),
  };
}
