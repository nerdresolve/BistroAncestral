import type { Metadata } from 'next'
import LinksView from '@/views/links'

/**
 * No WordPress esta página vivia em /bistroancestral/bistrolinks/, um
 * caminho herdado da estrutura do tema, sem valor para quem lê. Aqui ela
 * passa a ser /links; o redirecionamento do endereço antigo é feito no
 * servidor, junto com o corte de DNS.
 */
export const metadata: Metadata = {
  title: 'BistroLinks',
  description:
    'Reservas pelo WhatsApp, cardápio, playlist e localização do Bistrô Ancestral em um só lugar.',
  alternates: { canonical: '/links' },
}

export default function Page() {
  return <LinksView />
}
