'use client'

import Image from 'next/image'
import { useId, useState, type CSSProperties } from 'react'
import Icon from './Icon'

/**
 * Porta de entrada do vídeo, portada do Ancestral Design System
 * (`components/content/VideoPoster.jsx`): quadro estático, véu e um controle
 * de play grande. O vídeo do Ancestral é vertical, gravado no celular e
 * humano — a moldura fica de corte reto, sem arredondamento.
 *
 * Acréscimo desta aplicação: o player só é montado no clique. Enquanto o
 * iframe do YouTube carrega junto com a página, o Chrome registra cookie de
 * terceiro e o `best-practices` do Lighthouse trava em 96 — trocar para
 * `youtube-nocookie` não resolve, só muda o domínio do aviso. Sem iframe na
 * carga, não há cookie. O embed também é o recurso mais pesado da página, e
 * em campanha paga isso é verba queimada antes de a página aparecer.
 */
export default function VideoPoster({
  poster,
  videoId,
  titulo,
  chapeu,
  proporcao = '16 / 9',
  sizes = '(min-width: 1000px) 50vw, 90vw',
  prioridade = false,
  style,
}: {
  poster: string
  videoId: string
  titulo?: string
  chapeu?: string
  proporcao?: string
  sizes?: string
  prioridade?: boolean
  style?: CSSProperties
}) {
  const [tocando, setTocando] = useState(false)
  const id = useId()
  const idChapeu = `${id}-c`
  const idTitulo = `${id}-t`

  if (tocando) {
    return (
      <div style={{ position: 'relative', width: '100%', aspectRatio: proporcao, ...style }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={titulo ?? 'Vídeo do Bistrô Ancestral'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setTocando(true)}
      /* O nome acessível precisa conter TODO o texto visível do botão — aqui
         são duas partes, o chapéu ("Reproduzir") e o título ("Cláudia"). Com
         só uma delas, quem navega por voz não consegue acionar pelo que lê,
         e o Lighthouse reprova em `label-content-name-mismatch`. */
      /* `aria-labelledby` apontando para os próprios spans visíveis: o nome
         acessível passa a ser, por construção, o mesmo texto que se lê na
         tela. Um `aria-label` escrito à mão com as mesmas palavras não basta
         — o verificador compara com a leitura contígua dos nós visíveis. */
      {...(chapeu || titulo
        ? { 'aria-labelledby': [chapeu ? idChapeu : '', titulo ? idTitulo : ''].filter(Boolean).join(' ') }
        : { 'aria-label': 'Reproduzir vídeo' })}
      className="group"
      style={{
        all: 'unset',
        display: 'block',
        position: 'relative',
        width: '100%',
        aspectRatio: proporcao,
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'var(--madeira-900)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes={sizes}
        priority={prioridade}
        className="object-cover group-hover:scale-[1.035]"
        style={{ transition: 'var(--transition-media)' }}
      />

      <span
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, background: 'var(--scrim-bottom)' }}
      />

      <span
        aria-hidden="true"
        className="group-hover:scale-[1.06] group-hover:bg-[var(--dende-500)] group-hover:text-[var(--sand-50)]"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          transformOrigin: 'center',
          width: 74,
          height: 74,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--sand-50)',
          color: 'var(--ink-900)',
          border: 'var(--border-3) solid var(--ink-900)',
          borderRadius: 'var(--radius-xs)',
          transition: 'var(--transition-action)',
        }}
      >
        <Icon name="play" size={26} />
      </span>

      <span style={{ position: 'absolute', left: 24, right: 24, bottom: 22, textAlign: 'left' }}>
        {chapeu ? (
          <span
            id={idChapeu}
            style={{
              display: 'block',
              fontSize: 'var(--label-size)',
              fontWeight: 700,
              letterSpacing: 'var(--label-tracking)',
              textTransform: 'uppercase',
              color: 'var(--acafrao-500)',
              marginBottom: 8,
            }}
          >
            {chapeu}
          </span>
        ) : null}
        {titulo ? (
          <span
            id={idTitulo}
            style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              textTransform: 'uppercase',
              fontSize: 'var(--display-sm)',
              lineHeight: 'var(--display-leading)',
              color: 'var(--sand-50)',
            }}
          >
            {titulo}
          </span>
        ) : null}
      </span>
    </button>
  )
}
