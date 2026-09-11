import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/chanthecno.svg";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-5 py-4">
        <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#020617]/80 px-5 py-3 shadow-lg backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <img
              src={logo}
              alt="ChanThecno"
              className="h-9 w-9 object-contain"
            />
            <span className="text-lg font-semibold tracking-tight text-white">
              ChanThecno
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <Link
              to="/ChanThecnoAi"
              className="rounded-xl px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              ChanThecnoAi
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl p-2 text-slate-300 hover:bg-white/5 hover:text-white md:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-[#020617] border-l border-white/10 p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-6">
          <button
            onClick={closeMenu}
            className="rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to="/about"
            onClick={closeMenu}
            className="rounded-xl px-4 py-3 text-base text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            About
          </Link>
          <Link
            to="/products"
            onClick={closeMenu}
            className="rounded-xl px-4 py-3 text-base text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Produk
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
