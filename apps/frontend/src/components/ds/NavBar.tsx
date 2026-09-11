'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Button from './Button'
import Icon from './Icon'
import { RESTAURANTE } from '@/lib/restaurante'
import { ROTAS } from '@/lib/rotas'

/**
 * Cabeçalho do site, portado do Ancestral Design System
 * (`components/navigation/NavBar.jsx`).
 *
 * Transparente sobre o hero, condensando numa barra escura translúcida ao
 * rolar; abaixo de 940px os links viram menu de gaveta.
 *
 * ADAPTAÇÃO PARA O NEXT: o DS é uma SPA que troca telas por estado
 * (`onSelect`). Aqui cada tela é uma rota de verdade, então a navegação sai
 * em `<Link>` — o visitante pode abrir em nova aba, compartilhar o endereço
 * da página e o buscador indexa as quatro. A rota ativa vem do
 * `usePathname()` em vez de uma prop.
 *
 * `--nav-h`: o cabeçalho publica a própria altura medida, e o hero se puxa
 * para cima exatamente por ela. Um valor fixo deixaria aparecer uma faixa do
 * fundo sempre que o padding, o tamanho da logo ou a métrica da fonte
 * mudassem.
 */
/** Telas cujo topo é claro: ali a chrome precisa ser escura para ter contraste. */
const HERO_CLARO = ['/como-chegar']

