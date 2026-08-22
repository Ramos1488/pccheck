"use client";

import { useMemo, useState } from "react";
import { GAMES, GENRES } from "@/lib/games";
import GameCard from "@/components/GameCard";
import { useApp } from "@/components/Providers";

const TAG_FILTERS = [
  { id: "free", label: "Бесплатные", test: (g) => g.free },
  { id: "steam", label: "Steam", test: (g) => g.platforms.some((p) => p.toLowerCase().includes("steam")) },
  { id: "epic", label: "Epic Games", test: (g) => g.platforms.some((p) => p.toLowerCase().includes("epic")) },
  { id: "weak-pc", label: "Слабый ПК", test: (g) => g.tags.includes("weak-pc") },
  { id: "4gb", label: "4 ГБ RAM", test: (g) => g.tags.includes("4gb") },
  { id: "8gb", label: "8 ГБ RAM", test: (g) => g.tags.includes("8gb") },
  { id: "16gb", label: "16 ГБ RAM", test: (g) => g.tags.includes("16gb") },
  { id: "under10", label: "Менее 10 ГБ", test: (g) => g.sizeGb < 10 },
  { id: "multiplayer", label: "Multiplayer", test: (g) => g.tags.includes("multiplayer") },
  { id: "singleplayer", label: "Singleplayer", test: (g) => g.tags.includes("singleplayer") },
];

export default function GamesClient() {
  const { t } = useApp();
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [activeTags, setActiveTags] = useState([]);
  const [sort, setSort] = useState("popularity");

  function toggleTag(id) {
    setActiveTags((tags) => (tags.includes(id) ? tags.filter((t2) => t2 !== id) : [...tags, id]));
  }

  const filtered = useMemo(() => {
    let list = GAMES.filter((g) => g.title.toLowerCase().includes(query.toLowerCase()));
    if (genre !== "all") list = list.filter((g) => g.genres.includes(genre));
    for (const tagId of activeTags) {
      const tag = TAG_FILTERS.find((tf) => tf.id === tagId);
      if (tag) list = list.filter(tag.test);
    }

    const sorted = [...list];
    if (sort === "popularity") sorted.sort((a, b) => b.popularity - a.popularity);
    else if (sort === "name") sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "minreq") sorted.sort((a, b) => a.min.gpu - b.min.gpu);
    else if (sort === "size") sorted.sort((a, b) => a.sizeGb - b.sizeGb);

    return sorted;
  }, [query, genre, activeTags, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 animate-fadeUp">
        <h1 className="text-3xl font-extrabold text-white">{t("nav_games")}</h1>
        <p className="mt-2 text-gray-400">Найдите игру и узнайте её требования, или проверьте совместимость со своим ПК.</p>
      </div>

      <div className="mb-6 flex flex-col gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search_placeholder")}
          className="input max-w-md"
        />

        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={genre === "all"} onClick={() => setGenre("all")}>Все жанры</FilterChip>
          {GENRES.map((g) => (
            <FilterChip key={g} active={genre === g} onClick={() => setGenre(genre === g ? "all" : g)}>{g}</FilterChip>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {TAG_FILTERS.map((tag) => (
            <FilterChip key={tag.id} active={activeTags.includes(tag.id)} onClick={() => toggleTag(tag.id)}>
              {tag.label}
            </FilterChip>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">{t("sort_by")}:</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="input w-auto">
            <option value="popularity">Популярность</option>
            <option value="name">Название</option>
            <option value="minreq">Минимальные требования</option>
            <option value="size">Размер</option>
          </select>
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-500">Найдено игр: {filtered.length}</p>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-bg-card p-10 text-center text-gray-400">
          Ничего не найдено. Попробуйте изменить фильтры.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      )}
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
