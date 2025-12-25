
import React from 'react';
import { UserRole } from '../App';

interface FeatureGridProps {
  role: UserRole;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ role }) => {
  const features = [
    {
      title: 'Просмотры-лесенка',
      desc: 'Персональная настройка распределения охвата для идеальной статистики.',
      result: 'Safe: 100% undetected',
      icon: (
        <svg width="40" height="24" className="text-brand-purple">
            <rect x="0" y="16" width="6" height="8" fill="currentColor" opacity="0.2" />
            <rect x="8" y="12" width="6" height="12" fill="currentColor" opacity="0.4" />
            <rect x="16" y="8" width="6" height="16" fill="currentColor" opacity="0.6" />
            <rect x="24" y="4" width="6" height="20" fill="currentColor" opacity="0.8" />
            <rect x="32" y="0" width="6" height="24" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'Бесшовные реакции',
      desc: 'Ручное управление притоком активности, не вызывающее подозрений.',
      result: 'Speed: manual control',
      icon: (
        <div className="relative w-10 h-10 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-brand-purple drop-shadow-[0_0_8px_rgba(139,77,255,0.4)]">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" />
            </svg>
            <div className="absolute w-10 h-10 border border-brand-purple rounded-full animate-ping opacity-10"></div>
        </div>
      )
    },
    {
      title: 'Естественные репосты',
      desc: 'Имитация вирального охвата под контролем вашего менеджера.',
      result: 'Ratio: 1:50 views',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B4DFF" strokeWidth="2">
            <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
      )
    },
    {
      title: 'Private Support',
      desc: 'Безопасное продвижение закрытых каналов с ручной модерацией.',
      result: 'Links: Private supported',
      icon: (
        <div className="w-10 h-10 bg-brand-purple/10 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-brand-purple rounded-sm"></div>
        </div>
      )
    },
    {
      title: 'Своя инфраструктура',
      desc: 'Приватная ферма и работа с рекламными ссылками любой сложности.',
      result: 'Uptime: 99.9%',
      icon: (
        <div className="grid grid-cols-2 gap-1">
            <div className="w-4 h-4 bg-brand-purple/20"></div>
            <div className="w-4 h-4 bg-brand-purple"></div>
            <div className="w-4 h-4 bg-brand-purple"></div>
            <div className="w-4 h-4 bg-brand-purple/20"></div>
        </div>
      )
    },
    {
      title: 'Мягкий залив',
      desc: 'Прирост подписчиков под наблюдением куратора 24/7.',
      result: 'Limit: 500k/day',
      icon: (
        <div className="relative w-12 h-10 flex items-center justify-center">
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-brand-purple/40">
              <path d="M0 10C5 10 5 15 10 15C15 15 15 5 20 5C25 5 25 15 30 15C35 15 35 10 40 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="animate-[dash_3s_ease-in-out_infinite]" />
              <style>{`
                @keyframes dash {
                  0% { stroke-dasharray: 0, 100; opacity: 0.2; }
                  50% { stroke-dasharray: 50, 50; opacity: 1; }
                  100% { stroke-dasharray: 100, 0; opacity: 0.2; }
                }
              `}</style>
            </svg>
            <div className="absolute -top-1 right-2 w-2 h-2 bg-brand-purple rounded-full animate-bounce"></div>
        </div>
      )
    },
    {
      title: 'Статистика 24/7',
      desc: 'Удержание канала в плюсовых значениях силами команды поддержки.',
      result: 'Control: Personal curator',
      icon: (
        <div className="flex gap-1 items-end h-6">
            <div className="w-1.5 h-2 bg-brand-purple"></div>
            <div className="w-1.5 h-4 bg-brand-purple"></div>
            <div className="w-1.5 h-6 bg-brand-purple"></div>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 uppercase tracking-tighter">Сетка возможностей</h2>
        <p className="text-gray-500 font-medium">Комплексный подход к органическому росту</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div 
            key={i} 
            className={`relative overflow-hidden p-8 bg-white border border-gray-100 rounded-[32px] hover:border-brand-purple transition-all group ${
              i === 0 ? 'lg:col-span-2' : ''
            }`}
          >
            <div className="mb-6 h-10 flex items-center transform group-hover:scale-110 transition-transform duration-500 origin-left">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">{f.title}</h3>
            <p className="text-gray-500 leading-tight text-sm mb-4">
              {f.desc}
            </p>
            <div className="pt-4 border-t border-gray-50">
                <span className="text-[10px] font-mono text-brand-purple font-bold bg-brand-purple/5 px-2 py-1 rounded">
                    {f.result}
                </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
