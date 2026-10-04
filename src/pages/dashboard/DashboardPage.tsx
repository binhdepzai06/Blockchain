import { Link } from "react-router-dom";
import {
  Activity,
  Award,
  Blocks,
  Flame,
  Hash,
  Landmark,
  Network,
  Rocket,
  Scale,
  Shield,
  ShieldAlert,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

import { useProgressStore } from "../../store/useProgressStore";
import { QUIZ_TOPICS } from "../../data/quizTopics";
import Card from "../../components/ui/Card";
import ProgressBar from "../../components/ui/ProgressBar";

export default function DashboardPage() {
  const { xp, streak, getLevel, quizTopicProgress } = useProgressStore();

  const level = getLevel();
  const xpToNextLevel = level * 200;

  const topicsWithProgress = QUIZ_TOPICS.map((topic) => {
    const progress = quizTopicProgress?.[topic.id];
    const answered = progress?.answered ?? 0;
    const percent = Math.round((answered / topic.totalQuestions) * 100);

    return {
      ...topic,
      answered,
      percent,
      bestScore: progress?.bestScore ?? 0,
      completed: progress?.completed ?? false,
    };
  });

  const overallProgress = Math.round(
    topicsWithProgress.reduce((sum, t) => sum + t.percent, 0) / topicsWithProgress.length
  );

  const weakestTopic = [...topicsWithProgress].sort((a, b) => a.percent - b.percent)[0];
  const inProgressTopics = topicsWithProgress.filter((t) => t.answered > 0 && !t.completed);
  const nextTopic = inProgressTopics[0] ?? weakestTopic;

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-10 flex flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent p-8 lg:flex-row lg:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1.5 text-sm text-blue-300">
              <Rocket size={14} />
              Interactive Blockchain Learning Platform
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Chào mừng trở lại</h1>
            <p className="mt-3 max-w-xl leading-7 text-slate-400">
              Học blockchain bằng cách thực sự thử nghiệm — không chỉ đọc lý thuyết.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/quiz"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
            >
              Tiếp tục ôn tập
            </Link>
            <Link
              to="/blockchain"
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Vào Mô phỏng
            </Link>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard icon={Trophy} label="Level" value={level} color="text-yellow-400" bg="bg-yellow-400/10" />
          <StatCard icon={Zap} label="XP" value={`${xp} / ${xpToNextLevel}`} color="text-blue-400" bg="bg-blue-400/10" />
          <StatCard icon={Flame} label="Learning Streak" value={`${streak} ngày`} color="text-orange-400" bg="bg-orange-400/10" />
          <StatCard icon={Award} label="Tiến độ Quiz" value={`${overallProgress}%`} color="text-emerald-400" bg="bg-emerald-400/10" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-semibold text-white">Tiến độ ôn tập (9 chủ đề)</h2>
              <Link to="/quiz" className="text-xs text-blue-400 hover:underline">
                Xem tất cả →
              </Link>
            </div>

            <div className="space-y-4">
              {topicsWithProgress.map((topic) => (
                <Link
                  key={topic.id}
                  to="/quiz"
                  className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#050816] p-4 transition hover:border-white/20"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-lg">
                    {topic.icon}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{topic.title}</span>
                      <span className="text-xs text-slate-500">
                        {topic.answered}/{topic.totalQuestions} câu
                      </span>
                    </div>
                    <ProgressBar value={topic.percent} />
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          <Card highlight="purple">
            <h2 className="mb-4 font-semibold text-white">Gợi ý cho bạn</h2>
            <p className="mb-4 text-sm leading-6 text-slate-400">
              {nextTopic ? (
                <>
                  Bạn nên tiếp tục với <strong className="text-white">{nextTopic.title}</strong> — mới làm{" "}
                  {nextTopic.answered}/{nextTopic.totalQuestions} câu.
                </>
              ) : (
                "Hãy bắt đầu làm Quiz để mình gợi ý chủ đề phù hợp."
              )}
            </p>
            <div className="space-y-3">
              <Link
                to="/quiz"
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                Làm Quiz ngay
              </Link>
            </div>
          </Card>
        </div>

        <Card className="mt-6">
          <h2 className="mb-5 font-semibold text-white">Khám phá thêm</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ExploreLink icon={Hash} label="Hash" path="/hash" />
            <ExploreLink icon={Blocks} label="Blockchain" path="/blockchain" />
            <ExploreLink icon={Shield} label="Chữ ký số" path="/signature" />
            <ExploreLink icon={Scale} label="Consensus" path="/consensus" />
            <ExploreLink icon={Network} label="Mạng P2P" path="/network" />
            <ExploreLink icon={Landmark} label="Cardano" path="/cardano" />
            <ExploreLink icon={Activity} label="Solana" path="/solana" />
            <ExploreLink icon={ShieldAlert} label="Attack Simulator" path="/attack-simulator" />
            <ExploreLink icon={Users} label="Nhóm thực hiện" path="/team" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string | number;
  color: string;
  bg: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${color}`}>
        <Icon size={18} />
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

function ExploreLink({
  icon: Icon,
  label,
  path,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  path: string;
}) {
  return (
    <Link
      to={path}
      className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#050816] p-4 transition hover:border-blue-400/30"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
        <Icon size={16} />
      </div>
      <span className="text-sm font-medium text-slate-200">{label}</span>
    </Link>
  );
}