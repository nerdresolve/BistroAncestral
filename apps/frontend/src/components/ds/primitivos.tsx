import type { CSSProperties, ReactNode } from 'react'
import Icon from './Icon'

/**
 * Primitivos do Ancestral Design System: GlyphTiles, SectionLabel, InfoRow,
 * Divider e QuoteBlock. Todos são componentes de servidor, nenhum precisa de
 * estado, e numa página de campanha cada componente que não vai para o cliente
 * é JavaScript que ninguém baixa.
 */

/* ------------------------------------------------------------------ */
/* GlyphTiles, os três ladrilhos tirados do logotipo                  */
/* ------------------------------------------------------------------ */

const LADRILHOS = [
  { bg: 'var(--dende-500)', rotulo: 'Sankofa' },
  { bg: 'var(--acafrao-500)', rotulo: 'Ave' },
  { bg: 'var(--folha-500)', rotulo: 'Pente' },
]

export function GlyphTiles({
  tamanho = 28,
  espaco = 4,
  quantidade = 3,
  orientacao = 'row',
  style,
}: {
  tamanho?: number
  espaco?: number
  quantidade?: number
  orientacao?: 'row' | 'column'
  style?: CSSProperties
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        flexDirection: orientacao === 'column' ? 'column' : 'row',
        gap: espaco,
        ...style,
      }}
    >
      {LADRILHOS.slice(0, quantidade).map((l) => (
        <span
          key={l.rotulo}
          style={{
            width: tamanho,
            height: tamanho,
            background: l.bg,
            borderRadius: 'var(--radius-xs)',
            flex: 'none',
          }}
        />
      ))}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* SectionLabel, o olho-d'água que abre quase toda seção              */
/* ------------------------------------------------------------------ */

type Tom = 'dende' | 'acafrao' | 'folha'

const PONTO: Record<Tom, string> = {
  dende: 'var(--dende-500)',
  acafrao: 'var(--acafrao-500)',
  folha: 'var(--folha-500)',
}

export function SectionLabel({
  children,
  tom = 'dende',
  inverso = false,
  style,
}: {
  children: ReactNode
  tom?: Tom
  inverso?: boolean
  style?: CSSProperties
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'var(--font-text)',
        fontSize: 'var(--label-size)',
        fontWeight: 700,
        letterSpacing: 'var(--label-tracking)',
        textTransform: 'uppercase',
        color: inverso ? 'var(--text-inverse)' : 'var(--text-primary)',
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 10,
          height: 10,
          background: PONTO[tom],
          borderRadius: 'var(--radius-xs)',
          flex: 'none',
        }}
      />
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* InfoRow, ícone + rótulo + valor (endereço, horário, telefone)      */
/* ------------------------------------------------------------------ */

export function InfoRow({
  icone,
  rotulo,
  children,
  inverso = false,
  style,
}: {
  icone: string
  rotulo: string
  children: ReactNode
  inverso?: boolean
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        padding: '18px 0',
        borderTop: inverso
          ? 'var(--border-1) solid rgba(249,243,234,.25)'
          : 'var(--border-1) solid var(--border-subtle)',
        ...style,
      }}
    >
      <span
        style={{
          width: 38,
          height: 38,
          flex: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--acafrao-500)',
          color: 'var(--ink-900)',
          borderRadius: 'var(--radius-xs)',
        }}
      >
        <Icon name={icone} size={18} />
      </span>
      <div>
        <div
          style={{
            fontSize: 'var(--label-size)',
            fontWeight: 700,
            letterSpacing: 'var(--label-tracking)',
            textTransform: 'uppercase',
            /* `--text-muted` (ink-400) dá 3,17:1 sobre o creme; ink-500 dá 4,52:1. */
            color: inverso ? 'var(--text-inverse-muted)' : 'var(--ink-500)',
            marginBottom: 6,
          }}
        >
          {rotulo}
        </div>
        <div
          style={{
            fontSize: 'var(--text-lg)',
            lineHeight: 'var(--text-leading-tight)',
            color: inverso ? 'var(--text-inverse)' : 'var(--text-primary)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* QuoteBlock, citação em serifa editorial                            */
/* ------------------------------------------------------------------ */

export function QuoteBlock({
  children,
  inverso = false,
  style,
}: {
  children: ReactNode
  inverso?: boolean
  style?: CSSProperties
}) {
  return (
    <blockquote
      style={{
        margin: 0,
        paddingLeft: 22,
        borderLeft: `var(--border-3) solid var(--acafrao-500)`,
        fontFamily: 'var(--font-editorial)',
        fontSize: 'var(--editorial-md)',
        lineHeight: 'var(--editorial-leading)',
        color: inverso ? 'var(--text-inverse)' : 'var(--text-primary)',
        ...style,
      }}
    >
      {children}
    </blockquote>
  )
}

/* ------------------------------------------------------------------ */
/* PatternBand, faixa de geometria ancestral entre seções             */
/* ------------------------------------------------------------------ */

type Motivo = 'dash' | 'comb' | 'diamond' | 'step'

const MOTIVOS: Record<Motivo, { imagem: string; tamanho?: string }> = {
  dash: { imagem: 'var(--pattern-dash)', tamanho: '20px 100%' },
  comb: { imagem: 'var(--pattern-comb)', tamanho: '100% 11px' },
  diamond: { imagem: 'var(--pattern-diamond)' },
  step: { imagem: 'var(--pattern-step)', tamanho: 'var(--pattern-step-size)' },
}

export function PatternBand({
  motivo = 'diamond',
  altura = 22,
  tinta = 'var(--ink-900)',
  fundo = 'var(--sand-100)',
  style,
}: {
  motivo?: Motivo
  altura?: number
  tinta?: string
  fundo?: string
  style?: CSSProperties
}) {
  const m = MOTIVOS[motivo]
  return (
    <div
      aria-hidden="true"
      style={
        {
          '--pattern-ink': tinta,
          height: altura,
          background: fundo,
          backgroundImage: m.imagem,
          backgroundSize: m.tamanho,
          backgroundRepeat: 'repeat',
          ...style,
        } as CSSProperties
      }
    />
  )
}
