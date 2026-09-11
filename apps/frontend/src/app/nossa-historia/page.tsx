import type { Metadata } from 'next'
import NossaHistoriaView from '@/views/nossa-historia'

export const metadata: Metadata = {
  title: 'Nossa história',
  description:
    'Conheça a missão do Bistrô Ancestral, em Engenho do Mato, Niterói — e ouça de quem cozinha por que cada prato traz consigo uma história.',
  alternates: { canonical: '/nossa-historia' },
}

export default function Page() {
  return <NossaHistoriaView />
}
