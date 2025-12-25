
import React from 'react';
import { UserRole } from '../App';

interface StartEasyProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const StartEasy: React.FC<StartEasyProps> = ({ role, setRole }) => {
  const TG_LINK = "https://t.me/chitcod_ru";

  const steps = role === 'owner' ? [
    { 
        title: 'Пользуешься продуктом', 
        desc: 'Получите персональный расчет охвата и подбор тарифа под ваш канал.',
        cta: 'Рассчитать бюджет'
    },
    { 
        title: 'Продвигаешь контент', 
        desc: 'Делегируйте ведение активности нам. Менеджер настроит график «лесенки» под ваш контент-план.',
        cta: 'Связаться с менеджером'
    },
    { 
        title: 'Строишь империю', 
        desc: 'Обсудите спецпредложение для агентств и условия White Label напрямую.',
        cta: 'Стать партнером'
    }
  ] : [
    { 
        title: 'Прямой шлюз', 
        desc: 'Выделенная линия связи для оперативной постановки задач по вашим проектам.',
        cta: 'Получить доступ'
    },
    { 
        title: 'Корпоративный прайс', 
        desc: 'Специальные условия и гибкая сетка цен для больших объемов.',
        cta: 'Обсудить цены'
    },
    { 
        title: 'White Label', 
        desc: 'Полная конфиденциальность сотрудничества. Мы остаемся в тени вашего бренда.',
        cta: 'Стать партнером'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto bg-brand-acid rounded-[40px] p-10 md:p-16 shadow-2xl overflow-hidden relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <h2 className="text-4xl md:text-5xl font-bold text-black uppercase tracking-tighter">Начать — легко</h2>
        
        <div className="bg-black/5 p-1 rounded-full flex items-center">
          <button
            onClick={() => setRole('owner')}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-all ${
              role === 'owner' ? 'bg-black text-white' : 'text-black/50 hover:text-black'
            }`}
          >
            Владелец
          </button>
          <button
            onClick={() => setRole('agency')}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-all ${
              role === 'agency' ? 'bg-black text-white' : 'text-black/50 hover:text-black'
            }`}
          >
            Агентство
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <a 
            key={i} 
            href={TG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-[32px] p-8 flex flex-col text-left justify-between h-64 hover:translate-y-[-4px] transition-transform shadow-lg group"
          >
            <div>
              <h3 className="text-xl font-bold leading-tight mb-2 pr-4">{step.title}</h3>
              <p className="text-xs text-black/50 font-medium mb-4">{step.desc}</p>
            </div>
            <div className="flex flex-col gap-4">
               <div className="text-[10px] font-black uppercase tracking-widest text-black/30 group-hover:text-brand-purple transition-colors">
                  {step.cta}
               </div>
               <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white group-hover:bg-brand-purple transition-colors">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
               </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default StartEasy;
