import Image from 'next/image'
import type { CSSProperties } from 'react'

/**
 * Contêiner de fotografia do sistema, portado do Ancestral Design System
 * (`components/content/ImageFrame.jsx`).
 *
 * Corte reto por padrão, "the brand is cut, not rounded" -, com bloco
 * deslocado atrás e legenda opcional. `arch` e `organic` são as duas exceções
 * de raio previstas pelo DS.
 *
 * Diferença em relação ao original: o zoom no hover sai por CSS (`group-hover`)
 * em vez de estado no React, e a foto passa pelo `next/image`. Assim o
 * componente fica no servidor, numa página que recebe anúncio, cada
 * componente que não precisa ir para o cliente é JavaScript que ninguém baixa.
 */

type Corte = 'square' | 'portrait' | 'arch' | 'organic'
type Bloco = 'none' | 'dende' | 'acafrao' | 'folha' | 'ink'

/* `square` e `portrait` passam a acompanhar o canto dos demais blocos
   (cartao de video, botao). Eram angulo reto e, ao lado dos videos ja
   arredondados, as duas familias de "post" nao pareciam do mesmo conjunto.
   `arch` e `organic` sao recortes autorais do DS e ficam como estao. */
const CORTES: Record<Corte, string> = {
  square: 'var(--radius-acao)',
  portrait: 'var(--radius-acao)',
  arch: 'var(--radius-arch)',
  organic: 'var(--radius-organic)',
}

const BLOCOS: Record<Bloco, string | null> = {
  none: null,
  dende: 'var(--dende-500)',
  acafrao: 'var(--acafrao-500)',
  folha: 'var(--folha-500)',
  ink: 'var(--ink-900)',
}

export default function ImageFrame({
  src,
  alt = '',
  corte = 'square',
  proporcao = '4 / 5',
  bloco = 'none',
  legenda,
  zoom = true,
  prioridade = false,
  sizes = '(min-width: 1000px) 45vw, 90vw',
  style,
  className,
}: {
  src: string
  alt?: string
  corte?: Corte
  proporcao?: string
  bloco?: Bloco
  legenda?: string
  zoom?: boolean
  prioridade?: boolean
  sizes?: string
  style?: CSSProperties
  className?: string
}) {
  const corBloco = BLOCOS[bloco]
  const raio = CORTES[corte]

  return (
    <figure className={className} style={{ margin: 0, position: 'relative', ...style }}>
      {corBloco ? (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            transform: 'translate(16px,16px)',
            background: corBloco,
            borderRadius: raio,
          }}
        />
      ) : null}

      <div
        className="group relative overflow-hidden"
        style={{ aspectRatio: proporcao, borderRadius: raio, background: 'var(--sand-200)' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={prioridade}
          className={`object-cover ${zoom ? 'group-hover:scale-[1.035]' : ''}`}
          style={{ transition: 'var(--transition-media)' }}
        />
      </div>

      {legenda ? (
        <figcaption
          style={{
            marginTop: 12,
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            display: 'flex',
            gap: 8,
            alignItems: 'baseline',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              background: 'var(--acafrao-500)',
              flex: 'none',
              transform: 'translateY(-2px)',
            }}
          />
          {legenda}
        </figcaption>
      ) : null}
    </figure>
  )
}
