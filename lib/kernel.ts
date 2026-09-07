/**
 * «Ядро» — трёхмерный логотип ЧИТКОД (кольцо + четыре луча),
 * отрисованный на Canvas 2D собственным проектором. Без зависимостей.
 * Реагирует на курсор, свайп, тап и наклон телефона.
 */

type V3 = [number, number, number];
type Seg = { a: V3; b: V3; kind: 'ring' | 'bar' | 'orbit' | 'edge' };
type Face = V3[];
type Dot = { p: V3; r: number };

const TAU = Math.PI * 2;

function circle(radius: number, n: number, axis: 'x' | 'y' | 'z', offset: V3 = [0, 0, 0]): V3[] {
  const pts: V3[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * TAU;
    const c = Math.cos(t) * radius, s = Math.sin(t) * radius;
    const p: V3 = axis === 'z' ? [c, s, 0] : axis === 'y' ? [c, 0, s] : [0, c, s];
    pts.push([p[0] + offset[0], p[1] + offset[1], p[2] + offset[2]]);
  }
  return pts;
}

function buildGeometry() {
  const segs: Seg[] = [];
  const faces: Face[] = [];
  const R = 1.0, r = 0.3;

  // Тор: меридианы
  const meridians = 12, tubeN = 16;
  for (let i = 0; i < meridians; i++) {
    const t = (i / meridians) * TAU;
    const ring: V3[] = [];
    for (let j = 0; j < tubeN; j++) {
      const u = (j / tubeN) * TAU;
      const rr = R + Math.cos(u) * r;
      ring.push([Math.cos(t) * rr, Math.sin(t) * rr, Math.sin(u) * r]);
    }
    for (let j = 0; j < tubeN; j++) segs.push({ a: ring[j], b: ring[(j + 1) % tubeN], kind: 'ring' });
  }
  // Тор: параллели
  const parallels = 10, majorN = 64;
  for (let j = 0; j < parallels; j++) {
    const u = (j / parallels) * TAU;
    const rr = R + Math.cos(u) * r, z = Math.sin(u) * r;
    const loop: V3[] = [];
    for (let i = 0; i < majorN; i++) {
      const t = (i / majorN) * TAU;
      loop.push([Math.cos(t) * rr, Math.sin(t) * rr, z]);
    }
    const accent = j === 0 || j === parallels / 2; // внешний и внутренний контур кольца
    for (let i = 0; i < majorN; i++) segs.push({ a: loop[i], b: loop[(i + 1) % majorN], kind: accent ? 'edge' : 'ring' });
  }

  // Четыре луча (как в логотипе): бруски от 1.5 до 2.15 по диагоналям
  const inner = 1.5, outer = 2.15, half = 0.13;
  for (let k = 0; k < 4; k++) {
    const t = Math.PI / 4 + (k * Math.PI) / 2;
    const dx = Math.cos(t), dy = Math.sin(t);
    const px = -dy, py = dx; // перпендикуляр в плоскости
    const corners = (d: number): V3[] => [
      [dx * d + px * half, dy * d + py * half, half],
      [dx * d - px * half, dy * d - py * half, half],
      [dx * d - px * half, dy * d - py * half, -half],
      [dx * d + px * half, dy * d + py * half, -half],
    ];
    const A = corners(inner), B = corners(outer);
    faces.push(A, B);
    for (let i = 0; i < 4; i++) faces.push([A[i], A[(i + 1) % 4], B[(i + 1) % 4], B[i]]);
    for (let i = 0; i < 4; i++) {
      segs.push({ a: A[i], b: A[(i + 1) % 4], kind: 'bar' });
      segs.push({ a: B[i], b: B[(i + 1) % 4], kind: 'bar' });
      segs.push({ a: A[i], b: B[i], kind: 'bar' });
    }
  }

  // Орбита
  const orbit = circle(2.7, 72, 'z');
  for (let i = 0; i < orbit.length; i += 2) segs.push({ a: orbit[i], b: orbit[(i + 1) % orbit.length], kind: 'orbit' });

  // Частицы на сфере
  const dots: Dot[] = [];
  const n = 110;
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = i * 2.399963; // золотой угол
    const s = 3.1;
    dots.push({ p: [Math.cos(th) * rad * s, y * s, Math.sin(th) * rad * s], r: 0.6 + ((i * 7) % 5) * 0.25 });
  }
  return { segs, dots, faces };
}

function rotX(p: V3, a: number): V3 { const c = Math.cos(a), s = Math.sin(a); return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c]; }
function rotY(p: V3, a: number): V3 { const c = Math.cos(a), s = Math.sin(a); return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c]; }
function rotZ(p: V3, a: number): V3 { const c = Math.cos(a), s = Math.sin(a); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]]; }

export type KernelOptions = { reducedMotion?: boolean };

