
import React from 'react';

const Hero: React.FC = () => {
  const TG_LINK = "https://t.me/chitcod_ru";

  return (
    <section className="relative pt-8 md:pt-16 pb-24 md:pb-40 px-6 overflow-visible">
      {/* Ассоциативная абстракция — «Алгоритмическое ядро» */}
      <div className="absolute right-[2%] top-[-10%] md:top-[-5%] w-[300px] md:w-[600px] h-auto pointer-events-none z-0 opacity-60 animate-float-slow hidden lg:block">
        <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_80px_rgba(226,255,102,0.15)]">
          <circle cx="250" cy="250" r="200" stroke="white" strokeWidth="0.5" strokeDasharray="10 20" className="animate-spin-slow" style={{ animationDuration: '40s' }} />
          <circle cx="250" cy="250" r="160" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          
          <g transform="translate(250, 250)">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360) / 12;
              const h = 20 + i * 8;
              return (
                <rect 
                  key={i}
                  x="-2" 
                  y={-140} 
                  width="4" 
                  height={h} 
                  fill={i > 8 ? "#E2FF66" : "white"} 
                  opacity={0.3 + (i / 12) * 0.7}
                  transform={`rotate(${angle})`}
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              );
            })}
          </g>

          <rect x="230" y="230" width="40" height="40" fill="#E2FF66" className="animate-bounce-subtle" />
          <rect x="220" y="220" width="60" height="60" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M210 250H290M250 210V290" stroke="white" strokeWidth="0.5" opacity="0.3" />

          <g className="animate-float-fast">
            <rect x="380" y="150" width="30" height="4" fill="white" opacity="0.6" />
            <rect x="380" y="158" width="15" height="4" fill="#E2FF66" />
          </g>
          <g className="animate-float-slow" style={{ animationDelay: '2s' }}>
            <rect x="80" y="320" width="40" height="2" fill="white" opacity="0.4" />
            <rect x="80" y="326" width="20" height="2" fill="white" opacity="0.2" />
          </g>

          <circle cx="250" cy="50" r="3" fill="#E2FF66" />
          <circle cx="450" cy="250" r="2" fill="white" />
          <circle cx="250" cy="450" r="2" fill="white" opacity="0.5" />
          <circle cx="50" cy="250" r="3" fill="white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-full">
          <h1 className="text-4xl sm:text-6xl md:text-[100px] font-bold text-white mb-8 md:mb-12 leading-[1.1] md:leading-[0.9] tracking-tighter uppercase relative">
            <span>Чит-код уже</span> <br /> 
            <span>существует,</span> <br className="hidden sm:block" /> 
            <span className="flex flex-wrap items-baseline gap-x-4">и он прямо перед тобой</span>
          </h1>

          {/* Плашка вынесена из заголовка для чистоты верстки на мобилках */}
          <div className="mb-10 md:mb-16">
            <div className="inline-flex items-center gap-3 md:gap-4 px-5 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full animate-in fade-in slide-in-from-right-8 duration-1000 hover:bg-white/15 transition-colors cursor-default group shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
              <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform">
                  <svg width="14" height="14" md:width="18" md:height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="white"/>
                      <path d="M16.96 8.39L6.5 12.63C6.06 12.82 6.06 13.08 6.42 13.19L9.12 14.03L15.34 10.12C15.63 9.92 15.9 10.03 15.67 10.23L10.63 14.77V14.78L10.62 14.77L10.45 17.27C10.7 17.27 10.81 17.15 10.94 17.02L12.16 15.84L14.7 17.72C15.17 17.99 15.5 17.85 15.62 17.29L17.28 9.42C17.46 8.73 17.02 8.42 16.96 8.39V8.39Z" fill="#8B4DFF"/>
                  </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] md:text-[14px] font-black text-white uppercase tracking-[0.2em] md:tracking-[0.3em] leading-none mb-1">Для Telegram</span>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-acid rounded-full animate-pulse shadow-[0_0_10px_#E2FF66]"></span>
                  <span className="text-[7px] md:text-[8px] font-bold text-white/50 uppercase tracking-widest">Живой алгоритм</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start relative z-10">
            <a 
                href={TG_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-10 md:px-12 py-4 md:py-5 bg-transparent border-2 border-white text-white text-sm md:text-base font-bold rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest active:scale-95 shrink-0 shadow-lg shadow-black/10"
            >
              Активировать
            </a>
            <p className="text-white/70 text-base md:text-xl max-w-md leading-tight font-medium">
              Алгоритмическое органическое продвижение в Telegram. Полная невидимость для аналитических систем.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-fast {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10px, -15px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 40s linear infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
