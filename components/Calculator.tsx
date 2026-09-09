import React, { useEffect, useMemo, useState } from 'react';
import { useInView } from '../lib/useInView';
import { revealStyle } from '../lib/reveal';
import { TG_LINK } from '../lib/constants';

/**
 * Калькулятор пакета для клиента. Цены здесь — итоговые, за единицу объёма.
 * Скидка за объём начисляется автоматически по чеку подписки.
 */
const PRICE = {
  subs: 4,          // ₽ / подписчик
  views: 0.08,      // 80 ₽ / 1 000 просмотров
  reacts: 0.033,    // 33 ₽ / 1 000 реакций
  reposts: 0.067,   // 67 ₽ / 1 000 репостов
  boosts: 193,      // ₽ / буст на 30 дней
  polls: 0.127,     // 127 ₽ / 1 000 голосов
  botBasic: 0.2,    // 200 ₽ / 1 000 запусков
  botPremium: 3.8,  // 3 800 ₽ / 1 000 запусков с премиум-аккаунтов
  traffic: 14,      // ₽ / переход по рекламной ссылке
};

const TIERS = [
  { from: 100000, pct: 10 },
  { from: 500000, pct: 15 },
  { from: 1000000, pct: 20 },
];

type Form = {
  subs: number; posts: number; views: number; reacts: number; reposts: number;
  boosts: number; polls: number; bots: number; premium: boolean; traffic: number;
};

const START: Form = {
  subs: 8000, posts: 15, views: 5000, reacts: 75, reposts: 25,
  boosts: 20, polls: 0, bots: 0, premium: false, traffic: 500,
};

const PRESETS: { name: string; note: string; form: Form }[] = [
  { name: '10K', note: 'старт', form: { subs: 1500, posts: 10, views: 1500, reacts: 25, reposts: 8, boosts: 6, polls: 0, bots: 0, premium: false, traffic: 0 } },
  { name: '25K', note: 'рост', form: { subs: 4000, posts: 15, views: 3000, reacts: 45, reposts: 15, boosts: 20, polls: 0, bots: 0, premium: false, traffic: 0 } },
  { name: '50K', note: 'медиа-актив', form: START },
  { name: '100K+', note: 'флагман', form: { subs: 25000, posts: 15, views: 15000, reacts: 260, reposts: 90, boosts: 50, polls: 0, bots: 5000, premium: false, traffic: 2000 } },
];

const rub = (n: number) => Math.round(n).toLocaleString('ru-RU') + ' ₽';
const num = (n: number) => Math.round(n).toLocaleString('ru-RU');

function useEstimate(f: Form) {
  return useMemo(() => {
    const lines = [
      { key: 'subs', name: 'Подписчики', vol: `${num(f.subs)} в месяц`, sum: f.subs * PRICE.subs },
      { key: 'views', name: 'Просмотры', vol: `${num(f.views)} × ${num(f.posts)} постов`, sum: f.views * f.posts * PRICE.views },
      { key: 'reacts', name: 'Реакции', vol: `${num(f.reacts)} на пост`, sum: f.reacts * f.posts * PRICE.reacts },
      { key: 'reposts', name: 'Репосты', vol: `${num(f.reposts)} на пост`, sum: f.reposts * f.posts * PRICE.reposts },
      { key: 'boosts', name: 'Бусты канала', vol: `${num(f.boosts)} на 30 дней`, sum: f.boosts * PRICE.boosts },
      { key: 'polls', name: 'Голоса в опросах', vol: `${num(f.polls)} в месяц`, sum: f.polls * PRICE.polls },
      { key: 'bots', name: f.premium ? 'Запуски бота, премиум' : 'Запуски бота', vol: `${num(f.bots)} в месяц`, sum: f.bots * (f.premium ? PRICE.botPremium : PRICE.botBasic) },
    ].filter(l => l.sum > 0);

    const subtotal = lines.reduce((a, l) => a + l.sum, 0);
    const tier = [...TIERS].reverse().find(t => subtotal >= t.from);
    const pct = tier ? tier.pct : 0;
    const discount = subtotal * pct / 100;
    const subscription = subtotal - discount;
    const traffic = f.traffic * PRICE.traffic;
    const nextTier = TIERS.find(t => subtotal < t.from);

    return { lines, subtotal, pct, discount, subscription, traffic, total: subscription + traffic, nextTier };
  }, [f]);
}

