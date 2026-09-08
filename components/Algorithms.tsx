import React from 'react';
import { useInView } from '../lib/useInView';
import { revealStyle } from '../lib/reveal';
import { Avatars3, IconBubble, IconEye, IconStar } from './Icons';
import { UserRole } from '../lib/constants';

/** Блок 2 с доски: «ИИ-алгоритмы равномерно распределяют показатели». */
const Algorithms: React.FC<{ role: UserRole }> = ({ role }) => {
  const cols = [
    {
      icon: <Avatars3 />,
      title: 'Рост базы подписчиков',
      desc: role === 'agency'
        ? 'Залив синхронизируется с рекламными выходами клиента: подписки приходят волнами там, где им положено быть.'
        : 'Синхронизируйте залив с рекламными активностями: подписки приходят волнами там, где им положено быть.',
    },
    {
      icon: <IconBubble><IconEye /></IconBubble>,
      title: 'Динамика просмотров',
      desc: 'Плавающие значения в заданном диапазоне с накоплением по лесенке. Каждый пост живёт свои 72 часа.',
    },
    {
      icon: <IconBubble tone="acid"><IconStar /></IconBubble>,
      title: 'Реакции, бусты, репосты',
      desc: 'Имитация вирального эффекта под нашим контролем. Пропорции реакций и репостов держим в норме ERR.',
    },
  ];

  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div className="container-x">
      <div ref={ref} className="card p-6 sm:p-10 md:p-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl max-w-3xl leading-[1.05]" style={revealStyle(inView, 0, { y: 16 })}>
          ИИ-алгоритмы равномерно распределяют показатели и выдерживают средний ERR
        </h2>
        <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-8 md:gap-6">
          {cols.map((c, i) => (
            <div key={c.title} style={revealStyle(inView, i + 1)}>
              <div className="h-12 flex items-center">{c.icon}</div>
              <h3 className="text-2xl mt-5 mb-3">{c.title}</h3>
              <p className="text-brand-ink/60 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Algorithms;
