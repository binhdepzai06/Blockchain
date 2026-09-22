import { useCallback, useEffect, useRef, useState } from 'react'
import { sha256 } from '../lib/consensus'

export type PoWMinerState = {
  isMining: boolean
  difficulty: number
  nonce: number
  hash: string
  attempts: number
  elapsedTime: number
}

export const usePoWMiner = (initialDifficulty = 2) => {
  const [difficulty, setDifficulty] = useState(initialDifficulty)
  const [state, setState] = useState<PoWMinerState>({
    isMining: false,
    difficulty: initialDifficulty,
    nonce: 0,
    hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    attempts: 0,
    elapsedTime: 0,
  })
  const startedAtRef = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)
  const cancelledRef = useRef(false)
  const runIdRef = useRef(0)

  const stopMining = useCallback(() => {
    cancelledRef.current = true
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
    setState((prev) => ({ ...prev, isMining: false }))
  }, [])

  const startMining = useCallback(async () => {
    const currentRunId = ++runIdRef.current
    cancelledRef.current = false
    startedAtRef.current = performance.now()

    setState({
      isMining: true,
      difficulty,
      nonce: 0,
      hash: 'pending',
      attempts: 0,
      elapsedTime: 0,
    })

    if (timerRef.current) {
      window.clearInterval(timerRef.current)
    }

    timerRef.current = window.setInterval(() => {
      if (startedAtRef.current) {
        const elapsed = (performance.now() - startedAtRef.current) / 1000
        setState((prev) => ({ ...prev, elapsedTime: Number(elapsed.toFixed(2)) }))
      }
    }, 16)

    const targetPrefix = '0'.repeat(difficulty)
    let nonce = 0
    let attempts = 0

    while (!cancelledRef.current && currentRunId === runIdRef.current) {
      const payload = `consensus_lab:${difficulty}:${nonce}`
      const hash = await sha256(payload)
      attempts += 1

      setState((prev) => ({
        ...prev,
        nonce,
        hash,
        attempts,
      }))

      if (hash.startsWith(targetPrefix)) {
        if (timerRef.current) {
          window.clearInterval(timerRef.current)
          timerRef.current = null
        }

        setState((prev) => ({
          ...prev,
          isMining: false,
          elapsedTime: Number(((performance.now() - (startedAtRef.current ?? performance.now())) / 1000).toFixed(2)),
          hash,
          nonce,
          attempts,
        }))
        return
      }

      nonce += 1
      await new Promise((resolve) => window.setTimeout(resolve, 0))
    }

    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }

    setState((prev) => ({ ...prev, isMining: false, elapsedTime: Number(((performance.now() - (startedAtRef.current ?? performance.now())) / 1000).toFixed(2)) }))
  }, [difficulty])

  useEffect(() => {
    return () => {
      cancelledRef.current = true
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
      }
    }
  }, [])

  return {
    ...state,
    setDifficulty,
    startMining,
    stopMining,
  }
}
