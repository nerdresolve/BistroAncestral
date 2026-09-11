'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'

/**
 * Cortina de entrada da marca, portada do Ancestral Design System
 * (`components/motion/SplashScreen.jsx`).
 *
 * Coreografia ao longo de toda a duração, para o painel nunca ficar parado:
 * a fotografia atrás sai lentamente de um zoom, os três ladrilhos entram
 * marchando e seguem respirando, o logotipo é revelado da esquerda e um
 * filete em dendê preenche o pé como indicação real de progresso. No fim, o
 * painel inteiro sobe como um pano puxado.
 *
 * A MARCA É IMAGEM, NUNCA TEXTO: o `tokens/fonts.css` do sistema é explícito
 * — o logotipo é letreiramento desenhado à mão e não é fonte licenciada, então
 * usa-se sempre o arquivo da marca. Uma versão anterior deste componente
 * redigitava "Bistrô Ancestral" em Anton, que é justamente o que o DS proíbe.
 *
 * DIFERENÇA EM RELAÇÃO AO DS: o original usa `sessionStorage` — a cortina
 * volta a cada nova sessão do navegador. Por decisão sua, aqui é
 * `localStorage`: roda na PRIMEIRA visita e quem já visitou entra direto.
 *
 * HIDRATAÇÃO: a leitura do `localStorage` sai por `useSyncExternalStore`, e
 * não do inicializador do `useState` nem de um efeito.
 *
 *   - No inicializador, servidor e cliente renderizam estados diferentes e o
 *     React derruba a árvore inteira (erro #418) — acontecia em todas as
 *     páginas, já que o splash vive no layout.
 *   - Num efeito com `setState`, resolve a hidratação mas cai na regra
 *     `react-hooks/set-state-in-effect`.
 *
 * `useSyncExternalStore` existe exatamente para isto: devolve um valor no
 * servidor (`getServerSnapshot`) e outro no cliente, sem divergência e sem
 * estado em efeito. É o mesmo padrão já usado no aviso de cookies.
 */
const CHAVE = 'bistro:splash'
const EVENTO = 'splash-visto'

function assinar(aoMudar: () => void) {
  window.addEventListener(EVENTO, aoMudar)
  window.addEventListener('storage', aoMudar)
  return () => {
    window.removeEventListener(EVENTO, aoMudar)
    window.removeEventListener('storage', aoMudar)
  }
}

/** Em aba anônima o acesso pode lançar: aí trata como já visto. */
function lerJaViu() {
  try {
    return localStorage.getItem(CHAVE) === '1'
  } catch {
    return true
  }
}

export default function SplashScreen({
  duracao = 2400,
  imagem = '/fotos/servico-local.webp',
}: {
  duracao?: number
  imagem?: string
}) {
  /* `jaViu` vem do armazenamento externo. No servidor é sempre `true`, então
     o HTML entregue nunca traz a cortina — quem já visitou não vê nem um
     piscar dela. */
  const jaViu = useSyncExternalStore(assinar, lerJaViu, () => true)

  /* Só o andamento da animação é estado local. */
  const [passo, setPasso] = useState<'entrando' | 'saindo' | 'fim'>('entrando')

  useEffect(() => {
    if (jaViu || passo !== 'entrando') return
    const t1 = setTimeout(() => setPasso('saindo'), duracao)
    const t2 = setTimeout(() => {
      setPasso('fim')
      try {
        localStorage.setItem(CHAVE, '1')
      } catch {}
      window.dispatchEvent(new Event(EVENTO))
    }, duracao + 900)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [jaViu, passo, duracao])

  if (jaViu || passo === 'fim') return null
  const fase = passo

  const total = duracao + 900

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'var(--surface-ink)',
        overflow: 'hidden',
        transform: fase === 'saindo' ? 'translateY(-101%)' : 'translateY(0)',
        transition: 'transform var(--dur-curtain) var(--ease-curtain)',
      }}
    >
      {/* Fotografia saindo de um zoom lento. `img` simples: é decorativa, sai
          de cena em 2,4s e não vale o custo do otimizador. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imagem}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.34,
          animation: `ancestral-splash-zoom ${total}ms var(--ease-out) both`,
        }}
      />
      <span
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, background: 'var(--scrim-full)' }}
      />

      <div
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'min(30px, 3.6vh)',
          padding: 'var(--space-6)',
          textAlign: 'center',
        }}
      >
        {/* Os três ladrilhos marcham e depois respiram. */}
        <span style={{ display: 'inline-flex', gap: 8 }}>
          {['var(--dende-500)', 'var(--acafrao-500)', 'var(--folha-500)'].map((cor, i) => (
            <span
              key={cor}
              style={{
                width: 'clamp(22px, 3.2vh, 34px)',
                height: 'clamp(22px, 3.2vh, 34px)',
                background: cor,
                borderRadius: 'var(--radius-xs)',
                animation: `ancestral-tile-march 620ms var(--ease-out) ${i * 110}ms both, ancestral-tile-breathe 2.4s var(--ease-in-out) ${900 + i * 110}ms infinite`,
              }}
            />
          ))}
        </span>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo-stacked-sand.webp"
          alt=""
          style={{
            width: 'min(340px, 56vw)',
            maxHeight: '44vh',
            height: 'auto',
            objectFit: 'contain',
            animation: 'ancestral-wordmark-wipe 820ms var(--ease-curtain) 420ms both',
          }}
        />

        <span
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'var(--editorial-sm)',
            color: 'var(--text-inverse-muted)',
            maxWidth: '30ch',
            animation: 'ancestral-rise-in 620ms var(--ease-out) 900ms both',
          }}
        >
          O melhor da culinária contemporânea baseada em raízes ancestrais.
        </span>
      </div>

      {/* Filete de progresso: preenche durante toda a espera, para o painel
          nunca parecer travado. */}
      <span
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 22,
          height: 3,
          background: 'rgba(249,243,234,.18)',
        }}
      >
        <span
          style={{
            display: 'block',
            height: '100%',
            background: 'var(--dende-500)',
            transformOrigin: 'left center',
            animation: `ancestral-splash-progress ${duracao}ms linear both`,
          }}
        />
      </span>
    </div>
  )
}
