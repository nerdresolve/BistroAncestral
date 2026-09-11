import type { Metadata } from 'next'
import ComoChegarView from '@/views/como-chegar'

export const metadata: Metadata = {
  title: 'Como chegar',
  description:
    'R. São Sebastião, 246 — Engenho do Mato, Niterói. Sextas e sábados de 12h às 22h, domingos de 12h às 18h. Reservas para grupos pelo WhatsApp.',
  alternates: { canonical: '/como-chegar' },
}

export default function Page() {
  return <ComoChegarView />
}
