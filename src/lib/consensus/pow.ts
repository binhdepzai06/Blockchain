import { sha256 } from "../crypto/hash";

export interface MineResult {
  nonce: number;
  hash: string;
  attempts: number;
  timeMs: number;
}

export async function mineBlock(
  data: string,
  difficulty: number,
  onProgress?: (attempts: number, currentHash: string) => void
): Promise<MineResult> {
  const target = "0".repeat(difficulty);
  let nonce = 0;
  const start = performance.now();

  while (true) {
    const hash = await sha256(`${data}${nonce}`);

    if (hash.startsWith(target)) {
      return {
        nonce,
        hash,
        attempts: nonce + 1,
        timeMs: performance.now() - start,
      };
    }

    nonce++;

    if (onProgress && nonce % 30 === 0) {
      onProgress(nonce, hash);
      // nhường lại cho UI cập nhật, tránh đứng trang
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
}