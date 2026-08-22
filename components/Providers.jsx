"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getTheme, setTheme as persistTheme, getLang, setLang as persistLang } from "@/lib/storage";
import { t as translate } from "@/lib/i18n";

const AppContext = createContext(null);

export function Providers({ children }) {
  const [theme, setThemeState] = useState("dark");
  const [lang, setLangState] = useState("ru");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setThemeState(getTheme());
    setLangState(getLang());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme, ready]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setThemeState(next);
    persistTheme(next);
  }

  function toggleLang() {
    const next = lang === "ru" ? "en" : "ru";
    setLangState(next);
    persistLang(next);
  }

  function t(key) {
    return translate(lang, key);
  }

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within Providers");
  return ctx;
}
