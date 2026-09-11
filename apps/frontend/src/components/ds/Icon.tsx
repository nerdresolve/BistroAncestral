import type { CSSProperties } from 'react'

/**
 * Ícones do sistema.
 *
 * O DS padroniza no Lucide carregado por CDN, que troca um placeholder pelo
 * SVG em tempo de execução (`components/core/Icon.jsx`). Aqui os mesmos
 * desenhos entram como SVG embutido, mantendo os nomes do sistema — a API é
 * a mesma, `<Icon name="map-pin" />`.
 *
 * Motivo da troca: script de terceiro na home custa o `best-practices` do
 * Lighthouse (cookie/CSP) e a troca em tempo de execução provoca um salto de
 * layout justamente no primeiro quadro, que é o que o clique de anúncio vê.
 * Traço de 2px e ponta quadrada, como o DS especifica.
 */

const CAMINHOS: Record<string, string> = {
  'map-pin': 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 7v5l3.5 2',
  phone:
    'M21.5 16.9v2.6a1.7 1.7 0 0 1-1.9 1.7 17 17 0 0 1-7.4-2.6 16.7 16.7 0 0 1-5.1-5.1A17 17 0 0 1 4.5 6a1.7 1.7 0 0 1 1.7-1.9h2.6a1.7 1.7 0 0 1 1.7 1.5c.1.9.3 1.7.6 2.5a1.7 1.7 0 0 1-.4 1.8l-1.1 1.1a13.6 13.6 0 0 0 5.1 5.1l1.1-1.1a1.7 1.7 0 0 1 1.8-.4c.8.3 1.6.5 2.5.6a1.7 1.7 0 0 1 1.5 1.7Z',
  'message-circle':
    'M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-4-.9L3 20.5l1.5-4.5a8.9 8.9 0 0 1-.9-4 8.4 8.4 0 0 1 8.4-9 8.4 8.4 0 0 1 9 8.5Z',
  'chevron-down': 'm6 9 6 6 6-6',
  'chevron-right': 'm9 18 6-6-6-6',
  'arrow-right': 'M5 12h14 M13 6l6 6-6 6',
  navigation: 'M3 11 22 2l-9 20-2-9-8-2Z',
  plus: 'M12 5v14 M5 12h14',
  minus: 'M5 12h14',
  play: 'm7 4 13 8-13 8V4Z',
  instagram:
    'M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5Z M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4Z M17.5 6.5h.01',
  facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z',
  'heart-handshake':
    'M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 12 5 5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z M12 5 9.5 7.5l2.5 2.5 2-2',
  'hand-heart': 'M11 14h2a2 2 0 0 0 0-4H9l-4 4 M3 13l5 5 8-2 5-5 M12 5a2 2 0 1 1 3 3l-3 3-3-3a2 2 0 1 1 3-3Z',
  award: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z m-4 4.5L7 22l5-2 5 2-1-6.5',
}

export default function Icon({
  name,
  size = 20,
  stroke = 2,
  className,
  style,
}: {
  name: string
  size?: number
  stroke?: number
  className?: string
  style?: CSSProperties
}) {
  const d = CAMINHOS[name]
  if (!d) return null
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      style={{ flex: 'none', ...style }}
    >
      {d.split(' M').map((parte, i) => (
        <path key={i} d={i === 0 ? parte : `M${parte}`} />
      ))}
    </svg>
  )
}
