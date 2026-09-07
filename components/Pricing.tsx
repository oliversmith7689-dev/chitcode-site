import React from 'react';
import { IconCheck } from './Icons';
import { TG_LINK, UserRole } from '../lib/constants';

/** Блок 7 с доски: «Дорого, качественно, надёжно». Пакеты — из шага 03 плана запуска. */
type Tier = { name: string; size: string; who: string; items: string[]; flag?: boolean };

const TIERS: Tier[] = [
  { name: '10K', size: 'до 10 000', who: 'Старт и разгон нового канала', items: ['Лесенка просмотров на каждый пост', 'Ровные реакции в норме ERR', 'Куратор в чате'] },
  { name: '25K', size: 'до 25 000', who: 'Канал, который уже продаёт рекламу', items: ['Всё из 10K', 'Залив под рекламные выходы', 'Репосты и бусты по паттерну', 'Учёт часовых пиков аудитории'] },
  { name: '50K', size: 'до 50 000', who: 'Медиа с сеткой каналов', items: ['Всё из 25K', 'Синхронизация нескольких каналов', 'Живой трафик отдельными блоками', 'Приоритетная линия'] },
  { name: 'Флагман', size: '100K+', who: 'Канал-миллионник под ключ', items: ['Стратегия, нейминг, инфраструктура', 'Полный stealth-режим', 'Персональный менеджер', 'Готов к продаже рекламы'], flag: true },
];

const Pricing: React.FC<{ role: UserRole }> = ({ role }) => (
  <div className="container-x">
    <div className="card p-6 sm:p-10 md:p-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl">Дорого, качественно, надёжно</h2>
        <p className="text-brand-ink/55 max-w-sm md:text-right">
          {role === 'agency' ? 'Для агентств — оптовая сетка на объём. Цену считаем под портфель.' : 'Цену считаем под канал: объём, ниша, ритм постинга. Никаких прайсов «для всех».'}
        </p>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {TIERS.map(t => (
          <div key={t.name} className={`rounded-inner p-6 md:p-7 flex flex-col ${t.flag ? 'bg-brand-ink text-white' : 'bg-brand-paper'}`}>
            <div className="flex items-baseline justify-between">
              <div className={`text-4xl font-semibold tracking-tight ${t.flag ? 'text-brand-acid' : 'text-brand-purple'}`}>{t.name}</div>
              <div className={`text-sm ${t.flag ? 'text-white/50' : 'text-brand-ink/45'}`}>{t.size}</div>
            </div>
            <p className={`mt-2 text-sm ${t.flag ? 'text-white/60' : 'text-brand-ink/55'}`}>{t.who}</p>
            <ul className="mt-6 space-y-2.5 flex-1">
              {t.items.map(i => (
                <li key={i} className="flex gap-2.5 text-sm leading-snug">
                  <IconCheck size={18} className={`shrink-0 mt-0.5 ${t.flag ? 'text-brand-acid' : 'text-brand-purple'}`} />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <a href={t.flag ? '#business' : TG_LINK} target={t.flag ? undefined : '_blank'} rel="noopener noreferrer"
              className={`btn btn-md mt-7 w-full ${t.flag ? 'btn-acid' : 'bg-white text-brand-ink hover:bg-brand-purple hover:text-white'}`}>
              {t.flag ? 'Смотреть флагман' : 'Рассчитать'}
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Pricing;
