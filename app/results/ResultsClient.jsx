"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getActiveConfig, saveConfig } from "@/lib/storage";
import { GAMES, GENRES } from "@/lib/games";
import { calculateCompatibility } from "@/lib/compatibility";
import ResultCard from "@/components/ResultCard";

export default function ResultsClient() {
  const [config, setConfig] = useState(null);
  const [genre, setGenre] = useState("all");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConfig(getActiveConfig());
  }, []);

  const results = useMemo(() => {
    if (!config) return [];
    const pc = {
      cpuScore: config.cpuScore,
      gpuScore: config.gpuScore,
      ramGb: config.ramGb,
      vramGb: config.vramGb,
    };
    return GAMES.map((game) => ({ game, result: calculateCompatibility(pc, game) })).sort(
      (a, b) => b.result.percent - a.result.percent
    );
  }, [config]);

  const filtered = useMemo(() => {
    if (genre === "all") return results;
    return results.filter(({ game }) => game.genres.includes(genre));
  }, [results, genre]);

  const goodCount = results.filter(
    (r) => r.result.label === "Excellent" || r.result.label === "Good"
  ).length;
  const playableCount = results.filter((r) => r.result.label === "Playable").length;
  const badCount = results.length - goodCount - playableCount;

  if (!config) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-white">Нет данных о ПК</h1>
        <p className="mt-3 text-gray-400">Сначала пройдите проверку, чтобы увидеть результаты.</p>
        <Link href="/check" className="btn-primary mt-6 inline-block">Проверить мой ПК</Link>
      </div>
    );
  }

  function handleSave() {
    saveConfig(config);
    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* PC summary */}
      <div className="card mb-8 animate-fadeUp">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white">Ваш компьютер</h1>
            <dl className="mt-3 grid grid-cols-2 gap-x-8 gap-y-1.5 text-sm sm:grid-cols-4">
              <Spec label="CPU" value={config.cpuName} />
              <Spec label="GPU" value={config.gpuName} />
              <Spec label="RAM" value={`${config.ramGb} ГБ`} />
              <Spec label="VRAM" value={`${config.vramGb} ГБ`} />
            </dl>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-secondary text-xs">
              {saved ? "✓ Сохранено" : "💾 Сохранить конфигурацию"}
            </button>
            <Link href="/check" className="btn-secondary text-xs">Изменить</Link>
          </div>
        </div>
      </div>

      {/* Summary banner */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <SummaryBox emoji="🟢" count={goodCount} label="игр пойдут хорошо" color="good" />
        <SummaryBox emoji="🟡" count={playableCount} label="игр играбельны на низких" color="mid" />
        <SummaryBox emoji="🔴" count={badCount} label="игр не рекомендуются" color="bad" />
      </div>

      <div className="mb-6 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-gray-300">
        🎮 Мы нашли <b className="text-white">{goodCount + playableCount}</b> игр, которые ваш компьютер сможет запускать. Все цифры — оценка на основе заявленных требований игр, а не результат реального теста.
      </div>

      {/* Genre filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <FilterChip active={genre === "all"} onClick={() => setGenre("all")}>Все игры</FilterChip>
        {GENRES.map((g) => (
          <FilterChip key={g} active={genre === g} onClick={() => setGenre(g)}>{g}</FilterChip>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(({ game, result }) => (
          <ResultCard key={game.slug} game={game} result={result} />
        ))}
      </div>
    </div>
  );
}

function Spec({ label, value }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="text-gray-200">{value}</dd>
    </div>
  );
}

function SummaryBox({ emoji, count, label, color }) {
  const cls = { good: "border-good/20 bg-good/5", mid: "border-mid/20 bg-mid/5", bad: "border-bad/20 bg-bad/5" }[color];
  return (
    <div className={`rounded-xl border p-4 text-center ${cls}`}>
      <div className="text-2xl">{emoji}</div>
      <div className="mt-1 text-2xl font-extrabold text-white">{count}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-accent bg-accent text-white"
          : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}