const Field: React.FC<{
  label: string; unit: string; value: number; onChange: (v: number) => void; step?: number; hint?: string;
}> = ({ label, unit, value, onChange, step = 100, hint }) => (
  <label className="block">
    <span className="block text-xs font-medium text-brand-ink/55 mb-1.5">{label}</span>
    <span className="flex items-center gap-2 bg-brand-paper rounded-2xl px-4 border border-transparent focus-within:border-brand-purple/40 transition-colors">
      <input
        type="number" min={0} step={step} value={value} inputMode="numeric"
        onChange={e => onChange(Math.max(0, Number(e.target.value) || 0))}
        className="w-full bg-transparent py-3 font-mono text-lg tracking-tight tabular-nums outline-none"
      />
      <span className="text-xs text-brand-ink/40 shrink-0">{unit}</span>
    </span>
    {hint && <span className="block mt-1.5 text-[11px] text-brand-ink/40">{hint}</span>}
  </label>
);

const CalculatorModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [f, setF] = useState<Form>(START);
  const e = useEstimate(f);
  const set = (k: keyof Form) => (v: number) => setF(s => ({ ...s, [k]: v }));

  useEffect(() => {
    const onEsc = (ev: KeyboardEvent) => { if (ev.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onEsc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onEsc); document.body.style.overflow = prev; };
  }, [onClose]);

  const tgText = encodeURIComponent(
    'Здравствуйте! Собрал пакет в калькуляторе на chitcod.ru:\n' +
    e.lines.map(l => `— ${l.name}: ${l.vol}`).join('\n') +
    (f.traffic ? `\n— Живой трафик: ${num(f.traffic)} переходов` : '') +
    `\nИтого по калькулятору: ${rub(e.total)} в месяц.\nХочу обсудить.`
  );

  return (
    <div className="fixed inset-0 z-[1000] flex items-start sm:items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-label="Калькулятор пакета">
      <div className="absolute inset-0 bg-brand-ink/70 backdrop-blur-xl" onClick={onClose} />
      <div className="relative bg-white rounded-card w-full max-w-5xl max-h-[94vh] overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white hover:bg-brand-paper flex items-center justify-center" aria-label="Закрыть">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        <div className="p-6 sm:p-10 md:p-12">
          <p className="eyebrow">Калькулятор</p>
          <h2 className="text-3xl sm:text-4xl mt-2 pr-12">Соберите пакет на месяц</h2>
          <p className="mt-3 text-brand-ink/55 max-w-xl">
            Укажите объёмы, которые нужны каналу. Цена считается сразу, скидка за объём начисляется автоматически.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {PRESETS.map(p => (
              <button key={p.name} onClick={() => setF(p.form)}
                className="rounded-full bg-brand-paper hover:bg-brand-purple hover:text-white transition-colors px-4 py-2 text-sm">
                <span className="font-medium">{p.name}</span>
                <span className="opacity-55"> · {p.note}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 grid lg:grid-cols-[minmax(0,1fr)_340px] gap-6 lg:gap-8 items-start">
            <div className="space-y-7">
              <div>
                <h3 className="text-lg">Рост и поддержка</h3>
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <Field label="Прирост подписчиков" unit="в мес." value={f.subs} onChange={set('subs')} step={500} />
                  <Field label="Постов в месяц" unit="шт" value={f.posts} onChange={set('posts')} step={1} />
                  <Field label="Просмотров на пост" unit="шт" value={f.views} onChange={set('views')} step={500} />
                  <Field label="Реакций на пост" unit="шт" value={f.reacts} onChange={set('reacts')} step={5} hint="Норма — от 15 на 1 000 просмотров" />
                  <Field label="Репостов на пост" unit="шт" value={f.reposts} onChange={set('reposts')} step={5} />
                  <Field label="Бустов канала" unit="шт" value={f.boosts} onChange={set('boosts')} step={5} hint="Срок — 30 дней" />
                </div>
              </div>

              <div>
                <h3 className="text-lg">Дополнительно</h3>
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <Field label="Голоса в опросах" unit="в мес." value={f.polls} onChange={set('polls')} step={500} />
                  <Field label="Запуски бота" unit="в мес." value={f.bots} onChange={set('bots')} step={500} />
                  <Field label="Переходы по рекламным ссылкам" unit="в мес." value={f.traffic} onChange={set('traffic')} step={100} hint="Живой трафик, считается отдельным блоком" />
                  <label className="flex items-center gap-3 self-end pb-1 cursor-pointer select-none">
                    <input type="checkbox" checked={f.premium} onChange={ev => setF(s => ({ ...s, premium: ev.target.checked }))}
                      className="w-5 h-5 accent-brand-purple rounded" />
                    <span className="text-sm">Бот с премиум-аккаунтов</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-2 bg-brand-paper rounded-card p-6">
              <p className="eyebrow">Ваш пакет</p>
              <div className="mt-4 divide-y divide-brand-ink/10">
                {e.lines.length === 0 && <p className="text-sm text-brand-ink/45 py-2">Укажите объёмы слева — здесь появится расчёт.</p>}
                {e.lines.map(l => (
                  <div key={l.key} className="flex items-baseline justify-between gap-3 py-2.5">
                    <span className="text-sm">
                      {l.name}
                      <span className="block text-[11px] text-brand-ink/45 font-mono">{l.vol}</span>
                    </span>
                    <span className="font-mono text-sm tabular-nums shrink-0">{rub(l.sum)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-brand-ink/10 space-y-2 text-sm">
                <div className="flex justify-between gap-3 text-brand-ink/60">
                  <span>Подписка</span><span className="font-mono tabular-nums text-brand-ink">{rub(e.subtotal)}</span>
                </div>
                {e.pct > 0 && (
                  <div className="flex justify-between gap-3 text-brand-purple font-medium">
                    <span>Скидка за объём {e.pct}%</span><span className="font-mono tabular-nums">− {rub(e.discount)}</span>
                  </div>
                )}
                {e.traffic > 0 && (
                  <div className="flex justify-between gap-3 text-brand-ink/60">
                    <span>Живой трафик</span><span className="font-mono tabular-nums text-brand-ink">{rub(e.traffic)}</span>
                  </div>
                )}
              </div>

              <div className="mt-5 bg-brand-ink text-white rounded-inner p-5">
                <div className="text-[11px] uppercase tracking-[.1em] text-white/50">Итого в месяц</div>
                <div className="mt-1 font-mono text-3xl font-semibold tracking-tight tabular-nums">{rub(e.total)}</div>
              </div>

              {e.nextTier && (
                <p className="mt-3 text-[12px] text-brand-ink/50">
                  До скидки {e.nextTier.pct}% — ещё {rub(e.nextTier.from - e.subtotal)} к объёму подписки.
                </p>
              )}

              <a href={`${TG_LINK}?text=${tgText}`} target="_blank" rel="noopener noreferrer"
                className="btn btn-md btn-acid w-full mt-5">Обсудить этот пакет</a>
              <p className="mt-3 text-[12px] text-brand-ink/45">
                Расчёт предварительный. Финальный объём и цену подтверждает куратор перед стартом.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Calculator: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <>
      <div ref={ref} className="rounded-inner bg-brand-ink text-white p-6 md:p-8 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10"
        style={revealStyle(inView, 0, { y: 16 })}>
        <div className="flex-1">
          <p className="text-xs font-medium text-brand-acid">Калькулятор</p>
          <h3 className="text-2xl sm:text-3xl mt-2">Посчитайте свой пакет за минуту</h3>
          <p className="mt-3 text-white/60 max-w-xl">
            Подписчики, просмотры, реакции, репосты, бусты и живой трафик — вводите объёмы, которые нужны каналу, и видите цену сразу. Скидка за объём считается автоматически.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-[13px] font-mono text-white/55">
            <span className="rounded-full bg-white/10 px-3 py-1.5">от 100 000 ₽ → −10%</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">от 500 000 ₽ → −15%</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">от 1 000 000 ₽ → −20%</span>
          </div>
        </div>
        <button onClick={() => setOpen(true)} className="btn btn-lg btn-acid shrink-0 w-full lg:w-auto">
          Открыть калькулятор
        </button>
      </div>
      {open && <CalculatorModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default Calculator;