export default function NavBar() {
  const caminho = usePathname()
  const [rolou, setRolou] = useState(false)
  const [compacto, setCompacto] = useState(false)
  const [aberto, setAberto] = useState(false)
  const ref = useRef<HTMLElement>(null)
  /* Espelha `rolou` para o efeito do --nav-h consultar sem depender dele.
     A escrita vai num efeito: mexer em ref durante a renderização é o que a
     regra `react-hooks/refs` proíbe, e deixaria a leitura inconsistente. */
  const rolouRef = useRef(false)

  const heroClaro = HERO_CLARO.includes(caminho)
  const claro = heroClaro && !rolou
  const cor = claro ? 'var(--ink-900)' : 'var(--sand-50)'

  /*
   * HISTERESE — dois limiares, não um.
   *
   * Com um limiar único em 40px o cabeçalho entrava em laço: passar de 40
   * encolhia o header (padding 26→12, logo 72→48), o `ResizeObserver`
   * reescrevia `--nav-h`, o hero recalculava a própria margem negativa, a
   * altura do documento mudava e a rolagem voltava para baixo de 40 — que
   * expandia o header de novo. O resultado era o cabeçalho quicando sem
   * parar em torno do ponto de corte.
   *
   * Agora condensa só ao passar de 80px e volta a expandir só abaixo de 20px.
   * Entre os dois não existe ponto que alterne sozinho.
   */
  useEffect(() => {
    rolouRef.current = rolou
  }, [rolou])

  useEffect(() => {
    const ler = () => {
      const y = window.scrollY || 0
      setRolou((atual) => (atual ? y > 20 : y > 80))
    }
    ler()
    window.addEventListener('scroll', ler, { passive: true })
    return () => window.removeEventListener('scroll', ler)
  }, [caminho])

  useEffect(() => {
    const ler = () => setCompacto(window.innerWidth <= 940)
    ler()
    const t = setTimeout(ler, 250)
    window.addEventListener('resize', ler)
    window.addEventListener('orientationchange', ler)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', ler)
      window.removeEventListener('orientationchange', ler)
    }
  }, [])

  /*
   * Publica a altura do cabeçalho EXPANDIDO — e só ela.
   *
   * O hero usa `--nav-h` na margem negativa e no padding do topo. Se o valor
   * acompanhasse o header condensando, a página inteira mudaria de altura a
   * cada rolagem: era a outra metade do laço descrito acima.
   *
   * Por isso o efeito não depende de `rolou`, e a medida só é regravada
   * quando o header está expandido. Ao condensar, o cabeçalho desliza por
   * cima do conteúdo sem reposicionar nada.
   */
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const definir = () => {
      if (rolouRef.current) return
      document.documentElement.style.setProperty('--nav-h', `${el.offsetHeight}px`)
    }
    definir()
    const ts = [0, 120, 400].map((ms) => setTimeout(definir, ms))
    window.addEventListener('resize', definir)
    window.addEventListener('orientationchange', definir)
    return () => {
      ts.forEach(clearTimeout)
      window.removeEventListener('resize', definir)
      window.removeEventListener('orientationchange', definir)
    }
  }, [compacto])

  // Trava a rolagem do fundo enquanto a gaveta está aberta.
  useEffect(() => {
    if (!aberto) return
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = anterior
      document.removeEventListener('keydown', onKey)
    }
  }, [aberto])

  return (
    <>
      <header
        ref={ref}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 60,
          background: rolou ? 'rgba(18,16,17,.94)' : 'transparent',
          backdropFilter: rolou ? 'saturate(140%) blur(10px)' : 'none',
          transition: 'background var(--dur-base) var(--ease-crisp)',
        }}
      >
        {/* Escurecimento suave que some bem abaixo do cabeçalho: a chrome lê
            como sombra sobre a fotografia, não como uma régua. */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '210%',
            pointerEvents: 'none',
            background:
              'linear-gradient(to bottom,rgba(18,16,17,.62) 0%,rgba(18,16,17,.34) 42%,rgba(18,16,17,.12) 72%,rgba(18,16,17,0) 100%)',
            opacity: rolou || heroClaro ? 0 : 1,
            transition: 'opacity var(--dur-base) var(--ease-crisp)',
          }}
        />

        <div
          style={{
            maxWidth: 'var(--container)',
            margin: '0 auto',
            position: 'relative',
            padding: `${rolou ? '12px' : '26px'} var(--gutter) ${rolou ? '12px' : '22px'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            transition: 'padding var(--dur-base) var(--ease-crisp)',
          }}
        >
          <Link href="/" aria-label={`${RESTAURANTE.name} — início`} style={{ display: 'flex' }}>
            <Image
              src={claro ? '/brand/logo-stacked-color.webp' : '/brand/logo-stacked-sand.webp'}
              alt={RESTAURANTE.name}
              width={240}
              height={240}
              priority
              style={{
                height: rolou ? 48 : 72,
                width: 'auto',
                transition: 'height var(--dur-base) var(--ease-crisp)',
              }}
            />
          </Link>

          {compacto ? (
            <button
              type="button"
              onClick={() => setAberto(true)}
              aria-label="Abrir menu"
              aria-expanded={aberto}
              style={{
                all: 'unset',
                cursor: 'pointer',
                width: 46,
                height: 46,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `var(--border-2) solid ${cor}`,
                borderRadius: 'var(--radius-xs)',
                color: cor,
              }}
            >
              <svg viewBox="0 0 24 24" width={22} height={22} stroke="currentColor" strokeWidth={2} fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="square" />
              </svg>
            </button>
          ) : (
            <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {ROTAS.map((r) => {
                const ativo = caminho === r.href
                return (
                  <Link
                    key={r.href}
                    href={r.href}
                    aria-current={ativo ? 'page' : undefined}
                    style={{
                      padding: '10px 16px',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      color: cor,
                      textDecoration: 'none',
                      borderBottom: `3px solid ${
                        ativo ? (claro ? 'var(--dende-500)' : 'var(--acafrao-500)') : 'transparent'
                      }`,
                      transition:
                        'color var(--dur-fast) var(--ease-crisp),border-color var(--dur-fast) var(--ease-crisp)',
                    }}
                  >
                    {r.rotulo}
                  </Link>
                )
              })}
              <Button
                href={RESTAURANTE.whatsappLink}
                externo
                tom="whatsapp"
                tamanho="sm"
                icone="message-circle"
                posicaoIcone="left"
                conversao="clique_telefone"
                style={{ marginLeft: 18 }}
              >
                {RESTAURANTE.phone}
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Gaveta do celular */}
      {aberto ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            background: 'var(--surface-ink)',
            color: 'var(--sand-50)',
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--space-6) var(--gutter)',
            animation: 'ancestral-fade-in var(--dur-base) var(--ease-out) both',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Image
              src="/brand/logo-stacked-sand.webp"
              alt={RESTAURANTE.name}
              width={200}
              height={200}
              style={{ height: 64, width: 'auto' }}
            />
            <button
              type="button"
              onClick={() => setAberto(false)}
              aria-label="Fechar menu"
              style={{
                all: 'unset',
                cursor: 'pointer',
                width: 46,
                height: 46,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'var(--border-2) solid var(--sand-50)',
                borderRadius: 'var(--radius-xs)',
              }}
            >
              <svg viewBox="0 0 24 24" width={22} height={22} stroke="currentColor" strokeWidth={2} fill="none">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="square" />
              </svg>
            </button>
          </div>

          <nav style={{ marginTop: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {ROTAS.map((r, i) => (
              <Link
                key={r.href}
                href={r.href}
                onClick={() => setAberto(false)}
                style={{
                  fontFamily: 'var(--font-display)',
                  textTransform: 'uppercase',
                  fontSize: 'var(--display-md)',
                  lineHeight: 1.05,
                  color: caminho === r.href ? 'var(--acafrao-500)' : 'var(--sand-50)',
                  textDecoration: 'none',
                  padding: '10px 0',
                  animation: `ancestral-menu-in var(--dur-base) var(--ease-out) both`,
                  animationDelay: `${i * 60}ms`,
                }}
              >
                {r.rotulo}
              </Link>
            ))}
          </nav>

          <div style={{ marginTop: 'auto', paddingTop: 'var(--space-7)' }}>
            <Button
              href={RESTAURANTE.whatsappLink}
              externo
              tom="whatsapp"
              tamanho="lg"
              icone="message-circle"
              posicaoIcone="left"
              conversao="clique_telefone"
              bloco
            >
              {RESTAURANTE.phone}
            </Button>
            <p
              style={{
                marginTop: 18,
                fontSize: 'var(--text-xs)',
                lineHeight: 1.6,
                color: 'var(--text-inverse-muted)',
              }}
            >
              {RESTAURANTE.address.full}
              <br />
              {RESTAURANTE.hours.completo}
            </p>
          </div>
        </div>
      ) : null}
    </>
  )
}

/** Botão flutuante de WhatsApp: aparece depois que o hero passa. */
export function WhatsAppFlutuante() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const ler = () => setVisivel((window.scrollY || 0) > 420)
    ler()
    window.addEventListener('scroll', ler, { passive: true })
    return () => window.removeEventListener('scroll', ler)
  }, [])

  return (
    <a
      href={RESTAURANTE.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      aria-hidden={!visivel}
      tabIndex={visivel ? 0 : -1}
      className={visivel ? 'ds-pulse' : undefined}
      style={{
        position: 'fixed',
        right: 22,
        bottom: 22,
        zIndex: 80,
        width: 60,
        height: 60,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--folha-500)',
        color: 'var(--ink-900)',
        border: 'var(--border-2) solid var(--ink-900)',
        borderRadius: 'var(--radius-xs)',
        boxShadow: 'var(--shadow-block-sm)',
        textDecoration: 'none',
        opacity: visivel ? 1 : 0,
        transform: visivel ? 'translateY(0) scale(1)' : 'translateY(20px) scale(.9)',
        pointerEvents: visivel ? 'auto' : 'none',
        transition:
          'opacity var(--dur-base) var(--ease-crisp),transform var(--dur-base) var(--ease-crisp)',
      }}
    >
      <Icon name="message-circle" size={26} />
    </a>
  )
}
