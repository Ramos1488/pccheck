import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <div className="text-7xl">🖥️💥</div>
      <h1 className="mt-6 text-4xl font-extrabold text-white">404</h1>
      <p className="mt-3 text-gray-400">
        Похоже, эта страница не потянет ваш браузер — мы её не нашли.
      </p>
      <Link href="/" className="btn-primary mt-8">На главную</Link>
    </div>
  );
}
