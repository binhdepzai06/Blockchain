import React, { useState } from "react";
import { X, Mail, Lock, User, Check } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string, email: string) => void;
}

// Danh sách tài khoản Google giả lập để người dùng có thể bấm vào chọn giống hình mẫu
const mockGoogleAccounts = [
  { name: "Đào Mạnh Quân", email: "daomanhquan@gmail.com", avatar: "Đ" },
  { name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", avatar: "N" },
  { name: "Trần Thị B", email: "tranthib@gmail.com", avatar: "T" },
];

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Trạng thái bật/tắt bảng chọn tài khoản Google
  const [showGoogleDropdown, setShowGoogleDropdown] = useState(false);
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState(mockGoogleAccounts[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = isRegister ? (name || email.split("@")[0] || "Thành viên") : (email.split("@")[0] || "Người dùng");
    
    localStorage.setItem("cryptolab_user", JSON.stringify({ name: displayName, email }));
    onLoginSuccess(displayName, email);
    onClose();
  };

  const handleSelectGoogleAccount = (acc: typeof mockGoogleAccounts[0]) => {
    setSelectedGoogleAccount(acc);
    setShowGoogleDropdown(false);
    
    // Đăng nhập luôn với tài khoản Google được chọn
    localStorage.setItem("cryptolab_user", JSON.stringify({ name: acc.name, email: acc.email }));
    onLoginSuccess(acc.name, acc.email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0f24] p-8 shadow-2xl shadow-black/60 animate-in fade-in zoom-in duration-200">
        
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Tiêu đề */}
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-white">
          {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
                Họ và tên
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Nhập họ tên của bạn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500/50 focus:bg-white/[0.05]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                <Mail size={18} />
              </span>
              <input
                type="email"
                required
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500/50 focus:bg-white/[0.05]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
              Mật khẩu
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                <Lock size={18} />
              </span>
              <input
                type="password"
                required
                minLength={6}
                placeholder="Tối thiểu 6 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500/50 focus:bg-white/[0.05]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90 active:scale-[0.99]"
          >
            {isRegister ? "Đăng ký" : "Đăng nhập"}
          </button>
        </form>

        {/* Hoặc ngăn cách */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <span className="relative bg-[#0a0f24] px-4 text-xs uppercase tracking-wider text-slate-500">
            hoặc
          </span>
        </div>

        {/* Khu vực Đăng nhập Google có thể chọn tài khoản */}
        <div className="relative">
          <button
            onClick={() => setShowGoogleDropdown(!showGoogleDropdown)}
            type="button"
            className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left transition hover:bg-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                {selectedGoogleAccount.avatar}
              </div>
              <div>
                <div className="text-xs text-slate-400">Đăng nhập với tên {selectedGoogleAccount.name}</div>
                <div className="text-sm font-medium text-white">{selectedGoogleAccount.email}</div>
              </div>
            </div>
            {/* Biểu tượng Google chuẩn */}
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.14C3.15 21.32 7.22 24 12 24z" />
              <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.18C.43 8.12 0 9.99 0 12s.43 3.88 1.18 5.4l4.09-3.16z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.15 2.68 1.18 6.6l4.09 3.14c.95-2.85 3.6-4.99 6.73-4.99z" />
            </svg>
          </button>

          {/* Dropdown danh sách tài khoản Google để người dùng chọn */}
          {showGoogleDropdown && (
            <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-white/15 bg-[#0e1633] p-2 shadow-2xl z-20 space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-white/5 mb-1">
                Chọn tài khoản Google của bạn
              </div>
              {mockGoogleAccounts.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleSelectGoogleAccount(acc)}
                  className="flex w-full items-center justify-between rounded-xl p-2.5 text-left transition hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white text-sm">
                      {acc.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{acc.name}</div>
                      <div className="text-xs text-slate-400">{acc.email}</div>
                    </div>
                  </div>
                  {selectedGoogleAccount.email === acc.email && (
                    <Check size={16} className="text-blue-400" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chuyển đổi qua lại giữa Đăng nhập / Đăng ký */}
        <div className="mt-6 text-center text-sm text-slate-400">
          {isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="font-semibold text-blue-400 hover:underline"
          >
            {isRegister ? "Đăng nhập" : "Đăng ký"}
          </button>
        </div>

      </div>
    </div>
  );
}