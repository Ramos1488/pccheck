"use client";

import Link from "next/link";

export default function GameCard({ game, badge }) {
  return (
    <Link
      href={`/games/${game.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-bg-card transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow animate-fadeUp"
    >
      <div
        className="flex h-32 items-center justify-center text-5xl"
        style={{ background: `linear-gradient(135deg, ${game.color}33, transparent)` }}
      >
        {game.image}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-white">{game.title}</h3>
          {badge}
        </div>
        <p className="text-xs text-gray-400">{game.developer}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {game.genres.slice(0, 2).map((g) => (
            <span key={g} className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-gray-300">
              {g}
            </span>
          ))}
          {game.free && (
            <span className="rounded-full bg-good/10 px-2 py-0.5 text-[11px] text-good">Free</span>
          )}
        </div>
      </div>
    </Link>
  );
}
