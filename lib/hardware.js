// Условные индексы производительности (не официальные бенчмарки).
// Шкала примерно 1..100, используется только для относительного сравнения.

export const CPU_LIST = [
  { id: "cpu-celeron-n4020", name: "Intel Celeron N4020", score: 5 },
  { id: "cpu-pentium-g4560", name: "Intel Pentium G4560", score: 12 },
  { id: "cpu-i3-6100", name: "Intel Core i3-6100", score: 14 },
  { id: "cpu-i3-10100", name: "Intel Core i3-10100", score: 22 },
  { id: "cpu-i3-12100", name: "Intel Core i3-12100", score: 28 },
  { id: "cpu-ryzen3-3200g", name: "AMD Ryzen 3 3200G", score: 18 },
  { id: "cpu-ryzen5-3400g", name: "AMD Ryzen 5 3400G", score: 24 },
  { id: "cpu-i5-4460", name: "Intel Core i5-4460", score: 17 },
  { id: "cpu-i5-7400", name: "Intel Core i5-7400", score: 21 },
  { id: "cpu-i5-9400f", name: "Intel Core i5-9400F", score: 27 },
  { id: "cpu-i5-10400f", name: "Intel Core i5-10400F", score: 32 },
  { id: "cpu-i5-12400f", name: "Intel Core i5-12400F", score: 44 },
  { id: "cpu-i5-13600k", name: "Intel Core i5-13600K", score: 62 },
  { id: "cpu-ryzen5-2600", name: "AMD Ryzen 5 2600", score: 25 },
  { id: "cpu-ryzen5-3600", name: "AMD Ryzen 5 3600", score: 34 },
  { id: "cpu-ryzen5-5600", name: "AMD Ryzen 5 5600", score: 46 },
  { id: "cpu-ryzen5-5600x", name: "AMD Ryzen 5 5600X", score: 48 },
  { id: "cpu-ryzen7-5700x", name: "AMD Ryzen 7 5700X", score: 54 },
  { id: "cpu-ryzen7-5800x3d", name: "AMD Ryzen 7 5800X3D", score: 66 },
  { id: "cpu-i7-9700k", name: "Intel Core i7-9700K", score: 38 },
  { id: "cpu-i7-10700k", name: "Intel Core i7-10700K", score: 42 },
  { id: "cpu-i7-12700k", name: "Intel Core i7-12700K", score: 58 },
  { id: "cpu-i7-13700k", name: "Intel Core i7-13700K", score: 68 },
  { id: "cpu-i9-13900k", name: "Intel Core i9-13900K", score: 80 },
  { id: "cpu-ryzen9-7900x", name: "AMD Ryzen 9 7900X", score: 78 },
  { id: "cpu-ryzen9-7950x", name: "AMD Ryzen 9 7950X", score: 86 },
  { id: "cpu-apple-m1", name: "Apple M1", score: 40 },
  { id: "cpu-apple-m2", name: "Apple M2", score: 46 },
  { id: "cpu-other-low", name: "Другой / не знаю (слабый, до 2018 г.)", score: 10 },
  { id: "cpu-other-mid", name: "Другой / не знаю (средний, 2018-2021 г.)", score: 28 },
  { id: "cpu-other-high", name: "Другой / не знаю (мощный, 2022+ г.)", score: 55 },
];

export const GPU_LIST = [
  { id: "gpu-intel-uhd", name: "Intel UHD Graphics (встроенная)", score: 3, vram: 1 },
  { id: "gpu-vega8", name: "AMD Radeon Vega 8 (встроенная)", score: 6, vram: 2 },
  { id: "gpu-gt-1030", name: "NVIDIA GT 1030", score: 8, vram: 2 },
  { id: "gtx-1050", name: "NVIDIA GTX 1050", score: 11, vram: 2 },
  { id: "gtx-1050ti", name: "NVIDIA GTX 1050 Ti", score: 13, vram: 4 },
  { id: "gtx-1060", name: "NVIDIA GTX 1060 6GB", score: 19, vram: 6 },
  { id: "gtx-1650", name: "NVIDIA GTX 1650", score: 17, vram: 4 },
  { id: "gtx-1660super", name: "NVIDIA GTX 1660 Super", score: 24, vram: 6 },
  { id: "rtx-2060", name: "NVIDIA RTX 2060", score: 28, vram: 6 },
  { id: "rtx-3050", name: "NVIDIA RTX 3050", score: 26, vram: 8 },
  { id: "rtx-3060", name: "NVIDIA RTX 3060", score: 33, vram: 12 },
  { id: "rtx-3060ti", name: "NVIDIA RTX 3060 Ti", score: 40, vram: 8 },
  { id: "rtx-3070", name: "NVIDIA RTX 3070", score: 46, vram: 8 },
  { id: "rtx-3080", name: "NVIDIA RTX 3080", score: 58, vram: 10 },
  { id: "rtx-4060", name: "NVIDIA RTX 4060", score: 42, vram: 8 },
  { id: "rtx-4070", name: "NVIDIA RTX 4070", score: 56, vram: 12 },
  { id: "rtx-4070ti", name: "NVIDIA RTX 4070 Ti", score: 66, vram: 12 },
  { id: "rtx-4080", name: "NVIDIA RTX 4080", score: 78, vram: 16 },
  { id: "rtx-4090", name: "NVIDIA RTX 4090", score: 100, vram: 24 },
  { id: "rx-570", name: "AMD RX 570", score: 16, vram: 4 },
  { id: "rx-580", name: "AMD RX 580", score: 18, vram: 8 },
  { id: "rx-5600xt", name: "AMD RX 5600 XT", score: 27, vram: 6 },
  { id: "rx-6600", name: "AMD RX 6600", score: 30, vram: 8 },
  { id: "rx-6700xt", name: "AMD RX 6700 XT", score: 44, vram: 12 },
  { id: "rx-6800xt", name: "AMD RX 6800 XT", score: 60, vram: 16 },
  { id: "rx-7600", name: "AMD RX 7600", score: 34, vram: 8 },
  { id: "rx-7800xt", name: "AMD RX 7800 XT", score: 62, vram: 16 },
  { id: "gpu-other-low", name: "Другая / не знаю (слабая, встройка)", score: 5, vram: 2 },
  { id: "gpu-other-mid", name: "Другая / не знаю (средняя, 2018-2021 г.)", score: 22, vram: 6 },
  { id: "gpu-other-high", name: "Другая / не знаю (мощная, 2022+ г.)", score: 50, vram: 10 },
];

export const RAM_OPTIONS = [4, 6, 8, 12, 16, 24, 32, 64];
export const VRAM_OPTIONS = [1, 2, 4, 6, 8, 10, 12, 16, 24];
export const OS_OPTIONS = ["Windows 11", "Windows 10", "Windows 7/8", "Linux", "macOS"];
export const RESOLUTION_OPTIONS = ["1280x720", "1920x1080", "2560x1440", "3840x2160"];

export function findCpu(id) {
  return CPU_LIST.find((c) => c.id === id) || null;
}
export function findGpu(id) {
  return GPU_LIST.find((g) => g.id === id) || null;
}
