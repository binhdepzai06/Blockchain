import React from "react";
import type { QuizTopicMeta } from "../../data/quizTopics";
import type { TopicQuizProgress } from "../../store/useProgressStore";

interface QuizTopicCompactCardProps {
  topic: QuizTopicMeta;
  progress?: TopicQuizProgress;
  onStartQuiz: (topicId: string) => void;
}

export const QuizTopicCompactCard: React.FC<QuizTopicCompactCardProps> = ({
  topic,
  progress,
  onStartQuiz,
}) => {
  // Use persistent progress if user has answered, or fallback to overallStats for demo
  const userHasProgress = (progress?.answered ?? 0) > 0;
  const answered = userHasProgress
    ? progress!.answered
    : topic.overallStats.answered;
  const total = userHasProgress
    ? topic.totalQuestions
    : (topic.overallStats.easyTotal + topic.overallStats.mediumTotal + topic.overallStats.hardTotal);
  const correct = userHasProgress
    ? progress!.correct
    : topic.overallStats.correct;

  const percent = total > 0 ? Math.round((answered / total) * 100) : 0;
  const isComplete = percent === 100;

  return (
    <div
      onClick={() => onStartQuiz(topic.id)}
      className="group relative flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-[#0d1322] p-5 shadow-xl transition-all duration-200 hover:border-blue-500/40 hover:bg-[#10172a]"
    >
      <div className="flex-1 pr-4">
        {/* Title and Icon */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#162035] text-lg font-bold text-white shadow-inner">
            {topic.icon}
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
            {topic.title}
          </h3>
        </div>

        {/* Badges: Dễ, Vừa, Khó */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md border border-cyan-500/30 bg-cyan-950/50 px-2 py-0.5 text-xs font-semibold text-cyan-300">
            {topic.overallStats.easyTotal} Dễ
          </span>
          <span className="inline-flex items-center rounded-md border border-amber-500/30 bg-amber-950/50 px-2 py-0.5 text-xs font-semibold text-amber-300">
            {topic.overallStats.mediumTotal} Vừa
          </span>
          <span className="inline-flex items-center rounded-md border border-rose-500/30 bg-rose-950/50 px-2 py-0.5 text-xs font-semibold text-rose-300">
            {topic.overallStats.hardTotal} Khó
          </span>
        </div>

        {/* Answered text */}
        <div className="mt-3 text-xs text-slate-400">
          {answered === 0 ? (
            <span>0/{total} đã trả lời</span>
          ) : (
            <span>
              {answered}/{total} đã trả lời • {correct}/{answered} đúng
            </span>
          )}
        </div>
      </div>

      {/* Circular Progress Ring */}
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
        <svg className="h-14 w-14 -rotate-90 transform" viewBox="0 0 56 56">
          <circle
            cx="28"
            cy="28"
            r="22"
            stroke="currentColor"
            strokeWidth="3.5"
            className="text-slate-800"
            fill="transparent"
          />
          <circle
            cx="28"
            cy="28"
            r="22"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeDasharray={2 * Math.PI * 22}
            strokeDashoffset={2 * Math.PI * 22 * (1 - percent / 100)}
            strokeLinecap="round"
            className={isComplete ? "text-cyan-400" : "text-blue-500"}
            fill="transparent"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xs font-bold ${isComplete ? "text-cyan-400" : "text-slate-400"}`}>
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
};
