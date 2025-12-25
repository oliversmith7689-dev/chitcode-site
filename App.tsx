
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StartEasy from './components/StartEasy';
import ComparisonSection from './components/ComparisonSection';
import StaircaseTech from './components/StaircaseTech';
import SecurityBlock from './components/SecurityBlock';
import AgencyNDA from './components/AgencyNDA';
import MillionaireChannel from './components/MillionaireChannel';
import FeatureGrid from './components/FeatureGrid';

export type UserRole = 'owner' | 'agency';

type ModalType = 'privacy' | 'terms' | null;

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('owner');
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const TG_LINK = "https://t.me/chitcod_ru";
  const SUPPORT_LINK = `${TG_LINK}?text=${encodeURIComponent("Здравствуйте! Мне нужна помощь по работе сервиса Chitcod. Мой вопрос: ")}`;

  // Close modal on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const Modal = ({ title, children, onClose }: { title: string, children?: React.ReactNode, onClose: () => void }) => (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose}></div>
      <div className="bg-white rounded-[40px] w-full max-w-2xl p-8 md:p-14 relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <button onClick={onClose} className="absolute top-8 right-8 text-black/10 hover:text-black transition-colors">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-12 pr-12">{title}</h2>
        <div className="text-gray-600 text-[13px] md:text-sm leading-relaxed space-y-6">
          {children}
        </div>
        <div className="mt-12">
          <button 
            onClick={onClose} 
            className="px-10 py-4 bg-black text-white rounded-full font-bold uppercase text-[11px] tracking-[0.2em] hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-black/20"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white selection:bg-brand-acid selection:text-black overflow-x-hidden">
      {/* Modals */}
      {activeModal === 'privacy' && (
        <Modal title="Privacy Policy" onClose={() => setActiveModal(null)}>
          <p className="font-bold text-black uppercase tracking-widest text-[10px] mb-4">CHITCOD ANONYMITY PROTOCOL</p>
          <p>Сервис ЧИТКОД гарантирует <strong>полную анонимность</strong> клиентов и защиту данных о продвигаемых каналах. Мы работаем в режиме строгого NDA (Non-Disclosure Agreement).</p>
          <p>Мы не передаем данные третьим лицам, рекламным сетям или государственным структурам. Информация о ваших кампаниях не индексируется внешними сервисами аналитики.</p>
          <p>Все данные о заказах удаляются из активной базы сразу после завершения цикла продвижения. Мы не храним историю связей «клиент — канал».</p>
          <div className="pt-6">
             <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-purple font-bold uppercase text-[11px] tracking-widest group">
                Задать вопрос по безопасности <span className="group-hover:translate-x-1 transition-transform">→</span>
             </a>
          </div>
        </Modal>
      )}

      {activeModal === 'terms' && (
        <Modal title="Terms of Service" onClose={() => setActiveModal(null)}>
          <p className="font-bold text-black uppercase tracking-widest text-[10px] mb-4">Алгоритмический регламент</p>
          <p>1. <strong>Механика «Лесенки»:</strong> Сервис осуществляет распределение активности (просмотры, реакции) по математической кривой затухания в течение 72 часов для имитации органического интереса.</p>
          <p>2. <strong>Гарантии безопасности:</strong> Мы гарантируем технологическое отсутствие красных меток («бот-алертов») в системах TGStat и Telemetr при соблюдении рекомендаций куратора.</p>
          <p>3. <strong>Ответственность:</strong> ЧИТКОД не несет ответственности за глобальные изменения в API или политике платформы Telegram, которые могут повлиять на отображение статистики, но обязуется адаптировать алгоритмы в кратчайшие сроки.</p>
          <p>4. <strong>Оплата и тарифы:</strong> Все финансовые расчеты, подбор индивидуальных тарифов и подтверждение объемов происходят исключительно через персонального менеджера.</p>
          <div className="pt-6">
             <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-purple font-bold uppercase text-[11px] tracking-widest group">
                Уточнить детали сотрудничества <span className="group-hover:translate-x-1 transition-transform">→</span>
             </a>
          </div>
        </Modal>
      )}

      {/* Security Status Fixed Indicator */}
      <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-black/90 backdrop-blur px-4 py-2 rounded-full border border-white/10 shadow-2xl">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
        <span className="text-[10px] font-black text-white uppercase tracking-widest">
          Status: Undetected by TGStat / Telemetr
        </span>
      </div>

      <div className="bg-brand-purple min-h-[70vh] relative overflow-hidden">
        <div className="hero-curve"></div>
        <div className="hero-curve" style={{ right: '-10%', top: '20%' }}></div>
        <Header setRole={setRole} />
        <Hero />
      </div>
      
      <main className="relative -mt-20 z-10">
        <section id="agencies" className="px-4 md:px-6 scroll-mt-24">
          <StartEasy role={role} setRole={setRole} />
        </section>

        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <ComparisonSection role={role} />
          </div>
        </section>

        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <FeatureGrid role={role} />
            <div id="technology" className="mt-32 scroll-mt-24">
              <StaircaseTech />
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <SecurityBlock />
          </div>
        </section>

        <section id="security" className="py-24 px-6 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <AgencyNDA />
          </div>
        </section>

        <section id="business" className="py-24 px-6 scroll-mt-24">
          <MillionaireChannel />
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-gray-100 text-sm text-gray-500 text-center bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© {new Date().getFullYear()} ЧИТКОД — Алгоритмическое превосходство в Telegram</p>
          <div className="flex gap-8 font-bold uppercase tracking-widest text-[10px]">
            <button 
              onClick={() => setActiveModal('privacy')}
              className="hover:text-black transition-colors uppercase"
            >
              Privacy
            </button>
            <button 
              onClick={() => setActiveModal('terms')}
              className="hover:text-black transition-colors uppercase"
            >
              Terms
            </button>
            <a 
              href={SUPPORT_LINK} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-black transition-colors uppercase"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
