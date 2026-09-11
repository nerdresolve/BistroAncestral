/**
 * Lighthouse nas quatro telas, mobile e desktop.
 *
 * Roda sempre contra o build de PRODUÇÃO (`next build` + `next start`): o modo
 * dev injeta HMR, sourcemaps e overlays que derrubam o desempenho e não
 * representam o que o visitante recebe.
 *
 * Uso: npx tsx scripts/lighthouse.ts [baseUrl] [--mobile|--desktop] [rota ...]
 */
import { launch } from 'chrome-launcher'
import lighthouse, { type Flags } from 'lighthouse'

type Categoria = 'performance' | 'accessibility' | 'best-practices' | 'seo'

const args = process.argv.slice(2)
const BASE = args.find((a) => a.startsWith('http')) ?? 'http://localhost:3210'
const soMobile = args.includes('--mobile')
const soDesktop = args.includes('--desktop')
const rotasArg = args.filter((a) => a.startsWith('/'))

const PAGINAS = rotasArg.length
  ? rotasArg
  : ['/', '/cardapio', '/nossa-historia', '/como-chegar', '/links', '/politica-de-privacidade']

/* Desempenho aceita 96; as demais categorias têm que bater 100. */
const METAS: Record<Categoria, number> = {
  performance: 96,
  accessibility: 100,
  'best-practices': 100,
  seo: 100,
}

/** Desktop precisa de override explícito; o padrão do Lighthouse é mobile. */
const CFG_DESKTOP = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'desktop' as const,
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
    throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 },
  },
}

type Linha = { perfil: string; rota: string } & Record<Categoria, number>

async function main() {
  const chrome = await launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
  })
  const perfis = soMobile ? ['mobile'] : soDesktop ? ['desktop'] : ['mobile', 'desktop']
  const linhas: Linha[] = []
  const problemas = new Map<
    string,
    { cat: string; id: string; titulo: string; rotas: string[]; peso: number; exemplo: string }
  >()

  for (const perfil of perfis) {
    console.log(`\n-- ${perfil} --`)
    for (const rota of PAGINAS) {
      const flags = { port: chrome.port, output: 'json', logLevel: 'error' } as Flags
      const r = await lighthouse(
        BASE + rota,
        flags,
        perfil === 'desktop' ? CFG_DESKTOP : undefined,
      )
      if (!r) {
        console.log(`  ${rota}, sem resultado`)
        continue
      }

      const c = r.lhr.categories
      const notas = Object.fromEntries(
        (Object.keys(METAS) as Categoria[]).map((k) => [
          k,
          Math.round((c[k]?.score ?? 0) * 100),
        ]),
      ) as Record<Categoria, number>

      const falhou = (Object.entries(METAS) as [Categoria, number][]).filter(
        ([k, min]) => notas[k] < min,
      )
      console.log(
        `  ${falhou.length ? 'X ' : 'OK'} ${rota.padEnd(22)} perf=${notas.performance} a11y=${notas.accessibility} bp=${notas['best-practices']} seo=${notas.seo}`,
      )
      linhas.push({ perfil, rota, ...notas })

      // Junta as auditorias reprovadas, com o peso que cada uma custa.
      for (const [cat] of falhou) {
        for (const ref of c[cat].auditRefs) {
          const a = r.lhr.audits[ref.id]
          if (!a || a.score === null || a.score >= 0.9) continue
          const chave = `${cat}|${a.id}`
          const at = problemas.get(chave) ?? {
            cat,
            id: a.id,
            titulo: a.title,
            rotas: [],
            peso: 0,
            exemplo: '',
          }
          at.rotas.push(`${perfil}${rota}`)
          at.peso += (ref.weight ?? 0) * (1 - a.score)
          if (!at.exemplo && a.displayValue) at.exemplo = String(a.displayValue)
          problemas.set(chave, at)
        }
      }
    }
  }

  await chrome.kill()

  console.log(`\n${'='.repeat(62)}`)
  for (const k of Object.keys(METAS) as Categoria[]) {
    const vals = linhas.map((l) => l[k])
    const abaixo = linhas.filter((l) => l[k] < METAS[k]).length
    console.log(
      `${k.padEnd(15)} min=${String(Math.min(...vals)).padStart(3)} meta=${METAS[k]}  ${abaixo ? `${abaixo} abaixo` : 'todas ok'}`,
    )
  }

  const ord = [...problemas.values()].sort((a, b) => b.peso - a.peso)
  if (ord.length) {
    console.log('\n--- auditorias a corrigir (por impacto) ---')
    for (const p of ord.slice(0, 14)) {
      console.log(`  [${p.cat}] ${p.id}, ${p.titulo.slice(0, 58)}`)
      console.log(`      peso=${p.peso.toFixed(1)} em ${p.rotas.length} páginas ${p.exemplo ? `· ${p.exemplo}` : ''}`)
    }
  }

  const falhas = linhas.filter((l) =>
    (Object.keys(METAS) as Categoria[]).some((k) => l[k] < METAS[k]),
  ).length
  console.log(`\n${linhas.length - falhas}/${linhas.length} execuções dentro da meta`)
  process.exit(falhas ? 1 : 0)
}

main()
