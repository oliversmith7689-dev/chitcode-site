import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { TG_LINK } from '../lib/constants';

const NAV = [
  { href: '#technology', label: 'Технология' },
  { href: '#security', label: 'Безопасность' },
  { href: '#agencies', label: 'Агентствам' },
  { href: '#business', label: 'Бизнес' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-[100] transition-colors duration-300 ${scrolled ? 'bg-brand-purple/85 backdrop-blur-xl border-b border-white/10' : 'bg-brand-purple'}`}>
      <div className="container-x h-[72px] flex items-center justify-between gap-6">
        <a href="#top" className="group text-brand-acid text-[28px] sm:text-[32px]" aria-label="ЧИТКОД — наверх">
          <Logo markSize={30} />
        </a>

        <nav className="hidden lg:flex items-center gap-9 text-[13px] font-medium text-white/60">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className="hover:text-white transition-colors">{n.label}</a>
          ))}
        </nav>

        <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-md btn-white">
          Связаться
        </a>
      </div>
    </header>
  );
};

export default Header;
