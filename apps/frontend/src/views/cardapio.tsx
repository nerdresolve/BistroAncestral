'use client'

import { useState } from 'react'
import Button from '@/components/ds/Button'
import DishCard from '@/components/ds/DishCard'
import Marquee from '@/components/ds/Marquee'
import Reveal from '@/components/ds/Reveal'
import Tag from '@/components/ds/Tag'
import { SectionLabel } from '@/components/ds/primitivos'
import { DESTAQUES } from '@/lib/conteudo'
import { RESTAURANTE } from '@/lib/restaurante'

/**
 * Cardápio, montado sobre o Ancestral Design System
 * (`ui_kits/site/MenuScreen.jsx`).
 *
 * ATENÇÃO AO CONTEÚDO: a tela do DS traz seis pratos, três deles inexistentes
 * no site em produção ("Moqueca da Baiana", "Mesa Ancestral", "Vatapá de
 * Coco"), e reescreve as descrições dos três reais — trocando inclusive as de
 * Caipora e Terra e Mar entre si. É texto de preenchimento, próprio de um
 * entregável de design.
 *
 * Aqui entram só os TRÊS pratos confirmados, com as descrições extraídas do
 * site. O filtro por categoria fica montado e pronto: assim que a casa passar
 * o cardápio completo, é só acrescentar itens em `DESTAQUES` com a sua
 * categoria.
 */

const CATEGORIAS = ['Todos', 'Mais pedidos'] as const

export default function CardapioView() {
  const [categoria, setCategoria] = useState<(typeof CATEGORIAS)[number]>('Todos')
  const lista = DESTAQUES

  return (
    <>
      {/* ===== CABEÇALHO ===== */}
      <div
        style={{
          background: 'var(--surface-ink)',
          padding: 'var(--gutter) var(--gutter) var(--section-y)',
          marginTop: 'calc(-1 * var(--nav-h, 110px))',
          paddingTop: 'calc(var(--nav-h, 110px) + var(--space-8))',
        }}
      >
        <div className="ds-shell" style={{ padding: 0 }}>
          <Reveal variante="up">
            <SectionLabel tom="acafrao" inverso>
              Conheça nosso cardápio
            </SectionLabel>
          </Reveal>
          <Reveal variante="curtain" atraso={90}>
            <h1 style={{ color: 'var(--sand-50)', margin: '20px 0 0' }}>
              As principais
              <br />
              atrações da casa
            </h1>
          </Reveal>
          <Reveal variante="up" atraso={200}>
            <p
              style={{
                color: 'var(--text-inverse-muted)',
                fontFamily: 'var(--font-editorial)',
                fontSize: 'var(--editorial-md)',
                maxWidth: '32ch',
                marginTop: 24,
              }}
            >
              As principais atrações que você encontra aqui no Bistrô Ancestral.
            </p>
          </Reveal>
        </div>
      </div>

      <Marquee
        tom="acafrao"
        velocidade={30}
        itens={['Camarú', 'Caipora', 'Terra e Mar', 'Comida de mãe', 'Comida de vó']}
      />

      {/* ===== LISTA ===== */}
      <section style={{ background: 'var(--surface-page)', padding: 'var(--section-y-tight) 0 var(--section-y)' }}>
        <div className="ds-shell">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            {CATEGORIAS.map((c) => (
              <Tag key={c} selecionado={categoria === c} onClick={() => setCategoria(c)}>
                {c}
              </Tag>
            ))}
            <span style={{ marginLeft: 'auto', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
              {lista.length} pratos
            </span>
          </div>

          <div
            style={{
              borderTop: 'var(--border-1) solid var(--border-subtle)',
              margin: '28px 0 var(--space-8)',
            }}
          />

          <div className="ds-grid-3">
            {lista.map((d, i) => (
              <Reveal
                key={d.nome}
                variante="up"
                indice={i % 3}
                className="ds-stagger"
                style={{ ['--stagger' as string]: i % 3 === 1 ? '48px' : '0px' }}
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

          {/* Cardápio completo: ainda vive no Canva, como no site atual. */}
          <Reveal
            variante="up"
            style={{
              marginTop: 'var(--space-9)',
              background: 'var(--surface-sand)',
              padding: 'var(--space-8)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 32,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <span
                  style={{
                    background: 'var(--dende-500)',
                    color: 'var(--sand-50)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '5px 9px',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  Reservas
                </span>
                {/* h2: a página tem só o h1 do topo antes deste bloco, e
                    saltar para h3 quebra a ordem de cabeçalhos. */}
                <h2 style={{ margin: '16px 0 8px', fontSize: 'var(--display-md)' }}>
                  Grupos de {RESTAURANTE.reservas.minPessoas} ou mais
                  <br />
                  pessoas pelo WhatsApp
                </h2>
                <p style={{ margin: 0, color: 'var(--text-secondary)', maxWidth: '46ch' }}>
                  Com antecedência de {RESTAURANTE.reservas.antecedenciaHoras}h. A chegada deve ser até as{' '}
                  {RESTAURANTE.reservas.chegadaAlmoco} para o almoço e até as{' '}
                  {RESTAURANTE.reservas.chegadaJantar} para o jantar.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Button
                  href={RESTAURANTE.external.cardapio}
                  externo
                  variante="outline"
                  tamanho="lg"
                  conversao="clique_cardapio"
                >
                  Cardápio completo
                </Button>
                <Button
                  href={RESTAURANTE.whatsappLink}
                  externo
                  tom="whatsapp"
                  tamanho="lg"
                  icone="message-circle"
                  posicaoIcone="left"
                  conversao="clique_whatsapp"
                >
                  {RESTAURANTE.phone}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
