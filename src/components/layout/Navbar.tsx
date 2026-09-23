import {
  Bell,
  ChevronDown,
  CircleUserRound,
  Menu,
  Search,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navItems = [
  {
    name: "Trang chủ",
    path: "/dashboard",
  },
  {
    name: "Học tập",
    path: "/hash",
  },
  {
    name: "Mô phỏng",
    path: "/blockchain",
  },
  {
    name: "Transaction",
    path: "/transaction",
  },
  {
  name: "Merkle",
  path: "/merkle",
  },
  {
  name: "Chữ ký số",
  path: "/signature",
  },
  {
  name: "Cardano",
  path: "/cardano",
  },
  {
  name: "Solana",
  path: "/solana",
  },
  {
    name: "Consensus",
    path: "/consensus",
  },
  {
    name: "Network",
    path: "/network",
  },
  {
  name: "Smart Contract",
  path: "/smart-contract",
  },
  {
    name: "Quiz",
    path: "/quiz",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1500px] items-center px-6 lg:px-10">

        {/* LOGO */}
        <NavLink
          to="/dashboard"
          className="mr-8 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 shadow-lg shadow-blue-500/20">
            <span className="text-lg font-black text-white">
              C
            </span>
          </div>

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
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
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
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="ml-auto flex items-center gap-2">

          <button className="hidden rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-slate-400 transition hover:bg-white/10 hover:text-white sm:block">
            <Search size={18} />
          </button>

          <button className="hidden rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-slate-400 transition hover:bg-white/10 hover:text-white sm:block">
            <Bell size={18} />
          </button>

          <div className="hidden h-7 w-px bg-white/10 sm:block" />

          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 transition hover:bg-white/10">

            <CircleUserRound
              size={19}
              className="text-blue-400"
            />

            <span className="hidden text-sm text-slate-200 md:block">
              Student
            </span>

            <ChevronDown
              size={15}
              className="hidden text-slate-500 md:block"
            />

          </button>

          <button className="ml-1 rounded-xl border border-white/10 p-2 text-slate-400 lg:hidden">
            <Menu size={19} />
          </button>

        </div>

      </div>
    </header>
  );
}