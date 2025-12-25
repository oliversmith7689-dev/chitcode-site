
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { UserRole } from '../App';

interface ComparisonSectionProps {
  role: UserRole;
}

// Global flag to ensure animation only happens once per page session
let hasGlobalAnimated = false;

const DigitalRainLocal: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
  const [streams, setStreams] = useState<string[]>([]);

  useEffect(() => {
    const chars = "01ABCDEF";
    const generateStream = () => {
      let stream = "";
      for (let i = 0; i < 30; i++) {
        stream += chars.charAt(Math.floor(Math.random() * chars.length)) + "\n";
      }
      return stream;
    };
    setStreams(Array.from({ length: 4 }, () => generateStream()));
  }, []);

  return (
    <div className={`absolute top-0 bottom-0 ${side === 'left' ? '-left-20' : '-right-20'} w-32 pointer-events-none opacity-[0.06] overflow-hidden hidden xl:block select-none`}>
      <div className="flex justify-between h-full">
        {streams.map((content, i) => (
          <div 
            key={i} 
            className="text-[11px] font-mono whitespace-pre leading-[0.8] animate-matrix-fall text-brand-purple"
            style={{ 
              animationDelay: `${i * 2}s`,
              animationDuration: `${12 + Math.random() * 8}s`
            }}
          >
            {content}
          </div>
        ))}
      </div>
    </div>
  );
};

const AnimatedNumber: React.FC<{ value: number, duration?: number }> = ({ value, duration = 1500 }) => {
  const [displayValue, setDisplayValue] = useState(hasGlobalAnimated ? value : 0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const animationStarted = useRef(hasGlobalAnimated);

  useEffect(() => {
    if (animationStarted.current) return;

    const easeOutQuart = (t: number) => 1 - (--t) * t * t * t;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easeOutQuart(progress);
      const currentVal = Math.floor(easedProgress * value);
      
      setDisplayValue(currentVal);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
        hasGlobalAnimated = true;
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animationStarted.current) {
        animationStarted.current = true;
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (nodeRef.current) observer.observe(nodeRef.current);
    
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={nodeRef}>{displayValue.toLocaleString()}</span>;
};

const ComparisonSection: React.FC<ComparisonSectionProps> = ({ role }) => {
  const chartRef2 = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (chartRef2.current) {
      const svg = d3.select(chartRef2.current);
      svg.selectAll('*').remove();
      const width = 350, height = 80;
      const data = [5, 10, 15, 20, 30, 45, 60, 80, 100, 110, 110];
      const x = d3.scaleBand().domain(data.map((_, i) => i.toString())).range([0, width]).padding(0.2);
      const y = d3.scaleLinear().domain([0, 120]).range([height, 0]);
      
      svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (_, i) => x(i.toString()) || 0)
        .attr('y', d => y(d))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d))
        .attr('fill', '#E2FF66')
        .attr('rx', 2)
        .attr('opacity', (_, i) => 0.3 + (i / data.length) * 0.7);
    }
  }, []);

  const StatRow = ({ label, value, percentage, isAcid }: { label: string, value: number, percentage: string, isAcid?: boolean }) => (
    <div className="mb-8 last:mb-0">
      <p className={`${isAcid ? 'text-white/40' : 'text-black/30'} text-[10px] font-bold uppercase tracking-widest mb-1`}>
        {label}
      </p>
      <div className="flex items-center gap-4">
        <p className={`text-4xl font-bold tracking-tight min-w-[120px] ${isAcid ? 'text-white' : 'text-black'}`}>
          <AnimatedNumber value={value} />
        </p>
        <div className="flex-1 flex items-center gap-4">
          <div className={`flex-1 h-[6px] rounded-full ${isAcid ? 'bg-white/10' : 'bg-black/5'} relative`}>
            <div 
              className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out ${isAcid ? 'bg-brand-acid shadow-[0_0_10px_rgba(226,255,102,0.4)]' : 'bg-gray-400'}`} 
              style={{ width: percentage }}
            ></div>
          </div>
          <span className={`text-[10px] font-bold w-8 text-right ${isAcid ? 'text-white/30' : 'text-black/20'}`}>{percentage}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-20 relative">
      {/* Aesthetic Matrix Decoration Arrows point here */}
      <DigitalRainLocal side="left" />
      <DigitalRainLocal side="right" />

      <div className="text-center mb-20 relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter text-black">Результат за 24 часа</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto items-stretch relative z-10">
        {/* Left Card: Ordinary */}
        <div className="bg-white p-12 rounded-[48px] border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-[12px] font-bold mb-14 uppercase tracking-[0.2em] text-black/30">Обычный путь</h3>
            <div className="space-y-10">
              <StatRow label="Подписчики" value={3850} percentage="40%" />
              <StatRow label="Просмотры" value={1150} percentage="25%" />
              <StatRow label="Реакции" value={12} percentage="10%" />
            </div>
          </div>
          <div className="mt-20 h-20 border-t border-gray-50 flex items-center opacity-10">
             <div className="w-full h-px bg-black/20"></div>
          </div>
        </div>

        {/* Right Card: Cheat-code */}
        <div className="bg-brand-purple p-12 rounded-[48px] shadow-[0_40px_100px_-20px_rgba(139,77,255,0.3)] flex flex-col justify-between relative overflow-hidden border border-white/5">
          <div>
            <div className="flex justify-between items-start mb-14">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-brand-acid">С чит-кодом</h3>
              <div className="text-right">
                  <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest leading-none">Удержание</p>
                  <p className="text-brand-acid font-black text-xl">98%</p>
              </div>
            </div>
            
            <div className="space-y-10">
              <StatRow label="Подписчики" value={12400} percentage="98%" isAcid />
              <StatRow label="Просмотры" value={4600} percentage="95%" isAcid />
              <StatRow label="Реакции" value={94} percentage="92%" isAcid />
            </div>
          </div>
          
          <div className="mt-16 flex items-end justify-center">
            <svg ref={chartRef2} width="100%" height="80" viewBox="0 0 350 80" preserveAspectRatio="xMidYMax meet"></svg>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes matrix-fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-matrix-fall {
          animation: matrix-fall linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ComparisonSection;