export class Kernel {
  private ctx: CanvasRenderingContext2D;
  private geo = buildGeometry();
  private raf = 0;
  private running = false;
  private w = 0; private h = 0; private dpr = 1;
  private t0 = performance.now();

  // ориентация
  private rx = -0.35; private ry = 0.4; private rz = 0.08;
  private vx = 0; private vy = 0;               // инерция от свайпа
  private tx = 0; private ty = 0;               // цель от курсора/наклона
  private px = 0; private py = 0;               // текущее смещение от курсора
  private pulse = 0;                            // тап
  private bursts: { t: number }[] = [];
  private dragging = false; private lastX = 0; private lastY = 0; private moved = 0;
  private visible = true;
  private ro?: ResizeObserver; private io?: IntersectionObserver;
  private reduced: boolean;

  constructor(private canvas: HTMLCanvasElement, opts: KernelOptions = {}) {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) throw new Error('2d context unavailable');
    this.ctx = ctx;
    this.reduced = !!opts.reducedMotion;
    this.resize();
    this.bind();
  }

  private bind() {
    const c = this.canvas;
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(c.parentElement ?? c);
    this.io = new IntersectionObserver(([e]) => { this.visible = e.isIntersecting; if (this.visible) this.start(); }, { threshold: 0.05 });
    this.io.observe(c);

    const host = c.parentElement ?? c;
    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (this.dragging) {
        const dx = e.clientX - this.lastX, dy = e.clientY - this.lastY;
        this.lastX = e.clientX; this.lastY = e.clientY;
        this.vy += dx * 0.0025; this.vx += dy * 0.0025;
        this.moved += Math.abs(dx) + Math.abs(dy);
      } else if (e.pointerType === 'mouse') {
        this.tx = Math.max(-1, Math.min(1, nx)) * 0.55;
        this.ty = Math.max(-1, Math.min(1, ny)) * 0.4;
      }
    };
    const onDown = (e: PointerEvent) => {
      this.dragging = true; this.moved = 0; this.lastX = e.clientX; this.lastY = e.clientY;
      c.setPointerCapture?.(e.pointerId);
    };
    const onUp = () => {
      if (this.dragging && this.moved < 6) this.tap();
      this.dragging = false;
    };
    const onLeave = () => { if (!this.dragging) { this.tx = 0; this.ty = 0; } };

    // Слушаем движение на всей странице (объект фоновый, мышь бывает над текстом)
    window.addEventListener('pointermove', onMove, { passive: true });
    c.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    host.addEventListener('pointerleave', onLeave);

    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      this.tx = Math.max(-1, Math.min(1, e.gamma / 35)) * 0.5;
      this.ty = Math.max(-1, Math.min(1, (e.beta - 45) / 35)) * 0.35;
    };
    if ('DeviceOrientationEvent' in window && !(window as any).DeviceOrientationEvent?.requestPermission) {
      window.addEventListener('deviceorientation', onOrient, { passive: true });
    }
    const onVis = () => { if (document.hidden) this.stop(); else this.start(); };
    document.addEventListener('visibilitychange', onVis);

    this.unbind = () => {
      window.removeEventListener('pointermove', onMove);
      c.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      host.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('deviceorientation', onOrient);
      document.removeEventListener('visibilitychange', onVis);
      this.ro?.disconnect(); this.io?.disconnect();
    };
  }
  private unbind: () => void = () => {};

  tap() { this.pulse = 1; this.bursts.push({ t: performance.now() }); this.vy += 0.06; }

  private resize() {
    const host = this.canvas.parentElement ?? this.canvas;
    const rect = host.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = Math.max(1, rect.width); this.h = Math.max(1, rect.height);
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.canvas.style.width = `${this.w}px`; this.canvas.style.height = `${this.h}px`;
    if (this.reduced) this.frame(performance.now());
  }

  start() {
    if (this.running || this.reduced) { if (this.reduced) this.frame(performance.now()); return; }
    this.running = true;
    const loop = (t: number) => { if (!this.running) return; this.frame(t); this.raf = requestAnimationFrame(loop); };
    this.raf = requestAnimationFrame(loop);
  }
  stop() { this.running = false; cancelAnimationFrame(this.raf); }
  destroy() { this.stop(); this.unbind(); }

  private frame(now: number) {
    const ctx = this.ctx, w = this.w, h = this.h, dpr = this.dpr;
    const t = (now - this.t0) / 1000;

    // динамика
    if (!this.reduced) {
      this.px += (this.tx - this.px) * 0.06;
      this.py += (this.ty - this.py) * 0.06;
      this.ry += 0.0028 + this.vy; this.rx += this.vx;
      this.vy *= 0.94; this.vx *= 0.94;
      this.pulse *= 0.9;
    }
    const scaleBase = Math.min(w, h) / 6.6;
    const scale = scaleBase * (1 + this.pulse * 0.08);
    const cam = 7.5;
    const ax = this.rx + this.py + Math.sin(t * 0.5) * 0.06;
    const ay = this.ry + this.px;
    const az = this.rz + Math.sin(t * 0.33) * 0.05;

    const proj = (p: V3): [number, number, number] => {
      let q = rotZ(p, az); q = rotX(q, ax); q = rotY(q, ay);
      const z = q[2];
      const f = cam / (cam - z);
      return [w / 2 + q[0] * f * scale, h / 2 + q[1] * f * scale, z];
    };

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = 'round';

    // мягкое свечение
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, scale * 3.4);
    g.addColorStop(0, 'rgba(226,255,102,0.10)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.03)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

    // бёрсты от тапа
    this.bursts = this.bursts.filter(b => now - b.t < 900);
    for (const b of this.bursts) {
      const k = (now - b.t) / 900;
      ctx.beginPath(); ctx.arc(w / 2, h / 2, scale * (1.6 + k * 2.6), 0, TAU);
      ctx.strokeStyle = `rgba(226,255,102,${(1 - k) * 0.5})`; ctx.lineWidth = 1.5 * (1 - k) + 0.3; ctx.stroke();
    }

    // частицы
    const dotRot = t * 0.05;
    for (const d of this.geo.dots) {
      const [x, y, z] = proj(rotY(d.p, dotRot));
      const a = 0.12 + ((z + 3.1) / 6.2) * 0.55;
      ctx.beginPath(); ctx.arc(x, y, d.r * (0.6 + (z + 3.1) / 6.2), 0, TAU);
      ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fill();
    }

    // грани брусков — полупрозрачные, дальние тусклее
    const facesP = this.geo.faces.map(f => {
      const pts = f.map(proj);
      const z = pts.reduce((acc, p) => acc + p[2], 0) / pts.length;
      return { pts, z };
    }).sort((p, q) => p.z - q.z);
    for (const f of facesP) {
      const k = (f.z + 2.7) / 5.4;
      ctx.beginPath(); ctx.moveTo(f.pts[0][0], f.pts[0][1]);
      for (let i = 1; i < f.pts.length; i++) ctx.lineTo(f.pts[i][0], f.pts[i][1]);
      ctx.closePath();
      ctx.fillStyle = `rgba(255,255,255,${0.04 + k * 0.2})`; ctx.fill();
    }

    // сегменты: сортируем по глубине
    const projected = this.geo.segs.map(s => {
      const a = proj(s.a), b = proj(s.b);
      return { a, b, z: (a[2] + b[2]) / 2, kind: s.kind };
    }).sort((p, q) => p.z - q.z);

    for (const s of projected) {
      const k = (s.z + 2.7) / 5.4; // 0 дальний — 1 ближний
      let alpha: number, width: number, color: string;
      if (s.kind === 'orbit') { alpha = 0.10 + k * 0.25; width = 0.8; color = `rgba(255,255,255,${alpha})`; }
      else if (s.kind === 'edge') {
        alpha = 0.3 + k * 0.7; width = 1.4 + k * 1.6;
        const mix = Math.max(0, (k - 0.35) / 0.65);
        const r = Math.round(255 - (255 - 226) * mix), bl = Math.round(255 - (255 - 102) * mix);
        color = `rgba(${r},255,${bl},${alpha})`;
      }
      else if (s.kind === 'bar') {
        alpha = 0.35 + k * 0.65; width = 1 + k * 1.4;
        // ближние грани — кислотные
        const mix = Math.max(0, (k - 0.55) / 0.45);
        const r = Math.round(255 - (255 - 226) * mix), gg = 255, bl = Math.round(255 - (255 - 102) * mix);
        color = `rgba(${r},${gg},${bl},${alpha})`;
      } else {
        alpha = 0.08 + k * 0.55; width = 0.6 + k * 0.9;
        const mix = Math.max(0, (k - 0.75) / 0.25);
        const r = Math.round(255 - (255 - 226) * mix), bl = Math.round(255 - (255 - 102) * mix);
        color = `rgba(${r},255,${bl},${alpha})`;
      }
      ctx.beginPath(); ctx.moveTo(s.a[0], s.a[1]); ctx.lineTo(s.b[0], s.b[1]);
      ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
    }

    // ядро — маленький кислотный квадрат в центре (как в логотипе)
    const [cx, cy] = proj([0, 0, 0]);
    const sq = scale * 0.16 * (1 + this.pulse * 0.6);
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(ay * 0.5);
    ctx.fillStyle = 'rgba(226,255,102,0.95)';
    ctx.shadowColor = 'rgba(226,255,102,0.8)'; ctx.shadowBlur = 24;
    ctx.fillRect(-sq / 2, -sq / 2, sq, sq);
    ctx.restore();
  }
}
