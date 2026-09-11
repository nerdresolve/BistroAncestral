import type { Metadata } from 'next'
import PoliticaDePrivacidadeView from '@/views/politica-de-privacidade'

/**
 * O endereço legado era /bistroancestral/politicasdeprivacidade/.
 * Aqui vira /politica-de-privacidade, com redirecionamento no servidor.
 */
export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Como o Bistrô Ancestral coleta, usa, compartilha e protege seus dados pessoais, conforme a LGPD.',
  alternates: { canonical: '/politica-de-privacidade' },
  // Página institucional: não deve competir com a home na busca.
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <PoliticaDePrivacidadeView />
  )
}
