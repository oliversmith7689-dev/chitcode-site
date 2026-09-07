import React from 'react';

type P = React.SVGProps<SVGSVGElement> & { size?: number };
const base = (size: number, props: P) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, ...props,
});

export const IconPerson = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></svg>
);
export const IconEye = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></svg>
);
export const IconEyeOff = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M3 3l18 18" /><path d="M10.6 6.1A9.8 9.8 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-3.4 4.1" /><path d="M6.4 6.9A17.6 17.6 0 0 0 2.5 12S6 18 12 18a9.6 9.6 0 0 0 4.3-1" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></svg>
);
export const IconStar = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8L12 3.5Z" /></svg>
);
export const IconShield = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6L12 3Z" /><path d="M9 12l2 2 4-4.5" /></svg>
);
export const IconCheck = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
export const IconArrow = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
);
export const IconBars = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M5 20V10" /><path d="M12 20V4" /><path d="M19 20v-7" /></svg>
);
export const IconStairs = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M3 20h5v-5h4v-5h4V5h5" /></svg>
);
export const IconClock = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
);
export const IconScale = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M12 4v16" /><path d="M5 8h14" /><path d="M5 8l-2.5 6a3 3 0 0 0 5 0L5 8Z" /><path d="M19 8l-2.5 6a3 3 0 0 0 5 0L19 8Z" /></svg>
);
export const IconTrend = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M3 17l5.5-5.5 4 4L21 7" /><path d="M15 7h6v6" /></svg>
);
export const IconGhost = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M5 20V11a7 7 0 0 1 14 0v9l-2.5-2-2 2-2.5-2-2.5 2-2-2L5 20Z" /><circle cx="9.5" cy="11" r="1" fill="currentColor" stroke="none" /><circle cx="14.5" cy="11" r="1" fill="currentColor" stroke="none" /></svg>
);
export const IconBot = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 8V4" /><circle cx="12" cy="3.5" r="1" fill="currentColor" stroke="none" /><circle cx="9" cy="13.5" r="1.2" fill="currentColor" stroke="none" /><circle cx="15" cy="13.5" r="1.2" fill="currentColor" stroke="none" /></svg>
);
export const IconLock = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><rect x="5" y="11" width="14" height="10" rx="2.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
);
export const IconInfinity = ({ size = 22, ...p }: P) => (
  <svg {...base(size, p)}><path d="M12 12c-1.7-2.3-3-3.5-5-3.5a3.5 3.5 0 0 0 0 7c2 0 3.3-1.2 5-3.5Zm0 0c1.7 2.3 3 3.5 5 3.5a3.5 3.5 0 0 0 0-7c-2 0-3.3 1.2-5 3.5Z" /></svg>
);
export const IconTelegram = ({ size = 22, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M20.7 4.2 3.4 10.9c-1.2.5-1.2 1.1-.2 1.4l4.4 1.4 1.7 5.2c.2.6.4.8.8.8.4 0 .6-.2 .9-.5l2.1-2 4.4 3.2c.8.4 1.4.2 1.6-.7l2.9-13.6c.3-1.2-.4-1.7-1.3-1.9Zm-3 4.4-7.7 7-.3 3.2-1.5-4.6 8.9-5.6c.4-.3.8 0 .6 0Z" /></svg>
);

/** Иконка в круге — так просил стикер продакта («в кружках»). */
export const IconBubble: React.FC<{ children: React.ReactNode; tone?: 'purple' | 'acid' | 'ink' | 'white' }> = ({ children, tone = 'purple' }) => {
  const cls = {
    purple: 'bg-brand-purple/10 text-brand-purple',
    acid: 'bg-brand-acid text-brand-ink',
    ink: 'bg-brand-ink text-brand-acid',
    white: 'bg-white/12 text-white',
  }[tone];
  return <span className={`inline-flex w-12 h-12 rounded-full items-center justify-center ${cls}`}>{children}</span>;
};

/** Три пересекающихся аватара — «фейк-аккаунты ×3 в кружках». */
export const Avatars3: React.FC = () => (
  <span className="inline-flex items-center -space-x-3">
    {['bg-brand-purple text-white', 'bg-brand-acid text-brand-ink', 'bg-brand-ink text-brand-acid'].map((c, i) => (
      <span key={i} className={`w-12 h-12 rounded-full ring-[3px] ring-white flex items-center justify-center ${c}`} style={{ zIndex: 3 - i }}>
        <IconPerson size={20} />
      </span>
    ))}
  </span>
);
