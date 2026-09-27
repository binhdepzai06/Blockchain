import { Link } from "react-router-dom";
import {
  Award,
  Blocks,
  Flame,
  Hash,
  Network,
  Rocket,
  Shield,
  Trophy,
  Zap,
} from "lucide-react";

import {
  topicLabels,
  useProgressStore,
  type TopicId,
} from "../../store/useProgressStore";

const moduleIcons: Record<TopicId, React.ComponentType<{ size?: number }>> = {
  hash: Hash,
  blockchain: Blocks,
  transaction: Zap,
  merkle: Network,
  signature: Shield,
  consensus: Award,
};

const modulePaths: Record<TopicId, string> = {
  hash: "/hash",
  blockchain: "/blockchain",
  transaction: "/transaction",
  merkle: "/merkle",
  signature: "/signature",
  consensus: "/consensus",
};

export default function DashboardPage() {
  const { xp, streak, topics, getLevel, getWeakestTopic } = useProgressStore();

  const level = getLevel();
  const xpToNextLevel = level * 200;
  const weakest = getWeakestTopic();

  const topicIds = Object.keys(topics) as TopicId[];
  const overallProgress = Math.round(
    topicIds.reduce((sum, id) => sum + topics[id].progress, 0) / topicIds.length
  );

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1300px]">

        {/* HERO */}
        <div className="mb-10 flex flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent p-8 lg:flex-row lg:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1.5 text-sm text-blue-300">
              <Rocket size={14} />
              Interactive Blockchain Learning Platform
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Chào mừng trở lại
            </h1>
            <p className="mt-3 max-w-xl leading-7 text-slate-400">
              Học blockchain bằng cách thực sự thử nghiệm — không chỉ đọc lý thuyết.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to={modulePaths[weakest]}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
            >
              Tiếp tục học
            </Link>
            <Link
              to="/quiz"
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Làm Quiz
            </Link>
          </div>
        </div>

        {/* STATS */}
        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard icon={Trophy} label="Level" value={level} color="text-yellow-400" bg="bg-yellow-400/10" />
          <StatCard icon={Zap} label="XP" value={`${xp} / ${xpToNextLevel}`} color="text-blue-400" bg="bg-blue-400/10" />
          <StatCard icon={Flame} label="Learning Streak" value={`${streak} ngày`} color="text-orange-400" bg="bg-orange-400/10" />
          <StatCard icon={Award} label="Overall Progress" value={`${overallProgress}%`} color="text-emerald-400" bg="bg-emerald-400/10" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* MODULE PROGRESS */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
            <h2 className="mb-5 font-semibold text-white">Tiến độ học tập</h2>
            <div className="space-y-4">
              {topicIds.map((id) => {
                const Icon = moduleIcons[id];
                return (
                  <Link
                    key={id}
                    to={modulePaths[id]}
                    className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#050816] p-4 transition hover:border-white/20"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
                      <Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-medium text-white">
                          {topicLabels[id]}
                        </span>
                        <span className="text-xs text-slate-500">
                          {topics[id].progress}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${topics[id].progress}%` }}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* RECOMMENDED */}
          <section className="rounded-3xl border border-purple-400/20 bg-purple-400/[0.04] p-6">
            <h2 className="mb-4 font-semibold text-white">Gợi ý cho bạn</h2>
            <p className="mb-4 text-sm leading-6 text-slate-400">
              Bạn đang yếu nhất ở module{" "}
              <strong className="text-white">{topicLabels[weakest]}</strong>.
              Hãy ôn lại hoặc làm quiz để cải thiện.
            </p>
            <div className="space-y-3">
              <Link
                to={modulePaths[weakest]}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                Ôn lại {topicLabels[weakest]}
              </Link>
              <Link
                to="/quiz"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Làm Quiz chủ đề này
              </Link>
            </div>
          </section>

        </div>
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