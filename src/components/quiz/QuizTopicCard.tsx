import React from "react";
import { ArrowUpRight, Play } from "lucide-react";
import type { QuizTopicMeta } from "../../data/quizTopics";
import type { TopicQuizProgress } from "../../store/useProgressStore";

interface QuizTopicCardProps {
  topic: QuizTopicMeta;
  progress?: TopicQuizProgress;
  onStartQuiz: (topicId: string) => void;
}

export const QuizTopicCard: React.FC<QuizTopicCardProps> = ({
  topic,
  progress,
  onStartQuiz,
}) => {
  const answered = progress?.answered ?? 0;
  const total = topic.totalQuestions;
  const percent = total > 0 ? Math.round((answered / total) * 100) : 0;
  const hasAttempted = answered > 0;

  const easyRatio = (topic.distribution.easy / total) * 100;
  const mediumRatio = (topic.distribution.medium / total) * 100;
  const hardRatio = (topic.distribution.hard / total) * 100;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d1322] p-5 shadow-xl transition-all duration-200 hover:border-blue-500/30">
      <div>
        {/* Top bar: SEC code & category on left, completion percentage on right */}
        <div className="mb-4 flex items-center justify-between text-xs font-semibold tracking-wider">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="font-mono text-slate-300">{topic.secCode}</span>
            <span>·</span>
            <span className="uppercase text-slate-300">{topic.category}</span>
          </div>
          <span className={`text-xs font-bold ${percent === 100 ? "text-cyan-400" : "text-slate-400"}`}>
            {percent}%
          </span>
        </div>

        {/* Title and Icon row */}
        <div className="mb-4 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#162035] text-xl font-bold text-white shadow-inner">
            {topic.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
              {topic.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
              {topic.description}
            </p>
          </div>
        </div>

        {/* Inner distribution container */}
        <div className="rounded-xl border border-white/5 bg-[#080d19] p-4">
          <div className="mb-2.5 flex items-center justify-between text-xs">
            <span className="text-slate-400">Cơ cấu câu hỏi thực tế:</span>
            <span className="font-bold text-white">{total} câu hỏi</span>
          </div>

          {/* Segmented multi-color progress bar */}
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              style={{ width: `${easyRatio}%` }}
              className="bg-emerald-400 transition-all duration-300"
              title={`Dễ: ${topic.distribution.easy}`}
            />
            <div
              style={{ width: `${mediumRatio}%` }}
              className="bg-amber-400 transition-all duration-300"
              title={`Vừa: ${topic.distribution.medium}`}
            />
            <div
              style={{ width: `${hardRatio}%` }}
              className="bg-rose-500 transition-all duration-300"
              title={`Khó: ${topic.distribution.hard}`}
            />
          </div>

          {/* Legend dots */}
          <div className="mt-3 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-slate-300">Dễ: {topic.distribution.easy}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-slate-300">Vừa: {topic.distribution.medium}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span className="text-slate-300">Khó: {topic.distribution.hard}</span>
            </div>
          </div>
        </div>

        {/* Progress section */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Tiến độ:</span>
            <span className="font-medium text-white">
              {answered} / {total}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              style={{ width: `${percent}%` }}
              className={`h-full rounded-full transition-all duration-500 ${
                percent === 100 ? "bg-cyan-400" : "bg-blue-500"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Footer action row */}
      <div className="mt-6 flex items-center justify-between pt-2">
        <span className="text-xs text-slate-400">
          {!hasAttempted
            ? "Chưa làm bài"
            : progress?.completed
            ? `Điểm: ${progress.bestScore}% (${progress.correct}/${total} đúng)`
            : `Đang làm: ${answered}/${total}`}
        </span>

        <button
          onClick={() => onStartQuiz(topic.id)}
          className="group inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Play size={12} className="fill-white" />
          <span>Luyện tập</span>
          <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
};
