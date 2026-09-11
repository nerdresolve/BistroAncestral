'use client'

import Link from 'next/link'
import { useState, type CSSProperties, type ReactNode } from 'react'
import Icon from './Icon'
import { registrarConversao, type EventoConversao } from '@/lib/consentimento'

/**
 * A ação da marca, portada do Ancestral Design System
 * (`components/core/Button.jsx`).
 *
 * Corte reto, caixa alta com entrelinhamento largo e bloco duro deslocado
 * atrás, no qual o botão afunda ao ser pressionado. Sem gradiente, sem sombra
 * suave, sem pílula, o sistema é explícito nisso.
 *
 * Acréscimo desta aplicação: `conversao`, que registra o clique no dataLayer.
 * São estes cliques (WhatsApp, mapa, telefone, cardápio) que a campanha conta
 * como conversão.
 */

type Tom = 'primary' | 'ink' | 'whatsapp' | 'acafrao'
type Variante = 'solid' | 'outline' | 'ghost'
type Tamanho = 'sm' | 'md' | 'lg'

const TONS: Record<Tom, { bg: string; hover: string; fg: string }> = {
  primary: {
    bg: 'var(--action-primary-bg)',
    hover: 'var(--action-primary-bg-hover)',
    fg: 'var(--action-primary-fg)',
  },
  ink: {
    bg: 'var(--action-secondary-bg)',
    hover: 'var(--action-secondary-bg-hover)',
    fg: 'var(--action-secondary-fg)',
  },
  whatsapp: {
    bg: 'var(--action-whatsapp-bg)',
    hover: 'var(--action-whatsapp-bg-hover)',
    fg: 'var(--action-whatsapp-fg)',
  },
  acafrao: {
    bg: 'var(--surface-acafrao)',
    hover: 'var(--acafrao-600)',
    fg: 'var(--ink-900)',
  },
}

const TAMANHOS: Record<Tamanho, { padding: string; fonte: string; icone: number }> = {
  sm: { padding: '9px 16px', fonte: 'var(--text-xs)', icone: 15 },
  md: { padding: '14px 24px', fonte: 'var(--text-sm)', icone: 18 },
  lg: { padding: '19px 34px', fonte: 'var(--text-md)', icone: 20 },
}

export default function Button({
  children,
  href,
  onClick,
  variante = 'solid',
  tom = 'primary',
  tamanho = 'md',
  icone,
  posicaoIcone = 'right',
  externo = false,
  bloco = false,
  conversao,
  className,
  style,
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  variante?: Variante
  tom?: Tom
  tamanho?: Tamanho
  icone?: string
  posicaoIcone?: 'left' | 'right'
  externo?: boolean
  bloco?: boolean
  conversao?: EventoConversao
  className?: string
  style?: CSSProperties
}) {
  const [hover, setHover] = useState(false)
  const [pressionado, setPressionado] = useState(false)

  const t = TONS[tom]
  const s = TAMANHOS[tamanho]

  const base: CSSProperties = {
    fontFamily: 'var(--font-text)',
    fontSize: s.fonte,
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    lineHeight: 1,
    padding: s.padding,
    display: bloco ? 'flex' : 'inline-flex',
    width: bloco ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    border: 'var(--border-2) solid var(--ink-900)',
    borderRadius: 'var(--radius-xs)',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'var(--transition-action)',
    boxSizing: 'border-box',
  }

  let aparencia: CSSProperties
  if (variante === 'outline') {
    aparencia = {
      background: hover ? 'var(--ink-900)' : 'transparent',
      color: hover ? 'var(--sand-50)' : 'var(--action-ghost-fg)',
      boxShadow: pressionado ? '1px 1px 0 var(--ink-900)' : 'var(--shadow-block-sm)',
      transform: pressionado ? 'var(--press-translate)' : 'none',
    }
  } else if (variante === 'ghost') {
    aparencia = {
      background: 'transparent',
      color: 'var(--action-ghost-fg)',
      border: 'var(--border-2) solid transparent',
      boxShadow: 'none',
      textDecoration: hover ? 'underline' : 'none',
      textDecorationThickness: '2px',
      textUnderlineOffset: '4px',
      textDecorationColor: 'var(--acafrao-500)',
    }
  } else {
    aparencia = {
      background: hover ? t.hover : t.bg,
      color: t.fg,
      boxShadow: pressionado ? '1px 1px 0 var(--ink-900)' : 'var(--shadow-block-sm)',
      transform: pressionado ? 'var(--press-translate)' : 'none',
    }
  }

  const glifo = icone ? <Icon name={icone} size={s.icone} /> : null
  const conteudo = (
    <>
      {posicaoIcone === 'left' ? glifo : null}
      <span>{children}</span>
      {posicaoIcone === 'right' ? glifo : null}
    </>
  )

  const eventos = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false)
      setPressionado(false)
    },
    onMouseDown: () => setPressionado(true),
    onMouseUp: () => setPressionado(false),
    onClick: () => {
      if (conversao) registrarConversao(conversao)
      onClick?.()
    },
  }

  const estilo = { ...base, ...aparencia, ...style }

  if (href && (externo || href.startsWith('http') || href.startsWith('#'))) {
    return (
      <a
        href={href}
        {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={className}
        style={estilo}
        {...eventos}
      >
        {conteudo}
      </a>
    )
  }

  if (href) {
    return (
      <Link href={href} className={className} style={estilo} {...eventos}>
        {conteudo}
      </Link>
    )
  }

  return (
    <button type="button" className={className} style={estilo} {...eventos}>
      {conteudo}
    </button>
  )
}
