export async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();

  const data = encoder.encode(message);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

// =========================================================
// TÍNH CHẤT: KHÁNG VA CHẠM (dùng để so sánh với 1 hash "yếu")
// Hash 16-bit này CỐ TÌNH yếu (chỉ 65.536 giá trị đầu ra có thể) để
// minh hoạ vì sao SHA-256 (2^256 giá trị) mới được coi là kháng va
// chạm thật sự. Không dùng để bảo mật bất cứ thứ gì.
// =========================================================

export function weakHash16(message: string): string {
  let hash = 0;

  for (let i = 0; i < message.length; i++) {
    hash = (hash * 31 + message.charCodeAt(i)) % 65536;
  }

  return hash.toString(16).padStart(4, "0");
}

// =========================================================
// TÍNH CHẤT: TÍNH MỘT CHIỀU
// Thử tìm lại input gốc từ 1 hash bằng cách hash lần lượt từng ứng
// viên trong danh sách rồi so sánh — đây là CÁCH DUY NHẤT để "phá"
// một hàm băm một chiều (brute-force), không có công thức đảo ngược.
// =========================================================

export async function bruteForceFind(
  targetHash: string,
  candidates: string[],
  hashFn: (input: string) => Promise<string> | string,
  onProgress?: (attempts: number) => void
): Promise<{ found: boolean; attempts: number; answer?: string }> {
  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];

    const hash = await hashFn(candidate);

    if (hash === targetHash) {
      return { found: true, attempts: i + 1, answer: candidate };
    }

    if (onProgress && (i + 1) % 200 === 0) {
      onProgress(i + 1);

      // Nhường 1 nhịp cho UI render, không đứng hình trình duyệt
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
    }
  }

  return { found: false, attempts: candidates.length };
}

export function generatePinCandidates(length: number): string[] {
  const total = Math.pow(10, length);

  const candidates: string[] = [];

  for (let i = 0; i < total; i++) {
    candidates.push(i.toString().padStart(length, "0"));
  }

  return candidates;
}

// =========================================================
// TÍNH CHẤT: KHÁNG VA CHẠM
// Ném random input liên tục vào 1 hàm băm, lưu lại hash đã gặp; nếu
// 2 input KHÁC NHAU ra cùng 1 hash → đó là va chạm (collision).
// =========================================================

export interface CollisionResult {
  found: boolean;
  attempts: number;
  input1?: string;
  input2?: string;
  hash?: string;
}

export async function findCollision(
  hashFn: (input: string) => Promise<string> | string,
  maxAttempts: number,
  onProgress?: (attempts: number) => void
): Promise<CollisionResult> {
  const seen = new Map<string, string>();

  for (let i = 1; i <= maxAttempts; i++) {
    const randomInput =
      Math.random().toString(36).slice(2, 10) + "-" + i;

    const hash = await hashFn(randomInput);

    const existing = seen.get(hash);

    if (existing && existing !== randomInput) {
      return {
        found: true,
        attempts: i,
        input1: existing,
        input2: randomInput,
        hash,
      };
    }

    seen.set(hash, randomInput);

    if (onProgress && i % 100 === 0) {
      onProgress(i);

      await new Promise<void>((resolve) => setTimeout(resolve, 0));
    }
  }

  return { found: false, attempts: maxAttempts };
}

// =========================================================
// TÍNH CHẤT: HIỆU ỨNG AVALANCHE
// Đổi hex sang chuỗi nhị phân để so sánh mức độ khác nhau ở TỪNG BIT
// giữa 2 hash — avalanche effect chuẩn là ~50% số bit khác nhau dù
// input chỉ đổi đúng 1 ký tự.
// =========================================================

export function hexToBinary(hex: string): string {
  return hex
    .split("")
    .map((char) => parseInt(char, 16).toString(2).padStart(4, "0"))
    .join("");
}

export interface BitDiffResult {
  binaryA: string;
  binaryB: string;
  totalBits: number;
  diffCount: number;
  diffPercent: number;
  diffMask: boolean[];
}

export function compareBits(hashA: string, hashB: string): BitDiffResult {
  const binaryA = hexToBinary(hashA);
  const binaryB = hexToBinary(hashB);

  const totalBits = binaryA.length;

  let diffCount = 0;

  const diffMask: boolean[] = [];

  for (let i = 0; i < totalBits; i++) {
    const differs = binaryA[i] !== binaryB[i];

    diffMask.push(differs);

    if (differs) {
      diffCount++;
    }
  }

  return {
    binaryA,
    binaryB,
    totalBits,
    diffCount,
    diffPercent: totalBits === 0 ? 0 : (diffCount / totalBits) * 100,
    diffMask,
  };
}