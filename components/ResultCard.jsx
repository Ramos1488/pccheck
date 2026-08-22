"use client";

import Link from "next/link";
import { LABEL_META, bottleneckExplanation } from "@/lib/compatibility";

const COLOR_CLASSES = {
  good: { text: "text-good", bg: "bg-good/10" },
  mid: { text: "text-mid", bg: "bg-mid/10" },
  bad: { text: "text-bad", bg: "bg-bad/10" },
};

export default function ResultCard({ game, result }) {
  const meta = LABEL_META[result.label];
  const colorCls = COLOR_CLASSES[meta.color];
  return (
    <div className="rounded-2xl border border-white/5 bg-bg-card p-5 transition-colors hover:border-white/10 animate-fadeUp">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
            style={{ background: `${game.color}22` }}
          >
            {game.image}
          </div>
          <div>
            <Link href={`/games/${game.slug}`} className="font-semibold text-white hover:text-accent-soft">
              {game.title}
            </Link>
            <p className="text-xs text-gray-500">{game.developer}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-lg font-bold ${colorCls.text}`}>{result.percent}%</div>
          <div className="text-[11px] text-gray-400">совместимость</div>
        </div>
      </div>

      <div className={`mt-3 flex items-center gap-2 rounded-lg ${colorCls.bg} px-3 py-2 text-sm ${colorCls.text}`}>
        <span>{meta.emoji}</span>
        <span className="font-medium">{meta.text}</span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        <FpsBox label="Low" value={result.fps.low} />
        <FpsBox label="Medium" value={result.fps.medium} />
        <FpsBox label="High" value={result.fps.high} />
        <FpsBox label="Ultra" value={result.fps.ultra} />
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <span>Основное ограничение: <b className="text-gray-200">{result.bottleneck}</b></span>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
        {bottleneckExplanation(result.bottleneck, game)}
      </p>
    </div>
  );
}

function FpsBox({ label, value }) {
  return (
    <div className="rounded-lg bg-white/5 py-2">
      <div className="text-sm font-bold text-white">~{Math.max(0, value)}</div>
      <div className="text-[10px] text-gray-500">{label}</div>
    </div>
  );
}
