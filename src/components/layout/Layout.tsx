import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#050816] text-slate-100">

      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-3 text-sm text-slate-500 sm:flex-row">

          <p>
            © 2026 CryptoLab — Blockchain Learning Platform
          </p>

          <p>
            Learn · Simulate · Experiment
          </p>

        </div>
      </footer>

    </div>
  );
}