import type { ComponentType, ReactNode } from "react";

interface SectionHeaderProps {
  icon: ComponentType<{ size?: number }>;
  badge: string;
  title: ReactNode;
  description?: ReactNode;
  color?: "blue" | "purple" | "emerald" | "orange" | "red";
  action?: ReactNode;
}

const COLOR_MAP = {
  blue: "border-blue-400/20 bg-blue-400/10 text-blue-300",
  purple: "border-purple-400/20 bg-purple-400/10 text-purple-300",
  emerald: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  orange: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  red: "border-red-400/20 bg-red-400/10 text-red-300",
};

// Khối tiêu đề lặp lại ở ĐẦU hầu hết các trang mô phỏng (badge nhỏ +
// tiêu đề lớn + mô tả). Trước đây mỗi trang tự copy-paste lại y hệt
// đoạn JSX này — giờ gom về 1 chỗ để sửa màu/khoảng cách 1 lần là
// đồng bộ toàn bộ web, không phải sửa từng trang.
export default function SectionHeader({
  icon: Icon,
  badge,
  title,
  description,
  color = "blue",
  action,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
      <div>
        <div
          className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${COLOR_MAP[color]}`}
        >
          <Icon size={16} />
          {badge}
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          {title}
        </h1>

        {description && (
          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}