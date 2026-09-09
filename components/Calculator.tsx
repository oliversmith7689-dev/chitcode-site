import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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

export type Form = {
  subs: number; posts: number; views: number; reacts: number; reposts: number;
  boosts: number; polls: number; bots: number; premium: boolean; traffic: number;
};

/** Пресеты совпадают с пакетами из блока тарифов. */
export const FORMS: Record<'p10' | 'p25' | 'p50' | 'p100', Form> = {
  p10: { subs: 1500, posts: 10, views: 1500, reacts: 25, reposts: 8, boosts: 6, polls: 0, bots: 0, premium: false, traffic: 0 },
  p25: { subs: 4000, posts: 15, views: 3000, reacts: 45, reposts: 15, boosts: 20, polls: 0, bots: 0, premium: false, traffic: 0 },
  p50: { subs: 8000, posts: 15, views: 5000, reacts: 75, reposts: 25, boosts: 50, polls: 0, bots: 0, premium: false, traffic: 0 },
  p100: { subs: 25000, posts: 15, views: 15000, reacts: 260, reposts: 90, boosts: 50, polls: 0, bots: 5000, premium: false, traffic: 2000 },
};

const PRESETS: { key: keyof typeof FORMS; name: string; note: string }[] = [
  { key: 'p10', name: '10 000 ₽', note: 'поддержка' },
  { key: 'p25', name: '25 000 ₽', note: 'рост' },
  { key: 'p50', name: '50 000 ₽', note: 'медиа-актив' },
  { key: 'p100', name: 'от 100 000 ₽', note: 'флагман' },
];

type NumKey = 'subs' | 'posts' | 'views' | 'reacts' | 'reposts' | 'boosts' | 'polls' | 'bots' | 'traffic';
const NUM_KEYS: NumKey[] = ['subs', 'posts', 'views', 'reacts', 'reposts', 'boosts', 'polls', 'bots', 'traffic'];

/** 100000 -> «100 000». Пустое значение остаётся пустым. */
const group = (digits: string) => (digits ? Number(digits).toLocaleString('ru-RU') : '');
const digitsOf = (s: string) => s.replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, 9);
const rub = (n: number) => Math.round(n).toLocaleString('ru-RU') + ' ₽';
const num = (n: number) => Math.round(n).toLocaleString('ru-RU');

type Vals = Record<NumKey, string>;
const valsFromForm = (f: Form): Vals =>
  NUM_KEYS.reduce((acc, k) => { acc[k] = group(String(f[k])); return acc; }, {} as Vals);

function useEstimate(v: Vals, premium: boolean) {
  return useMemo(() => {
    const n = (k: NumKey) => Number(v[k].replace(/\D/g, '')) || 0;
    const posts = n('posts');
    const lines = [
      { key: 'subs', name: 'Подписчики', vol: `${num(n('subs'))} в месяц`, sum: n('subs') * PRICE.subs },
      { key: 'views', name: 'Просмотры', vol: `${num(n('views'))} × ${num(posts)} постов`, sum: n('views') * posts * PRICE.views },
      { key: 'reacts', name: 'Реакции', vol: `${num(n('reacts'))} на пост`, sum: n('reacts') * posts * PRICE.reacts },
      { key: 'reposts', name: 'Репосты', vol: `${num(n('reposts'))} на пост`, sum: n('reposts') * posts * PRICE.reposts },
      { key: 'boosts', name: 'Бусты канала', vol: `${num(n('boosts'))} на 30 дней`, sum: n('boosts') * PRICE.boosts },
      { key: 'polls', name: 'Голоса в опросах', vol: `${num(n('polls'))} в месяц`, sum: n('polls') * PRICE.polls },
      { key: 'bots', name: premium ? 'Запуски бота, премиум' : 'Запуски бота', vol: `${num(n('bots'))} в месяц`, sum: n('bots') * (premium ? PRICE.botPremium : PRICE.botBasic) },
    ].filter(l => l.sum > 0);

    const subtotal = lines.reduce((a, l) => a + l.sum, 0);
    const tier = [...TIERS].reverse().find(t => subtotal >= t.from);
    const pct = tier ? tier.pct : 0;
    const discount = subtotal * pct / 100;
    const traffic = n('traffic') * PRICE.traffic;
    const nextTier = TIERS.find(t => subtotal < t.from);

    return {
      lines, subtotal, pct, discount, traffic, trafficQty: n('traffic'),
      subscription: subtotal - discount, total: subtotal - discount + traffic, nextTier,
    };
  }, [v, premium]);
}

