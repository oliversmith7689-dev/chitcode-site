import React from 'react';
import { useInView } from '../lib/useInView';
import { TG_LINK } from '../lib/constants';

/** Плавная лесенка против резкого всплеска — блок 1 с доски. */

const SMOOTH = [100, 86, 74, 64, 56, 49, 43, 38, 34, 30, 27, 24, 22, 20, 18, 17];
const SPIKE  = [96, 12, 8, 6, 5, 4, 88, 6, 5, 4, 4, 92, 5, 4, 3, 3];

const Bars: React.FC<{ data: number[]; tone: 'moss' | 'rose'; on: boolean }> = ({ data, tone, on }) => {
  const W = 320, H = 120, gap = 4;
  const bw = (W - gap * (data.length - 1)) / data.length;
  const fill = '#FFFFFF';
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={tone === 'moss' ? 'Плавное затухание активности' : 'Резкие всплески активности'}>
      {data.map((v, i) => {
        const h = (v / 100) * (H - 8);
        return (
          <rect
            key={i}
            x={i * (bw + gap)} y={H - h} width={bw} height={h} rx={3}
            fill={fill} fillOpacity={tone === 'moss' ? 0.92 : 0.9}
            style={{
              transformOrigin: `${i * (bw + gap) + bw / 2}px ${H}px`,
              transform: on ? 'scaleY(1)' : 'scaleY(0.04)',
              transition: `transform .7s cubic-bezier(.2,.8,.2,1) ${i * 40}ms`,
            }}
          />
        );
      })}
      {tone === 'rose' && (
        <path d={`M0 ${H - 0.5} H${W}`} stroke="rgba(255,255,255,.35)" strokeDasharray="3 5" />
      )}
    </svg>
  );
};

const SmoothVsSpike: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  return (
    <div className="container-x">
      <div ref={ref} className="card p-6 sm:p-10 md:p-14">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-[1.05]">
              Увеличивайте показатели активности канала без аномальных всплесков
            </h2>
            <p className="mt-5 text-brand-ink/60 text-lg leading-relaxed max-w-md">
              Аналитика ищет не цифры, а паттерн. Ровное затухание за 72 часа выглядит как живой интерес. Скачки — как залив.
            </p>
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-lg bg-brand-purple text-white hover:bg-brand-deep mt-8">
              Написать куратору
            </a>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 md:gap-5">
            <figure className="rounded-inner overflow-hidden bg-brand-moss text-white">
              <div className="p-5 sm:p-6 pb-0"><Bars data={SMOOTH} tone="moss" on={inView} /></div>
              <figcaption className="p-5 sm:p-6 pt-4">
                <div className="text-sm font-medium mb-1">Лесенка ЧИТКОД</div>
                <p className="text-sm text-white/75 leading-snug">Аккуратное распределение просмотров и реакций в течение 72 часов.</p>
              </figcaption>
            </figure>
            <figure className="rounded-inner overflow-hidden bg-brand-rose text-white">
              <div className="p-5 sm:p-6 pb-0"><Bars data={SPIKE} tone="rose" on={inView} /></div>
              <figcaption className="p-5 sm:p-6 pt-4">
                <div className="text-sm font-medium mb-1">Обычный залив</div>
                <p className="text-sm text-white/80 leading-snug">Резкий всплеск и падение активности вызывают подозрение у рекламодателей.</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmoothVsSpike;
