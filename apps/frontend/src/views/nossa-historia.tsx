import Image from 'next/image'
import Button from '@/components/ds/Button'
import CountUp from '@/components/ds/CountUp'
import ImageFrame from '@/components/ds/ImageFrame'
import Reveal from '@/components/ds/Reveal'
import VideoPoster from '@/components/ds/VideoPoster'
import { GlyphTiles, PatternBand, QuoteBlock, SectionLabel } from '@/components/ds/primitivos'
import { ESTATISTICAS, TEXTOS } from '@/lib/conteudo'
import { RESTAURANTE } from '@/lib/restaurante'

/**
 * Nossa história, montada sobre o Ancestral Design System
 * (`ui_kits/site/StoryScreen.jsx`).
 *
 * ATENÇÃO AO CONTEÚDO: a tela do DS escreve uma narrativa de família
 * ("Cláudia cresceu entre panelas de barro... Max chegou depois, com a mania de
 * perguntar de onde vem cada tempero") que NÃO consta de nenhuma fonte do
 * site em produção. É texto de preenchimento, e publicar história de família
 * inventada sobre pessoas reais é pior do que não publicar.
 *
 * Esta página usa, então, só o que existe: o texto institucional do site, os
 * números confirmados e os três depoimentos em vídeo, que são, eles próprios,
 * a história contada pelos donos. Quando a casa passar o texto real, entra no
 * lugar do bloco marcado abaixo.
 */
