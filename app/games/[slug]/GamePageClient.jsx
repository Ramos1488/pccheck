"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getActiveConfig } from "@/lib/storage";
import { calculateCompatibility, LABEL_META } from "@/lib/compatibility";
import { isFavorite, toggleFavorite } from "@/lib/storage";
import ResultCard from "@/components/ResultCard";

export default function GamePageClient({ game }) {
  const router = useRouter();
  const [config, setConfig] = useState(null);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setConfig(getActiveConfig());
    setFav(isFavorite(game.slug));
  }, [game.slug]);

  const result = config
    ? calculateCompatibility(
        {
          cpuScore: config.cpuScore,
          gpuScore: config.gpuScore,
          ramGb: config.ramGb,
          vramGb: config.vramGb,
        },
        game
      )
    : null;

  function handleFav() {
    toggleFavorite(game.slug);
    setFav((f) => !f);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/games" className="hover:text-white">Игры</Link>
        <span>/</span>
        <span className="text-gray-300">{game.title}</span>
      </div>

      <div className="card mb-8 animate-fadeUp">
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <div
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl text-5xl"
            style={{ background: `${game.color}22` }}
          >
            {game.image}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-extrabold text-white sm:text-3xl">{game.title}</h1>
                <p className="text-sm text-gray-400">{game.developer}</p>
              </div>
              <button
                onClick={handleFav}
                className={`rounded-lg border px-3 py-2 text-sm ${
                  fav ? "border-accent bg-accent/20 text-accent-soft" : "border-white/10 text-gray-300 hover:bg-white/5"
                }`}
              >
                {fav ? "★ В избранном" : "☆ В избранное"}
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">{game.description}</p>
            {game.estimated && (
              <p className="mt-2 text-xs text-mid">
                ⚠️ Официальные требования ещё не объявлены — данные являются приблизительной оценкой.
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {game.genres.map((g) => (
                <span key={g} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-300">{g}</span>
              ))}
              {game.free && <span className="rounded-full bg-good/10 px-2.5 py-1 text-xs text-good">Free to play</span>}
              <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-300">{game.sizeGb} ГБ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2">
        <ReqCard title="Минимальные требования" req={game.min} />
        <ReqCard title="Рекомендуемые требования" req={game.rec} />
      </div>

      {/* Compatibility */}
      {result ? (
        <div className="mb-4">
          <h2 className="mb-3 text-lg font-bold text-white">Совместимость с вашим ПК</h2>
          <ResultCard game={game} result={result} />
        </div>
      ) : (
        <div className="card text-center">
          <p className="text-gray-400">Проверьте характеристики своего ПК, чтобы увидеть прогноз совместимости.</p>
          <button onClick={() => router.push("/check")} className="btn-primary mt-4">
            Проверить на моём ПК
          </button>
        </div>
      )}
    </div>
  );
}

function ReqCard({ title, req }) {
  return (
    <div className="card">
      <h3 className="mb-4 font-semibold text-white">{title}</h3>
      <dl className="space-y-2.5 text-sm">
        <Row label="ОС" value={req.os} />
        <Row label="RAM" value={`${req.ram} ГБ`} />
        <Row label="VRAM" value={`${req.vram} ГБ`} />
        <Row label="DirectX" value={req.directx} />
      </dl>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-2">
      <dt className="text-gray-500">{label}</dt>
      <dd className="font-medium text-gray-200">{value}</dd>
    </div>
  );
}
