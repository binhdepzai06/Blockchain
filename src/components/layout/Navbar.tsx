import { useState } from "react";
import {
  Bell,
  ChevronDown,
  CircleUserRound,
  Menu,
  Search,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import logoHub from "../../assets/logo-hub.png";

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

  return (
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
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
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