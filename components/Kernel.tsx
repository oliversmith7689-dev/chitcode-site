import React, { useEffect, useRef } from 'react';
import { Kernel as KernelRenderer } from '../lib/kernel';

const Kernel: React.FC<{ className?: string }> = ({ className = '' }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const k = new KernelRenderer(ref.current, { reducedMotion });
    k.start();
    return () => k.destroy();
  }, []);
  return (
    <div className={`relative touch-pan-y ${className}`} aria-hidden="true">
      <canvas ref={ref} className="block w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};

export default Kernel;
