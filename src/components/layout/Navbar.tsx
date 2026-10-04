import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  CircleUserRound,
  FileCode2,
  HelpCircle,
  LogOut,
  Menu,
  Network as NetworkIcon,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import logoHub from "../../assets/logo-hub.png";
import { useAuth } from "../../context/AuthContext";
import {
  useLanguage,
  type Language,
} from "../../context/LanguageContext";

interface NavChild {
  name: string;
  nameEn: string;
  path: string;
}

interface NavItem {
  name: string;
  nameEn: string;
  icon: LucideIcon;
  path?: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { name: "Trang chủ", nameEn: "Home", icon: BookOpen, path: "/dashboard" },
  {
    name: "Mô phỏng",
    nameEn: "Simulation",
    icon: FileCode2,
    children: [
      { name: "Hash", nameEn: "Hash", path: "/hash" },
      { name: "Blockchain", nameEn: "Blockchain", path: "/blockchain" },
      { name: "Transaction", nameEn: "Transaction", path: "/transaction" },
      { name: "Merkle Tree", nameEn: "Merkle Tree", path: "/merkle" },
      { name: "Chữ ký số", nameEn: "Digital Signature", path: "/signature" },
      { name: "Attack", nameEn: "Attack Simulator", path: "/attack-simulator" },
    ],
  },
  { name: "Consensus", nameEn: "Consensus", icon: Scale, path: "/consensus" },
  {
    name: "Mạng lưới",
    nameEn: "Network",
    icon: NetworkIcon,
    children: [
      { name: "Network Simulator", nameEn: "Network Simulator", path: "/network" },
      { name: "Cardano", nameEn: "Cardano", path: "/cardano" },
      { name: "Solana", nameEn: "Solana", path: "/solana" },
      { name: "Full Node Network", nameEn: "Full Node Network", path: "/node-network" },
    ],
  },
  { name: "Smart Contract", nameEn: "Smart Contract", icon: FileCode2, path: "/smart-contract" },
  { name: "Quiz", nameEn: "Quiz", icon: HelpCircle, path: "/quiz" },
  { name: "Nhóm", nameEn: "Team", icon: Users, path: "/team" },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { user, loading, loginWithGoogle, logout } = useAuth();
  const { language, setLanguage } = useLanguage();

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
  };

  const getLabel = (item: NavItem | NavChild) => {
    return language === "vi" ? item.name : item.nameEn;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1500px] items-center px-5 lg:px-10">
        <NavLink to="/dashboard" className="mr-8 flex shrink-0 items-center gap-3">
          <img src={logoHub} alt="CryptoLab Logo" className="h-10 w-10 rounded-xl object-contain" />
          <div>
            <div className="text-xl font-bold tracking-tight text-white">
              Crypto<span className="text-blue-400">Lab</span>
            </div>
            <div className="hidden text-[9px] uppercase tracking-[0.2em] text-slate-500 sm:block">
              Blockchain Learning
            </div>
          </div>
        </NavLink>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            if (item.children) {
              const isOpen = openDropdown === item.name;

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                      isOpen ? "bg-white/5 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={15} />
                    {getLabel(item)}
                    <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="absolute left-0 top-full pt-2">
                      <div className="w-60 rounded-2xl border border-white/10 bg-[#0a0f24] p-2 shadow-2xl shadow-black/50">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) =>
                              `block rounded-xl px-4 py-2.5 text-sm transition ${
                                isActive
                                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                                  : "text-slate-400 hover:bg-white/5 hover:text-white"
                              }`
                            }
                          >
                            {getLabel(child)}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path!}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white ring-1 ring-blue-400/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={15} />
                {getLabel(item)}
              </NavLink>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.03] p-1">
            <button
              type="button"
              onClick={() => changeLanguage("vi")}
              className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition ${
                language === "vi" ? "bg-blue-500/20 text-blue-300" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              VI
            </button>
            <button
              type="button"
              onClick={() => changeLanguage("en")}
              className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition ${
                language === "en" ? "bg-blue-500/20 text-blue-300" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              EN
            </button>
          </div>

          <div className="hidden h-7 w-px bg-white/10 sm:block" />

          <div className="relative">
            {loading ? (
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                <div className="h-5 w-5 animate-pulse rounded-full bg-white/10" />
                <span className="hidden text-sm text-slate-500 sm:block">
                  {language === "vi" ? "Đang tải..." : "Loading..."}
                </span>
              </div>
            ) : user ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 transition hover:bg-white/10"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || "User"} className="h-7 w-7 rounded-full object-cover" />
                  ) : (
                    <CircleUserRound size={19} className="text-blue-400" />
                  )}
                  <span className="hidden max-w-[150px] truncate text-sm font-medium text-slate-200 sm:block">
                    {user.displayName || user.email || (language === "vi" ? "Người dùng" : "User")}
                  </span>
                  <ChevronDown size={15} className={`text-slate-500 transition-transform ${showUserMenu ? "rotate-180" : ""}`} />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-white/10 bg-[#0a0f24] p-2 shadow-2xl shadow-black/50">
                    <div className="mb-1 border-b border-white/5 px-3 py-3">
                      <div className="flex items-center gap-3">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt={user.displayName || "User"} className="h-10 w-10 rounded-full object-cover" />
                        ) : (
                          <CircleUserRound size={36} className="text-blue-400" />
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">
                            {user.displayName || (language === "vi" ? "Người dùng" : "User")}
                          </p>
                          <p className="truncate text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      <LogOut size={16} />
                      {language === "vi" ? "Đăng xuất" : "Sign out"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                type="button"
                onClick={loginWithGoogle}
                className="flex items-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-2 transition hover:bg-blue-500/20"
              >
                <CircleUserRound size={19} className="text-blue-400" />
                <span className="text-sm font-medium text-slate-200">
                  {language === "vi" ? "Đăng nhập" : "Sign in"}
                </span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="ml-1 rounded-xl border border-white/10 p-2 text-slate-400 transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            <Menu size={19} />
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="border-t border-white/10 bg-[#070b1b] lg:hidden">
          <div className="mx-auto max-w-[1500px] space-y-1 px-5 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;

              if (item.children) {
                return (
                  <div key={item.name} className="rounded-xl border border-white/5 bg-white/[0.02] p-2">
                    <p className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      <Icon size={13} />
                      {getLabel(item)}
                    </p>
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={() => setShowMobileMenu(false)}
                        className={({ isActive }) =>
                          `block rounded-lg px-3 py-2.5 text-sm ${isActive ? "bg-blue-500/10 text-blue-300" : "text-slate-400"}`
                        }
                      >
                        {getLabel(child)}
                      </NavLink>
                    ))}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path!}
                  onClick={() => setShowMobileMenu(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium ${
                      isActive ? "bg-blue-500/10 text-blue-300" : "text-slate-400"
                    }`
                  }
                >
                  <Icon size={15} />
                  {getLabel(item)}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}