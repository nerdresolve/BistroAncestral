'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'

/**
 * Chip de filtro selecionável, portado do Ancestral Design System
 * (`components/core/Tag.jsx`). Categorias do cardápio.
 */
export default function Tag({
  children,
  selecionado = false,
  onClick,
  style,
}: {
  children: ReactNode
  selecionado?: boolean
  onClick?: () => void
  style?: CSSProperties
}) {
  const [hover, setHover] = useState(false)
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selecionado}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-text)',
        fontSize: 'var(--text-sm)',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        lineHeight: 1,
        padding: '11px 18px',
        background: selecionado ? 'var(--ink-900)' : hover ? 'var(--sand-200)' : 'transparent',
        color: selecionado ? 'var(--sand-50)' : 'var(--ink-900)',
        border: 'var(--border-1) solid var(--ink-300)',
        /* Alvo interativo (filtro do cardapio), nao ladrilho: acompanha o
           canto dos botoes. As etiquetas estaticas do cartao de prato sao
           outro componente e seguem com o raio de ladrilho. */
        borderRadius: 'var(--radius-acao)',
        cursor: 'pointer',
        transition: 'var(--transition-action)',
        ...style,
      }}
    >
      {children}
    </button>
  )
}
