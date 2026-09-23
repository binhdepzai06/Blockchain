import { useState } from "react";
import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";

import {
  topicLabels,
  useProgressStore,
  type TopicId,
} from "../../store/useProgressStore";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

const questionBank: Record<TopicId, Question[]> = {
  hash: [
    {
      question: "SHA-256 luôn tạo ra hash có độ dài bao nhiêu bit?",
      options: ["128 bit", "256 bit", "512 bit", "Tùy độ dài input"],
      correctIndex: 1,
    },
    {
      question: "Nếu đổi 1 ký tự trong dữ liệu đầu vào, hash sẽ:",
      options: ["Không đổi", "Thay đổi hoàn toàn", "Thay đổi 1 phần nhỏ", "Báo lỗi"],
      correctIndex: 1,
    },
  ],
  blockchain: [
    {
      question: "Mỗi Block chứa thông tin gì để liên kết với Block trước?",
      options: ["Tên người tạo", "Previous Hash", "Địa chỉ IP", "Thời gian tạo Genesis"],
      correctIndex: 1,
    },
    {
      question: "Block đầu tiên của một Blockchain gọi là gì?",
      options: ["Root Block", "Genesis Block", "Master Block", "Origin Block"],
      correctIndex: 1,
    },
  ],
  transaction: [
    {
      question: "Trước khi được đưa vào Block, transaction nằm ở đâu?",
      options: ["Merkle Tree", "Transaction Pool", "Validator", "Genesis Block"],
      correctIndex: 1,
    },
  ],
  merkle: [
    {
      question: "Merkle Root dùng để làm gì?",
      options: [
        "Lưu private key",
        "Tóm tắt toàn bộ giao dịch trong Block bằng 1 hash",
        "Xác định độ khó đào Block",
        "Chọn Validator",
      ],
      correctIndex: 1,
    },
  ],
  signature: [
    {
      question: "Khóa nào dùng để KÝ một giao dịch?",
      options: ["Public Key", "Private Key", "Merkle Root", "Nonce"],
      correctIndex: 1,
    },
  ],
  consensus: [
    {
      question: "Proof of Stake chọn người tạo Block dựa trên?",
      options: ["Sức mạnh tính toán", "Số coin đang stake", "Thời gian online", "Ngẫu nhiên hoàn toàn"],
      correctIndex: 1,
    },
  ],
};

export default function QuizPage() {
  const { setQuizScore, addXp, getWeakestTopic } = useProgressStore();
  const [topic, setTopic] = useState<TopicId>(getWeakestTopic());
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const questions = questionBank[topic];

  const startQuiz = (t: TopicId) => {
    setTopic(t);
    setAnswers(new Array(questionBank[t].length).fill(null));
    setSubmitted(false);
  };

  const selectAnswer = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    const next = [...answers];
    next[qIndex] = optionIndex;
    setAnswers(next);
  };

  const score = questions.reduce((sum, q, i) => {
    return sum + (answers[i] === q.correctIndex ? 1 : 0);
  }, 0);
  const scorePercent = Math.round((score / questions.length) * 100);

  const handleSubmit = () => {
    setSubmitted(true);
    setQuizScore(topic, scorePercent);
    addXp(scorePercent);
  };

  if (answers.length === 0) {
    return (
      <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-[800px]">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
              <HelpCircle size={16} />
              Quiz
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Chọn chủ đề Quiz
            </h1>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {(Object.keys(questionBank) as TopicId[]).map((t) => (
              <button
                key={t}
                onClick={() => startQuiz(t)}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-blue-400/40"
              >
                <div className="font-semibold text-white">{topicLabels[t]}</div>
                <div className="text-xs text-slate-500">
                  {questionBank[t].length} câu hỏi
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[800px]">
        <h1 className="mb-8 text-3xl font-bold text-white">
          Quiz: {topicLabels[topic]}
        </h1>

        <div className="space-y-6">
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="mb-4 font-medium text-white">
                {qIndex + 1}. {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((opt, optIndex) => {
                  const isSelected = answers[qIndex] === optIndex;
                  const isCorrect = optIndex === q.correctIndex;

                  let style =
                    "border-white/10 bg-[#050816] text-slate-300 hover:border-white/30";

                  if (submitted) {
                    if (isCorrect) {
                      style = "border-emerald-400/40 bg-emerald-400/10 text-emerald-300";
                    } else if (isSelected && !isCorrect) {
                      style = "border-red-400/40 bg-red-400/10 text-red-300";
                    }
                  } else if (isSelected) {
                    style = "border-blue-400/40 bg-blue-400/10 text-blue-300";
                  }

                  return (
                    <button
                      key={optIndex}
                      onClick={() => selectAnswer(qIndex, optIndex)}
                      disabled={submitted}
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${style}`}
                    >
                      {opt}
                      {submitted && isCorrect && <CheckCircle2 size={16} />}
                      {submitted && isSelected && !isCorrect && <XCircle size={16} />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={answers.includes(null)}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 py-4 font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Nộp bài
          </button>
        ) : (
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-white">
              {score}/{questions.length}
            </div>
            <div className="mb-4 text-sm text-slate-400">
              Điểm số: {scorePercent}% — Bạn nhận được +{scorePercent} XP
            </div>
            <button
              onClick={() => setAnswers([])}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Chọn chủ đề khác
            </button>
          </div>
        )}
      </div>
    </div>
  );
}