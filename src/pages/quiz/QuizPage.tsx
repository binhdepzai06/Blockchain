import { useState } from "react";
import { LayoutGrid, ListFilter, Sparkles, Layers, ArrowRight } from "lucide-react";
import { QUIZ_TOPICS } from "../../data/quizTopics";
import { useProgressStore } from "../../store/useProgressStore";
import { QuizTopicCard } from "../../components/quiz/QuizTopicCard";
import { QuizTopicCompactCard } from "../../components/quiz/QuizTopicCompactCard";
import { QuizSession } from "../../components/quiz/QuizSession";
import { ComprehensiveReviewSession } from "../../components/quiz/ComprehensiveReviewSession";

type ViewMode = "detailed" | "compact";

export default function QuizPage() {
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [isComprehensiveReview, setIsComprehensiveReview] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("detailed");
  const { quizTopicProgress } = useProgressStore();

  const activeTopic = QUIZ_TOPICS.find((t) => t.id === activeTopicId);

  // If comprehensive review mode is active
  if (isComprehensiveReview) {
    return (
      <div className="min-h-[calc(100vh-72px)] px-4 py-8 sm:px-6 lg:px-10">
        <ComprehensiveReviewSession
          onBack={() => setIsComprehensiveReview(false)}
        />
      </div>
    );
  }

  // If a topic is selected for practice, render the QuizSession
  if (activeTopic) {
    return (
      <div className="min-h-[calc(100vh-72px)] px-4 py-8 sm:px-6 lg:px-10">
        <QuizSession
          topic={activeTopic}
          onBack={() => setActiveTopicId(null)}
        />
      </div>
    );
  }

  // Calculate summary across the 9 topics
  const totalTopics = QUIZ_TOPICS.length;
  const completedTopics = QUIZ_TOPICS.filter(
    (t) => (quizTopicProgress?.[t.id]?.answered ?? 0) >= t.totalQuestions
  ).length;

  return (
    <div className="min-h-[calc(100vh-72px)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header section matching screenshot */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-300">
              <Sparkles size={13} />
              <span>Hệ thống 9 chuyên đề trắc nghiệm</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Ôn tập theo chủ đề
            </h1>
            <p className="mt-1.5 text-sm text-slate-400">
              Kiểm tra kiến thức chuyên sâu với 9 chủ đề cốt lõi về Mật mã, Blockchain, PoW và Smart Contract.
            </p>
          </div>

          {/* View toggle */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-[#0d1322] p-1">
              <button
                onClick={() => setViewMode("detailed")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  viewMode === "detailed"
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Cấu trúc chi tiết (Ảnh 2)"
              >
                <LayoutGrid size={14} />
                <span>Thẻ chi tiết</span>
              </button>
              <button
                onClick={() => setViewMode("compact")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  viewMode === "compact"
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Dạng lưới gọn (Ảnh 1)"
              >
                <ListFilter size={14} />
                <span>Dạng tổng quan</span>
              </button>
            </div>
          </div>
        </div>

        {/* FEATURE BANNER: Comprehensive Review Mode */}
        <div className="mb-8 relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-[#0c1427] via-[#0d162a] to-[#111c38] p-6 shadow-2xl">
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-3xl">
              <h2 className="text-xl font-black text-white sm:text-2xl lg:text-3xl">
                Ôn tập tổng hợp
              </h2>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={() => setIsComprehensiveReview(true)}
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/25 transition hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Layers size={18} />
                <span>Ôn tập tổng hợp</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 9 Topics Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {QUIZ_TOPICS.map((topic) => {
            const progress = quizTopicProgress?.[topic.id];

            return viewMode === "detailed" ? (
              <QuizTopicCard
                key={topic.id}
                topic={topic}
                progress={progress}
                onStartQuiz={(id) => setActiveTopicId(id)}
              />
            ) : (
              <QuizTopicCompactCard
                key={topic.id}
                topic={topic}
                progress={progress}
                onStartQuiz={(id) => setActiveTopicId(id)}
              />
            );
          })}
        </div>

        {/* Bottom statistics summary banner */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-[#0d1322]/80 p-5 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-slate-400">
            <div>
              Đã hoàn thành <strong className="text-white">{completedTopics}</strong> / {totalTopics} chủ đề kiến thức.
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Dễ: Nền tảng khái niệm
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                Vừa: Cơ chế hoạt động
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Khó: Kỹ thuật & Tấn công
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
