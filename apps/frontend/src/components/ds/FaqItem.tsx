'use client'

import { useId, useState, type CSSProperties, type ReactNode } from 'react'
import Icon from './Icon'

/**
 * Uma pergunta do FAQ, portada do Ancestral Design System
 * (`components/content/FaqItem.jsx`). Só filetes, sem cartão, sem
 * arredondamento.
 *
 * Acréscimo desta aplicação: `aria-controls` e `role="region"` ligando o
 * botão ao painel, que o componente original não trazia. Sem isso o leitor de
 * tela anuncia que algo expandiu, mas não diz o quê.
 */
export default function FaqItem({
  pergunta,
  children,
  abertoInicial = false,
  style,
}: {
  pergunta: string
  children: ReactNode
  abertoInicial?: boolean
  style?: CSSProperties
}) {
  const [aberto, setAberto] = useState(abertoInicial)
  const id = useId()
  const idBotao = `${id}-b`
  const idPainel = `${id}-p`

  return (
    <div style={{ borderBottom: 'var(--border-1) solid var(--ink-900)', ...style }}>
      <h3 style={{ margin: 0 }}>
        <button
          type="button"
          id={idBotao}
          onClick={() => setAberto((o) => !o)}
          aria-expanded={aberto}
          aria-controls={idPainel}
          style={{
            all: 'unset',
            display: 'flex',
            width: '100%',
            gap: 24,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '26px 0',
            cursor: 'pointer',
            fontFamily: 'var(--font-text)',
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            textTransform: 'none',
            letterSpacing: 0,
            lineHeight: 'var(--text-leading-tight)',
            color: 'var(--text-primary)',
            boxSizing: 'border-box',
          }}
        >
          <span>{pergunta}</span>
          <span
            aria-hidden="true"
            style={{
              width: 34,
              height: 34,
              flex: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: aberto ? 'var(--dende-500)' : 'transparent',
              color: aberto ? 'var(--sand-50)' : 'var(--ink-900)',
              border: 'var(--border-1) solid var(--ink-900)',
              borderRadius: 'var(--radius-sm)',
              transition: 'var(--transition-action)',
            }}
          >
            <Icon name={aberto ? 'minus' : 'plus'} size={16} stroke={2.5} />
          </span>
        </button>
      </h3>
      <div
        id={idPainel}
        role="region"
        aria-labelledby={idBotao}
        hidden={!aberto}
        style={{
          paddingBottom: 28,
          maxWidth: 'var(--measure)',
          color: 'var(--text-secondary)',
          fontSize: 'var(--text-md)',
          lineHeight: 'var(--text-leading-loose)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
