
import React from 'react';

const SecurityBlock: React.FC = () => {
  return (
    <div className="bg-black text-white rounded-[60px] p-12 md:p-24 overflow-hidden relative">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-acid/10 blur-[100px] rounded-full"></div>
      
      <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-brand-acid text-black rounded-full mb-8">
            <span className="text-xs font-black uppercase tracking-widest">Безопасность 100%</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-[0.9] tracking-tighter uppercase">
            Ваш канал <br/> останется <br/> чистым
          </h2>
          
          <p className="text-lg text-white/60 leading-tight mb-12 font-medium">
            Мы гарантируем отсутствие красных меток в TGStat.ru и Telemetr. Наш метод — это математическое моделирование, а не трафик.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="p-8 border border-white/10 rounded-[32px] hover:bg-white/5 transition-colors">
            <div className="text-brand-acid text-2xl font-bold mb-2">01</div>
            <h4 className="text-xl font-bold mb-2 uppercase">Никаких подозрений</h4>
            <p className="text-sm text-white/40">Только органические паттерны поведения, идентичные реальным пользователям.</p>
          </div>
          <div className="p-8 border border-white/10 rounded-[32px] hover:bg-white/5 transition-colors">
            <div className="text-brand-acid text-2xl font-bold mb-2">02</div>
            <h4 className="text-xl font-bold mb-2 uppercase">Полный NDA</h4>
            <p className="text-sm text-white/40">Мы не храним историю заказов и не разглашаем имена партнеров.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBlock;
