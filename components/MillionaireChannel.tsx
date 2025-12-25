
import React from 'react';

const MillionaireChannel: React.FC = () => {
  const TG_LINK = "https://t.me/chitcod_ru";

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-[#0A0A0A] rounded-[60px] p-10 md:p-24 overflow-hidden relative border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group">
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#DFFF5E]/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-[#DFFF5E]/10 transition-all duration-700"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 border border-[#DFFF5E]/30 rounded-full mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#DFFF5E]">Flagship Service</span>
          </div>

          <div className="grid lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-3">
              <h2 className="text-5xl md:text-[5.5rem] font-bold text-white mb-10 leading-[0.85] tracking-tighter uppercase">
                Канал-миллионник <br/> 
                <span className="text-[#DFFF5E] inline-block transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(223,255,94,0.4)] cursor-default glitch-hover">
                  за 1 000 000 ₽
                </span>
              </h2>
              
              <p className="text-xl text-white/50 font-medium leading-snug mb-16 max-w-2xl">
                Создаем медиа-актив, который работает на вас. Мы берем на себя полное построение инфраструктуры канала: от разработки стратегии и нейминга до залива первой сотни тысяч аудитории по нашим уникальным алгоритмам «лесенки».
              </p>

              <a 
                href={TG_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-12 py-6 bg-[#DFFF5E] text-black rounded-full font-black text-sm uppercase tracking-widest shadow-[0_20px_40px_rgba(223,255,94,0.2)] hover:shadow-[0_25px_60px_rgba(223,255,94,0.4)] hover:scale-[1.02] transition-all"
              >
                Забронировать стратегию в ЛС
              </a>
            </div>

            <div className="lg:col-span-2 space-y-12 lg:pt-8">
              <div className="flex gap-6 group/item">
                <div className="text-[#DFFF5E] font-mono text-xs font-bold pt-1 opacity-40 group-hover/item:opacity-100 transition-opacity">01</div>
                <div>
                  <h4 className="text-white font-bold text-xl uppercase tracking-tight mb-2">Твердый актив</h4>
                  <p className="text-white/40 text-sm leading-relaxed">Вы получаете не просто цифры, а готовый бизнес с идеальной историей в TGStat и Telemetr.</p>
                </div>
              </div>

              <div className="flex gap-6 group/item">
                <div className="text-[#DFFF5E] font-mono text-xs font-bold pt-1 opacity-40 group-hover/item:opacity-100 transition-opacity">02</div>
                <div>
                  <h4 className="text-white font-bold text-xl uppercase tracking-tight mb-2">Алгоритмическая органика</h4>
                  <p className="text-white/40 text-sm leading-relaxed">Подписчики и охваты распределяются по кривой естественного роста. Никаких меток.</p>
                </div>
              </div>

              <div className="flex gap-6 group/item">
                <div className="text-[#DFFF5E] font-mono text-xs font-bold pt-1 opacity-40 group-hover/item:opacity-100 transition-opacity">03</div>
                <div>
                  <h4 className="text-white font-bold text-xl uppercase tracking-tight mb-2">Монетизация под ключ</h4>
                  <p className="text-white/40 text-sm leading-relaxed italic font-medium">К моменту завершения раскрутки канал будет готов к продаже рекламы в 50 000- 100 000 руб. за 1 рекламный пост</p>
                </div>
              </div>

              <div className="flex gap-6 group/item">
                <div className="text-[#DFFF5E] font-mono text-xs font-bold pt-1 opacity-40 group-hover/item:opacity-100 transition-opacity">04</div>
                <div>
                  <h4 className="text-white font-bold text-xl uppercase tracking-tight mb-2">Полный Stealth-режим</h4>
                  <p className="text-white/40 text-sm leading-relaxed">Мы соблюдаем строгий NDA. О том, как был создан ваш миллионник, будет знать только менеджер.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-12 right-12 opacity-20 pointer-events-none hidden md:block">
            <svg width="120" height="120" viewBox="0 0 100 100" className="animate-spin-slow">
                <circle cx="50" cy="50" r="48" fill="none" stroke="#DFFF5E" strokeWidth="0.5" strokeDasharray="4 4" />
                <path d="M50 2 L50 98 M2 50 L98 50" stroke="#DFFF5E" strokeWidth="0.5" />
            </svg>
        </div>
      </div>
      
      <style>{`
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .glitch-hover:hover {
          text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff;
        }
      `}</style>
    </div>
  );
};

export default MillionaireChannel;
