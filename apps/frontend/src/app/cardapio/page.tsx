import type { Metadata } from 'next'
import CardapioView from '@/views/cardapio'

export const metadata: Metadata = {
  title: 'Cardápio',
  description:
    'Camarú, Caipora e Terra e Mar: os pratos mais pedidos do Bistrô Ancestral, em Niterói. Culinária contemporânea de raízes ancestrais.',
  alternates: { canonical: '/cardapio' },
}

export default function Page() {
  return <CardapioView />
}
