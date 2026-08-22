"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "./Providers";

export default function Header() {
  const { theme, toggleTheme, lang, toggleLang, t } = useApp();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/check", label: t("nav_check") },
    { href: "/games", label: t("nav_games") },
    { href: "/compare", label: t("nav_compare") },
    { href: "/favorites", label: t("favorites") },
    { href: "/about", label: t("nav_about") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-glow text-lg font-bold text-white shadow-glow transition-transform group-hover:scale-105">
            P
          </span>
          <span className="text-lg font-bold tracking-tight text-white">
            PC<span className="text-accent-soft">Check</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/5"
          >
            {lang === "ru" ? "RU" : "EN"}
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-lg border border-white/10 px-2.5 py-1.5 text-sm transition-colors hover:bg-white/5"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <Link
            href="/check"
            className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] sm:block"
          >
            {t("home_cta")}
          </Link>
          <button
            className="rounded-lg border border-white/10 p-2 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <span className="block h-0.5 w-5 bg-white mb-1" />
            <span className="block h-0.5 w-5 bg-white mb-1" />
            <span className="block h-0.5 w-5 bg-white" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/5 px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
