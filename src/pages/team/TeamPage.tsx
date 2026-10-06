import {
  ArrowRight,
  Blocks,
  Code2,
  Cpu,
  FileCode2,
  Fingerprint,
  GitBranch,
  Globe2,
  GraduationCap,
  Hash,
  Network,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleEn: string;
  description: string;
  descriptionEn: string;
  modules: string[];
  icon: typeof Users;
}

const teamMembers: TeamMember[] = [
  {
    id: "01",
    name: "Nguyễn Công Bình",
    role: "Điều phối & tích hợp hệ thống",
    roleEn: "System Coordination & Integration",
    description:
      "Điều phối tiến độ, tích hợp các module và phụ trách Blockchain, Merkle Tree, Attack Simulator cùng việc kết nối các thành phần của hệ thống.",
    descriptionEn:
      "Coordinates the project, integrates modules, and works on Blockchain, Merkle Tree, Attack Simulator, and system-level integration.",
    modules: [
      "Blockchain",
      "Merkle Tree",
      "Attack Simulator",
      "Integration",
    ],
    icon: Blocks,
  },
  {
    id: "02",
    name: "Lê Trần Vĩnh Hưng",
    role: "Frontend & giao diện hệ thống",
    roleEn: "Frontend & System Interface",
    description:
      "Phụ trách xây dựng giao diện, layout, navigation, các component dùng chung và trải nghiệm tương tác của CryptoLab.",
    descriptionEn:
      "Builds the interface, layouts, navigation, shared components, and interactive experience of CryptoLab.",
    modules: [
      "Frontend",
      "Navbar",
      "Authentication",
      "UI Components",
    ],
    icon: Code2,
  },
  {
    id: "03",
    name: "Ngô Bùi Anh Khải",
    role: "Mật mã & chữ ký số",
    roleEn: "Cryptography & Digital Signature",
    description:
      "Phụ trách các nội dung mật mã nền tảng, hàm băm SHA-256, chữ ký số ECDSA và cơ chế xác minh tính toàn vẹn dữ liệu.",
    descriptionEn:
      "Works on core cryptography concepts, SHA-256 hashing, ECDSA digital signatures, and data integrity verification.",
    modules: [
      "SHA-256",
      "Digital Signature",
      "ECDSA",
      "Data Integrity",
    ],
    icon: Fingerprint,
  },
  {
    id: "04",
    name: "Trần Đình Kiệt",
    role: "Cơ chế đồng thuận & khai thác",
    roleEn: "Consensus & Mining",
    description:
      "Phụ trách mô phỏng Proof of Work, Proof of Stake, quá trình Mining, Nonce, Difficulty và lựa chọn Validator.",
    descriptionEn:
      "Works on Proof of Work, Proof of Stake, mining, nonce, difficulty, and validator selection simulations.",
    modules: [
      "Proof of Work",
      "Proof of Stake",
      "Mining",
      "Validator",
    ],
    icon: Cpu,
  },
  {
    id: "05",
    name: "Nguyễn Đình Tiến Đạt",
    role: "Mạng Blockchain & nền tảng thực tế",
    roleEn: "Blockchain Network & Real Networks",
    description:
      "Phụ trách mô phỏng mạng Blockchain, Full Node Network và nội dung mô phỏng các hệ sinh thái Cardano và Solana.",
    descriptionEn:
      "Works on Blockchain network simulation, Full Node Network, and real-world ecosystem simulations for Cardano and Solana.",
    modules: [
      "Network Simulator",
      "Full Node Network",
      "Cardano",
      "Solana",
    ],
    icon: Network,
  },
  {
    id: "06",
    name: "Huỳnh Bảo Lâm",
    role: "Smart Contract & nội dung học tập",
    roleEn: "Smart Contract & Learning Content",
    description:
      "Phụ trách Smart Contract, nội dung giải thích khái niệm và hỗ trợ xây dựng tài liệu, README và nội dung phục vụ trình bày.",
    descriptionEn:
      "Works on Smart Contract, educational explanations, documentation, README, and presentation content.",
    modules: [
      "Smart Contract",
      "Learning Content",
      "Documentation",
      "README",
    ],
    icon: FileCode2,
  },
];

