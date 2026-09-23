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

// TODO: sau này thay bằng dữ liệu thật từ Zustand store (useStudentStore)
const student = {
  name: "Student",
  level: 3,
  xp: 680,
  xpToNextLevel: 1000,
  streak: 4,
  modules: [
    { name: "Hash", icon: Hash, progress: 100, path: "/hash" },
    { name: "Blockchain", icon: Blocks, progress: 80, path: "/blockchain" },
    { name: "Transaction", icon: Zap, progress: 40, path: "/transaction" },
    { name: "Merkle Tree", icon: Network, progress: 20, path: "/merkle" },
    { name: "Digital Signature", icon: Shield, progress: 0, path: "/signature" },
    { name: "Consensus", icon: Award, progress: 0, path: "/consensus" },
  ],
};

const recommended = student.modules.find((m) => m.progress > 0 && m.progress < 100)
  ?? student.modules.find((m) => m.progress === 0);

export default function DashboardPage() {
  const overallProgress = Math.round(
    student.modules.reduce((sum, m) => sum + m.progress, 0) / student.modules.length
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
              Chào mừng trở lại, {student.name}
            </h1>
            <p className="mt-3 max-w-xl leading-7 text-slate-400">
              Học blockchain bằng cách thực sự thử nghiệm — không chỉ đọc lý thuyết.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/hash"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
            >
              Tiếp tục học
            </Link>
            <Link
              to="/blockchain"
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Khám phá Simulation
            </Link>
          </div>
        </div>

        {/* STATS */}
        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard icon={Trophy} label="Level" value={student.level} color="text-yellow-400" bg="bg-yellow-400/10" />
          <StatCard icon={Zap} label="XP" value={`${student.xp} / ${student.xpToNextLevel}`} color="text-blue-400" bg="bg-blue-400/10" />
          <StatCard icon={Flame} label="Learning Streak" value={`${student.streak} ngày`} color="text-orange-400" bg="bg-orange-400/10" />
          <StatCard icon={Award} label="Overall Progress" value={`${overallProgress}%`} color="text-emerald-400" bg="bg-emerald-400/10" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* MODULE PROGRESS */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
            <h2 className="mb-5 font-semibold text-white">Tiến độ học tập</h2>
            <div className="space-y-4">
              {student.modules.map((m) => (
                <Link
                  key={m.name}
                  to={m.path}
                  className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#050816] p-4 transition hover:border-white/20"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
                    <m.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{m.name}</span>
                      <span className="text-xs text-slate-500">{m.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* RECOMMENDED */}
          <section className="rounded-3xl border border-purple-400/20 bg-purple-400/[0.04] p-6">
            <h2 className="mb-4 font-semibold text-white">Gợi ý cho bạn</h2>
            {recommended ? (
              <div>
                <p className="mb-4 text-sm leading-6 text-slate-400">
                  Bạn đã sẵn sàng để khám phá module <strong className="text-white">{recommended.name}</strong>.
                </p>
                <Link
                  to={recommended.path}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
                >
                  Bắt đầu {recommended.name}
                </Link>
              </div>
            ) : (
              <p className="text-sm text-slate-400">Bạn đã hoàn thành mọi module hiện có 🎉</p>
            )}
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