import React, { useState } from 'react';
import { useInView } from '../lib/useInView';
import { revealStyle } from '../lib/reveal';
import { IconCheck } from './Icons';
import { UserRole } from '../lib/constants';
import CalculatorCard, { CalculatorModal, FORMS, type Form } from './Calculator';

/** Блок 7 с доски: «Дорого, качественно, надёжно». Пакеты — из шага 03 плана запуска. */
type Tier = { price: string; name: string; who: string; items: string[]; form: Form; flag?: boolean };

const TIERS: Tier[] = [
  {
    price: '10 000 ₽', name: 'Поддержка', form: FORMS.p10,
    who: 'Новому каналу, который выводим на первые продажи рекламы',
    items: [
      '+1 500 подписчиков в месяц',
      '10 постов, до +1 500 просмотров на каждый',
      'Реакции и репосты по контент-плану',
      'До 6 бустов канала',
    ],
  },
  {
    price: '25 000 ₽', name: 'Рост', form: FORMS.p25,
    who: 'Каналу, который уже продаёт рекламу и не хочет терять байеров',
    items: [
      '+4 000 подписчиков в месяц',
      '15 постов, до +3 000 просмотров на каждый',
      'Залив синхронно с рекламными выходами',
      'До 20 бустов канала',
    ],
  },
  {
    price: '50 000 ₽', name: 'Медиа-актив', form: FORMS.p50,
    who: 'Медиа с сеткой каналов и регулярным закупом',
    items: [
      'До +8 000 подписчиков в месяц',
      '15 постов, до +5 000 просмотров на каждый',
      'Расширенная поддержка контента',
      'До 50 бустов канала',
    ],
  },
  {
    price: 'от 100 000 ₽', name: 'Флагман', form: FORMS.p100, flag: true,
    who: 'Каналу-миллионнику под ключ — от стратегии до первых продаж',
    items: [
      'Индивидуальный объём роста',
      'Индивидуальный контент-план',
      'Живой трафик, бот и голосования',
      'Скидка за объём от 10%',
    ],
  },
];

const Pricing: React.FC<{ role: UserRole }> = ({ role }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [calc, setCalc] = useState<Form | null>(null);

  return (
  <div className="container-x">
    <div ref={ref} className="card p-6 sm:p-10 md:p-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl" style={revealStyle(inView, 0, { y: 16 })}>Дорого, качественно, надёжно</h2>
        <p className="text-brand-ink/55 max-w-sm md:text-right" style={revealStyle(inView, 1, { y: 16 })}>
          {role === 'agency'
            ? 'Для агентств — оптовая сетка на объём. Цену считаем под портфель.'
            : 'Месячная подписка: вы платите за объём, а не за «продвижение». Свой набор можно собрать в калькуляторе.'}
        </p>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {TIERS.map((t, i) => (
          <div key={t.name} className={`rounded-inner p-6 md:p-7 flex flex-col ${t.flag ? 'bg-brand-ink text-white' : 'bg-brand-paper'}`} style={revealStyle(inView, i + 2, { step: 80 })}>
            <div className={`text-xs font-medium ${t.flag ? 'text-brand-acid' : 'text-brand-purple'}`}>{t.name}</div>
            <div className="mt-2 text-[32px] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap">{t.price}</div>
            <div className={`mt-1.5 text-sm ${t.flag ? 'text-white/50' : 'text-brand-ink/45'}`}>в месяц</div>
            <p className={`mt-3 text-sm ${t.flag ? 'text-white/60' : 'text-brand-ink/55'}`}>{t.who}</p>
            <ul className="mt-6 space-y-2.5 flex-1">
              {t.items.map(item => (
                <li key={item} className="flex gap-2.5 text-sm leading-snug">
                  <IconCheck size={18} className={`shrink-0 mt-0.5 ${t.flag ? 'text-brand-acid' : 'text-brand-purple'}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setCalc(t.form)} className={`btn btn-md mt-7 w-full ${t.flag ? 'btn-acid' : 'btn-soft'}`}>
              Посчитать пакет
            </button>
          </div>
        ))}
      </div>

      <div className="mt-5 md:mt-6">
        <CalculatorCard onOpen={() => setCalc(FORMS.p50)} />
      </div>
    </div>

    {calc && <CalculatorModal initial={calc} onClose={() => setCalc(null)} />}
  </div>
  );
};

export default Pricing;
