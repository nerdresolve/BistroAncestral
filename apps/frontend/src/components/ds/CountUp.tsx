'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

/**
 * Estatística que conta a partir do zero quando entra em tela. Portada do
 * Ancestral Design System (`components/motion/CountUp.jsx`).
 *
 * Independente de ambiente, pelo mesmo motivo do `Reveal`: em alguns
 * contextos (renderização fora de tela, shell de impressão, pipeline de
 * screenshot) nem `requestAnimationFrame`, nem `IntersectionObserver`, nem
 * eventos de rolagem disparam, só temporizadores. Confiar em qualquer um
 * deles deixaria o número congelado em zero para sempre.
 */

type Tom = 'dende' | 'acafrao' | 'folha' | 'ink' | 'sand'

/*
 * Dois conjuntos: os tons vivos do DS valem sobre fundo ESCURO, onde têm
 * contraste de sobra. Sobre o creme da página eles reprovam na WCAG, * medido: açafrão #fbb81c dá 1,59:1 e folha #63b52f dá 2,33:1, contra o
 * mínimo de 4,5:1. Nem o açafrão-700 alcança (4,10:1), então a estatística
 * em açafrão usa dendê-600 no claro. São todos tons da própria paleta.
 */
const CORES_CLARO: Record<Tom, string> = {
  dende: 'var(--dende-600)',   /* 6,71:1 */
  acafrao: 'var(--dende-600)', /* açafrão não alcança 4,5:1 sobre creme */
  folha: 'var(--folha-700)',   /* 5,76:1 */
  ink: 'var(--ink-900)',
  sand: 'var(--ink-900)',
}

const CORES_ESCURO: Record<Tom, string> = {
  dende: 'var(--dende-500)',
  acafrao: 'var(--acafrao-500)',
  folha: 'var(--folha-500)',
  ink: 'var(--ink-900)',
  sand: 'var(--sand-50)',
}

export default function CountUp({
  valor,
  prefixo = '',
  sufixo = '',
  duracao = 1400,
  tom = 'dende',
  rotulo,
  inverso = false,
  style,
}: {
  valor: number
  prefixo?: string
  sufixo?: string
  duracao?: number
  tom?: Tom
  rotulo?: string
  inverso?: boolean
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) {
      setN(valor)
      return
    }

    let concluido = false
    let pararTween: (() => void) | null = null
    let temporizadores: ReturnType<typeof setTimeout>[] = []
    let poll: ReturnType<typeof setInterval> | null = null

    const desmontar = () => {
      temporizadores.forEach(clearTimeout)
      temporizadores = []
      if (poll) {
        clearInterval(poll)
        poll = null
      }
      window.removeEventListener('scroll', verificar, { capture: true })
      window.removeEventListener('resize', verificar)
      window.removeEventListener('load', verificar)
    }

    const executar = () => {
      concluido = true
      desmontar()
      const t0 = Date.now()
      const id = setInterval(() => {
        const p = Math.min(1, (Date.now() - t0) / duracao)
        // Desaceleração cúbica: rápido no começo, suave na chegada.
        setN(Math.round(valor * (1 - Math.pow(1 - p, 3))))
        if (p >= 1) {
          clearInterval(id)
          pararTween = null
        }
      }, 16)
      pararTween = () => clearInterval(id)
    }

    function verificar() {
      if (concluido || !el || !el.isConnected) return
      const r = el.getBoundingClientRect()
      if (r.height === 0 && r.width === 0) return
      const altura = window.innerHeight || document.documentElement.clientHeight || 0
      if (r.top < altura && r.bottom > 0) executar()
    }

    window.addEventListener('scroll', verificar, { passive: true, capture: true })
    window.addEventListener('resize', verificar)
    window.addEventListener('load', verificar)
    temporizadores = [0, 80, 300, 900, 2000].map((ms) => setTimeout(verificar, ms))
    poll = setInterval(verificar, 250)

    return () => {
      desmontar()
      if (pararTween) pararTween()
    }
  }, [valor, duracao])

  return (
    <div ref={ref} style={style}>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          textTransform: 'uppercase',
          fontSize: 'var(--display-md)',
          lineHeight: 1,
          color: (inverso ? CORES_ESCURO : CORES_CLARO)[tom],
          display: 'block',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {prefixo}
        {n.toLocaleString('pt-BR')}
        {sufixo}
      </span>
      {rotulo ? (
        <p
          style={{
            margin: '14px 0 0',
            color: inverso ? 'var(--text-inverse-muted)' : 'var(--text-secondary)',
            maxWidth: '30ch',
            fontSize: 'var(--text-sm)',
          }}
        >
          {rotulo}
        </p>
      ) : null}
    </div>
  )
}
