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

interface ProgressState {
  xp: number;
  streak: number;
  topics: Record<TopicId, TopicProgress>;

  addXp: (amount: number) => void;
  setTopicProgress: (topic: TopicId, progress: number) => void;
  setQuizScore: (topic: TopicId, score: number) => void;
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