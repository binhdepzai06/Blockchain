import { useMemo, useState } from 'react'
import { usePoWMiner } from '../hooks/usePoWMiner'
import { selectValidatorByStake, type Validator } from '../lib/consensus'

const validators: Validator[] = [
  { id: 'v1', name: 'Alice', stake: 45, color: 'bg-cyan-500' },
  { id: 'v2', name: 'Bob', stake: 30, color: 'bg-violet-500' },
  { id: 'v3', name: 'Carol', stake: 15, color: 'bg-emerald-500' },
  { id: 'v4', name: 'David', stake: 10, color: 'bg-amber-500' },
]

const tabs = ['PoW', 'PoS'] as const

type TabKey = (typeof tabs)[number]

export function ConsensusLab() {
  const [activeTab, setActiveTab] = useState<TabKey>('PoW')
  const [selectedProducer, setSelectedProducer] = useState<Validator | null>(validators[0])
  const {
    isMining,
    difficulty,
    setDifficulty,
    startMining,
    stopMining,
    nonce,
    hash,
    attempts,
    elapsedTime,
  } = usePoWMiner(2)

  const totalStake = useMemo(
    () => validators.reduce((sum, validator) => sum + validator.stake, 0),
    [],
  )

  const spinProducer = () => {
    const winner = selectValidatorByStake(validators)
    setSelectedProducer(winner)
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur">
        <header className="mb-6 flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Consensus Lab</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Proof-of-Work & Proof-of-Stake</h1>
          </div>
        </header>

        <div className="mb-6 inline-flex rounded-full border border-slate-700 bg-slate-800 p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === tab
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'PoW' ? (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Mining status</h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    isMining ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {isMining ? 'Mining' : 'Idle'}
                </span>
              </div>

              <label className="mb-3 block text-sm text-slate-300">
                Difficulty: <span className="font-semibold text-cyan-300">{difficulty}</span>
              </label>
              <input
                type="range"
                min={1}
                max={5}
                value={difficulty}
                onChange={(event) => setDifficulty(Number(event.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-cyan-500"
              />

              <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                  <span>Current hash</span>
                  <span>{isMining ? 'Live' : 'Stable'}</span>
                </div>
                <div className="animate-pulse overflow-hidden rounded-lg border border-cyan-500/30 bg-slate-950 px-3 py-4 font-mono text-sm text-cyan-300 break-all">
                  {hash}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {!isMining ? (
                  <button
                    type="button"
                    onClick={() => void startMining()}
                    className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Start mining
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopMining}
                    className="rounded-xl bg-rose-500 px-5 py-3 font-semibold text-white transition hover:bg-rose-400"
                  >
                    Stop mining
                  </button>
                )}
              </div>
            </section>

            <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Nonce</p>
                <p className="mt-3 text-3xl font-bold text-white">{nonce}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Attempts</p>
                <p className="mt-3 text-3xl font-bold text-white">{attempts}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:col-span-2 lg:col-span-1">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Elapsed</p>
                <p className="mt-3 text-3xl font-bold text-white">{elapsedTime.toFixed(2)} s</p>
              </div>
            </aside>
          </div>
        ) : (
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Validators</h2>
                <button
                  type="button"
                  onClick={spinProducer}
                  className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400"
                >
                  Choose block producer
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-800">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-800/80 text-slate-300">
                    <tr>
                      <th className="px-4 py-3 font-medium">Validator</th>
                      <th className="px-4 py-3 font-medium">Stake</th>
                      <th className="px-4 py-3 font-medium">Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {validators.map((validator) => {
                      const stakePct = (validator.stake / totalStake) * 100
                      return (
                        <tr key={validator.id} className="border-t border-slate-800 bg-slate-900/60">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <span className={`h-3 w-3 rounded-full ${validator.color}`} />
                              <span className="font-medium text-white">{validator.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-300">{validator.stake}%</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="h-2.5 w-40 overflow-hidden rounded-full bg-slate-800">
                                <div
                                  className={`h-full rounded-full ${validator.color}`}
                                  style={{ width: `${stakePct}%` }}
                                />
                              </div>
                              <span className="w-12 text-right text-slate-300">{stakePct.toFixed(0)}%</span>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-slate-900 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Selected block producer</p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedProducer?.name ?? 'None'}</h3>
                  <p className="text-slate-300">
                    Stake weight: {selectedProducer?.stake ?? 0}%
                  </p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/20 text-2xl shadow-lg shadow-violet-500/30">
                  🎲
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConsensusLab
