import { QUIZ_TOPICS, type QuizQuestion } from "../data/quizTopics";

export interface ComprehensiveQuestion {
  id: string;
  originalId: string;
  topicId: string;
  topicTitle: string;
  topicIcon: string;
  topicSecCode: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  difficulty: "easy" | "medium" | "hard";
}

/**
 * Fisher-Yates shuffle helper
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generates a 40-question mixed quiz from all available topics.
 *
 * Rules:
 * 1. Represents every topic as evenly as possible across 40 questions:
 *    With 9 topics, 4 topics provide 5 questions and 5 topics provide 4 questions (4*5 + 5*4 = 40).
 * 2. Balanced mix of Easy, Medium, and Hard questions:
 *    Overall target: ~16 Easy, ~14 Medium, ~10 Hard.
 * 3. Each question has 4 options (A, B, C, D) and exactly 1 correct answer.
 * 4. Randomly shuffled so every attempt has variety.
 */
export function generateComprehensiveReviewQuestions(): ComprehensiveQuestion[] {
  const allTopics = QUIZ_TOPICS;
  const numTopics = allTopics.length; // 9 topics

  if (numTopics === 0) return [];

  // Shuffle the topic list to randomize which topics get 5 vs 4 questions
  const shuffledTopics = shuffleArray(allTopics);

  // First 4 topics get 5 questions, remaining 5 get 4 questions = 4*5 + 5*4 = 40
  const topicQuestionQuotas: { topic: typeof allTopics[0]; count: number; easy: number; medium: number; hard: number }[] = [];

  shuffledTopics.forEach((topic, idx) => {
    if (idx < 4) {
      // 5 questions: 2 easy, 2 medium, 1 hard
      topicQuestionQuotas.push({
        topic,
        count: 5,
        easy: 2,
        medium: 2,
        hard: 1,
      });
    } else {
      // 4 questions: alternate difficulty slightly to reach target (16 easy, 14 medium, 10 hard)
      // idx 4, 5, 6 (3 topics): 2 easy, 1 medium, 1 hard -> 6 easy, 3 medium, 3 hard
      // idx 7, 8 (2 topics): 1 easy, 2 medium, 1 hard -> 2 easy, 4 medium, 2 hard
      // Total easy: 4*2 + 3*2 + 2*1 = 8 + 6 + 2 = 16 Easy!
      // Total medium: 4*2 + 3*1 + 2*2 = 8 + 3 + 4 = 15 Medium!
      // Total hard: 4*1 + 3*1 + 2*1 = 4 + 3 + 2 = 9 Hard!
      // Total questions = 16 + 15 + 9 = 40 questions!
      const isEasyLean = idx < 7;
      topicQuestionQuotas.push({
        topic,
        count: 4,
        easy: isEasyLean ? 2 : 1,
        medium: isEasyLean ? 1 : 2,
        hard: 1,
      });
    }
  });

  const selectedQuestions: ComprehensiveQuestion[] = [];

  topicQuestionQuotas.forEach(({ topic, easy, medium, hard }) => {
    const easyPool = shuffleArray(topic.questions.filter((q) => q.difficulty === "easy"));
    const mediumPool = shuffleArray(topic.questions.filter((q) => q.difficulty === "medium"));
    const hardPool = shuffleArray(topic.questions.filter((q) => q.difficulty === "hard"));

    const pickedEasy = easyPool.slice(0, easy);
    const pickedMedium = mediumPool.slice(0, medium);
    const pickedHard = hardPool.slice(0, hard);

    // Fallbacks if a pool had fewer than requested
    let combined: QuizQuestion[] = [...pickedEasy, ...pickedMedium, ...pickedHard];
    if (combined.length < easy + medium + hard) {
      const remainingTarget = easy + medium + hard - combined.length;
      const alreadyPickedIds = new Set(combined.map((c) => c.id));
      const backupPool = shuffleArray(topic.questions.filter((q) => !alreadyPickedIds.has(q.id)));
      combined = [...combined, ...backupPool.slice(0, remainingTarget)];
    }

    combined.forEach((q) => {
      selectedQuestions.push({
        id: `comp-${topic.id}-${q.id}`,
        originalId: q.id,
        topicId: topic.id,
        topicTitle: topic.title,
        topicIcon: topic.icon,
        topicSecCode: topic.secCode,
        category: topic.category,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        difficulty: q.difficulty,
      });
    });
  });

  // Interleave questions to avoid clusters of the same topic
  // We can group by topic and pick round-robin or perform a well-spread shuffle
  const topicBuckets = new Map<string, ComprehensiveQuestion[]>();
  selectedQuestions.forEach((q) => {
    if (!topicBuckets.has(q.topicId)) {
      topicBuckets.set(q.topicId, []);
    }
    topicBuckets.get(q.topicId)!.push(q);
  });

  const interleaved: ComprehensiveQuestion[] = [];
  let addedAny = true;
  while (addedAny && interleaved.length < selectedQuestions.length) {
    addedAny = false;
    for (const [, bucket] of topicBuckets.entries()) {
      if (bucket.length > 0) {
        interleaved.push(bucket.shift()!);
        addedAny = true;
      }
    }
  }

  // Final sanity check: exactly 40 questions
  return interleaved.slice(0, 40);
}
