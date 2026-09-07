import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StartEasy from './components/StartEasy';
import SmoothVsSpike from './components/SmoothVsSpike';
import ComparisonSection from './components/ComparisonSection';
import Algorithms from './components/Algorithms';
import StaircaseTech from './components/StaircaseTech';
import Strategy from './components/Strategy';
import LaunchPlan from './components/LaunchPlan';
import SecurityBlock from './components/SecurityBlock';
import AgencyNDA from './components/AgencyNDA';
import Pricing from './components/Pricing';
import MillionaireChannel from './components/MillionaireChannel';
import { Logo } from './components/Logo';
import { SUPPORT_LINK, TG_LINK, UserRole } from './lib/constants';

type ModalType = 'privacy' | 'terms' | null;

const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-[1000] flex items-center justify-center p-5 animate-in fade-in duration-200" role="dialog" aria-modal="true">
    <div className="absolute inset-0 bg-brand-ink/70 backdrop-blur-xl" onClick={onClose} />
    <div className="relative bg-white rounded-card w-full max-w-2xl p-7 sm:p-12 max-h-[90vh] overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-300">
      <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 rounded-full hover:bg-brand-paper flex items-center justify-center" aria-label="Закрыть">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <h2 className="text-3xl sm:text-4xl pr-10">{title}</h2>
      <div className="mt-8 text-brand-ink/70 leading-relaxed space-y-4">{children}</div>
      <button onClick={onClose} className="btn btn-md btn-ink mt-10">Закрыть</button>
    </div>
  </div>
);

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('owner');
  const [modal, setModal] = useState<ModalType>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setModal(null); };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {modal === 'privacy' && (
        <Modal title="Политика конфиденциальности" onClose={() => setModal(null)}>
          <p>ЧИТКОД гарантирует полную анонимность клиентов и защиту данных о продвигаемых каналах. Мы работаем в режиме строгого NDA.</p>
          <p>Мы не передаём данные третьим лицам, рекламным сетям или государственным структурам. Информация о кампаниях не индексируется внешними сервисами аналитики.</p>
          <p>Данные о заказах удаляются из активной базы сразу после завершения цикла продвижения. Мы не храним историю связей «клиент — канал».</p>
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="inline-block text-brand-purple font-medium">Задать вопрос по безопасности</a>
        </Modal>
      )}
      {modal === 'terms' && (
        <Modal title="Условия использования" onClose={() => setModal(null)}>
          <p><strong className="text-brand-ink">Механика лесенки.</strong> Сервис распределяет активность по математической кривой затухания в течение 72 часов для имитации органического интереса.</p>
          <p><strong className="text-brand-ink">Гарантии.</strong> Мы гарантируем отсутствие красных меток в TGStat и Telemetr при соблюдении рекомендаций куратора.</p>
          <p><strong className="text-brand-ink">Ответственность.</strong> ЧИТКОД не отвечает за глобальные изменения в API или политике Telegram, но обязуется адаптировать алгоритмы в кратчайшие сроки.</p>
          <p><strong className="text-brand-ink">Оплата и тарифы.</strong> Расчёты, подбор индивидуальных пакетов и подтверждение объёмов происходят через персонального менеджера.</p>
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="inline-block text-brand-purple font-medium">Уточнить детали сотрудничества</a>
        </Modal>
      )}

      <Header />
      <Hero />

      <main className="relative z-10 pt-6 md:pt-8 space-y-6 md:space-y-8 pb-6 md:pb-8">
        <section id="start" className="scroll-mt-24"><StartEasy role={role} setRole={setRole} /></section>
        <section><SmoothVsSpike /></section>
        <section className="py-10 md:py-16"><ComparisonSection role={role} /></section>
        <section><Algorithms role={role} /></section>
        <section id="technology" className="scroll-mt-24"><StaircaseTech /></section>
        <section><Strategy /></section>
        <section><LaunchPlan /></section>
        <section id="security" className="scroll-mt-24"><SecurityBlock /></section>
        <section id="agencies" className="scroll-mt-24"><AgencyNDA /></section>
        <section id="pricing" className="scroll-mt-24"><Pricing role={role} /></section>
        <section id="business" className="scroll-mt-24"><MillionaireChannel /></section>
      </main>

      <footer className="container-x py-10 md:py-14">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-sm text-brand-ink/55">
          <div className="flex items-center gap-4">
            <span className="text-brand-purple text-2xl"><Logo markSize={22} /></span>
            <span>© {new Date().getFullYear()} Алгоритмическое превосходство в Telegram</span>
          </div>
          <nav className="flex gap-7">
            <button onClick={() => setModal('privacy')} className="hover:text-brand-ink transition-colors">Приватность</button>
            <button onClick={() => setModal('terms')} className="hover:text-brand-ink transition-colors">Условия</button>
            <a href={SUPPORT_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-brand-ink transition-colors">Поддержка</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default App;
