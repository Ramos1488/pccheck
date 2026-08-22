"use client";

import { useMemo, useState } from "react";
import PCForm from "@/components/PCForm";
import { GAMES } from "@/lib/games";
import { calculateCompatibility } from "@/lib/compatibility";

export default function CompareClient() {
  const [pcA, setPcA] = useState(null);
  const [pcB, setPcB] = useState(null);
  const [editing, setEditing] = useState("A");

  const comparison = useMemo(() => {
    if (!pcA || !pcB) return null;
    let aWins = 0;
    let bWins = 0;
    const rows = GAMES.map((game) => {
      const rA = calculateCompatibility(
        { cpuScore: pcA.cpuScore, gpuScore: pcA.gpuScore, ramGb: pcA.ramGb, vramGb: pcA.vramGb },
        game
      );
      const rB = calculateCompatibility(
        { cpuScore: pcB.cpuScore, gpuScore: pcB.gpuScore, ramGb: pcB.ramGb, vramGb: pcB.vramGb },
        game
      );
      if (rA.percent > rB.percent) aWins++;
      else if (rB.percent > rA.percent) bWins++;
      return { game, rA, rB };
    });
    return { rows, aWins, bWins };
  }, [pcA, pcB]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 animate-fadeUp">
        <h1 className="text-3xl font-extrabold text-white">Сравнить ПК</h1>
        <p className="mt-2 text-gray-400">Настройте два компьютера и посмотрите, на каком игры пойдут лучше.</p>
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <PcSlot label="Компьютер A" pc={pcA} onEdit={() => setEditing("A")} borderCls="border-accent/20" />
        <PcSlot label="Компьютер B" pc={pcB} onEdit={() => setEditing("B")} borderCls="border-accent-glow/20" />
      </div>

      {editing && (
        <div className="card mb-10">
          <h2 className="mb-4 font-semibold text-white">Настройка: Компьютер {editing}</h2>
          <PCForm
            initial={editing === "A" ? pcA : pcB}
            onSubmit={(cfg) => {
              if (editing === "A") setPcA(cfg);
              else setPcB(cfg);
              setEditing(null);
            }}
          />
        </div>
      )}

      {comparison && (
        <div>
          <div className="mb-6 grid grid-cols-2 gap-4 text-center">
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
              <div className="text-2xl font-extrabold text-white">{comparison.aWins}</div>
              <div className="text-xs text-gray-400">игр лучше на ПК A</div>
            </div>
            <div className="rounded-xl border border-accent-glow/20 bg-accent-glow/5 p-4">
              <div className="text-2xl font-extrabold text-white">{comparison.bWins}</div>
              <div className="text-xs text-gray-400">игр лучше на ПК B</div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className="w-full text-sm">
              <thead className="bg-bg-card text-left text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Игра</th>
                  <th className="px-4 py-3">ПК A</th>
                  <th className="px-4 py-3">ПК B</th>
                  <th className="px-4 py-3">Лучше на</th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map(({ game, rA, rB }) => (
                  <tr key={game.slug} className="border-t border-white/5">
                    <td className="px-4 py-3 font-medium text-gray-200">{game.image} {game.title}</td>
                    <td className="px-4 py-3 text-gray-400">{rA.percent}% · ~{rA.fps.high} FPS</td>
                    <td className="px-4 py-3 text-gray-400">{rB.percent}% · ~{rB.fps.high} FPS</td>
                    <td className="px-4 py-3">
                      {rA.percent === rB.percent ? (
                        <span className="text-gray-500">Одинаково</span>
                      ) : rA.percent > rB.percent ? (
                        <span className="text-accent-soft">ПК A</span>
                      ) : (
                        <span className="text-accent-glow">ПК B</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function PcSlot({ label, pc, onEdit, borderCls }) {
  return (
    <div className={`card ${borderCls}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">{label}</h3>
        <button onClick={onEdit} className="btn-secondary text-xs">
          {pc ? "Изменить" : "Настроить"}
        </button>
      </div>
      {pc ? (
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-gray-500">CPU</dt><dd className="text-gray-200">{pc.cpuName}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">GPU</dt><dd className="text-gray-200">{pc.gpuName}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">RAM</dt><dd className="text-gray-200">{pc.ramGb} ГБ</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">VRAM</dt><dd className="text-gray-200">{pc.vramGb} ГБ</dd></div>
        </dl>
      ) : (
        <p className="mt-4 text-sm text-gray-500">Конфигурация не задана.</p>
      )}
    </div>
  );
}
