import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Trophy,
  XCircle,
  Sparkles,
  Layers,
  HelpCircle,
  BarChart3,
  Flame,
} from "lucide-react";
import {
  generateComprehensiveReviewQuestions,
  type ComprehensiveQuestion,
} from "../../utils/comprehensiveReviewGenerator";
import { QUIZ_TOPICS } from "../../data/quizTopics";
import { useProgressStore } from "../../store/useProgressStore";

interface ComprehensiveReviewSessionProps {
  onBack: () => void;
}

type ReviewStage = "intro" | "in_progress" | "completed";

export const ComprehensiveReviewSession: React.FC<ComprehensiveReviewSessionProps> = ({
  onBack,
}) => {
  const { addXp } = useProgressStore();
  const [stage, setStage] = useState<ReviewStage>("intro");
  const [questions, setQuestions] = useState<ComprehensiveQuestion[]>(() =>
    generateComprehensiveReviewQuestions()
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Initialize or re-generate questions
  const initializeQuiz = () => {
    const generated = generateComprehensiveReviewQuestions();
    setQuestions(generated);
    setCurrentIndex(0);
    setUserAnswers({});
    setStage("in_progress");
    setShowSubmitModal(false);
  };

  const currentQuestion = questions[currentIndex] || questions[0];
  const questionId = currentQuestion?.id;
  const selectedOptionIndex = questionId !== undefined ? userAnswers[questionId] : undefined;
  const isQuestionAnswered = selectedOptionIndex !== undefined;

  // Real-time score counters
  const correctCount = useMemo(() => {
    return questions.filter(
      (q) => userAnswers[q.id] !== undefined && userAnswers[q.id] === q.correctIndex
    ).length;
  }, [questions, userAnswers]);

  const incorrectCount = useMemo(() => {
    return questions.filter(
      (q) => userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correctIndex
    ).length;
  }, [questions, userAnswers]);

  const answeredCount = Object.keys(userAnswers).length;
  const totalQuestions = questions.length || 40;

  // Answer selection handler: immediate feedback
  const handleOptionClick = (optionIdx: number) => {
    if (!currentQuestion || isQuestionAnswered || stage !== "in_progress") return;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIdx,
    }));
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (answeredCount < totalQuestions) {
      setShowSubmitModal(true);
    } else {
      finalizeQuiz();
    }
  };

  const finalizeQuiz = () => {
    setShowSubmitModal(false);
    setStage("completed");
    // Reward XP based on correct answers
    addXp(correctCount * 15);
  };

  // Restart / Reset handler
  const handleRestart = () => {
    initializeQuiz();
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

  // 1. INTRO / START SCREEN
  if (stage === "intro") {
    return (
      <div className="mx-auto max-w-4xl py-6 sm:py-10">
        <div className="rounded-3xl border border-blue-500/20 bg-[#0d1322] p-6 shadow-2xl sm:p-10">
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={14} />
              <span>Quay lại danh sách</span>
            </button>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
              <Sparkles size={13} />
              <span>Tính năng mới</span>
            </div>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-blue-600/30 to-indigo-600/30 border border-blue-500/30 text-blue-400 shadow-xl shadow-blue-500/10">
              <Layers size={40} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Ôn tập tổng hợp
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
              Thử thách 40 câu hỏi trắc nghiệm tổng hợp từ toàn bộ 9 chuyên đề cốt lõi. Câu hỏi được phân bổ đồng đều giữa các chủ đề và cân bằng giữa 3 mức độ Dễ, Vừa và Khó.
            </p>
          </div>

          {/* Quick Specifications */}
          <div className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="rounded-2xl border border-white/5 bg-[#080d19] p-4 text-center">
              <div className="text-2xl font-black text-blue-400 sm:text-3xl">40</div>
              <div className="mt-1 text-xs text-slate-400">Câu hỏi chọn lọc</div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#080d19] p-4 text-center">
              <div className="text-2xl font-black text-emerald-400 sm:text-3xl">9/9</div>
              <div className="mt-1 text-xs text-slate-400">Chuyên đề cốt lõi</div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#080d19] p-4 text-center">
              <div className="text-2xl font-black text-amber-400 sm:text-3xl">3 cấp độ</div>
              <div className="mt-1 text-xs text-slate-400">Dễ · Vừa · Khó</div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#080d19] p-4 text-center">
              <div className="text-2xl font-black text-purple-400 sm:text-3xl">Tức thì</div>
              <div className="mt-1 text-xs text-slate-400">Hiện Đúng / Sai ngay</div>
            </div>
          </div>

          {/* 9 Topics Included */}
          <div className="mb-8 rounded-2xl border border-white/5 bg-[#080d19] p-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Danh sách 9 chuyên đề được phân bổ đồng đều:
            </h3>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {QUIZ_TOPICS.map((topic) => (
                <div
                  key={topic.id}
                  className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-[#0c1322] px-3 py-2 text-xs text-slate-300"
                >
                  <span className="text-base">{topic.icon}</span>
                  <span className="font-medium truncate">{topic.title}</span>
                  <span className="ml-auto text-[10px] text-slate-400">{topic.secCode}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button: BẮT ĐẦU */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={initializeQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-blue-500/25 transition hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles size={18} />
              <span>Bắt đầu</span>
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
            >
              <span>Quay lại</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. COMPLETION / RESULTS SCREEN
  if (stage === "completed") {
    const percent = Math.round((correctCount / totalQuestions) * 100);

    // Topic performance breakdown
    const topicBreakdown = QUIZ_TOPICS.map((topic) => {
      const topicQuestions = questions.filter((q) => q.topicId === topic.id);
      const topicCorrect = topicQuestions.filter(
        (q) => userAnswers[q.id] === q.correctIndex
      ).length;
      return {
        ...topic,
        total: topicQuestions.length,
        correct: topicCorrect,
      };
    });

    return (
      <div className="mx-auto max-w-3xl py-6 sm:py-8">
        <div className="rounded-3xl border border-white/10 bg-[#0d1322] p-6 text-center shadow-2xl sm:p-10">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Trophy size={44} />
          </div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Hoàn thành Ôn tập tổng hợp!
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Kết quả 40 câu hỏi trắc nghiệm qua 9 chuyên đề Blockchain
          </p>

          <div className="my-8 grid grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-white/5 bg-[#080d19] p-4">
              <div className="text-2xl font-black text-blue-400 sm:text-3xl">{percent}%</div>
              <div className="mt-1 text-xs text-slate-400">Độ chính xác</div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#080d19] p-4">
              <div className="text-2xl font-black text-emerald-400 sm:text-3xl">
                {correctCount} / {totalQuestions}
              </div>
              <div className="mt-1 text-xs text-slate-400">Câu trả lời đúng</div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#080d19] p-4">
              <div className="text-2xl font-black text-purple-400 sm:text-3xl">
                +{correctCount * 15}
              </div>
              <div className="mt-1 text-xs text-slate-400">Điểm kinh nghiệm</div>
            </div>
          </div>

          {/* Breakdown per topic */}
          <div className="mb-8 rounded-2xl border border-white/5 bg-[#080d19] p-5 text-left">
            <div className="mb-3 flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
              <span className="flex items-center gap-1.5">
                <BarChart3 size={14} className="text-blue-400" />
                Kết quả chi tiết theo từng chuyên đề:
              </span>
              <span>Đúng / Tổng số</span>
            </div>
            <div className="space-y-2">
              {topicBreakdown.map((t) => {
                const topicPct = t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0;
                return (
                  <div
                    key={t.id}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0c1322] px-3.5 py-2.5 text-xs text-slate-300"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{t.icon}</span>
                      <span className="font-semibold text-white">{t.title}</span>
                      <span className="text-[10px] text-slate-500">({t.secCode})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:block w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${topicPct}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-emerald-400">
                        {t.correct} / {t.total}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons: LÀM LẠI & QUAY LẠI */}
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500 active:scale-[0.98]"
            >
              <RotateCcw size={16} />
              <span>Làm lại</span>
            </button>
            <button
              onClick={onBack}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
            >
              <ArrowLeft size={16} />
              <span>Quay lại danh sách chủ đề</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. IN PROGRESS: 40-QUESTION INTERACTIVE SESSION
  return (
    <div className="mx-auto max-w-4xl py-4 sm:py-6">
      {/* Top Header & Navigation */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={14} />
          <span>Danh sách chủ đề</span>
        </button>

        {/* Live Score Counter */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          <span className="flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1 font-semibold text-emerald-300">
            <CheckCircle2 size={13} />
            Đúng: {correctCount}
          </span>
          <span className="flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-950/40 px-2.5 py-1 font-semibold text-rose-300">
            <XCircle size={13} />
            Sai: {incorrectCount}
          </span>
          <span className="hidden sm:inline text-slate-400">
            Đã làm: <strong className="text-white">{answeredCount}</strong> / {totalQuestions}
          </span>
          {/* NỘP BÀI button in header */}
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600/90 px-3 py-1 font-bold text-white transition hover:bg-emerald-500 text-xs shadow"
          >
            <span>Nộp bài</span>
          </button>
        </div>
      </div>

      {/* Mode Banner / Subtitle */}
      <div className="mb-5 flex items-center justify-between rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Flame size={14} className="text-blue-400" />
          <span className="font-semibold text-white">Chế độ Ôn tập tổng hợp</span>
          <span className="text-slate-400">· 40 câu hỏi trích từ 9 chuyên đề</span>
        </div>
        <div className="text-slate-400 hidden sm:block">
          Tiến độ: {Math.round((answeredCount / totalQuestions) * 100)}%
        </div>
      </div>

      {/* Main Question Card */}
      {currentQuestion && (
        <div className="rounded-3xl border border-white/10 bg-[#0d1322] p-5 shadow-2xl sm:p-8">
          {/* Meta Header */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-slate-400">
                Câu {currentIndex + 1} / {totalQuestions}
              </span>
              <span>·</span>
              {getDifficultyBadge(currentQuestion.difficulty)}
              <span>·</span>
              <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-slate-300">
                <span>{currentQuestion.topicIcon}</span>
                <span>{currentQuestion.topicTitle}</span>
              </span>
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
                    Đúng ✅
                  </>
                ) : (
                  <>
                    <XCircle size={14} className="text-rose-400" />
                    Sai ❌
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
                      {isUserSelection ? "Đúng ✅" : "Đáp án đúng ✅"}
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
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-5">
            <div className="flex items-center gap-2">
              {/* CÂU TRƯỚC */}
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft size={14} />
                <span>Câu trước</span>
              </button>

              {/* LÀM LẠI */}
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-medium text-slate-400 transition hover:bg-white/10 hover:text-white"
                title="Làm lại toàn bộ bài thi"
              >
                <RotateCcw size={13} />
                <span>Làm lại</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* NỘP BÀI if on last question or anytime */}
              {currentIndex + 1 === totalQuestions ? (
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <CheckCircle2 size={14} />
                  <span>Nộp bài</span>
                </button>
              ) : (
                /* CÂU TIẾP THEO */
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Câu tiếp theo</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Jump Question Matrix (40 Questions) */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d1322] p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">
            Bảng điều hướng nhanh 40 câu hỏi:
          </span>
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

        <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-10 md:grid-cols-20">
          {questions.map((q, idx) => {
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
                title={`Câu ${idx + 1}: ${q.topicTitle}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal when submitting before answering all questions */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0d1322] p-6 shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
              <HelpCircle size={28} />
            </div>
            <h3 className="text-lg font-bold text-white">Xác nhận nộp bài?</h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Bạn đã hoàn thành <strong className="text-white">{answeredCount}</strong> / {totalQuestions} câu hỏi.
              {answeredCount < totalQuestions && (
                <span className="block mt-1 text-amber-400">
                  Còn {totalQuestions - answeredCount} câu hỏi chưa được trả lời.
                </span>
              )}
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={finalizeQuiz}
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-500"
              >
                Nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
