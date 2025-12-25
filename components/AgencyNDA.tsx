
import React, { useState, useEffect } from 'react';

const AgencyNDA: React.FC = () => {
  const [showNDA, setShowNDA] = useState(false);
  const TG_LINK = "https://t.me/chitcod_ru";

  // Блокировка прокрутки при открытом NDA
  useEffect(() => {
    if (showNDA) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showNDA]);

  return (
    <>
      {/* Основная секция-триггер (всегда в потоке, чтобы избежать прыжков) */}
      <div className="text-center relative py-20 bg-gray-50/50 rounded-[60px] border border-gray-100">
        <div className="relative z-10 px-6">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 bg-black/5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 italic">Партнерская программа</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tighter max-w-4xl mx-auto leading-[0.9]">
            С нами сотрудничают более 30% рекламных агентств СНГ
          </h2>
          <p className="text-gray-500 text-lg mb-12 font-medium max-w-2xl mx-auto">
            Они нашли свой Chitcod и обеспечивают клиентам безупречную статистику без лишних вопросов. А ты?
          </p>
          
          <button 
            onClick={() => setShowNDA(true)}
            className="px-12 py-5 bg-black text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all uppercase tracking-widest active:scale-95"
          >
            Обсудить кейсы с менеджером
          </button>
        </div>
      </div>

      {/* Модальное окно NDA (вне потока документа) */}
      {showNDA && (
        <div className="fixed inset-0 z-[3000] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          {/* Фон с размытием */}
          <div className="absolute inset-0 bg-white/95 backdrop-blur-2xl" onClick={() => setShowNDA(false)}></div>
          
          <div className="absolute top-10 right-10 z-[3001]">
             <button 
              onClick={() => setShowNDA(false)}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          {/* Фоновый текст NDA */}
          <div className="font-grotesk text-[25vw] font-black leading-none text-gray-100 absolute select-none pointer-events-none opacity-50 z-0">
            NDA
          </div>
          
          <div className="relative z-10 max-w-2xl animate-in slide-in-from-bottom-12 zoom-in-95 duration-500">
            <h2 className="text-7xl md:text-9xl font-bold mb-8 tracking-tighter uppercase text-black">NDA</h2>
            <p className="text-2xl font-bold text-black mb-6 uppercase tracking-tight">
              Мы не хвастаемся вашими успехами.
            </p>
            <p className="text-xl text-gray-500 leading-relaxed mb-12 font-medium">
              Полная анонимность и защита данных — основа нашего сервиса. Мы не публикуем логотипы клиентов, но готовы показать примеры работы в личном диалоге.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                    href={TG_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-5 bg-brand-purple text-white rounded-full font-bold uppercase tracking-widest hover:shadow-[0_20px_40px_rgba(139,77,255,0.4)] hover:scale-105 transition-all text-center"
                >
                    Узнать о примерах в ЛС
                </a>
                <button 
                    onClick={() => setShowNDA(false)}
                    className="px-10 py-5 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                >
                    Понятно
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgencyNDA;
