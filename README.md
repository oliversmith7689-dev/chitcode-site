# ЧИТКОД — сайт

Лендинг сервиса управляемой накрутки поведенческих факторов для Telegram-каналов.

## Стек
- Vite 6 + React 19 + TypeScript
- Tailwind CSS 3 (токены в `tailwind.config.js`), tailwindcss-animate
- Шрифт Geist (variable) через `@fontsource-variable/geist`
- Графики — чистый SVG, 3D-ядро в hero — Canvas 2D (`lib/kernel.ts`), без зависимостей

## Запуск
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # сборка в dist/
```

## Структура
- `App.tsx` — порядок секций, модалки, футер
- `components/` — секции страницы
- `lib/constants.ts` — ссылки и типы
- `lib/kernel.ts` — 3D-логотип
- `index.css` — базовые стили и кнопки
