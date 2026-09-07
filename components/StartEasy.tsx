import React from 'react';
import { IconArrow } from './Icons';
import { TG_LINK, UserRole } from '../lib/constants';

interface Props { role: UserRole; setRole: (r: UserRole) => void; }

const STEPS: Record<UserRole, { title: string; desc: string; cta: string }[]> = {
  owner: [
    { title: 'Считаем контур', desc: 'Смотрим текущие показатели канала и подбираем пакет под ваш ритм публикаций.', cta: 'Рассчитать' },
    { title: 'Запускаем лесенку', desc: 'Куратор настраивает распределение активности под контент-план. Вы просто публикуете.', cta: 'Связаться с куратором' },
    { title: 'Держим ровно', desc: 'Показатели растут плавно, без всплесков. Рекламодатели видят живой канал.', cta: 'Стать партнёром' },
  ],
  agency: [
    { title: 'Прямой шлюз', desc: 'Выделенный чат для постановки задач по всем вашим проектам сразу.', cta: 'Получить доступ' },
    { title: 'Оптовая сетка', desc: 'Свои условия на объём и гибкая цена за канал.', cta: 'Обсудить цены' },
    { title: 'White label', desc: 'Мы остаёмся в тени вашего бренда. Клиент видит только вас.', cta: 'Стать партнёром' },
  ],
};

const StartEasy: React.FC<Props> = ({ role, setRole }) => (
  <div className="container-x">
    <div className="bg-brand-acid rounded-card p-6 sm:p-10 md:p-14 shadow-acid relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <h2 className="text-4xl md:text-5xl text-brand-ink">Начать легко</h2>

        <div className="bg-brand-ink/[.07] p-1 rounded-full inline-flex self-start md:self-auto" role="tablist" aria-label="Кто вы">
          {([['owner', 'Владелец канала'], ['agency', 'Агентство']] as [UserRole, string][]).map(([r, label]) => (
            <button
              key={r}
              role="tab"
              aria-selected={role === r}
              onClick={() => setRole(r)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${role === r ? 'bg-brand-ink text-brand-acid shadow-md' : 'text-brand-ink/60 hover:text-brand-ink'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-5">
        {STEPS[role].map((s, i) => (
          <a
            key={role + i}
            href={TG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-inner p-6 md:p-7 flex flex-col justify-between min-h-[220px] group hover:-translate-y-1 transition-transform animate-in fade-in slide-in-from-bottom-2 duration-500"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div>
              <div className="text-brand-purple text-sm font-medium mb-3">{i + 1} из 3</div>
              <h3 className="text-xl md:text-2xl mb-2">{s.title}</h3>
              <p className="text-sm text-brand-ink/60 leading-relaxed">{s.desc}</p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm font-medium text-brand-ink/50 group-hover:text-brand-purple transition-colors">{s.cta}</span>
              <span className="arrow-dot bg-brand-ink text-white group-hover:bg-brand-purple"><IconArrow size={18} /></span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default StartEasy;
