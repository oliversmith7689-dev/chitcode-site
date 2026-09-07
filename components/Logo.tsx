import React from 'react';

/** Знак ЧИТКОД: кольцо с четырьмя лучами вместо «О». */
export const Mark: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="3.6" />
    <rect x="10.5" y="0.5" width="3" height="6" rx="1" transform="rotate(45 12 12)" />
    <rect x="10.5" y="0.5" width="3" height="6" rx="1" transform="rotate(135 12 12)" />
    <rect x="10.5" y="0.5" width="3" height="6" rx="1" transform="rotate(225 12 12)" />
    <rect x="10.5" y="0.5" width="3" height="6" rx="1" transform="rotate(315 12 12)" />
  </svg>
);

export const Logo: React.FC<{ className?: string; markSize?: number }> = ({ className = '', markSize = 30 }) => (
  <span className={`inline-flex items-center font-semibold tracking-[-0.05em] select-none ${className}`} aria-label="ЧИТКОД">
    <span>ЧИТК</span>
    <Mark size={markSize} className="-mx-[3px] translate-y-[1px] transition-transform duration-700 ease-out group-hover:rotate-[360deg]" />
    <span>Д</span>
  </span>
);
