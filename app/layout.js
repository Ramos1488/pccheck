import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://pccheck.example.com"),
  title: {
    default: "PCCheck — узнай, какие игры потянет твой ПК",
    template: "%s | PCCheck",
  },
  description:
    "Проверь, какие игры запустятся на твоём компьютере. Мгновенный прогноз FPS, совместимости и настроек графики для 30+ популярных игр.",
  openGraph: {
    title: "PCCheck — узнай, какие игры потянет твой ПК",
    description:
      "Введи характеристики компьютера и получи прогноз FPS и совместимости для популярных игр.",
    type: "website",
    locale: "ru_RU",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
