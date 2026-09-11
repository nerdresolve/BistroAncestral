import Image from 'next/image'
import Button from '@/components/ds/Button'
import CountUp from '@/components/ds/CountUp'
import DishCard from '@/components/ds/DishCard'
import FaqItem from '@/components/ds/FaqItem'
import Icon from '@/components/ds/Icon'
import ImageFrame from '@/components/ds/ImageFrame'
import JsonLd from '@/components/JsonLd'
import Marquee from '@/components/ds/Marquee'
import Reveal from '@/components/ds/Reveal'
import VideoPoster from '@/components/ds/VideoPoster'
import { GlyphTiles, InfoRow, QuoteBlock, SectionLabel } from '@/components/ds/primitivos'
import { DESTAQUES, ESTATISTICAS, FAQ, TEXTOS } from '@/lib/conteudo'
import { RESTAURANTE } from '@/lib/restaurante'
import { faqSchema } from '@/lib/schema'

/**
 * Home, montada sobre o Ancestral Design System (`ui_kits/site/HomeScreen.jsx`).
 *
 * O conteúdo vem de `lib/conteudo.ts` e `lib/restaurante.ts`, os textos e
 * dados extraídos do site em produção, e não fica escrito aqui: quem edita o
 * cardápio não deveria precisar abrir um componente.
 *
 * Seções, na ordem do sistema:
 *   hero fotográfico · marquee · manifesto + números · cardápio ·
 *   comodidade (madeira) · história em vídeo · como chegar · FAQ · CTA final
 */

type Fundo = 'page' | 'sand' | 'ink' | 'madeira'

const FUNDOS: Record<Fundo, string> = {
  page: 'var(--surface-page)',
  sand: 'var(--surface-sand)',
  ink: 'var(--surface-ink)',
  madeira: 'var(--surface-madeira)',
}

function Secao({
  children,
  fundo = 'page',
  id,
}: {
  children: React.ReactNode
  fundo?: Fundo
  id?: string
}) {
  return (
    <section id={id} style={{ background: FUNDOS[fundo], padding: 'var(--section-y) 0' }}>
      <div className="ds-shell">{children}</div>
    </section>
  )
}

