export interface UserProfile {
  id: string;
  name: string;
  level: number;
  xp: number;
  streak: number;
  completedModules: string[];
  achievements: string[];
}

export interface QuizScore {
  module: string;
  score: number;
  total: number;
  percentage: number;
}

export interface ExperimentRecord {
  id: string;
  module: string;
  title: string;
  completedAt: number;
  result: "success" | "failed";
  xpEarned: number;
}