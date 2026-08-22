// Модуль расчёта совместимости ПК с игрой.
// ВАЖНО: это оценочная модель на основе относительных индексов
// производительности (см. hardware.js), а НЕ результат реального
// бенчмарка. Все значения FPS — прогноз, не гарантия.

/**
 * pc: { cpuScore, gpuScore, ramGb, vramGb }
 * game: объект из lib/games.js (поля min / rec с cpu, gpu, ram, vram)
 */
export function calculateCompatibility(pc, game) {
  const { cpuScore, gpuScore, ramGb, vramGb } = pc;

  const cpuRatio = ratio(cpuScore, game.min.cpu, game.rec.cpu);
  const gpuRatio = ratio(gpuScore, game.min.gpu, game.rec.gpu);
  const ramRatio = ratio(ramGb, game.min.ram, game.rec.ram);
  const vramRatio = ratio(vramGb, game.min.vram, game.rec.vram);

  // GPU и CPU наиболее важны для игровой производительности,
  // RAM/VRAM в основном определяют, запустится ли игра вообще.
  const weighted =
    gpuRatio * 0.45 + cpuRatio * 0.35 + ramRatio * 0.1 + vramRatio * 0.1;

  // Узкое место — компонент с наименьшим ratio
  const components = [
    { key: "CPU", ratio: cpuRatio },
    { key: "GPU", ratio: gpuRatio },
    { key: "RAM", ratio: ramRatio },
    { key: "VRAM", ratio: vramRatio },
  ];
  components.sort((a, b) => a.ratio - b.ratio);
  const bottleneck = components[0].key;

  const label = getLabel(weighted, components[0].ratio);
  const percent = Math.max(3, Math.min(100, Math.round(weighted * 62)));

  const fps = estimateFps(gpuRatio, cpuRatio);

  return {
    label,
    percent,
    bottleneck,
    fps,
    weighted,
    ramOk: ramGb >= game.min.ram,
    vramOk: vramGb >= game.min.vram,
  };
}

function ratio(value, min, rec) {
  if (rec <= min) rec = min + 1;
  // 0 = не дотягивает до минимума, 1 = соответствует рекомендуемым
  return value / rec;
}

function getLabel(weighted, worst) {
  if (worst < 0.55 || weighted < 0.6) return "Not Recommended";
  if (weighted < 0.85) return "Poor";
  if (weighted < 1.05) return "Playable";
  if (weighted < 1.35) return "Good";
  return "Excellent";
}

export const LABEL_META = {
  Excellent: { color: "good", emoji: "🟢", text: "Отлично — игра будет работать хорошо" },
  Good: { color: "good", emoji: "🟢", text: "Хорошо — стабильный игровой процесс" },
  Playable: { color: "mid", emoji: "🟡", text: "Играбельно — рекомендуется снизить настройки" },
  Poor: { color: "bad", emoji: "🔴", text: "Слабо — ожидаются просадки FPS" },
  "Not Recommended": { color: "bad", emoji: "🔴", text: "Компьютер не соответствует требованиям" },
};

// Прогноз FPS на разных пресетах. Базовая точка: gpuRatio=1 (соответствует
// рекомендуемым) даёт ~60 FPS на High. Это условная модель для демонстрации.
function estimateFps(gpuRatio, cpuRatio) {
  const effective = Math.min(gpuRatio, cpuRatio * 1.15);
  const base = Math.max(4, effective * 60);

  return {
    low: Math.round(base * 1.9),
    medium: Math.round(base * 1.35),
    high: Math.round(base * 1.0),
    ultra: Math.round(base * 0.68),
  };
}

export function recommendedResolution(gpuRatio) {
  if (gpuRatio >= 1.4) return "4K (3840x2160)";
  if (gpuRatio >= 0.9) return "1440p (2560x1440)";
  if (gpuRatio >= 0.5) return "1080p (1920x1080)";
  return "720p (1280x720)";
}

export function bottleneckExplanation(bottleneck, game) {
  const map = {
    CPU: `Процессор — самое слабое место вашей сборки для этой игры. Он может не успевать обрабатывать логику игры, из-за чего FPS будет ограничен даже с мощной видеокартой.`,
    GPU: `Видеокарта — основное ограничение. Она отвечает за отрисовку картинки, и её мощности не хватает для комфортной игры на текущих настройках графики.`,
    RAM: `Оперативной памяти недостаточно (нужно минимум ${game.min.ram} ГБ). Это может вызывать подгрузки, фризы и вылеты, а не только низкий FPS.`,
    VRAM: `Видеопамяти (VRAM) недостаточно (нужно минимум ${game.min.vram} ГБ). Текстуры могут подгружаться с задержкой или отображаться в низком качестве.`,
  };
  return map[bottleneck] || "";
}
