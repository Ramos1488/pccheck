import { notFound } from "next/navigation";
import { GAMES, getGameBySlug, getAllSlugs } from "@/lib/games";
import GamePageClient from "./GamePageClient";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const game = getGameBySlug(params.slug);
  if (!game) return { title: "Игра не найдена" };
  return {
    title: `${game.title} — системные требования`,
    description: `Минимальные и рекомендуемые системные требования для ${game.title}. Проверьте, потянет ли ваш ПК эту игру.`,
    openGraph: {
      title: `${game.title} — системные требования | PCCheck`,
      description: game.description,
    },
  };
}

export default function GamePage({ params }) {
  const game = getGameBySlug(params.slug);
  if (!game) notFound();
  return <GamePageClient game={game} />;
}
