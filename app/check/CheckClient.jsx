"use client";

import { useRouter } from "next/navigation";
import PCForm from "@/components/PCForm";
import { setActiveConfig, saveConfig, addHistoryEntry, getConfigs } from "@/lib/storage";
import { useState } from "react";
import Link from "next/link";

export default function CheckClient() {
  const router = useRouter();
  const [savedConfigs] = useState(() => (typeof window !== "undefined" ? getConfigs() : []));

  function handleSubmit(config) {
    setActiveConfig(config);
    addHistoryEntry({ configId: config.id, cpuName: config.cpuName, gpuName: config.gpuName });
    router.push("/results");
  }

  function loadConfig(cfg) {
    setActiveConfig(cfg);
    router.push("/results");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8 text-center animate-fadeUp">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Проверить мой ПК</h1>
        <p className="mt-3 text-gray-400">
          Выберите комплектующие или введите их вручную — мы сравним ваш ПК с базой из 30+ игр.
        </p>
      </div>

      <div className="card animate-fadeUp">
        <PCForm onSubmit={handleSubmit} />
      </div>

      {savedConfigs.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-3 text-sm font-semibold text-gray-300">Сохранённые конфигурации</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {savedConfigs.map((cfg) => (
              <button
                key={cfg.id}
                onClick={() => loadConfig(cfg)}
                className="rounded-xl border border-white/10 bg-bg-card p-4 text-left text-sm transition-colors hover:border-accent/40"
              >
                <div className="font-semibold text-white">{cfg.cpuName}</div>
                <div className="text-gray-400">{cfg.gpuName} · {cfg.ramGb} ГБ RAM</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-gray-500">
        Не знаете характеристики? Посмотрите в диспетчере устройств Windows или на{" "}
        <Link href="/about" className="text-accent-soft hover:underline">странице «О сервисе»</Link>.
      </p>
    </div>
  );
}
