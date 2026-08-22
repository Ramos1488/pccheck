"use client";

import { useState } from "react";
import {
  CPU_LIST,
  GPU_LIST,
  RAM_OPTIONS,
  VRAM_OPTIONS,
  OS_OPTIONS,
  RESOLUTION_OPTIONS,
  findCpu,
  findGpu,
} from "@/lib/hardware";
import { useApp } from "./Providers";

const TIERS = [
  { id: "low", label: "Слабый (встроенная графика / ноутбук до 2018 г.)", score: 8 },
  { id: "mid", label: "Средний (игровой ПК 2018–2021 г.)", score: 24 },
  { id: "high", label: "Мощный (игровой ПК 2022+ г.)", score: 50 },
  { id: "enthusiast", label: "Топовый (флагманская сборка)", score: 80 },
];

export default function PCForm({ onSubmit, initial }) {
  const { t } = useApp();
  const [mode, setMode] = useState("quick");
  const [cpuId, setCpuId] = useState(initial?.cpuId || CPU_LIST[9].id);
  const [gpuId, setGpuId] = useState(initial?.gpuId || GPU_LIST[10].id);
  const [cpuName, setCpuName] = useState(initial?.cpuName || "");
  const [gpuName, setGpuName] = useState(initial?.gpuName || "");
  const [cpuTier, setCpuTier] = useState("mid");
  const [gpuTier, setGpuTier] = useState("mid");
  const [ram, setRam] = useState(initial?.ramGb || 8);
  const [vram, setVram] = useState(initial?.vramGb || 4);
  const [storage, setStorage] = useState(initial?.storageGb || 100);
  const [os, setOs] = useState(initial?.os || OS_OPTIONS[0]);
  const [resolution, setResolution] = useState(initial?.resolution || RESOLUTION_OPTIONS[1]);
  const [detecting, setDetecting] = useState(false);
  const [detectNote, setDetectNote] = useState("");

  function handleAutoDetect() {
    setDetecting(true);
    setDetectNote("");
    try {
      const nav = typeof navigator !== "undefined" ? navigator : null;
      const notes = [];

      // RAM: navigator.deviceMemory (Chrome/Edge only, rounds to nearest power of 2, caps at 8)
      if (nav && "deviceMemory" in nav) {
        const mem = nav.deviceMemory;
        const closest = RAM_OPTIONS.reduce((a, b) =>
          Math.abs(b - mem) < Math.abs(a - mem) ? b : a
        );
        setRam(closest);
        notes.push(`RAM определена браузером ориентировочно (${mem} ГБ, может быть занижена — Chrome ограничивает значение до 8).`);
      } else {
        notes.push("RAM не удалось определить автоматически — укажите вручную.");
      }

      // CPU cores: navigator.hardwareConcurrency (logical cores, not exact CPU model)
      if (nav && "hardwareConcurrency" in nav) {
        const cores = nav.hardwareConcurrency;
        notes.push(`Обнаружено ${cores} логических ядер CPU. Точную модель процессора браузер сообщить не может — выберите её вручную ниже.`);
      }

      // Resolution: screen API
      if (typeof screen !== "undefined") {
        const w = screen.width * (window.devicePixelRatio || 1);
        const h = screen.height * (window.devicePixelRatio || 1);
        const guess = RESOLUTION_OPTIONS.reduce((a, b) => {
          const [bw] = b.split("x").map(Number);
          const [aw] = a.split("x").map(Number);
          return Math.abs(bw - w) < Math.abs(aw - w) ? b : a;
        });
        setResolution(guess);
        notes.push(`Разрешение экрана определено: ${Math.round(w)}x${Math.round(h)}.`);
      }

      // OS: userAgentData or userAgent (best-effort)
      if (nav) {
        const ua = nav.userAgent || "";
        if (ua.includes("Windows NT 10")) setOs("Windows 10");
        else if (ua.includes("Windows NT 6")) setOs("Windows 7/8");
        else if (ua.includes("Mac OS")) setOs("macOS");
        else if (ua.includes("Linux")) setOs("Linux");
        notes.push("Операционная система определена по данным браузера.");
      }

      notes.push("GPU браузер не может определить безопасно (для этого требуется доступ к системе) — выберите видеокарту вручную из списка.");
      setDetectNote(notes.join(" "));
    } finally {
      setDetecting(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let cpuScore, gpuScore, cpuLabel, gpuLabel;

    if (mode === "quick") {
      const cpu = findCpu(cpuId);
      const gpu = findGpu(gpuId);
      cpuScore = cpu?.score || 10;
      gpuScore = gpu?.score || 10;
      cpuLabel = cpu?.name || "Неизвестно";
      gpuLabel = gpu?.name || "Неизвестно";
    } else {
      const cpuTierData = TIERS.find((t2) => t2.id === cpuTier);
      const gpuTierData = TIERS.find((t2) => t2.id === gpuTier);
      cpuScore = cpuTierData.score;
      gpuScore = gpuTierData.score;
      cpuLabel = cpuName || cpuTierData.label;
      gpuLabel = gpuName || gpuTierData.label;
    }

    onSubmit({
      id: `cfg_${Date.now()}`,
      cpuId,
      gpuId,
      cpuName: cpuLabel,
      gpuName: gpuLabel,
      cpuScore,
      gpuScore,
      ramGb: Number(ram),
      vramGb: Number(vram),
      storageGb: Number(storage),
      os,
      resolution,
      mode,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-xl border border-white/10 bg-bg-card p-1">
          <button
            type="button"
            onClick={() => setMode("quick")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              mode === "quick" ? "bg-accent text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {t("quick_mode")}
          </button>
          <button
            type="button"
            onClick={() => setMode("advanced")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              mode === "advanced" ? "bg-accent text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {t("advanced_mode")}
          </button>
        </div>

        <button
          type="button"
          onClick={handleAutoDetect}
          disabled={detecting}
          className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent-soft transition-colors hover:bg-accent/20 disabled:opacity-50"
        >
          🔍 {t("auto_detect")}
        </button>
      </div>

      {detectNote && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-3 text-xs leading-relaxed text-gray-300">
          {detectNote}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {mode === "quick" ? (
          <>
            <Field label={t("field_cpu")}>
              <select value={cpuId} onChange={(e) => setCpuId(e.target.value)} className="input">
                {CPU_LIST.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>
            <Field label={t("field_gpu")}>
              <select value={gpuId} onChange={(e) => setGpuId(e.target.value)} className="input">
                {GPU_LIST.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </Field>
          </>
        ) : (
          <>
            <Field label={`${t("field_cpu")} (название, необязательно)`}>
              <input
                value={cpuName}
                onChange={(e) => setCpuName(e.target.value)}
                placeholder="Например: Intel Core i5-11400"
                className="input"
              />
              <select value={cpuTier} onChange={(e) => setCpuTier(e.target.value)} className="input mt-2">
                {TIERS.map((tier) => (
                  <option key={tier.id} value={tier.id}>{tier.label}</option>
                ))}
              </select>
            </Field>
            <Field label={`${t("field_gpu")} (название, необязательно)`}>
              <input
                value={gpuName}
                onChange={(e) => setGpuName(e.target.value)}
                placeholder="Например: RTX 3060"
                className="input"
              />
              <select value={gpuTier} onChange={(e) => setGpuTier(e.target.value)} className="input mt-2">
                {TIERS.map((tier) => (
                  <option key={tier.id} value={tier.id}>{tier.label}</option>
                ))}
              </select>
            </Field>
          </>
        )}

        <Field label={t("field_ram")}>
          <select value={ram} onChange={(e) => setRam(e.target.value)} className="input">
            {RAM_OPTIONS.map((r) => <option key={r} value={r}>{r} ГБ</option>)}
          </select>
        </Field>

        <Field label={t("field_vram")}>
          <select value={vram} onChange={(e) => setVram(e.target.value)} className="input">
            {VRAM_OPTIONS.map((v) => <option key={v} value={v}>{v} ГБ</option>)}
          </select>
        </Field>

        <Field label={t("field_storage")}>
          <input
            type="number"
            min={1}
            value={storage}
            onChange={(e) => setStorage(e.target.value)}
            className="input"
          />
        </Field>

        <Field label={t("field_os")}>
          <select value={os} onChange={(e) => setOs(e.target.value)} className="input">
            {OS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>

        <Field label={t("field_resolution")}>
          <select value={resolution} onChange={(e) => setResolution(e.target.value)} className="input">
            {RESOLUTION_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-accent to-accent-soft py-3.5 text-base font-bold text-white shadow-glow transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        {t("submit_check")}
      </button>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-300">{label}</span>
      {children}
    </label>
  );
}
