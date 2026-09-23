import {
  Blocks,
  GitBranch,
  Hash,
  Network,
  Rocket,
  Shield,
  Users,
} from "lucide-react";

interface Member {
  name: string;
  role: string;
  contribution: string;
}

const members: Member[] = [
  { name: "Nguyễn Công Bình", role: "👑 Tech Lead + Integration", contribution: "Định hướng kỹ thuật, điều phối dự án và tích hợp các module lại với nhau." },
  { name: "Lê Trần Vĩnh Hưng", role: "🎨 UI/UX + Visualization", contribution: "Thiết kế giao diện người dùng, tối ưu trải nghiệm và trực quan hóa các thành phần." },
  { name: "Ngô Bùi Anh Khải", role: "🔐 Blockchain Core + Cryptography", contribution: "Xây dựng lõi Blockchain, thuật toán băm (Hash), cây Merkle và mã hóa số." },
  { name: "Trần Đình Kiệt", role: "⚡ Consensus Lab", contribution: "Phát triển và mô phỏng các thuật toán đồng thuận (Proof of Work, Proof of Stake)." },
  { name: "Nguyễn Đình Tiến Đạt", role: "🌐 Network + Real Networks", contribution: "Xây dựng mô phỏng mạng lưới phân tán và tích hợp dữ liệu mạng thực tế (Cardano/Solana)." },
  { name: "Huỳnh Bảo Lâm", role: "🤖 Personalization + Web3", contribution: "Phát triển tính năng cá nhân hóa người dùng, Smart Contract và các tính năng Web3." },
];

const siteFeatures = [
  { icon: Hash, title: "Hash", desc: "Trực quan hóa thuật toán SHA-256, hiệu ứng avalanche khi đổi dữ liệu." },
  { icon: Blocks, title: "Blockchain", desc: "Tạo Block, liên kết bằng Previous Hash, thử tampering để xem chain bị phá vỡ." },
  { icon: GitBranch, title: "Merkle Tree", desc: "Trực quan hóa cây Merkle, thấy Root thay đổi khi 1 giao dịch bị sửa." },
  { icon: Shield, title: "Digital Signature", desc: "Ký và xác thực giao dịch bằng Web Crypto API (ECDSA)." },
  { icon: Rocket, title: "Consensus", desc: "Tự đào Block (PoW), mô phỏng chọn Validator theo stake (PoS)." },
  { icon: Network, title: "Network & Smart Contract", desc: "Mô phỏng lan truyền transaction qua mạng, gọi hàm trên Smart Contract." },
];

export default function TeamPage() {
  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            <Users size={16} />
            Về chúng tôi
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Nhóm phát triển CryptoLab
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
            CryptoLab là nền tảng học blockchain tương tác, được xây dựng bởi
            nhóm sinh viên với mục tiêu giúp người học hiểu blockchain
            bằng cách thực sự thử nghiệm, thay vì chỉ đọc lý thuyết.
          </p>
        </div>

        {/* MEMBERS */}
        <section className="mb-14">
          <h2 className="mb-6 text-center text-2xl font-semibold text-white">
            Thành viên nhóm
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => (
              <div
                key={m.name}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-blue-400/30"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                  {m.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(-2)
                    .join("")}
                </div>
                <h3 className="font-semibold text-white text-lg">{m.name}</h3>
                <p className="mb-3 text-sm font-medium text-blue-300">{m.role}</p>
                <p className="text-sm leading-6 text-slate-400">
                  {m.contribution}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SITE OVERVIEW */}
        <section>
          <h2 className="mb-6 text-center text-2xl font-semibold text-white">
            Nội dung trang web
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {siteFeatures.map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
                  <f.icon size={20} />
                </div>
                <h3 className="mb-2 font-semibold text-white">{f.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GITHUB */}
        <div className="mt-14 flex justify-center">
          <a
            href="https://github.com/binhdepzai06/Blockchain"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            <svg
              className="h-4 w-4 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Xem source code trên GitHub
          </a>
        </div>
      </div>
    </div>
  );
}