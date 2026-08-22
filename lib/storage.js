"use client";

const KEYS = {
  configs: "pccheck_configs",
  activeConfig: "pccheck_active_config",
  favorites: "pccheck_favorites",
  history: "pccheck_history",
  theme: "pccheck_theme",
  lang: "pccheck_lang",
};

function safeGet(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / privacy-mode errors
  }
}

// --- PC Configs ---
export function getConfigs() {
  return safeGet(KEYS.configs, []);
}
export function saveConfig(config) {
  const configs = getConfigs();
  const idx = configs.findIndex((c) => c.id === config.id);
  if (idx >= 0) configs[idx] = config;
  else configs.push(config);
  safeSet(KEYS.configs, configs);
  return configs;
}
export function deleteConfig(id) {
  const configs = getConfigs().filter((c) => c.id !== id);
  safeSet(KEYS.configs, configs);
  return configs;
}
export function getActiveConfig() {
  return safeGet(KEYS.activeConfig, null);
}
export function setActiveConfig(config) {
  safeSet(KEYS.activeConfig, config);
}

// --- Favorites ---
export function getFavorites() {
  return safeGet(KEYS.favorites, []);
}
export function toggleFavorite(slug) {
  const favs = getFavorites();
  const idx = favs.indexOf(slug);
  if (idx >= 0) favs.splice(idx, 1);
  else favs.push(slug);
  safeSet(KEYS.favorites, favs);
  return favs;
}
export function isFavorite(slug) {
  return getFavorites().includes(slug);
}

// --- History ---
export function getHistory() {
  return safeGet(KEYS.history, []);
}
export function addHistoryEntry(entry) {
  const history = getHistory();
  history.unshift({ ...entry, timestamp: Date.now() });
  safeSet(KEYS.history, history.slice(0, 30));
  return history;
}
export function clearHistory() {
  safeSet(KEYS.history, []);
}

// --- Theme & Language ---
export function getTheme() {
  return safeGet(KEYS.theme, "dark");
}
export function setTheme(theme) {
  safeSet(KEYS.theme, theme);
}
export function getLang() {
  return safeGet(KEYS.lang, "ru");
}
export function setLang(lang) {
  safeSet(KEYS.lang, lang);
}
