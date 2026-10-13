
import {
  ArrowRight,
  GitBranch,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface TeamMember {
  id: string;
  initials: string;
  name: string;
  role: string;
  roleEn: string;
  description: string;
  descriptionEn: string;
  modules: string[];
  modulesEn: string[];
  isLeader?: boolean;
}

const teamMembers: TeamMember[] = [
  {
    id: "01",
    initials: "NB",
    name: "Nguyễn Công Bình",
    role: "Team Leader & Tích hợp hệ thống",
    roleEn: "Team Leader & System Integration",
    description:
      "Điều phối tiến độ nhóm, kết nối các module và đảm bảo các thành phần của CryptoLab hoạt động thống nhất. Phụ trách nội dung Block, Blockchain và Merkle Tree.",
    descriptionEn:
      "Coordinates the team, integrates modules, and ensures the CryptoLab components work together. Responsible for Block, Blockchain, and Merkle Tree.",
    modules: ["Block", "Blockchain", "Merkle Tree", "Tích hợp hệ thống"],
    modulesEn: ["Block", "Blockchain", "Merkle Tree", "System Integration"],
    isLeader: true,
  },
  {
    id: "02",
    initials: "LH",
    name: "Lê Trần Vĩnh Hưng",
    role: "Frontend & Giao diện hệ thống",
    roleEn: "Frontend & System Interface",
    description:
      "Phụ trách giao diện người dùng, Dashboard, đăng nhập Google, chuyển đổi ngôn ngữ Việt/Anh và mô phỏng hàm băm SHA-256.",
    descriptionEn:
      "Responsible for the user interface, Dashboard, Google login, Vietnamese/English language switching, and SHA-256 hashing simulation.",
    modules: ["Dashboard", "Google Login", "VI/EN", "SHA-256 Hash"],
    modulesEn: ["Dashboard", "Google Login", "VI/EN", "SHA-256 Hash"],
  },
  {
    id: "03",
    initials: "NK",
    name: "Ngô Bùi Anh Khải",
    role: "Giao dịch & Chữ ký số",
    roleEn: "Transactions & Digital Signatures",
    description:
      "Phụ trách mô phỏng giao dịch Blockchain và chữ ký số ECDSA, giúp người dùng tìm hiểu cách ký, xác minh chữ ký và kiểm tra tính toàn vẹn dữ liệu.",
    descriptionEn:
      "Responsible for Blockchain transaction and ECDSA digital signature simulations, demonstrating signing, signature verification, and data integrity.",
    modules: ["Transaction", "Digital Signature", "ECDSA", "Xác minh chữ ký"],
    modulesEn: ["Transaction", "Digital Signature", "ECDSA", "Verification"],
  },
  {
    id: "04",
    initials: "TK",
    name: "Trần Đình Kiệt",
    role: "Đồng thuận & Full Node Network",
    roleEn: "Consensus & Full Node Network",
    description:
      "Phụ trách các cơ chế đồng thuận Proof of Work, Proof of Stake, quá trình khai thác block và mô phỏng mạng lưới các node.",
    descriptionEn:
      "Responsible for Proof of Work, Proof of Stake, block mining, and Full Node Network simulations.",
    modules: ["Consensus", "Proof of Work", "Proof of Stake", "Full Node Network"],
    modulesEn: ["Consensus", "Proof of Work", "Proof of Stake", "Full Node Network"],
  },
  {
    id: "05",
    initials: "NĐ",
    name: "Nguyễn Đình Tiến Đạt",
    role: "Mô phỏng mạng & Nền tảng Blockchain",
    roleEn: "Network Simulation & Blockchain Platforms",
    description:
      "Phụ trách mô phỏng hoạt động của mạng Blockchain và giới thiệu các nền tảng thực tế thông qua những ví dụ về Cardano và Solana.",
    descriptionEn:
      "Responsible for Blockchain network simulation and demonstrations of real-world platforms, including Cardano and Solana.",
    modules: ["Network Simulator", "Cardano", "Solana", "So sánh nền tảng"],
    modulesEn: ["Network Simulator", "Cardano", "Solana", "Platform Comparison"],
  },
  {
    id: "06",
    initials: "HL",
    name: "Huỳnh Bảo Lâm",
    role: "Smart Contract & Kiểm thử bảo mật",
    roleEn: "Smart Contracts & Security Testing",
    description:
      "Phụ trách nội dung Smart Contract, Attack Simulator và Quiz, giúp người dùng tìm hiểu hợp đồng thông minh, các tình huống tấn công minh họa và củng cố kiến thức.",
    descriptionEn:
      "Responsible for Smart Contracts, Attack Simulator, and Quiz, helping users explore smart contracts, illustrative attack scenarios, and review key concepts.",
    modules: ["Smart Contract", "Attack Simulator", "Quiz", "Tổng kết"],
    modulesEn: ["Smart Contract", "Attack Simulator", "Quiz", "Wrap-up"],
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
        {/* Header */}
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

        {/* About CryptoLab */}
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
                    {isEnglish ? "What is CryptoLab?" : "CryptoLab là gì?"}
                  </h2>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-zinc-400">
                {isEnglish
                  ? "CryptoLab is an interactive Blockchain learning website designed to help users explore fundamental concepts through hands-on interaction and visual simulations."
                  : "CryptoLab là website học Blockchain tương tác, được xây dựng nhằm giúp người dùng tìm hiểu các khái niệm nền tảng thông qua thao tác trực tiếp và mô phỏng trực quan."}
              </p>

              <p className="mt-4 text-sm leading-7 text-zinc-400">
                {isEnglish
                  ? "The project connects theoretical knowledge with practical examples, allowing users to explore how data is hashed, transactions are processed, blocks are linked, and consensus mechanisms work."
                  : "Dự án kết nối kiến thức lý thuyết với các ví dụ thực hành, giúp người dùng tìm hiểu cách dữ liệu được băm, giao dịch được xử lý, các block liên kết với nhau và cơ chế đồng thuận hoạt động."}
              </p>

              <p className="mt-4 text-sm leading-7 text-zinc-400">
                {isEnglish
                  ? "Our goal is to make Blockchain easier to understand through a simple, visual, and practical learning experience."
                  : "Mục tiêu của nhóm là giúp Blockchain trở nên dễ hiểu hơn thông qua trải nghiệm học tập đơn giản, trực quan và thực tế."}
              </p>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="mb-16">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                {isEnglish ? "The team" : "ĐỘI NGŨ"}
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                {isEnglish
                  ? "Members & responsibilities"
                  : "Thành viên & công việc"}
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                {isEnglish
                  ? "Each member takes responsibility for specific parts of CryptoLab."
                  : "Mỗi thành viên đảm nhận một nhóm công việc cụ thể trong dự án CryptoLab."}
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs text-zinc-500 sm:flex">
              <Users className="h-4 w-4" />
              6 {isEnglish ? "members" : "thành viên"}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member) => {
              const responsibilities = isEnglish
                ? member.modulesEn
                : member.modules;

              return (
                <article
                  key={member.id}
                  className={`group rounded-2xl border p-5 transition-colors ${
                    member.isLeader
                      ? "border-cyan-400/30 bg-cyan-400/[0.045] hover:border-cyan-400/50"
                      : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Avatar and member number */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-lg font-semibold tracking-wide ${
                        member.isLeader
                          ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                          : "border-white/10 bg-white/[0.05] text-zinc-200"
                      }`}
                      aria-label={`Avatar ${member.name}`}
                    >
                      {member.initials}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="font-mono text-xs text-zinc-600">
                        {member.id}
                      </span>

                      {member.isLeader && (
                        <span className="rounded-md border border-cyan-400/25 bg-cyan-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-300">
                          {isEnglish ? "Team Leader" : "Trưởng nhóm"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="mt-5 text-base font-semibold text-white">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p
                    className={`mt-1 text-sm font-medium ${
                      member.isLeader ? "text-cyan-300" : "text-cyan-400/90"
                    }`}
                  >
                    {isEnglish ? member.roleEn : member.role}
                  </p>

                  {/* Description */}
                  <p className="mt-4 min-h-[108px] text-sm leading-6 text-zinc-400">
                    {isEnglish
                      ? member.descriptionEn
                      : member.description}
                  </p>

                  {/* Highlighted responsibilities */}
                  <div
                    className={`mt-5 rounded-xl border p-4 ${
                      member.isLeader
                        ? "border-cyan-400/20 bg-cyan-400/[0.045]"
                        : "border-white/[0.09] bg-black/20"
                    }`}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          member.isLeader ? "bg-cyan-300" : "bg-cyan-500"
                        }`}
                      />

                      <p
                        className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                          member.isLeader ? "text-cyan-300" : "text-zinc-200"
                        }`}
                      >
                        {isEnglish ? "Responsibilities" : "Phụ trách"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {responsibilities.map((module) => (
                        <span
                          key={module}
                          className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium ${
                            member.isLeader
                              ? "border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-200"
                              : "border-white/[0.12] bg-white/[0.04] text-zinc-300"
                          }`}
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

        {/* GitHub */}
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