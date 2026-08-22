"use client";

import Link from "next/link";
import { useApp } from "@/components/Providers";
import { GAMES } from "@/lib/games";
import GameCard from "@/components/GameCard";

export default function HomeClient() {
  const { t } = useApp();
  const popular = [...GAMES].sort((a, b) => b.popularity - a.popularity).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_-10%,rgba(124,92,255,0.25),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(94,234,212,0.15),transparent_40%)]" />
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-300 animate-fadeUp">
            <span className="h-1.5 w-1.5 animate-pulseSlow rounded-full bg-accent-glow" />
            30+ игр в базе · мгновенный расчёт
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-6xl animate-fadeUp">
            {t("home_h1")}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-gray-400 sm:text-lg animate-fadeUp">
            {t("home_sub")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fadeUp">
            <Link href="/check" className="btn-primary">
              {t("home_cta")} →
            </Link>
            <Link href="/games" className="btn-secondary">
              {t("home_browse")}
            </Link>
          </div>

          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
            <Stat value="30+" label="игр в базе" />
            <Stat value="100%" label="без регистрации" />
            <Stat value="~2 сек" label="на расчёт" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">Как это работает</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <StepCard n="1" title="Введите характеристики" text="Выберите процессор и видеокарту из списка или введите данные вручную — быстро и без установки программ." />
          <StepCard n="2" title="Получите расчёт" text="Алгоритм сравнит ваш ПК с требованиями каждой игры и покажет прогноз FPS и совместимость." />
          <StepCard n="3" title="Выбирайте игры" text="Смотрите, что запустится хорошо, что стоит запускать на низких настройках, а что лучше не трогать." />
        </div>
      </section>

      {/* Popular games */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Популярные игры</h2>
          <Link href="/games" className="text-sm font-medium text-accent-soft hover:underline">
            Все игры →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {popular.map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <div className="card border-accent/20 bg-gradient-to-br from-accent/10 to-transparent">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Готовы узнать свои результаты?</h2>
          <p className="mt-3 text-gray-400">Проверка займёт меньше минуты и не требует установки программ.</p>
          <Link href="/check" className="btn-primary mt-6 inline-block">
            {t("home_cta")} →
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="text-2xl font-extrabold text-white sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs text-gray-500 sm:text-sm">{label}</div>
    </div>
  );
}

function StepCard({ n, title, text }) {
  return (
    <div className="card">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-sm font-bold text-accent-soft">
        {n}
      </div>
      <h3 className="mb-2 font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-400">{text}</p>
    </div>
  );
}
