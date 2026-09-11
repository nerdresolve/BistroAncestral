import Image from 'next/image'
import Link from 'next/link'
import Marquee from './Marquee'
import Reveal from './Reveal'
import { GlyphTiles, InfoRow, SectionLabel } from './primitivos'
import { ROTAS } from '@/lib/rotas'
import { RESTAURANTE } from '@/lib/restaurante'

/**
 * Rodapé, portado do Ancestral Design System (`ui_kits/site/SiteChrome.jsx`).
 *
 * Abre com o marquee em dendê, o dispositivo de ritmo do sistema, e fecha
 * com três colunas: marca, navegação e dados da casa.
 *
 * O link para a política de privacidade é acréscimo desta aplicação: no DS
 * ele não existe, mas uma página de LGPD precisa ser alcançável de qualquer
 * tela, sem depender do aviso de cookies que some no primeiro clique.
 */
export default function SiteFooter() {
  const ano = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--surface-ink)', color: 'var(--text-inverse)' }}>
      <Marquee
        tom="dende"
        tamanho="lg"
        velocidade={30}
        itens={[
          'Venha viver essa experiência',
          'Camarú',
          'Caipora',
          'Terra e Mar',
          'Comida de mãe, comida de vó',
        ]}
      />

      <div className="ds-shell" style={{ padding: 'var(--space-9) var(--gutter) var(--space-7)' }}>
        <div className="ds-split" style={{ ['--split' as string]: '1.2fr 1fr 1fr' }}>
          <Reveal variante="up">
            <Image
              src="/brand/logo-stacked-sand.webp"
              alt={RESTAURANTE.name}
              width={260}
              height={260}
              style={{ height: 130, width: 'auto' }}
            />
            <p
              style={{
                marginTop: 24,
                maxWidth: '28ch',
                color: 'var(--text-inverse-muted)',
                fontSize: 'var(--text-sm)',
              }}
            >
              O melhor da culinária contemporânea baseada em raízes ancestrais. Sinta o aconchego
              dos aromas e sabores que remetem às nossas origens.
            </p>
          </Reveal>

          <Reveal variante="up" indice={1}>
            <SectionLabel tom="acafrao" inverso>
              Navegar
            </SectionLabel>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '20px 0 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {ROTAS.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    style={{
                      fontSize: 'var(--text-lg)',
                      color: 'var(--sand-50)',
                      textDecoration: 'none',
                    }}
                  >
                    {r.rotulo}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/politica-de-privacidade"
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-inverse-muted)',
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                  }}
                >
                  Política de privacidade
                </Link>
              </li>
            </ul>
          </Reveal>

          <Reveal variante="up" indice={2}>
            <SectionLabel tom="folha" inverso>
              A casa
            </SectionLabel>
            <div style={{ marginTop: 8 }}>
              <InfoRow icone="map-pin" rotulo="Nosso endereço" inverso>
                {RESTAURANTE.address.street}
                <br />
                {RESTAURANTE.address.district}, {RESTAURANTE.address.city}, {RESTAURANTE.address.state},{' '}
                {RESTAURANTE.address.zip}
              </InfoRow>
              <InfoRow icone="clock" rotulo="Horário de funcionamento" inverso>
                Sex e sáb · 12h às 22h
                <br />
                Dom · 12h às 18h
              </InfoRow>
              <InfoRow icone="phone" rotulo="Telefone / WhatsApp" inverso>
                {RESTAURANTE.phone}
              </InfoRow>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="ds-shell" style={{ padding: '0 var(--gutter) var(--space-7)' }}>
        <div style={{ borderTop: 'var(--border-1) solid rgba(249,243,234,.25)' }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            paddingTop: 18,
            fontSize: 'var(--text-xs)',
            color: 'var(--text-inverse-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            flexWrap: 'wrap',
          }}
        >
          <span>Copyright © {ano} {RESTAURANTE.name}</span>
          <GlyphTiles tamanho={12} />
        </div>
      </div>
    </footer>
  )
}
