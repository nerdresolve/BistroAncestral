# Bistrô Ancestral, imagem de produção.
#
# Três estágios para a imagem final não carregar nem o código-fonte nem as
# dependências de build: o que sobe é o bundle `standalone` que o Next gera,
# que já traz apenas os módulos que o servidor realmente carrega em runtime.

# ---------- deps ----------
FROM node:24-alpine AS deps
WORKDIR /app
# Só o manifesto: assim esta camada só se refaz quando uma dependência muda,
# e não a cada alteração de código.
COPY apps/frontend/package.json apps/frontend/package-lock.json* ./
RUN npm ci

# ---------- build ----------
FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY apps/frontend/ ./
# A URL pública entra no build: o canonical, o sitemap e o JSON-LD são
# gerados em tempo de compilação e precisam do domínio definitivo.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GTM_ID
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------- runtime ----------
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Usuário sem privilégio: o processo do site não precisa de root.
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# O standalone traz o servidor e suas dependências; `static` e `public`
# ficam de fora do bundle e entram à parte.
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# Healthcheck sem curl (não existe na alpine do node): o próprio node faz a
# requisição. É o que o compose usa para saber quando o site está de pé.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