export default function TeamPage() {
  const { isEnglish } = useLanguage();

  return (
    <div className="min-h-screen bg-[#08090c] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-280px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.04] blur-3xl" />

        <div className="absolute bottom-[-250px] right-[-200px] h-[500px] w-[500px] rounded-full bg-violet-500/[0.035] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        {/* =========================================================
            HEADER
        ========================================================= */}
        <section className="mb-14">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            {isEnglish ? "PROJECT TEAM" : "NHÓM PHÁT TRIỂN"}
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {isEnglish
                ? "Meet the CryptoLab team."
                : "Đội ngũ phát triển CryptoLab."}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">
              {isEnglish
                ? "A team project focused on making Blockchain concepts easier to understand through interactive simulations and practical visualization."
                : "Dự án nhóm hướng đến việc giúp các khái niệm Blockchain trở nên dễ hiểu hơn thông qua mô phỏng tương tác và trực quan hóa."}
            </p>
          </div>
        </section>

        {/* =========================================================
            ABOUT CRYPTOLAB
        ========================================================= */}
        <section className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <ShieldCheck className="h-5 w-5 text-cyan-400" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    {isEnglish ? "About the project" : "Về dự án"}
                  </p>

                  <h2 className="mt-1 text-lg font-medium text-white">
                    {isEnglish
                      ? "What is CryptoLab?"
                      : "CryptoLab là gì?"}
                  </h2>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-zinc-400">
                {isEnglish
                  ? "CryptoLab is an interactive Blockchain learning website developed to help users understand fundamental Blockchain concepts through direct interaction and visual simulation."
                  : "CryptoLab là website học Blockchain tương tác được xây dựng nhằm giúp người dùng hiểu các khái niệm nền tảng của Blockchain thông qua thao tác trực tiếp và mô phỏng trực quan."}
              </p>

              <p className="mt-4 text-sm leading-7 text-zinc-400">
                {isEnglish
                  ? "The project combines theoretical knowledge with practical simulations, allowing users to observe how data is hashed, transactions are processed, blocks are formed, consensus is reached, and Blockchain networks operate."
                  : "Dự án kết hợp kiến thức lý thuyết với các mô phỏng thực hành, giúp người dùng quan sát cách dữ liệu được băm, giao dịch được xử lý, block được hình thành, cơ chế đồng thuận hoạt động và mạng Blockchain vận hành."}
              </p>

              <p className="mt-4 text-sm leading-7 text-zinc-400">
                {isEnglish
                  ? "Our goal is to create a simple, visual, and practical environment where Blockchain concepts can be explored instead of being learned only through theory."
                  : "Mục tiêu của nhóm là xây dựng một môi trường đơn giản, trực quan và thực tế, nơi các khái niệm Blockchain có thể được khám phá thay vì chỉ học thông qua lý thuyết."}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            TEAM
        ========================================================= */}
        <section className="mb-16">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                {isEnglish ? "The team" : "Đội ngũ"}
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                {isEnglish
                  ? "Members & responsibilities"
                  : "Thành viên & công việc"}
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                {isEnglish
                  ? "Each member is responsible for a specific part of the CryptoLab project."
                  : "Mỗi thành viên phụ trách một nhóm công việc cụ thể trong dự án CryptoLab."}
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs text-zinc-500 sm:flex">
              <Users className="h-4 w-4" />
              6 {isEnglish ? "members" : "thành viên"}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member) => {
              const Icon = member.icon;

              return (
                <article
                  key={member.id}
                  className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
                >
                  {/* Member header */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className="h-5 w-5 text-cyan-400" />
                    </div>

                    <span className="font-mono text-xs text-zinc-600">
                      {member.id}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="mt-5 text-base font-medium text-white">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="mt-1 text-sm text-cyan-400/80">
                    {isEnglish ? member.roleEn : member.role}
                  </p>

                  {/* Description */}
                  <p className="mt-4 min-h-[84px] text-sm leading-6 text-zinc-500">
                    {isEnglish
                      ? member.descriptionEn
                      : member.description}
                  </p>

                  {/* Responsibilities */}
                  <div className="mt-5 border-t border-white/[0.07] pt-4">
                    <p className="mb-2 text-[11px] uppercase tracking-wider text-zinc-600">
                      {isEnglish ? "Responsibilities" : "Phụ trách"}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {member.modules.map((module) => (
                        <span
                          key={module}
                          className="rounded-md border border-white/[0.08] bg-black/20 px-2 py-1 text-[11px] text-zinc-500"
                        >
                          {module}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            GITHUB
        ========================================================= */}
        <section className="mb-10">
          <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <GitBranch className="h-5 w-5 text-cyan-400" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    GitHub
                  </p>

                  <h2 className="mt-1 text-lg font-medium text-white">
                    {isEnglish
                      ? "Explore the source code"
                      : "Xem mã nguồn dự án"}
                  </h2>
                </div>
              </div>

              <p className="mt-3 text-sm text-zinc-500">
                {isEnglish
                  ? "View the source code, development history, and project documentation."
                  : "Xem mã nguồn, lịch sử phát triển và tài liệu của dự án."}
              </p>
            </div>

            <a
              href="https://github.com/binhdepzai06/Blockchain"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.08]"
            >
              {isEnglish ? "View GitHub" : "Xem GitHub"}

              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-white/[0.07] pt-6 text-center">
          <p className="text-xs text-zinc-600">
            {isEnglish
              ? "CryptoLab — Interactive Blockchain Learning Platform"
              : "CryptoLab — Nền tảng học Blockchain tương tác"}
          </p>
        </div>
      </div>
    </div>
  );
}