# --- стадия 1: сборка ---
FROM node:22-alpine AS build

WORKDIR /app

# сначала только манифест — слой с зависимостями кэшируется между сборками
COPY package.json ./
RUN npm install --no-audit --no-fund --legacy-peer-deps

COPY . .
RUN npm run build

# --- стадия 2: раздача ---
# В итоговый образ попадает только собранная статика:
# ни node_modules, ни исходников, ни тулчейна — единицы мегабайт.
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
