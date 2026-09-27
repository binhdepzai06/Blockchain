import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TopicId =
  | "hash"
  | "blockchain"
  | "transaction"
  | "merkle"
  | "signature"
  | "consensus";

interface TopicProgress {
  progress: number; // 0-100
  quizBestScore: number; // 0-100
}

export interface TopicQuizProgress {
  answered: number;
  correct: number;
  bestScore: number;
  completed: boolean;
}

interface ProgressState {
  xp: number;
  streak: number;
  topics: Record<TopicId, TopicProgress>;
  quizTopicProgress: Record<string, TopicQuizProgress>;

  addXp: (amount: number) => void;
  setTopicProgress: (topic: TopicId, progress: number) => void;
  setQuizScore: (topic: TopicId, score: number) => void;
  setTopicQuizResult: (topicId: string, answered: number, correct: number, score: number) => void;
  getLevel: () => number;
  getWeakestTopic: () => TopicId;
}

const defaultTopics: Record<TopicId, TopicProgress> = {
  hash: { progress: 100, quizBestScore: 0 },
  blockchain: { progress: 60, quizBestScore: 0 },
  transaction: { progress: 40, quizBestScore: 0 },
  merkle: { progress: 20, quizBestScore: 0 },
  signature: { progress: 10, quizBestScore: 0 },
  consensus: { progress: 0, quizBestScore: 0 },
};

const defaultQuizTopicProgress: Record<string, TopicQuizProgress> = {
  "hash-sha256": { answered: 0, correct: 0, bestScore: 0, completed: false },
  "mining-pow": { answered: 0, correct: 0, bestScore: 0, completed: false },
  "rsa-crypto": { answered: 0, correct: 0, bestScore: 0, completed: false },
  "merkle-tree": { answered: 0, correct: 0, bestScore: 0, completed: false },
  "blockchain-basics": { answered: 0, correct: 0, bestScore: 0, completed: false },
  "cryptography": { answered: 0, correct: 0, bestScore: 0, completed: false },
  "p2p-nodes": { answered: 0, correct: 0, bestScore: 0, completed: false },
  "smart-contract": { answered: 0, correct: 0, bestScore: 0, completed: false },
  "security": { answered: 0, correct: 0, bestScore: 0, completed: false },
};

export const topicLabels: Record<TopicId, string> = {
  hash: "Hash",
  blockchain: "Blockchain",
  transaction: "Transaction",
  merkle: "Merkle Tree",
  signature: "Digital Signature",
  consensus: "Consensus",
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      streak: 1,
      topics: defaultTopics,
      quizTopicProgress: defaultQuizTopicProgress,

      addXp: (amount) => set((state) => ({ xp: state.xp + amount })),

      setTopicProgress: (topic, progress) =>
        set((state) => ({
          topics: {
            ...state.topics,
            [topic]: { ...state.topics[topic], progress },
          },
        })),

      setQuizScore: (topic, score) =>
        set((state) => ({
          topics: {
            ...state.topics,
            [topic]: {
              ...state.topics[topic],
              quizBestScore: Math.max(state.topics[topic].quizBestScore, score),
            },
          },
        })),

      setTopicQuizResult: (topicId, answered, correct, score) =>
        set((state) => {
          const current = state.quizTopicProgress?.[topicId] || {
            answered: 0,
            correct: 0,
            bestScore: 0,
            completed: false,
          };
          return {
            quizTopicProgress: {
              ...state.quizTopicProgress,
              [topicId]: {
                answered,
                correct,
                bestScore: Math.max(current.bestScore || 0, score),
                completed: true,
              },
            },
          };
        }),

      getLevel: () => Math.floor(get().xp / 200) + 1,

      getWeakestTopic: () => {
        const topics = get().topics;
        let weakest: TopicId = "hash";
        let lowestScore = Infinity;

        (Object.keys(topics) as TopicId[]).forEach((id) => {
          const combined = (topics[id].progress + topics[id].quizBestScore) / 2;
          if (combined < lowestScore) {
            lowestScore = combined;
            weakest = id;
          }
        });

        return weakest;
      },
    }),
    { name: "cryptolab-progress" }
  )
);