
import React, { useState } from 'react';

const AgencyNDA: React.FC = () => {
  const [showNDA, setShowNDA] = useState(false);
  const TG_LINK = "https://t.me/chitcod_ru";

  return (
    <div className="text-center relative py-20 bg-gray-50/50 rounded-[60px] border border-gray-100">
      {!showNDA ? (
        <div className="animate-in fade-in duration-700 relative z-10 px-6">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 bg-black/5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 italic">Partnership Program</span>
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
      ) : (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-300">
          <div className="absolute top-10 right-10">
             <button 
              onClick={() => setShowNDA(false)}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="font-grotesk text-[20vw] font-black leading-none text-gray-50 absolute select-none pointer-events-none opacity-50">
            NDA
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter">NDA</h2>
            <p className="text-2xl font-medium text-black mb-6">
              Мы не хвастаемся вашими успехами.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mb-12">
              Полная анонимность и защита данных — основа нашего сервиса. Мы не публикуем логотипы клиентов, но готовы показать примеры работы в личном диалоге.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                    href={TG_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-brand-purple text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform text-center"
                >
                    Узнать о наших примерах в ЛС
                </a>
                <button 
                    onClick={() => setShowNDA(false)}
                    className="px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                >
                    Понятно
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyNDA;