export default function NossaHistoriaView() {
  return (
    <>
      {/* ===== HERO ===== */}
      <div
        style={{
          position: 'relative',
          minHeight: '72vh',
          display: 'flex',
          alignItems: 'flex-end',
          marginTop: 'calc(-1 * var(--nav-h, 110px))',
          paddingTop: 'var(--nav-h, 110px)',
          overflow: 'hidden',
        }}
      >
        {/* `infancia-claudia.webp` é quadro de vídeo (1280x720, 40KB) e
            esticava pixelado na largura toda. Aqui entra a fotografia de
            1080x1350 do site, que aguenta sangrar a tela. */}
        <Image
          src="/fotos/banner-historia.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: '50% 30%' }}
        />
        <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--scrim-bottom)' }} />
        <div className="ds-shell" style={{ position: 'relative', width: '100%', paddingBottom: 'var(--space-8)' }}>
          <Reveal variante="up" atraso={120}>
            <SectionLabel tom="folha" inverso>
              Nossa história
            </SectionLabel>
          </Reveal>
          <Reveal variante="curtain" atraso={260}>
            <h1 style={{ color: 'var(--sand-50)', margin: '20px 0 0', maxWidth: '18ch' }}>
              Conheça um pouco
              <br />
              mais sobre
              <br />
              nossa missão
            </h1>
          </Reveal>
        </div>
      </div>

      <PatternBand motivo="comb" altura={20} tinta="var(--dende-500)" fundo="var(--sand-50)" />

      {/* ===== TEXTO ===== */}
      <section style={{ background: 'var(--surface-page)', padding: 'var(--section-y) 0' }}>
        <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto', padding: '0 var(--gutter)' }}>
          <Reveal variante="up">
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'var(--editorial-lg)',
                lineHeight: 1.14,
                margin: '0 0 32px',
              }}
            >
              {TEXTOS.heroTitulo}
            </p>
          </Reveal>
          {/* Texto proprio desta pagina. Antes aqui vinham `apresentacao` e
              `comodidadeTexto`, os mesmos dois paragrafos da home: quem
              clicava em "Nossa historia" relia o que acabara de ler. */}
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: 'var(--text-leading-loose)',
              fontSize: 'var(--text-lg)',
            }}
          >
            {TEXTOS.historiaAberturaTexto}
          </p>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: 'var(--text-leading-loose)',
              fontSize: 'var(--text-lg)',
            }}
          >
            {TEXTOS.historiaRaizesTexto}
          </p>
          <QuoteBlock style={{ marginTop: 36 }}>
            Cada um de nossos pratos traz consigo uma história.
          </QuoteBlock>
        </div>

        <div className="ds-shell ds-grid-3" style={{ marginTop: 'var(--space-9)' }}>
          <Reveal variante="up" indice={0}>
            <ImageFrame
              src="/fotos/destaque-claudia-prato.webp"
              alt="Cláudia com um prato da casa"
              proporcao="4 / 5"
              legenda="A cozinha da casa"
            />
          </Reveal>
          {/* As tres fotos partem da mesma linha: com a do meio deslocada, a
              faixa lia como desalinhada e nao como composicao. */}
          <Reveal variante="up" indice={1}>
            <ImageFrame
              src="/fotos/namesa-baiana.webp"
              alt="Mesa servida no Bistrô Ancestral"
              proporcao="4 / 5"
              bloco="acafrao"
            />
          </Reveal>
          <Reveal variante="up" indice={2}>
            <ImageFrame
              src="/fotos/historia-mesa.webp"
              alt="Prato do Bistrô Ancestral"
              proporcao="4 / 5"
              legenda="A mesa que virou menu"
            />
          </Reveal>
        </div>
      </section>

      {/* ===== A CASA =====
          Entra entre as fotos e os vídeos para a página ter um meio: antes
          ela saltava da abertura direto para os depoimentos. É também onde
          o texto situa o endereço, que é o objetivo do site. */}
      <section style={{ background: 'var(--surface-sand-deep)', padding: 'var(--section-y) 0' }}>
        <div className="ds-shell ds-split" style={{ ['--split' as string]: '1fr 1fr' }}>
          <Reveal variante="up">
            <SectionLabel tom="folha">{TEXTOS.historiaCasaSobretitulo}</SectionLabel>
            <h2 style={{ fontSize: 'var(--display-md)', margin: '18px 0 16px', maxWidth: '16ch' }}>
              {TEXTOS.historiaCasaTitulo}
            </h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                lineHeight: 'var(--text-leading-loose)',
                maxWidth: '48ch',
                margin: '0 0 28px',
              }}
            >
              {TEXTOS.historiaCasaTexto}
            </p>
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
          </Reveal>
          <Reveal variante="up" atraso={150}>
            <ImageFrame
              src="/fotos/servico-local.webp"
              alt="Varanda do Bistrô Ancestral, no Engenho do Mato"
              proporcao="4 / 3"
              bloco="acafrao"
            />
          </Reveal>
        </div>
      </section>

      {/* ===== DEPOIMENTOS EM VÍDEO ===== */}
      <section style={{ background: 'var(--surface-madeira)', padding: 'var(--section-y) 0' }}>
        <div className="ds-shell">
          <Reveal variante="up">
            <SectionLabel tom="acafrao" inverso>
              Quem faz a casa
            </SectionLabel>
          </Reveal>
          <Reveal variante="curtain" atraso={90}>
            <h2 style={{ color: 'var(--sand-50)', margin: '20px 0 20px' }}>
              Nas palavras
              <br />
              de quem cozinha
            </h2>
          </Reveal>
          <Reveal variante="up" atraso={140}>
            <p
              style={{
                color: 'var(--sand-50)',
                opacity: 0.82,
                maxWidth: '54ch',
                lineHeight: 'var(--text-leading-loose)',
                margin: '0 0 var(--space-8)',
              }}
            >
              {TEXTOS.historiaVideosTexto}
            </p>
          </Reveal>

          <div className="ds-grid-3">
            {[
              {
                poster: '/fotos/historia-claudia-v.webp',
                titulo: 'Cláudia',
                id: RESTAURANTE.videos.claudia,
              },
              { poster: '/fotos/historia-max-v.webp', titulo: 'Max', id: RESTAURANTE.videos.max },
              {
                poster: '/fotos/historia-infancia-v.webp',
                titulo: 'A casa por dentro',
                id: RESTAURANTE.videos.casa,
              },
            ].map((v, i) => (
              <Reveal key={v.titulo} variante="up" indice={i}>
                <VideoPoster
                  poster={v.poster}
                  videoId={v.id}
                  proporcao="9 / 16"
                  chapeu="Reproduzir"
                  titulo={v.titulo}
                  sizes="(min-width: 1000px) 30vw, 90vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NÚMEROS ===== */}
      <section style={{ background: 'var(--surface-page)', padding: 'var(--section-y) 0' }}>
        <div className="ds-shell">
          <div className="ds-grid-3">
            {ESTATISTICAS.map((e, i) => (
              <Reveal key={e.rotulo} variante="up" indice={i}>
                <CountUp valor={e.valor} prefixo={e.prefixo} sufixo={e.sufixo} tom={e.tom} rotulo={e.rotulo} />
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-9)', textAlign: 'center' }}>
            <GlyphTiles tamanho={16} style={{ marginBottom: 28 }} />
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
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
              <Button href="/como-chegar" variante="outline" tamanho="lg">
                Veja aqui como chegar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
