import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Filter,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import type { QuizTopicMeta, QuizQuestion } from "../../data/quizTopics";
import { useProgressStore } from "../../store/useProgressStore";

interface QuizSessionProps {
  topic: QuizTopicMeta;
  onBack: () => void;
}

type DifficultyFilter = "all" | "easy" | "medium" | "hard";

export const QuizSession: React.FC<QuizSessionProps> = ({ topic, onBack }) => {
  const { setTopicQuizResult, addXp } = useProgressStore();
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Store user's selected option index for each question by question ID
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Filter questions based on difficulty selection
  const filteredQuestions: QuizQuestion[] = useMemo(() => {
    if (selectedDifficulty === "all") return topic.questions;
    return topic.questions.filter((q) => q.difficulty === selectedDifficulty);
  }, [topic.questions, selectedDifficulty]);

  const currentQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];
  const questionId = currentQuestion?.id;
  const selectedOptionIndex = questionId !== undefined ? userAnswers[questionId] : undefined;
  const isQuestionAnswered = selectedOptionIndex !== undefined;

  // Counts across filtered set
  const correctCount = useMemo(() => {
    return filteredQuestions.filter(
      (q) => userAnswers[q.id] !== undefined && userAnswers[q.id] === q.correctIndex
    ).length;
  }, [filteredQuestions, userAnswers]);

  const incorrectCount = useMemo(() => {
    return filteredQuestions.filter(
      (q) => userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correctIndex
    ).length;
  }, [filteredQuestions, userAnswers]);

  const answeredCount = Object.keys(userAnswers).length;
  const totalInFilter = filteredQuestions.length;

  // Difficulty counts for tabs
  const easyCount = useMemo(() => topic.questions.filter((q) => q.difficulty === "easy").length, [topic.questions]);
  const mediumCount = useMemo(() => topic.questions.filter((q) => q.difficulty === "medium").length, [topic.questions]);
  const hardCount = useMemo(() => topic.questions.filter((q) => q.difficulty === "hard").length, [topic.questions]);

  // When user clicks an option: IMMEDIATELY record and display Correct or Incorrect
  const handleOptionClick = (optionIdx: number) => {
    if (!currentQuestion || isQuestionAnswered || isCompleted) return;

    setUserAnswers((prev) => {
      const next = { ...prev, [currentQuestion.id]: optionIdx };
      return next;
    });
  };

  const handleNext = () => {
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    const totalQ = topic.questions.length;
    let totalCorrect = 0;
    topic.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) totalCorrect++;
    });

    const scorePercent = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
    setTopicQuizResult(topic.id, answeredCount, totalCorrect, scorePercent);
    addXp(totalCorrect * 10);
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  const getDifficultyBadge = (diff: "easy" | "medium" | "hard") => {
    switch (diff) {
      case "easy":
        return (
          <span className="inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-950/60 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
            Dễ
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center rounded-md border border-amber-500/30 bg-amber-950/60 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
            Vừa
          </span>
        );
      case "hard":
        return (
          <span className="inline-flex items-center rounded-md border border-rose-500/30 bg-rose-950/60 px-2.5 py-0.5 text-xs font-semibold text-rose-300">
            Khó
          </span>
        );
    }
  };

  // Completion Screen
  if (isCompleted) {
    let totalCorrect = 0;
    filteredQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) totalCorrect++;
    });
    const percent = totalInFilter > 0 ? Math.round((totalCorrect / totalInFilter) * 100) : 0;

    return (
      <div className="mx-auto max-w-2xl py-8">
        <div className="rounded-3xl border border-white/10 bg-[#0d1322] p-8 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <Trophy size={36} />
          </div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Hoàn thành bài luyện tập!</h2>
          <p className="mt-1 text-sm text-slate-400">
            {topic.secCode} · {topic.title}
          </p>

          <div className="my-8 grid grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-white/5 bg-[#080d19] p-4">
              <div className="text-2xl font-black text-blue-400 sm:text-3xl">{percent}%</div>
              <div className="mt-1 text-xs text-slate-400">Độ chính xác</div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#080d19] p-4">
              <div className="text-2xl font-black text-emerald-400 sm:text-3xl">
                {totalCorrect} / {totalInFilter}
              </div>
              <div className="mt-1 text-xs text-slate-400">Câu trả lời đúng</div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#080d19] p-4">
              <div className="text-2xl font-black text-purple-400 sm:text-3xl">
                +{totalCorrect * 10}
              </div>
              <div className="mt-1 text-xs text-slate-400">Điểm kinh nghiệm</div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              <RotateCcw size={16} />
              Làm lại bài thi
            </button>
            <button
              onClick={onBack}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500"
            >
              <ArrowLeft size={16} />
              Quay lại danh sách chủ đề
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl py-4 sm:py-6">
      {/* Top Header & Breadcrumb */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={14} />
          <span>Danh sách chủ đề</span>
        </button>

        {/* Live Score Counter */}
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1 font-semibold text-emerald-300">
            <CheckCircle2 size={13} />
            Đúng: {correctCount}
          </span>
          <span className="flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-950/40 px-2.5 py-1 font-semibold text-rose-300">
            <XCircle size={13} />
            Sai: {incorrectCount}
          </span>
          <span className="hidden sm:inline text-slate-400">
            Đã làm: <strong className="text-white">{answeredCount}</strong> / {totalInFilter}
          </span>
        </div>
      </div>

      {/* Difficulty Tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        <span className="flex items-center gap-1 text-xs text-slate-400 mr-1">
          <Filter size={13} />
          Mức độ:
        </span>
        <button
          onClick={() => {
            setSelectedDifficulty("all");
            setCurrentIndex(0);
          }}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            selectedDifficulty === "all"
              ? "bg-blue-600 text-white shadow"
              : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          Tất cả ({topic.questions.length})
        </button>
        <button
          onClick={() => {
            setSelectedDifficulty("easy");
            setCurrentIndex(0);
          }}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            selectedDifficulty === "easy"
              ? "bg-emerald-600 text-white shadow"
              : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          Dễ ({easyCount})
        </button>
        <button
          onClick={() => {
            setSelectedDifficulty("medium");
            setCurrentIndex(0);
          }}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            selectedDifficulty === "medium"
              ? "bg-amber-600 text-white shadow"
              : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          Vừa ({mediumCount})
        </button>
        <button
          onClick={() => {
            setSelectedDifficulty("hard");
            setCurrentIndex(0);
          }}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            selectedDifficulty === "hard"
              ? "bg-rose-600 text-white shadow"
              : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          Khó ({hardCount})
        </button>
      </div>

      {/* Main Question Card */}
      {currentQuestion && (
        <div className="rounded-3xl border border-white/10 bg-[#0d1322] p-5 shadow-2xl sm:p-8">
          {/* Question Meta Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">
                Câu {currentIndex + 1} / {filteredQuestions.length}
              </span>
              <span>·</span>
              {getDifficultyBadge(currentQuestion.difficulty)}
            </div>

            {/* Instant Answer Status Pill */}
            {isQuestionAnswered && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                  selectedOptionIndex === currentQuestion.correctIndex
                    ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                    : "bg-rose-950/80 text-rose-300 border border-rose-500/40"
                }`}
              >
                {selectedOptionIndex === currentQuestion.correctIndex ? (
                  <>
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    Chính xác ✅
                  </>
                ) : (
                  <>
                    <XCircle size={14} className="text-rose-400" />
                    Không chính xác ❌
                  </>
                )}
              </span>
            )}
          </div>

          {/* Question Text */}
          <h2 className="text-base font-bold text-white leading-relaxed sm:text-lg lg:text-xl">
            {currentQuestion.question}
          </h2>

          {/* 4 Choices: A, B, C, D */}
          <div className="mt-6 space-y-3">
            {currentQuestion.options.map((opt, optIdx) => {
              const letter = String.fromCharCode(65 + optIdx);
              const isUserSelection = selectedOptionIndex === optIdx;
              const isCorrectAnswer = optIdx === currentQuestion.correctIndex;

              // Compute styles based on whether user has answered
              let containerStyle =
                "border-white/10 bg-[#080d19] text-slate-200 hover:border-blue-500/40 hover:bg-[#0a1122]";
              let letterStyle = "border-white/10 bg-white/5 text-slate-300";
              let badge = null;

              if (isQuestionAnswered) {
                if (isCorrectAnswer) {
                  // The correct option is always highlighted in green
                  containerStyle =
                    "border-emerald-500/70 bg-emerald-950/30 text-emerald-200 ring-1 ring-emerald-500/30";
                  letterStyle = "border-emerald-500/50 bg-emerald-500/20 text-emerald-300";
                  badge = (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 shrink-0 ml-2">
                      <CheckCircle2 size={16} />
                      {isUserSelection ? "Chính xác ✅" : "Đáp án đúng ✅"}
                    </span>
                  );
                } else if (isUserSelection && !isCorrectAnswer) {
                  // The user's wrong pick is highlighted in red
                  containerStyle =
                    "border-rose-500/70 bg-rose-950/30 text-rose-200 ring-1 ring-rose-500/30";
                  letterStyle = "border-rose-500/50 bg-rose-500/20 text-rose-300";
                  badge = (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 shrink-0 ml-2">
                      <XCircle size={16} />
                      Sai ❌
                    </span>
                  );
                } else {
                  // Other options dimmed
                  containerStyle = "border-white/5 bg-[#080d19]/40 text-slate-500 opacity-60";
                  letterStyle = "border-white/5 bg-white/5 text-slate-500";
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleOptionClick(optIdx)}
                  disabled={isQuestionAnswered}
                  className={`flex w-full items-start justify-between rounded-xl border p-4 text-left text-sm transition-all duration-150 ${containerStyle} ${
                    !isQuestionAnswered ? "cursor-pointer active:scale-[0.99]" : "cursor-default"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-xs font-bold ${letterStyle}`}
                    >
                      {letter}
                    </span>
                    <span className="pt-0.5 leading-snug">{opt}</span>
                  </div>
                  {badge}
                </button>
              );
            })}
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-5">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft size={14} />
              Câu trước
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>
                {currentIndex + 1 < filteredQuestions.length
                  ? "Câu tiếp theo"
                  : "Xem kết quả bài thi"}
              </span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Quick Jump Question Navigator Grid */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d1322] p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Bảng điều hướng nhanh câu hỏi:</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Đúng
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              Sai
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-slate-700" />
              Chưa làm
            </span>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-12 md:grid-cols-14 lg:grid-cols-18">
          {filteredQuestions.map((q, idx) => {
            const ans = userAnswers[q.id];
            const isAnswered = ans !== undefined;
            const isCorrect = isAnswered && ans === q.correctIndex;
            const isCurrent = idx === currentIndex;

            let dotStyle = "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10";

            if (isAnswered) {
              if (isCorrect) {
                dotStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold";
              } else {
                dotStyle = "bg-rose-500/20 border-rose-500/50 text-rose-300 font-bold";
              }
            }

            if (isCurrent) {
              dotStyle += " ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0d1322]";
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex h-8 w-full items-center justify-center rounded-lg border text-xs transition ${dotStyle}`}
                title={`Câu ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
