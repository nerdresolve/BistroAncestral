import type { CSSProperties } from 'react'

/**
 * Faixa horizontal infinita de frases, separadas por ladrilhos da marca.
 * Portada do Ancestral Design System (`components/motion/Marquee.jsx`).
 *
 * É o dispositivo de ritmo do sistema entre seções, lê como a borda de um
 * tecido estampado. Substitui as ondas SVG que este projeto usava antes: o DS
 * separa seções com padrão e marquee, não com curvas.
 *
 * Componente de servidor: a animação é CSS puro (`ds-marquee-track`, definida
 * em `tokens/keyframes.css`), então não precisa de JavaScript no cliente.
 * `aria-hidden` porque é ornamento, o texto se repete e não acrescenta nada
 * a quem usa leitor de tela.
 */

type Tom = 'ink' | 'dende' | 'acafrao' | 'sand'

const TONS: Record<Tom, { bg: string; fg: string }> = {
  ink: { bg: 'var(--surface-ink)', fg: 'var(--sand-50)' },
  dende: { bg: 'var(--surface-dende)', fg: 'var(--sand-50)' },
  acafrao: { bg: 'var(--surface-acafrao)', fg: 'var(--ink-900)' },
  sand: { bg: 'var(--surface-sand-deep)', fg: 'var(--ink-900)' },
}

const PONTOS = ['var(--dende-500)', 'var(--acafrao-500)', 'var(--folha-500)']

export default function Marquee({
  itens,
  velocidade = 34,
  tom = 'ink',
  reverso = false,
  tamanho = 'md',
  style,
}: {
  itens: ReadonlyArray<string>
  /** Segundos por volta completa. */
  velocidade?: number
  tom?: Tom
  reverso?: boolean
  tamanho?: 'md' | 'lg'
  style?: CSSProperties
}) {
  const t = TONS[tom]
  const grande = tamanho === 'lg'
  const seq = itens.length ? itens : ['Bistrô Ancestral']
  // Repete o bastante para a faixa nunca "acabar" antes do laço fechar.
  const volta = [...seq, ...seq, ...seq, ...seq]
  const corrida = [...volta, ...volta]

  return (
    <div
      className="ds-marquee"
      aria-hidden="true"
      style={{
        overflow: 'hidden',
        background: t.bg,
        color: t.fg,
        padding: grande ? '20px 0' : '13px 0',
        ...style,
      }}
    >
      <div
        className="ds-marquee-track"
        style={{
          display: 'flex',
          width: 'max-content',
          animationDuration: `${velocidade}s`,
          animationDirection: reverso ? 'reverse' : 'normal',
        }}
      >
        {corrida.map((texto, i) => (
          <span
            key={`${texto}-${i}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: grande ? 28 : 20,
              paddingRight: grande ? 28 : 20,
              flex: 'none',
            }}
          >
            <span
              style={
                grande
                  ? {
                      fontFamily: 'var(--font-display)',
                      textTransform: 'uppercase',
                      fontSize: 'var(--display-md)',
                      lineHeight: 1,
                      letterSpacing: '-0.01em',
                      whiteSpace: 'nowrap',
                    }
                  : {
                      fontSize: 'var(--label-size)',
                      fontWeight: 'var(--label-weight)' as CSSProperties['fontWeight'],
                      letterSpacing: 'var(--label-tracking)',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }
              }
            >
              {texto}
            </span>
            <span
              style={{
                width: grande ? 14 : 9,
                height: grande ? 14 : 9,
                background: PONTOS[i % 3],
                borderRadius: 'var(--radius-xs)',
                flex: 'none',
              }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
