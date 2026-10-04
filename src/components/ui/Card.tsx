import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  highlight?: "none" | "red" | "emerald" | "purple";
}

const HIGHLIGHT_MAP = {
  none: "border-white/10 bg-white/[0.03]",
  red: "border-red-400/20 bg-red-400/[0.03]",
  emerald: "border-emerald-400/20 bg-emerald-400/[0.03]",
  purple: "border-purple-400/20 bg-purple-400/[0.04]",
};

// Khối "thẻ bo góc viền mờ" dùng ở MỌI section trong app
// (rounded-3xl border border-white/10 bg-white/[0.03] p-6). Gom về
// đây để toàn bộ web dùng chung đúng 1 kiểu bo góc/khoảng đệm, không
// lệch nhau giữa các trang do copy-paste.
export default function Card({
  children,
  className = "",
  highlight = "none",
}: CardProps) {
  return (
    <section
      className={`rounded-3xl border p-6 ${HIGHLIGHT_MAP[highlight]} ${className}`}
    >
      {children}
    </section>
  );
}