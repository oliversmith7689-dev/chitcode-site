import { useEffect, useRef, useState } from 'react';

const DEFAULT_ROOT_MARGIN = '0px 0px -120px 0px';

/** rootMargin должен быть в px или %, иначе IntersectionObserver кидает SyntaxError. */
function normalizeRootMargin(value: unknown): string {
  if (typeof value !== 'string') return DEFAULT_ROOT_MARGIN;
  const ok = value.trim().split(/\s+/).every(part => /^-?\d+(\.\d+)?(px|%)$/.test(part));
  return ok ? value : DEFAULT_ROOT_MARGIN;
}

/**
 * Один раз становится true, когда элемент заходит во вьюпорт.
 * Порог по площади не используем: высокие блоки могут не набрать процент
 * на невысоком экране и анимация не запустится вообще.
 */
export function useInView<T extends HTMLElement>(rootMargin: string = DEFAULT_ROOT_MARGIN) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const margin = normalizeRootMargin(rootMargin);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setInView(true); return; }
    let io: IntersectionObserver;
    try {
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setInView(true); io.disconnect(); }
      }, { threshold: 0, rootMargin: margin });
    } catch {
      setInView(true);
      return;
    }
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return { ref, inView };
}
