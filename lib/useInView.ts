import { useEffect, useRef, useState } from 'react';

/**
 * Один раз становится true, когда элемент заходит во вьюпорт.
 * Порог по площади не используем: высокие блоки могут не набрать процент
 * на невысоком экране и анимация не запустится вообще.
 */
export function useInView<T extends HTMLElement>(rootMargin = '0px 0px -120px 0px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}
