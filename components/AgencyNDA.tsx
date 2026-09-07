import React, { useEffect, useState } from 'react';
import { TG_LINK } from '../lib/constants';

const AgencyNDA: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onEsc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onEsc); };
  }, [open]);

  return (
    <>
      <div className="container-x">
        <div className="card p-8 sm:p-12 md:p-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-brand-purple mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse-dot" />
            Партнёрская программа
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl max-w-3xl mx-auto leading-[1.05]">
            С нами работают больше 30% рекламных агентств СНГ
          </h2>
          <p className="mt-5 text-brand-ink/60 text-lg max-w-xl mx-auto">
            Они нашли свой чит-код и отдают клиентам ровную статистику без лишних вопросов.
          </p>
          <button onClick={() => setOpen(true)} className="btn btn-lg btn-ink mt-9">Обсудить кейсы с менеджером</button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6 animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="nda-title">
          <div className="absolute inset-0 bg-brand-ink/70 backdrop-blur-xl" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-card max-w-xl w-full p-8 sm:p-12 text-center animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <button onClick={() => setOpen(false)} className="absolute top-5 right-5 w-10 h-10 rounded-full hover:bg-brand-paper flex items-center justify-center" aria-label="Закрыть">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            <div id="nda-title" className="text-6xl sm:text-7xl font-semibold tracking-[-0.06em] text-brand-purple">NDA</div>
            <p className="mt-4 text-xl font-medium">Мы не хвастаемся вашими успехами</p>
            <p className="mt-3 text-brand-ink/60 leading-relaxed">
              Мы не публикуем логотипы клиентов и не храним историю заказов. Примеры работы показываем только в личном диалоге.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-lg bg-brand-purple text-white hover:bg-brand-deep">Узнать о примерах в ЛС</a>
              <button onClick={() => setOpen(false)} className="btn btn-lg bg-brand-paper text-brand-ink hover:bg-brand-ink hover:text-white">Понятно</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgencyNDA;
