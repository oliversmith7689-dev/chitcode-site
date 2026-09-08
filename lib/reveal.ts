import type { CSSProperties } from 'react';

/**
 * Стиль появления элемента при скролле. Один IntersectionObserver на блок
 * (useInView), а порядок внутри блока задаётся индексом.
 */
export function revealStyle(
  on: boolean,
  i = 0,
  opts: { y?: number; step?: number; delay?: number; duration?: number } = {},
): CSSProperties {
  const { y = 18, step = 90, delay = 0, duration = 600 } = opts;
  const d = delay + i * step;
  return {
    opacity: on ? 1 : 0,
    transform: on ? 'none' : `translateY(${y}px)`,
    transition: `opacity ${duration}ms ease ${d}ms, transform ${duration}ms cubic-bezier(.2,.8,.2,1) ${d}ms`,
  };
}