export default function HomeView() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <div
        style={{
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'flex-end',
          marginTop: 'calc(-1 * var(--nav-h, 110px))',
          paddingTop: 'var(--nav-h, 110px)',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/fotos/namesa-baiana.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: 'center 55%' }}
        />
        {/* Véus do sistema: lateral para o texto e inferior para o pé. */}
        <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--scrim-side)' }} />
        <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--scrim-bottom)' }} />

        <div
          className="ds-shell"
          style={{ position: 'relative', width: '100%', paddingBottom: 'var(--space-9)' }}
        >
          <Reveal variante="up" atraso={120}>
            <SectionLabel tom="acafrao" inverso>
              Engenho do Mato · Niterói · RJ
            </SectionLabel>
          </Reveal>

          <Reveal variante="curtain" atraso={260}>
            <h1
              style={{
                color: 'var(--sand-50)',
                fontSize: 'var(--display-2xl)',
                margin: '22px 0 0',
                maxWidth: '14ch',
              }}
            >
              Cansado
              <br />
              do comum?
            </h1>
          </Reveal>

          <Reveal variante="up" atraso={520}>
            <p
              style={{
                color: 'var(--sand-50)',
                fontFamily: 'var(--font-editorial)',
                fontSize: 'var(--editorial-lg)',
                lineHeight: 1.1,
                maxWidth: '26ch',
                margin: '28px 0 0',
              }}
            >
              {TEXTOS.heroTitulo}
            </p>
            <p
              style={{
                color: 'var(--text-inverse-muted)',
                fontSize: 'var(--text-xl)',
                maxWidth: '34ch',
                margin: '18px 0 0',
              }}
            >
              {TEXTOS.heroSubtitulo}
            </p>
          </Reveal>

          <Reveal variante="up" atraso={700}>
            <div style={{ display: 'flex', gap: 14, marginTop: 40, flexWrap: 'wrap' }}>
              <Button
                href={RESTAURANTE.whatsappLink}
                externo
                tom="whatsapp"
                tamanho="lg"
                icone="message-circle"
                posicaoIcone="left"
                conversao="clique_whatsapp"
              >
                {TEXTOS.ctaPadrao}
              </Button>
              <Button
                href="/cardapio"
                variante="outline"
                tamanho="lg"
                style={{ background: 'var(--sand-50)' }}
              >
                Ver o cardápio
              </Button>
            </div>
          </Reveal>

          <span
            aria-hidden="true"
            className="ds-scroll-hint ds-hide-phone"
            style={{
              position: 'absolute',
              right: 'var(--gutter)',
              bottom: 'var(--space-9)',
              color: 'var(--sand-50)',
              display: 'inline-flex',
            }}
          >
            <Icon name="chevron-down" size={30} />
          </span>
        </div>
      </div>

      <Marquee
        tom="ink"
        velocidade={38}
        itens={[
          'Comida de mãe',
          'Comida de vó',
          'Raízes ancestrais',
          'Engenho do Mato · Niterói',
          'Cansado do comum?',
        ]}
      />

      {/* ===================== MANIFESTO ===================== */}
      <Secao>
        <div className="ds-split" style={{ ['--split' as string]: '1fr 1fr', ['--split-align' as string]: 'center' }}>
          <div>
            <Reveal variante="up">
              <SectionLabel tom="dende">Cada prato é uma viagem no tempo</SectionLabel>
            </Reveal>
            <Reveal variante="curtain" atraso={90}>
              <h2 style={{ margin: '20px 0 28px' }}>
                Uma volta
                <br />
                às raízes
                <br />
                do Brasil
              </h2>
            </Reveal>
            <Reveal variante="up" atraso={180}>
              <p style={{ fontSize: 'var(--text-xl)', lineHeight: 1.45, maxWidth: '34ch' }}>
                Surpreenda-se com uma experiência que te transporta para as raízes da culinária do
                Brasil.
              </p>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  maxWidth: 'var(--measure)',
                  lineHeight: 'var(--text-leading-loose)',
                }}
              >
                Incluindo elementos da cozinha internacional que compõem a diversidade de nossas
                tradições e culturas. No Bistrô Ancestral, cada prato é uma celebração da nossa rica
                gastronomia, enriquecida por ingredientes e técnicas que atravessaram os oceanos.
              </p>
              <Button href="/nossa-historia" variante="ghost" icone="arrow-right" style={{ paddingLeft: 0 }}>
                Conheça nossa história
              </Button>
            </Reveal>
          </div>

          <Reveal variante="scale" atraso={160} style={{ position: 'relative' }}>
            <ImageFrame
              src="/fotos/destaque-claudia-prato.webp"
              alt="Cláudia com um prato da casa"
              proporcao="4 / 5"
              bloco="acafrao"
            />
            <div className="ds-hide-phone" style={{ position: 'absolute', right: -28, bottom: -44, width: 220 }}>
              {/* Recorte quadrado de alta resolução: o arquivo anterior era
                  quadro de vídeo em 16:9, e a moldura circular ampliava o
                  meio da imagem já comprimida. */}
              <ImageFrame
                src="/fotos/inset-casa.webp"
                alt="Cláudia no salão do Bistrô Ancestral"
                proporcao="1 / 1"
                corte="organic"
                zoom={false}
                /* A moldura tem 220px, mas em tela retina isso pede ~440px
                   reais. Com `sizes="220px"` o otimizador entregava 178px de
                   largura natural, a foto trocada continuava borrada, agora
                   por resolução insuficiente e não por ser quadro de vídeo. */
                sizes="440px"
              />
            </div>
          </Reveal>
        </div>

        <div
          className="ds-grid-3"
          style={{
            marginTop: 'var(--space-9)',
            borderTop: 'var(--border-2) solid var(--ink-900)',
            paddingTop: 'var(--space-7)',
          }}
        >
          {ESTATISTICAS.map((e, i) => (
            <Reveal key={e.rotulo} variante="up" indice={i}>
              <CountUp valor={e.valor} prefixo={e.prefixo} sufixo={e.sufixo} tom={e.tom} rotulo={e.rotulo} />
            </Reveal>
          ))}
        </div>
      </Secao>

      {/* ===================== CARDÁPIO ===================== */}
      <Secao fundo="sand">
        <div className="ds-row-between">
          <div>
            <Reveal variante="up">
              <SectionLabel tom="acafrao">Mais pedidos</SectionLabel>
            </Reveal>
            <Reveal variante="curtain" atraso={90}>
              <h2 style={{ margin: '20px 0 14px' }}>
                Conheça
                <br />
                nosso cardápio
              </h2>
            </Reveal>
            <Reveal variante="up" atraso={180}>
              <p style={{ margin: 0, color: 'var(--text-secondary)', maxWidth: '42ch' }}>
                As principais atrações que você encontra aqui no Bistrô Ancestral.
              </p>
            </Reveal>
          </div>
          <Reveal variante="up" atraso={220}>
            <Button href="/cardapio" variante="outline">
              Confira o cardápio completo
            </Button>
          </Reveal>
        </div>

        <div className="ds-grid-3" style={{ marginTop: 'var(--space-8)' }}>
          {DESTAQUES.map((d, i) => (
            <Reveal
              key={d.nome}
              variante="up"
              indice={i}
              className="ds-stagger"
              style={{ ['--stagger' as string]: i === 1 ? '56px' : '0px' }}
            >
              <DishCard
                indice={i + 1}
                imagem={d.foto}
                nome={d.nome}
                descricao={d.descricao}
                etiquetas={['Mais pedido']}
              />
            </Reveal>
          ))}
        </div>
      </Secao>

      {/* ===================== COMODIDADE ===================== */}
      <Secao fundo="madeira">
        <div className="ds-split" style={{ ['--split' as string]: '1fr 1.15fr', ['--split-align' as string]: 'center' }}>
          <div>
            <Reveal variante="up">
              <SectionLabel tom="acafrao" inverso>
                Comodidade
              </SectionLabel>
            </Reveal>
            <Reveal variante="curtain" atraso={90}>
              <h2 style={{ color: 'var(--sand-50)', margin: '20px 0 26px' }}>
                Um restaurante
                <br />
                de tradição
              </h2>
            </Reveal>
            <Reveal variante="up" atraso={180}>
              <p
                style={{
                  color: 'var(--text-inverse-muted)',
                  lineHeight: 'var(--text-leading-loose)',
                  maxWidth: '46ch',
                }}
              >
                {TEXTOS.comodidadeTexto}
              </p>
              <QuoteBlock inverso style={{ marginTop: 36 }}>
                Cada um de nossos pratos traz consigo uma história.
              </QuoteBlock>
            </Reveal>
          </div>

          <div className="ds-split" style={{ ['--split' as string]: '1fr 1fr', gap: 20 }}>
            <Reveal variante="left">
              <ImageFrame src="/fotos/servico-local.webp" alt="Salão do Bistrô Ancestral" proporcao="3 / 4" />
            </Reveal>
            <Reveal
              variante="right"
              atraso={140}
              className="ds-stagger"
              style={{ ['--stagger' as string]: '48px' }}
            >
              <ImageFrame
                src="/fotos/servico-atendimento.webp"
                alt="Cláudia e Max recebendo os clientes"
                proporcao="3 / 4"
              />
            </Reveal>
          </div>
        </div>

        <div
          style={{
            marginTop: 'var(--space-9)',
            borderTop: '2px solid rgba(249,243,234,.25)',
            paddingTop: 'var(--space-7)',
          }}
        >
          <span
            style={{
              fontSize: 'var(--label-size)',
              fontWeight: 700,
              letterSpacing: 'var(--label-tracking)',
              textTransform: 'uppercase',
              color: 'var(--text-inverse-muted)',
            }}
          >
            Serviços oferecidos
          </span>
          <div className="ds-grid-3" style={{ marginTop: 'var(--space-6)' }}>
            {[
              ['heart-handshake', 'Ambiente acolhedor & familiar'],
              ['hand-heart', 'Atendimento humanizado'],
              ['award', 'Destaque absoluto da região'],
            ].map(([icone, titulo], i) => (
              <Reveal key={titulo} variante="up" indice={i}>
                <span
                  style={{
                    width: 44,
                    height: 44,
                    background: 'var(--acafrao-500)',
                    color: 'var(--ink-900)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  <Icon name={icone} size={20} />
                </span>
                {/* h3, não h4: vem logo depois do h2 da seção, e pular nível
                    quebra a ordem para quem navega por títulos. */}
                <h3
                  style={{
                    color: 'var(--sand-50)',
                    margin: '18px 0 0',
                    maxWidth: '18ch',
                    fontSize: 'var(--display-sm)',
                  }}
                >
                  {titulo}
                </h3>
              </Reveal>
            ))}
          </div>
        </div>
      </Secao>

      {/* ===================== HISTÓRIA ===================== */}
      <Secao>
        <div className="ds-split" style={{ ['--split' as string]: '1.4fr 1fr', ['--split-align' as string]: 'end' }}>
          <div>
            <Reveal variante="up">
              <SectionLabel tom="folha">Nossa história</SectionLabel>
            </Reveal>
            <Reveal variante="curtain" atraso={90}>
              <h2 style={{ margin: '20px 0 30px' }}>
                Conheça um pouco
                <br />
                mais sobre
                <br />
                nossa missão
              </h2>
            </Reveal>
            <Reveal variante="wipe" atraso={180}>
              <VideoPoster
                poster="/fotos/video-capa.jpg"
                videoId={RESTAURANTE.videoId}
                chapeu="Reproduzir"
                titulo="A casa por dentro"
                proporcao="16 / 9"
              />
            </Reveal>
          </div>

          <div className="ds-split" style={{ ['--split' as string]: '1fr 1fr', gap: 16 }}>
            <Reveal variante="up" indice={1}>
              <VideoPoster
                poster="/fotos/historia-claudia-v.webp"
                videoId={RESTAURANTE.videoId}
                proporcao="9 / 16"
                chapeu="Reproduzir"
                titulo="Cláudia"
                sizes="(min-width: 1000px) 22vw, 45vw"
              />
            </Reveal>
            <Reveal variante="up" indice={2}>
              <VideoPoster
                poster="/fotos/historia-max-v.webp"
                videoId={RESTAURANTE.videoId}
                proporcao="9 / 16"
                chapeu="Reproduzir"
                titulo="Max"
                sizes="(min-width: 1000px) 22vw, 45vw"
              />
            </Reveal>
          </div>
        </div>
      </Secao>

      {/* ===================== COMO CHEGAR ===================== */}
      <Secao fundo="sand" id="visite">
        <div className="ds-split" style={{ ['--split' as string]: '1fr 1.1fr' }}>
          <div>
            <Reveal variante="up">
              <SectionLabel tom="dende">Como chegar</SectionLabel>
            </Reveal>
            <Reveal variante="curtain" atraso={90}>
              <h2 style={{ margin: '20px 0 20px' }}>
                Venha viver
                <br />
                essa experiência
                <br />
                gastronômica
              </h2>
            </Reveal>
            <Reveal variante="up" atraso={180}>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  maxWidth: '44ch',
                  lineHeight: 'var(--text-leading-loose)',
                }}
              >
                {TEXTOS.ofertaTexto}
              </p>
              <InfoRow icone="map-pin" rotulo="Nosso endereço">
                {RESTAURANTE.address.street}
                <br />
                {RESTAURANTE.address.district}, {RESTAURANTE.address.city}, {RESTAURANTE.address.state},{' '}
                {RESTAURANTE.address.zip}
              </InfoRow>
              <InfoRow icone="clock" rotulo="Horário de funcionamento">
                Sex e sáb · 12h às 22h
                <br />
                Dom · 12h às 18h
              </InfoRow>
              <InfoRow icone="phone" rotulo="Telefone / WhatsApp">
                {RESTAURANTE.phone}
              </InfoRow>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <Button
                  href={RESTAURANTE.external.maps}
                  externo
                  tom="primary"
                  icone="navigation"
                  posicaoIcone="left"
                  conversao="clique_mapa"
                >
                  Ver endereço no mapa
                </Button>
                <Button
                  href={RESTAURANTE.whatsappLink}
                  externo
                  tom="whatsapp"
                  icone="message-circle"
                  posicaoIcone="left"
                  conversao="clique_whatsapp"
                >
                  {TEXTOS.ctaPadrao}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal variante="wipe" atraso={140}>
            <ImageFrame
              src="/fotos/servico-local.webp"
              alt="Varanda do Bistrô Ancestral"
              proporcao="4 / 3"
              bloco="folha"
              legenda="Engenho do Mato, Região Oceânica de Niterói"
            />
          </Reveal>
        </div>
      </Secao>

      {/* ===================== FAQ ===================== */}
      <Secao>
        <div className="ds-split" style={{ ['--split' as string]: '0.8fr 1.2fr' }}>
          <div>
            <Reveal variante="up">
              <SectionLabel tom="acafrao">Ficou com alguma dúvida?</SectionLabel>
            </Reveal>
            <Reveal variante="curtain" atraso={90}>
              <h2 style={{ margin: '20px 0 0' }}>
                Confira as
                <br />
                dúvidas mais
                <br />
                frequentes
              </h2>
            </Reveal>
            <GlyphTiles tamanho={16} style={{ marginTop: 28 }} />
          </div>
          <div>
            {FAQ.map((f, i) => (
              <Reveal key={f.pergunta} variante="up" indice={i}>
                <FaqItem pergunta={f.pergunta} abertoInicial={i === 0}>
                  {f.resposta}
                </FaqItem>
              </Reveal>
            ))}
          </div>
        </div>
        {/* Só marcamos o FAQ porque esta página de fato exibe as perguntas. */}
        <JsonLd data={faqSchema(FAQ)} />
      </Secao>

      {/* ===================== CTA FINAL ===================== */}
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
            <Button
              href="/como-chegar"
              variante="outline"
              tamanho="lg"
              style={{ background: 'var(--sand-50)' }}
            >
              Veja aqui como chegar
            </Button>
          </div>
        </Reveal>
      </div>
    </>
  )
}
