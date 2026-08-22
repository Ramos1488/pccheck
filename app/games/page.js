import GamesClient from "./GamesClient";

export const metadata = {
  title: "База игр",
  description: "Поиск и фильтрация игр по жанру, платформе и требованиям.",
};

export default function GamesPage() {
  return <GamesClient />;
}
