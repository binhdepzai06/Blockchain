export type Validator = {
  id: string
  name: string
  stake: number
  color: string
}

export const sha256 = async (input: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export const minePoW = async (
  difficulty: number,
  initialData = 'consensus-lab-block',
): Promise<{ nonce: number; hash: string; attempts: number; elapsedMs: number }> => {
  const targetPrefix = '0'.repeat(difficulty)
  const start = performance.now()
  let nonce = 0
  let attempts = 0

  while (true) {
    const payload = `${initialData}:${nonce}`
    const hash = await sha256(payload)
    attempts += 1

    if (hash.startsWith(targetPrefix)) {
      return {
        nonce,
        hash,
        attempts,
        elapsedMs: performance.now() - start,
      }
    }

    nonce += 1
  }
}

export const selectValidatorByStake = (
  validators: Validator[],
  randomValue = Math.random(),
): Validator => {
  const totalStake = validators.reduce((sum, validator) => sum + validator.stake, 0)
  let threshold = randomValue * totalStake

  for (const validator of validators) {
    threshold -= validator.stake
    if (threshold <= 0) {
      return validator
    }
  }

  return validators[validators.length - 1]
}
