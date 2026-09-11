import { Anton, Archivo, Instrument_Serif } from 'next/font/google'
import Gtm from '@/components/Gtm'
import JsonLd from '@/components/JsonLd'
import { restaurantSchema, websiteSchema } from '@/lib/schema'
import './globals.css'

/**
 * Casca do layout raiz.
 *
 * Tipografia do Ancestral Design System (`tokens/fonts.css`):
 *   Anton, display, sempre em caixa alta, empilhado em 2 a 4 linhas
 *   Archivo, interface e corpo de texto
 *   Instrument Serif, nomes de prato e citações
 *
 * O DS carrega as três por `@import` do Google Fonts. Aqui elas entram pelo
 * `next/font/google`, que as auto-hospeda: sem requisição a terceiro, sem
 * bloquear a pintura e sem o salto de layout da troca de fonte. Cada uma expõe
 * uma variável CSS, e `globals.css` religa essas variáveis aos nomes que o
 * sistema usa (`--font-display`, `--font-text`, `--font-editorial`).
 *
 * NOTA do próprio DS: o logotipo é letreiramento desenhado à mão e NÃO é
 * fonte licenciada, usar sempre a imagem da marca, nunca redigitar. Por isso
 * o cabeçalho e o rodapé trazem os arquivos de `public/brand/`.
 */
const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--fonte-anton',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  // O DS usa de 400 a 800; a faixa variável cobre tudo num arquivo só.
  weight: ['400', '500', '600', '700', '800'],
  variable: '--fonte-archivo',
  display: 'swap',
})

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--fonte-instrument',
  display: 'swap',
})

export const fontVars = `${anton.variable} ${archivo.variable} ${instrument.variable}`

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fontVars}>
      <body>
        {/* Identidade do restaurante: base do resultado local da busca. */}
        <JsonLd data={[restaurantSchema(), websiteSchema()]} />
        {/* Só carrega após o aceite de cookies. */}
        <Gtm />
        {children}
      </body>
    </html>
  )
}
