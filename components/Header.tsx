
import React from 'react';
import { UserRole } from '../App';

interface HeaderProps {
  setRole: (role: UserRole) => void;
}

const Header: React.FC<HeaderProps> = ({ setRole }) => {
  const TG_LINK = "https://t.me/chitcod_ru";

  return (
    <header className="sticky top-0 z-[100] bg-brand-purple/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* ENHANCED LOGO STYLE - NON CLICKABLE */}
        <div className="flex items-center select-none">
          <div className="flex items-center text-brand-acid font-black text-4xl tracking-tighter uppercase">
            <span>ЧИТК</span>
            <span className="inline-block mx-[-2px] translate-y-[-1px] transition-all duration-700 ease-in-out hover:rotate-[360deg] hover:scale-125 cursor-pointer origin-center">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="3.8" />
                <rect x="10.5" y="0.5" width="3" height="6" rx="1" transform="rotate(45 12 12)" />
                <rect x="10.5" y="0.5" width="3" height="6" rx="1" transform="rotate(135 12 12)" />
                <rect x="10.5" y="0.5" width="3" height="6" rx="1" transform="rotate(225 12 12)" />
                <rect x="10.5" y="0.5" width="3" height="6" rx="1" transform="rotate(315 12 12)" />
              </svg>
            </span>
            <span>Д</span>
          </div>
        </div>
        
        {/* NAV LINKS - CONVERTED TO SPANS (NON CLICKABLE) */}
        <nav className="hidden lg:flex items-center gap-10 text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] cursor-default select-none">
          <span>технология</span>
          <span>безопасность</span>
          <span>агентствам</span>
          <span>бизнес</span>
        </nav>

        <div className="flex items-center gap-4">
           <a 
            href={TG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-2.5 bg-white text-brand-purple text-xs font-black rounded-full hover:bg-brand-acid hover:text-black transition-all uppercase shadow-lg shadow-black/10 active:scale-95"
           >
             Связаться
           </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
