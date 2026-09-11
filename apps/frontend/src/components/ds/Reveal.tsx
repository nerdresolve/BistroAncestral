'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/**
 * Entrada por rolagem do Ancestral Design System, com uma inversão
 * deliberada em relação ao original.
 *
 * REGRA QUE ESTE COMPONENTE NÃO PODE QUEBRAR: o conteúdo nunca fica
 * invisível de forma permanente.
 *
 * O `Reveal` do DS parte do estado escondido e conta com um laço de medição
 * para abrir. O próprio comentário dele explica por que não usa
 * `IntersectionObserver`, em alguns contextos o observer nunca dispara e a
 * página inteira some. Só que o laço de medição tem o mesmo ponto fraco por
 * outro caminho: se a medição não rodar, ou rodar antes de o layout assentar,
 * o bloco continua escondido. Foi o que aconteceu aqui: 44 de 48 blocos
 * ficaram em `opacity: 0` e metade da home não aparecia.
 *
 * Aqui o estado inicial é VISÍVEL. O bloco só é escondido depois que o
 * JavaScript confirma que está rodando e que consegue observar, e, mesmo
 * assim, apenas se estiver fora da tela. Se qualquer coisa falhar, o
 * resultado é a página inteira legível, sem animação. O pior caso vira
 * "sem animação" em vez de "sem conteúdo".
 *
 * `curtain` e `wipe` são a assinatura da marca: o conteúdo é DESCOBERTO,
 * como um pano puxado da mesa, em vez de flutuar para dentro.
 */

type Variante = 'up' | 'fade' | 'left' | 'right' | 'scale' | 'curtain' | 'wipe'

const ESCONDIDO: Record<Variante, CSSProperties> = {
  /* Sem `opacity`: esta é a variante do texto de corpo, e animar a
     transparência faz o verificador de contraste amostrar um quadro
     intermediário, acusando 4,31:1 num texto que, assentado, dá 7,27:1.
     O deslocamento sozinho já entrega a entrada. */
  up: { transform: 'translateY(var(--reveal-rise))' },
  fade: { opacity: 0 },
  left: { opacity: 0, transform: 'translateX(calc(var(--reveal-rise) * -1.4))' },
  right: { opacity: 0, transform: 'translateX(calc(var(--reveal-rise) * 1.4))' },
  scale: { opacity: 0, transform: 'scale(.94)' },
  curtain: { opacity: 1, clipPath: 'inset(0 0 100% 0)' },
  wipe: { opacity: 1, clipPath: 'inset(0 100% 0 0)' },
}

export default function Reveal({
  children,
  variante = 'up',
  atraso = 0,
  indice,
  duracao,
  className,
  style,
}: {
  children: ReactNode
  variante?: Variante
  atraso?: number
  /** Posição no grupo: escalona em passos de 90ms, como manda o DS. */
  indice?: number
  duracao?: number
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  /* 'pronto' = posição final. Nasce assim de propósito: sem JS, é onde fica. */
  const [estado, setEstado] = useState<'pronto' | 'escondido'>('pronto')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const semMovimento =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (semMovimento) return

    // Já visível na primeira pintura? Não anima, mexer no que o visitante
    // está lendo produz um tremor sem propósito.
    const r = el.getBoundingClientRect()
    const altura = window.innerHeight || document.documentElement.clientHeight || 0
    if (r.top < altura) return

    setEstado('escondido')

    let vivo = true
    const abrir = () => {
      if (!vivo) return
      vivo = false
      setEstado('pronto')
      limpar()
    }

    const verificar = () => {
      if (!vivo || !el.isConnected) return
      const rr = el.getBoundingClientRect()
      if (rr.height === 0 && rr.width === 0) return
      const h = window.innerHeight || document.documentElement.clientHeight || 0
      if (rr.top < h - h * 0.08 && rr.bottom > 0) abrir()
    }

    // Rede de segurança: se nada disparar, o bloco abre sozinho. Animação
    // não pode ser condição para o texto existir.
    const teto = setTimeout(abrir, 2500)
    const ticks = [0, 60, 200, 600, 1400].map((ms) => setTimeout(verificar, ms))
    const poll = setInterval(verificar, 250)

    function limpar() {
      clearTimeout(teto)
      ticks.forEach(clearTimeout)
      clearInterval(poll)
      window.removeEventListener('scroll', verificar, { capture: true })
      window.removeEventListener('resize', verificar)
    }

    window.addEventListener('scroll', verificar, { passive: true, capture: true })
    window.addEventListener('resize', verificar)
    verificar()

    return () => {
      vivo = false
      limpar()
    }
  }, [])

  const ms = indice != null ? indice * 90 + atraso : atraso

  /* O nó medido fica SEM clip: um elemento com clip-path reporta caixa
     colapsada, e um reveal que se corta sozinho nunca se detectaria. */
  return (
    <div ref={ref} className={className} style={style}>
      <div
        style={{
          transition: 'var(--transition-reveal)',
          transitionDuration: duracao ? `${duracao}ms` : undefined,
          transitionDelay: `${ms}ms`,
          ...(estado === 'escondido' ? ESCONDIDO[variante] : undefined),
        }}
      >
        {children}
      </div>
    </div>
  )
}
