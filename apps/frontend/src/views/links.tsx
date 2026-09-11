import Image from 'next/image'
import Icon from '@/components/ds/Icon'
import Reveal from '@/components/ds/Reveal'
import { GlyphTiles } from '@/components/ds/primitivos'
import { LINKS } from '@/lib/conteudo'
import { RESTAURANTE, whatsappHref } from '@/lib/restaurante'

const MSG_RESERVA = 'Olá! Gostaria de fazer uma reserva no Bistrô Ancestral.'

/**
 * BistroLinks — a página que vive na bio do Instagram.
 *
 * Não traz cabeçalho nem rodapé de propósito: é tela de destino de rede
 * social, onde qualquer navegação a mais disputa o clique com os quatro
 * cartões. O site legado fazia igual. Por isso ela também fica fora do
 * `layout.tsx` padrão — ver `app/links/layout.tsx`.
 *
 * APRESENTAÇÃO refeita sobre o Ancestral Design System. A versão anterior
 * pintava tudo com tokens da paleta antiga (`bg-cinza-900`, `text-cinza-200`,
 * `text-laranja-vivo`), que a migração removeu: sem token correspondente o
 * Tailwind não emite classe nenhuma, e a página saía sem estilo.
 */

/** Ícone de cada cartão, pelo tipo de destino. */
const ICONE: Record<(typeof LINKS)[number]['tipo'], string> = {
  whatsapp: 'message-circle',
  cardapio: 'chevron-right',
  playlist: 'play',
  maps: 'map-pin',
}

export default function LinksView() {
  /* O destino de cada cartão sai daqui, e não de `conteudo.ts`: lá ficam os
     textos que a casa revisa; aqui, os endereços que dependem do
     `RESTAURANTE` e da montagem do link de WhatsApp. */
  const destino: Record<(typeof LINKS)[number]['tipo'], string> = {
    whatsapp: whatsappHref(MSG_RESERVA),
    cardapio: RESTAURANTE.external.cardapio,
    playlist: RESTAURANTE.external.playlist,
    maps: RESTAURANTE.external.mapsLinks,
  }

  return (
    <main
      style={{
        minHeight: '100dvh',
        background: 'var(--surface-ink)',
        color: 'var(--text-inverse)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'var(--space-8) var(--gutter)',
      }}
    >
      <Reveal variante="up">
        <Image
          src="/brand/logo-stacked-sand.webp"
          alt={RESTAURANTE.name}
          width={260}
          height={324}
          priority
          style={{ height: 150, width: 'auto', margin: '0 auto' }}
        />
      </Reveal>

      <Reveal variante="up" atraso={90}>
        <p
          style={{
            marginTop: 22,
            maxWidth: '28ch',
            textAlign: 'center',
            fontFamily: 'var(--font-editorial)',
            fontSize: 'var(--editorial-sm)',
            color: 'var(--text-inverse)',
          }}
        >
          Onde cada sabor conta uma história de afeto e tradição.
        </p>
      </Reveal>

      <ul
        style={{
          listStyle: 'none',
          margin: 'var(--space-7) 0 0',
          padding: 0,
          width: '100%',
          maxWidth: 460,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {LINKS.map((link, i) => (
          <li key={link.titulo}>
            <Reveal variante="up" indice={i}>
              <a
                href={destino[link.tipo]}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '20px 22px',
                  background: 'var(--madeira-900)',
                  color: 'var(--text-inverse)',
                  border: 'var(--border-2) solid var(--sand-300)',
                  borderRadius: 'var(--radius-xs)',
                  textDecoration: 'none',
                  transition: 'var(--transition-action)',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 42,
                    height: 42,
                    flex: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--acafrao-500)',
                    color: 'var(--ink-900)',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  <Icon name={ICONE[link.tipo]} size={20} />
                </span>

                <span style={{ flex: 1 }}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      textTransform: 'uppercase',
                      fontSize: 'var(--display-sm)',
                      lineHeight: 1.1,
                      color: 'var(--sand-50)',
                    }}
                  >
                    {link.titulo}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      marginTop: 4,
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-inverse-muted)',
                    }}
                  >
                    {link.descricao}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  style={{ color: 'var(--acafrao-500)', display: 'inline-flex', flex: 'none' }}
                >
                  <Icon name="chevron-right" size={22} />
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* O texto do link precisa dizer para onde leva: "Clique aqui" sozinho
          não significa nada fora de contexto — nem para quem navega saltando
          de link em link com leitor de tela, nem para o Lighthouse. */}
      <Reveal variante="up" atraso={200}>
        <p
          style={{
            marginTop: 'var(--space-7)',
            maxWidth: '34ch',
            textAlign: 'center',
            fontSize: 'var(--text-sm)',
            color: 'var(--text-inverse-muted)',
          }}
        >
          Já teve a experiência?{' '}
          <a
            href={RESTAURANTE.external.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--acafrao-500)',
              fontWeight: 700,
              textDecoration: 'underline',
              textUnderlineOffset: 4,
            }}
          >
            Avalie no Google
          </a>{' '}
          e nos conte como foi.
        </p>
      </Reveal>

      <GlyphTiles tamanho={14} style={{ marginTop: 'var(--space-7)' }} />
    </main>
  )
}
