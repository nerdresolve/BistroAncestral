import Button from '@/components/ds/Button'
import ImageFrame from '@/components/ds/ImageFrame'
import Reveal from '@/components/ds/Reveal'
import { InfoRow, PatternBand, SectionLabel } from '@/components/ds/primitivos'
import { TEXTOS } from '@/lib/conteudo'
import { RESTAURANTE } from '@/lib/restaurante'

/**
 * Como chegar, montada sobre o Ancestral Design System
 * (`ui_kits/site/VisitScreen.jsx`).
 *
 * UMA MUDANÇA DELIBERADA: o DS traz um formulário de reserva completo (nome,
 * WhatsApp, data, número de pessoas, refeição, observação) cujo `onSubmit`
 * apenas troca um estado para "enviado" — não manda nada a lugar nenhum.
 * Num protótipo isso demonstra o layout; no ar, seria um formulário que
 * engole pedidos de mesa em silêncio, e o visitante sai achando que reservou.
 *
 * Como a casa recebe reserva por WhatsApp, e é esse o canal que a campanha
 * mede, a coluna do formulário dá lugar aos dados da visita e ao botão que
 * abre a conversa já com a mensagem pronta. Se um dia houver sistema de
 * reserva de verdade, o formulário do DS entra aqui sem mexer no resto.
 *
 * `HERO_CLARO` no `NavBar` inclui esta rota: o topo é terracota claro, então
 * a chrome precisa vir escura para ter contraste.
 */

const MSG_RESERVA =
  'Olá! Gostaria de fazer uma reserva no Bistrô Ancestral. Somos ___ pessoas, no dia ___, para almoço/jantar.'

function whatsappReserva() {
  return `https://wa.me/${RESTAURANTE.whatsapp}?text=${encodeURIComponent(MSG_RESERVA)}`
}

export default function ComoChegarView() {
  return (
    <>
      {/* ===== CABEÇALHO (terracota claro) ===== */}
      <div
        style={{
          background: 'var(--surface-terracota)',
          padding: 'var(--gutter) var(--gutter) var(--section-y)',
          marginTop: 'calc(-1 * var(--nav-h, 110px))',
          paddingTop: 'calc(var(--nav-h, 110px) + var(--space-8))',
        }}
      >
        <div className="ds-shell" style={{ padding: 0 }}>
          <Reveal variante="up">
            <SectionLabel tom="dende">Como viver essa experiência</SectionLabel>
          </Reveal>
          <Reveal variante="curtain" atraso={120}>
            <h1 style={{ margin: '20px 0 0', maxWidth: '18ch' }}>
              Veja aqui
              <br />
              como chegar
            </h1>
          </Reveal>
        </div>
      </div>

      <PatternBand motivo="diamond" altura={22} tinta="var(--ink-900)" fundo="var(--terracota-500)" />

      {/* ===== VISITA ===== */}
      <section style={{ background: 'var(--surface-page)', padding: 'var(--section-y) 0' }}>
        <div className="ds-shell ds-split" style={{ ['--split' as string]: '1fr 1fr' }}>
          <Reveal variante="up">
            <h2 style={{ fontSize: 'var(--display-md)', margin: '0 0 12px' }}>Reserva para grupos</h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                maxWidth: '46ch',
                lineHeight: 'var(--text-leading-loose)',
              }}
            >
              {TEXTOS.ofertaTexto}
            </p>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '46ch' }}>{TEXTOS.ofertaTexto3}</p>

            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <Button
                href={whatsappReserva()}
                externo
                tom="whatsapp"
                tamanho="lg"
                icone="message-circle"
                posicaoIcone="left"
                conversao="clique_whatsapp"
              >
                Reservar pelo WhatsApp
              </Button>
              <Button
                href={RESTAURANTE.external.maps}
                externo
                tom="primary"
                tamanho="lg"
                icone="navigation"
                posicaoIcone="left"
                conversao="clique_mapa"
              >
                Ver endereço no mapa
              </Button>
            </div>
          </Reveal>

          <Reveal variante="up" atraso={160}>
            <ImageFrame
              src="/fotos/servico-local.webp"
              alt="Varanda do Bistrô Ancestral"
              proporcao="4 / 3"
              bloco="acafrao"
            />
            <div style={{ marginTop: 'var(--space-8)' }}>
              <SectionLabel tom="folha">Onde estamos</SectionLabel>
              <div style={{ marginTop: 8 }}>
                <InfoRow icone="map-pin" rotulo="Nosso endereço">
                  {RESTAURANTE.address.street}
                  <br />
                  {RESTAURANTE.address.district}, {RESTAURANTE.address.city} —{' '}
                  {RESTAURANTE.address.state}, {RESTAURANTE.address.zip}
                </InfoRow>
                <InfoRow icone="clock" rotulo="Horário de funcionamento">
                  Sex e sáb · 12h às 22h
                  <br />
                  Dom · 12h às 18h
                </InfoRow>
                <InfoRow icone="phone" rotulo="Telefone / WhatsApp">
                  {RESTAURANTE.phone}
                </InfoRow>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <div
        style={{
          background: 'var(--surface-dende)',
          padding: 'var(--section-y) var(--gutter)',
          textAlign: 'center',
        }}
      >
        <Reveal variante="curtain">
          <h2
            style={{
              color: 'var(--sand-50)',
              fontSize: 'var(--display-xl)',
              margin: '0 auto',
              maxWidth: '18ch',
            }}
          >
            Venha viver
            <br />
            essa experiência
          </h2>
        </Reveal>
        <Reveal variante="up" atraso={180}>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
            <Button
              href={RESTAURANTE.whatsappLink}
              externo
              tom="whatsapp"
              tamanho="lg"
              icone="message-circle"
              posicaoIcone="left"
              conversao="clique_telefone"
            >
              {RESTAURANTE.phone}
            </Button>
            <Button href="/cardapio" variante="outline" tamanho="lg" style={{ background: 'var(--sand-50)' }}>
              Ver o cardápio
            </Button>
          </div>
        </Reveal>
      </div>
    </>
  )
}
