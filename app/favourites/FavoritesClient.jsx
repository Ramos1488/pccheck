"use client";

import { useEffect, useState } from "react";
import { getFavorites, getHistory, clearHistory } from "@/lib/storage";
import { getGameBySlug } from "@/lib/games";
import GameCard from "@/components/GameCard";
import { useApp } from "@/components/Providers";

export default function FavoritesClient() {
  const { t } = useApp();
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites().map(getGameBySlug).filter(Boolean));
    setHistory(getHistory());
  }, []);

  function handleClearHistory() {
    clearHistory();
    setHistory([]);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold text-white">{t("favorites")}</h1>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">{t("favorites")}</h2>
        {favorites.length === 0 ? (
          <p className="text-sm text-gray-500">Пока нет избранных игр. Отмечайте их звёздочкой на странице игры.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {favorites.map((g) => <GameCard key={g.slug} game={g} />)}
          </div>
        )}
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{t("history")}</h2>
          {history.length > 0 && (
            <button onClick={handleClearHistory} className="text-xs text-gray-500 hover:text-bad">
              Очистить историю
            </button>
          )}
        </div>
        {history.length === 0 ? (
          <p className="text-sm text-gray-500">История проверок пуста.</p>
        ) : (
          <div className="space-y-2">
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-white/5 bg-bg-card px-4 py-3 text-sm">
                <span className="text-gray-200">{h.cpuName} · {h.gpuName}</span>
                <span className="text-xs text-gray-500">{new Date(h.timestamp).toLocaleString("ru-RU")}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
