import FavoritesClient from "./FavoritesClient";

export const metadata = {
  title: "Избранное и история",
  description: "Ваши избранные игры и история проверок ПК.",
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
