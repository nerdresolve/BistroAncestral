import type { Metadata } from 'next'
import HomeView from '@/views/home'

export const metadata: Metadata = {
  // Título e descrição vêm do site legado, que já ranqueava com eles.
  title: { absolute: 'Bistrô Ancestral | Gastronomia & Cultura | Niterói' },
  description:
    'O melhor da culinária contemporânea baseada em raízes ancestrais. Uma experiência que te transporta para as raízes da culinária do Brasil.',
  alternates: { canonical: '/' },
}

export default function Page() {
  return <HomeView />
}
