"use client";

import Link from "next/link";
import { useApp } from "./Providers";

export default function Footer() {
  const { t } = useApp();
  return (
    <footer className="mt-24 border-t border-white/5 bg-bg-soft">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-glow text-sm font-bold text-white">
              P
            </span>
            <span className="text-base font-bold text-white">PCCheck</span>
          </div>
          <p className="mt-3 text-sm text-gray-400">{t("tagline")}</p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Сервис</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/check" className="hover:text-white">Проверить ПК</Link></li>
            <li><Link href="/games" className="hover:text-white">База игр</Link></li>
            <li><Link href="/compare" className="hover:text-white">Сравнить ПК</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Информация</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/about" className="hover:text-white">О сервисе</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Конфиденциальность</Link></li>
            <li><Link href="/terms" className="hover:text-white">Условия использования</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Заметка</h4>
          <p className="text-sm text-gray-400">
            Все оценки FPS и совместимости приблизительны и основаны на упрощённой модели, а не на реальных тестах.
          </p>
        </div>
      </div>
      <div className="border-t border-white/5 px-4 py-4 text-center text-xs text-gray-500 sm:px-6">
        © {new Date().getFullYear()} PCCheck — {t("footer_rights")}
      </div>
    </footer>
  );
}
