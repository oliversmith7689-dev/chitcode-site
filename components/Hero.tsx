import React from 'react';
import Kernel from './Kernel';
import { IconTelegram } from './Icons';
import { TG_LINK } from '../lib/constants';

const Hero: React.FC = () => (
  <section className="relative isolate overflow-hidden" id="top">
    {/* Фон: глубокий фиолетовый с уходом в тёмный к низу */}
    <div className="absolute inset-0 -z-10 bg-brand-purple" />
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_80%_0%,rgba(139,77,255,.55),transparent_60%),radial-gradient(80%_60%_at_0%_100%,rgba(76,17,145,.7),transparent_60%)]" />

    <div className="container-x relative pt-6 md:pt-10 pb-20 md:pb-28">
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Текст */}
        <div className="lg:col-span-7 relative z-10">
          <div className="inline-block rounded-[28px] md:rounded-[36px] border border-white/35 px-5 py-5 sm:px-8 sm:py-7 md:px-10 md:py-9 backdrop-blur-[2px] bg-white/[.03] relative max-w-full">
            <h1 className="text-white text-[34px] leading-[1.04] sm:text-[52px] md:text-[60px] lg:text-[58px] xl:text-[72px] 2xl:text-[88px] tracking-[-0.045em] font-semibold sm:whitespace-nowrap">
              Подключи чит-код<br />
              к своему каналу<span className="caret" aria-hidden="true" />
            </h1>
          </div>

          <p className="mt-7 md:mt-9 text-white/75 text-lg md:text-xl 2xl:text-2xl max-w-xl 2xl:max-w-2xl leading-snug">
            Управляемая накрутка поведенческих факторов для Telegram, невидимая аналитическим сервисам.
          </p>

          <div className="mt-9 md:mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-acid w-full sm:w-auto">
              Активировать
            </a>
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-white/20 bg-white/[.06] text-white">
              <span className="w-8 h-8 rounded-full bg-white text-brand-purple flex items-center justify-center"><IconTelegram size={16} /></span>
              <span className="leading-tight">
                <span className="block text-sm font-medium">Для Telegram</span>
                <span className="flex items-center gap-1.5 text-[11px] text-white/55">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-acid animate-pulse-dot" />
                  живой алгоритм
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Ядро — 3D-логотип */}
        <div className="lg:col-span-5 relative">
          <Kernel className="h-[300px] sm:h-[380px] lg:h-[520px] xl:h-[600px] 2xl:h-[680px] -mt-6 lg:mt-0 lg:-mr-16 2xl:-mr-24" />
          <p className="text-center lg:text-right text-white/35 text-xs mt-2 hidden sm:block select-none">Потяни или тапни</p>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
