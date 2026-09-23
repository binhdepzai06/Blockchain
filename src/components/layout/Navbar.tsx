import { useState } from "react";
import {
  Bell,
  ChevronDown,
  CircleUserRound,
  Menu,
  Search,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logoHub from "../../assets/logo-hub.png";
import { useAuth } from "../../context/AuthContext";

interface NavChild {
  name: string;
  path: string;
}

interface NavItem {
  name: string;
  path?: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  {
    name: "Trang chủ",
    path: "/dashboard",
  },
  {
    name: "Mô phỏng",
    children: [
      { name: "Hash", path: "/hash" },
      { name: "Blockchain", path: "/blockchain" },
      { name: "Transaction", path: "/transaction" },
      { name: "Merkle Tree", path: "/merkle" },
      { name: "Chữ ký số", path: "/signature" },
    ],
  },
  {
    name: "Consensus",
    path: "/consensus",
  },
  {
    name: "Mạng lưới",
    children: [
      { name: "Network Simulator", path: "/network" },
      { name: "Cardano", path: "/cardano" },
      { name: "Solana", path: "/solana" },
    ],
  },
  {
    name: "Smart Contract",
    path: "/smart-contract",
  },
  {
    name: "Quiz",
    path: "/quiz",
  },
  {
    name: "Nhóm",
    path: "/team",
  },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const {
    user,
    loading,
    loginWithGoogle,
    logout,
  } = useAuth();

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center px-6 lg:px-10">

          {/* LOGO */}
          <NavLink
            to="/dashboard"
            className="mr-8 flex items-center gap-3"
          >
            <img
              src={logoHub}
              alt="CryptoLab Logo"
              className="h-10 w-10 rounded-xl object-contain"
            />

            <div>
              <div className="text-xl font-bold tracking-tight text-white">
                Crypto<span className="text-blue-400">Lab</span>
              </div>

              <div className="hidden text-[9px] uppercase tracking-[0.2em] text-slate-500 sm:block">
                Blockchain Learning
              </div>
            </div>
          </NavLink>

          {/* NAVIGATION */}
          <nav className="hidden flex-1 items-center gap-1 lg:flex">
            {navItems.map((item) => {
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
                      className={`flex items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                        isOpen
                          ? "bg-white/5 text-white"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item.name}

                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="absolute left-0 top-full pt-2">
                        <div className="w-56 rounded-2xl border border-white/10 bg-[#0a0f24] p-2 shadow-xl shadow-black/40">
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
                              {child.name}
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
                    `rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white ring-1 ring-blue-400/20"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-2">

            {/* SEARCH */}
            <button
              className="hidden rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-slate-400 transition hover:bg-white/10 hover:text-white sm:block"
              type="button"
            >
              <Search size={18} />
            </button>

            {/* NOTIFICATION */}
            <button
              className="hidden rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-slate-400 transition hover:bg-white/10 hover:text-white sm:block"
              type="button"
            >
              <Bell size={18} />
            </button>

            <div className="hidden h-7 w-px bg-white/10 sm:block" />

            {/* USER PROFILE / LOGIN */}
            <div className="relative">

              {/* LOADING */}
              {loading ? (
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                  <div className="h-5 w-5 animate-pulse rounded-full bg-white/10" />

                  <span className="text-sm text-slate-500">
                    Đang tải...
                  </span>
                </div>
              ) : user ? (

                /* LOGGED IN */
                <>
                  <button
                    type="button"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 transition hover:bg-white/10"
                  >
                    {/* GOOGLE AVATAR */}
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                    ) : (
                      <CircleUserRound
                        size={19}
                        className="text-blue-400"
                      />
                    )}

                    {/* USER NAME */}
                    <span className="max-w-[150px] truncate text-sm font-medium text-slate-200">
                      {user.displayName ||
                        user.email ||
                        "Người dùng"}
                    </span>

                    <ChevronDown
                      size={15}
                      className={`text-slate-500 transition-transform ${
                        showUserMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* USER MENU */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-white/10 bg-[#0a0f24] p-2 shadow-xl shadow-black/40">

                      {/* USER INFO */}
                      <div className="mb-1 border-b border-white/5 px-3 py-3">
                        <div className="flex items-center gap-3">

                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt={user.displayName || "User"}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <CircleUserRound
                              size={36}
                              className="text-blue-400"
                            />
                          )}

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-white">
                              {user.displayName ||
                                "Người dùng"}
                            </p>

                            <p className="truncate text-xs text-slate-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* LOGOUT */}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                      >
                        <LogOut size={16} />
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </>
              ) : (

                /* NOT LOGGED IN */
                <button
                  type="button"
                  onClick={loginWithGoogle}
                  className="flex items-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-2 transition hover:bg-blue-500/20"
                >
                  <CircleUserRound
                    size={19}
                    className="text-blue-400"
                  />

                  <span className="text-sm font-medium text-slate-200">
                    Đăng nhập
                  </span>
                </button>
              )}
            </div>

            {/* MOBILE MENU */}
            <button
              type="button"
              className="ml-1 rounded-xl border border-white/10 p-2 text-slate-400 lg:hidden"
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}