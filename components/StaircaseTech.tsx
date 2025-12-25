
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const StaircaseTech: React.FC = () => {
  const TG_LINK = "https://t.me/chitcod_ru";
  const graphRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!graphRef.current) return;

    // Данные для графика (72 часа / точки)
    const points = 72;
    const data = [];
    for (let i = 1; i <= points; i++) {
      let val = 0;
      // Начальный пик (те самые "свечи" повыше)
      if (i === 1) val = 24; 
      else if (i === 2) val = 19;
      else if (i === 3) val = 15;
      else if (i <= 10) val = 12 * Math.exp(-(i - 3) * 0.35);
      else if (i <= 22) {
        // Небольшой "бугор" естественной активности
        const bump = Math.exp(-Math.pow(i - 16, 2) / 10) * 2.2;
        val = 1.8 + bump;
      } else {
        // Длинный хвост
        val = 0.8 + Math.exp(-(i - 22) * 0.04) * 0.6;
      }
      data.push({ hour: i, value: val + (Math.random() * 0.15) });
    }

    const svg = d3.select(graphRef.current);
    svg.selectAll('*').remove();

    const width = 1000;
    const height = 400; // Увеличили высоту контейнера для масштабности
    const padding = { top: 30, right: 20, bottom: 50, left: 40 };

    const x = d3.scaleBand()
      .domain(data.map(d => d.hour.toString()))
      .range([padding.left, width - padding.right])
      .padding(0.25); // Чуть шире зазоры для акцента на отдельных свечах

    const y = d3.scaleLinear()
      .domain([0, 26]) // Расширили диапазон под высокие свечи
      .range([height - padding.bottom, padding.top]);

    // Оси
    const xAxis = d3.axisBottom(x)
      .tickValues(data.filter(d => d.hour % 10 === 0 || d.hour === 1 || d.hour === 72).map(d => d.hour.toString()));

    svg.append('g')
      .attr('transform', `translate(0, ${height - padding.bottom})`)
      .attr('class', 'axis text-[10px] font-mono opacity-20')
      .call(xAxis)
      .selectAll('path, line').attr('stroke', '#000');

    // Бары (Свечи)
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.hour.toString()) || 0)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => (height - padding.bottom) - y(d.value))
      .attr('fill', '#000')
      .attr('rx', 1.5) // Слегка скругленные для премиальности
      .attr('opacity', (d) => 0.3 + (d.value / 26) * 0.7);

    // Добавим тонкую линию "потолка" для визуального контроля (как на наброске пользователя)
    svg.append('line')
      .attr('x1', padding.left)
      .attr('x2', width - padding.right)
      .attr('y1', y(24))
      .attr('y2', y(24))
      .attr('stroke', '#000')
      .attr('stroke-width', 0.5)
      .attr('stroke-dasharray', '4 4')
      .attr('opacity', 0.1);

  }, []);

  return (
    <div className="space-y-24">
      {/* Top Banner Part with Graph */}
      <div className="relative rounded-[60px] overflow-hidden bg-[#F7FF8C] py-24 px-6 border border-black/5 shadow-inner">
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tighter text-black leading-none">
            Технология «Лесенки»
          </h2>
          <p className="text-black/50 font-bold uppercase tracking-[0.4em] text-[10px] mb-16">
            Распределение активности (72 часа)
          </p>

          <div className="w-full overflow-x-auto mb-16 no-scrollbar">
            <svg 
              ref={graphRef} 
              width="1000" 
              height="400" 
              viewBox="0 0 1000 400" 
              className="mx-auto drop-shadow-2xl"
            ></svg>
          </div>

          <a 
            href={TG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-14 py-5 bg-black text-[#F7FF8C] rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all active:scale-95"
          >
            Активировать ЧИТКОД
          </a>
        </div>
      </div>

      {/* Grid Part (Three Pillars) */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-20 uppercase tracking-tighter max-w-3xl leading-[0.85]">
          Три столпа <br/> алгоритмического превосходства
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#F4F4F4] p-12 rounded-[50px] flex flex-col justify-between min-h-[380px] hover:shadow-2xl transition-all border border-transparent hover:border-brand-purple/20 group">
            <div>
              <div className="w-12 h-12 bg-brand-purple/10 rounded-2xl flex items-center justify-center text-brand-purple font-bold mb-10 group-hover:rotate-12 transition-transform">01</div>
              <h3 className="text-3xl font-bold text-brand-purple mb-6 lowercase tracking-tighter">динамика</h3>
              <p className="text-gray-600 font-medium leading-relaxed text-lg">
                Математически выверенное затухание охвата. Мы имитируем спад интереса аудитории в течение 72 часов, как у лучших виральных постов.
              </p>
            </div>
            <div className="mt-8 text-brand-purple/40 font-bold text-xs flex items-center gap-2 uppercase tracking-widest cursor-default select-none">
              Спецификация <span>→</span>
            </div>
          </div>

          <div className="bg-[#F7FF8C] p-12 rounded-[50px] flex flex-col justify-between min-h-[380px] hover:shadow-2xl transition-all border border-transparent hover:border-black/10 group">
            <div>
              <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-black font-bold mb-10 group-hover:rotate-12 transition-transform">02</div>
              <h3 className="text-3xl font-bold text-black mb-6 lowercase tracking-tighter">паттерны</h3>
              <p className="text-black/70 font-medium leading-relaxed text-lg">
                Учет часовых поясов и пиков активности. Алгоритм подстраивается под график вашего канала, создавая эффект живого присутствия.
              </p>
            </div>
            <div className="mt-8 text-black/40 font-bold text-xs flex items-center gap-2 uppercase tracking-widest cursor-default select-none">
              Спецификация <span>→</span>
            </div>
          </div>

          <div className="bg-[#FFE2FF] p-12 rounded-[50px] flex flex-col justify-between min-h-[380px] hover:shadow-2xl transition-all border border-transparent hover:border-[#FF33FF]/20 group">
            <div>
              <div className="w-12 h-12 bg-[#FF33FF]/10 rounded-2xl flex items-center justify-center text-[#FF33FF] font-bold mb-10 group-hover:rotate-12 transition-transform">03</div>
              <h3 className="text-3xl font-bold text-[#FF33FF] mb-6 lowercase tracking-tighter">невидимость</h3>
              <p className="text-[#FF33FF]/70 font-medium leading-relaxed text-lg">
                Полная имитация дочитываний и реакций. Ни один сервис аналитики не увидит аномалий в поведении — только чистый рост.
              </p>
            </div>
            <div className="mt-8 text-[#FF33FF]/40 font-bold text-xs flex items-center gap-2 uppercase tracking-widest cursor-default select-none">
              Спецификация <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaircaseTech;
