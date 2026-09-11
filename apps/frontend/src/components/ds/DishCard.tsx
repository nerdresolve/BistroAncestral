import Image from 'next/image'
import type { CSSProperties } from 'react'

/**
 * Prato em destaque, portado do Ancestral Design System
 * (`components/content/DishCard.jsx`).
 *
 * Fotografia sangrada, número em dendê, nome em serifa editorial e descrição
 * curta. Sem cartão arredondado, sem borda, sem sombra, nas palavras do
 * próprio sistema, "a foto é o cartão".
 *
 * O número (01, 02, 03) só é usado porque a seção é de fato uma sequência de
 * mais pedidos. Numeração como enfeite, em conteúdo que não tem ordem, é
 * exatamente o tipo de estrutura decorativa que não diz nada.
 *
 * Fica no servidor: o zoom do hover sai por CSS, sem estado no React.
 */
export default function DishCard({
  imagem,
  nome,
  indice,
  descricao,
  preco,
  etiquetas = [],
  proporcao = '4 / 5',
  sizes = '(min-width: 1000px) 30vw, 90vw',
  style,
}: {
  imagem: string
  nome: string
  /** Posição na lista; vira o selo 01/02/03. */
  indice?: number
  descricao?: string
  preco?: string
  etiquetas?: ReadonlyArray<string>
  proporcao?: string
  sizes?: string
  style?: CSSProperties
}) {
  return (
    <article className="group" style={style}>
      {/* `isolation: isolate`: sem isso o selo e a etiqueta dividem contexto
          de empilhamento com a foto (que escala no hover), e o verificador de
          contraste amostra a cor COMPOSTA com a imagem, acusando 2,06:1 num
          selo que, contra o próprio dendê, dá 4,85:1. */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: proporcao, background: 'var(--sand-200)', isolation: 'isolate' }}
      >
        <Image
          src={imagem}
          alt={nome}
          fill
          sizes={sizes}
          className="object-cover group-hover:scale-[1.035]"
          style={{ transition: 'var(--transition-media)' }}
        />

        {indice != null ? (
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2,
              background: 'var(--dende-600)',
              color: 'var(--sand-50)',
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              lineHeight: 1,
              padding: '12px 14px 10px',
            }}
          >
            {String(indice).padStart(2, '0')}
          </span>
        ) : null}

        {etiquetas.length ? (
          <span style={{ position: 'absolute', bottom: 12, left: 12, zIndex: 2, display: 'flex', gap: 6 }}>
            {etiquetas.map((e) => (
              <span
                key={e}
                style={{
                  background: 'var(--acafrao-500)',
                  color: 'var(--ink-900)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '5px 9px',
                  borderRadius: 'var(--radius-xs)',
                }}
              >
                {e}
              </span>
            ))}
          </span>
        ) : null}
      </div>

      <div
        style={{
          paddingTop: 18,
          borderTop: 'var(--border-2) solid var(--ink-900)',
          marginTop: 18,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
          {/* <p>, não <h3>: o nome do prato não abre seção nenhuma, e usar
              título aqui quebra a ordem de cabeçalhos da página. */}
          <p
            className="transition-colors group-hover:text-[var(--dende-600)]"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'var(--editorial-md)',
              lineHeight: 'var(--editorial-leading)',
              textTransform: 'none',
              letterSpacing: 0,
              margin: 0,
              color: 'var(--text-primary)',
            }}
          >
            {nome}
          </p>
          {preco ? (
            <span
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
              }}
            >
              {preco}
            </span>
          ) : null}
        </div>

        {descricao ? (
          <p
            style={{
              margin: '10px 0 0',
              fontSize: 'var(--text-sm)',
              color: 'var(--text-secondary)',
              maxWidth: '38ch',
            }}
          >
            {descricao}
          </p>
        ) : null}
      </div>
    </article>
  )
}