const Field: React.FC<{
  label: string; unit: string; value: string; onChange: (v: string) => void; hint?: string;
}> = ({ label, unit, value, onChange, hint }) => {
  const ref = useRef<HTMLInputElement>(null);
  const caretRef = useRef<number | null>(null);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    const caret = el.selectionStart ?? el.value.length;
    caretRef.current = el.value.slice(0, caret).replace(/\D/g, '').length;
    onChange(group(digitsOf(el.value)));
  };

  // каретка встаёт на ту же цифру, чтобы пробелы не сбивали ввод
  useLayoutEffect(() => {
    const want = caretRef.current;
    caretRef.current = null;
    const node = ref.current;
    if (want === null || !node || document.activeElement !== node) return;
    let i = 0, seen = 0;
    while (i < value.length && seen < want) { if (/\d/.test(value[i])) seen++; i++; }
    node.setSelectionRange(i, i);
  }, [value]);

  return (
    <label className="block">
      <span className="block text-xs font-medium text-brand-ink/55 mb-1.5">{label}</span>
      <span className="flex items-center gap-2 bg-brand-paper rounded-2xl px-4 ring-1 ring-transparent focus-within:ring-brand-purple/50 transition-shadow">
        <input
          ref={ref}
          type="text" inputMode="numeric" autoComplete="off" placeholder="0"
          value={value} onChange={handle}
          className="w-full bg-transparent py-3 font-mono text-lg tracking-tight tabular-nums placeholder:text-brand-ink/25
                     outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <span className="text-xs text-brand-ink/40 shrink-0">{unit}</span>
      </span>
      {hint && <span className="block mt-1.5 text-[11px] text-brand-ink/40">{hint}</span>}
    </label>
  );
};

export const CalculatorModal: React.FC<{ initial?: Form; onClose: () => void }> = ({ initial, onClose }) => {
  const [v, setV] = useState<Vals>(() => valsFromForm(initial ?? FORMS.p50));
  const [premium, setPremium] = useState(initial?.premium ?? false);
  const e = useEstimate(v, premium);
  const set = (k: NumKey) => (val: string) => setV(s => ({ ...s, [k]: val }));

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
    (e.trafficQty ? `\n— Живой трафик: ${num(e.trafficQty)} переходов` : '') +
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
              <button key={p.key} onClick={() => { setV(valsFromForm(FORMS[p.key])); setPremium(FORMS[p.key].premium); }}
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
                  <Field label="Прирост подписчиков" unit="в мес." value={v.subs} onChange={set('subs')} />
                  <Field label="Постов в месяц" unit="шт" value={v.posts} onChange={set('posts')} />
                  <Field label="Просмотров на пост" unit="шт" value={v.views} onChange={set('views')} />
                  <Field label="Реакций на пост" unit="шт" value={v.reacts} onChange={set('reacts')} hint="Норма — от 15 на 1 000 просмотров" />
                  <Field label="Репостов на пост" unit="шт" value={v.reposts} onChange={set('reposts')} />
                  <Field label="Бустов канала" unit="шт" value={v.boosts} onChange={set('boosts')} hint="Срок — 30 дней" />
                </div>
              </div>

              <div>
                <h3 className="text-lg">Дополнительно</h3>
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <Field label="Голоса в опросах" unit="в мес." value={v.polls} onChange={set('polls')} />
                  <Field label="Запуски бота" unit="в мес." value={v.bots} onChange={set('bots')} />
                  <Field label="Переходы по рекламным ссылкам" unit="в мес." value={v.traffic} onChange={set('traffic')} hint="Живой трафик, считается отдельным блоком" />
                  <label className="flex items-center gap-3 self-end pb-1 cursor-pointer select-none">
                    <input type="checkbox" checked={premium} onChange={ev => setPremium(ev.target.checked)}
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

/** Карточка-приглашение под сеткой тарифов. */
const CalculatorCard: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
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
      <button onClick={onOpen} className="btn btn-lg btn-acid shrink-0 w-full lg:w-auto">
        Открыть калькулятор
      </button>
    </div>
  );
};

export default CalculatorCard;
