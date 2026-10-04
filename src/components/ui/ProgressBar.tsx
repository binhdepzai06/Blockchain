interface ProgressBarProps {
  value: number; // 0-100
  color?: "blue" | "emerald" | "purple";
}

const COLOR_MAP = {
  blue: "from-blue-500 to-purple-500",
  emerald: "from-emerald-500 to-blue-500",
  purple: "from-purple-500 to-pink-500",
};

// Thanh tiến độ gradient dùng ở Dashboard + nhiều trang khác. Trước
// đây mỗi chỗ tự vẽ lại div lồng div — giờ chỉ cần truyền % là xong,
// đồng thời ép giá trị về khoảng 0-100 để tránh thanh tràn ra ngoài
// nếu lỡ truyền số âm hoặc > 100.
export default function ProgressBar({
  value,
  color = "blue",
}: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
      <div
        className={`h-full rounded-full bg-gradient-to-r transition-all ${COLOR_MAP[color]}`}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}