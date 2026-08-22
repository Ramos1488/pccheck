import CheckClient from "./CheckClient";

export const metadata = {
  title: "Проверить ПК",
  description: "Введите характеристики вашего компьютера и узнайте, какие игры он потянет.",
};

export default function CheckPage() {
  return <CheckClient />;
}
