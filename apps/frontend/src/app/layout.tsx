import type { Metadata } from 'next'
import { Shell } from './_shell'
import NavBar, { WhatsAppFlutuante } from '@/components/ds/NavBar'
import SiteFooter from '@/components/ds/SiteFooter'
import SplashScreen from '@/components/ds/SplashScreen'
import BannerCookies from '@/components/BannerCookies'
import { RESTAURANTE } from '@/lib/restaurante'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bistroancestral.com.br'),
  title: {
    default: 'Bistrô Ancestral | Gastronomia & Cultura | Niterói',
    template: `%s | ${RESTAURANTE.name}`,
  },
  description:
    'O melhor da culinária contemporânea baseada em raízes ancestrais. Uma experiência que te transporta para as raízes da culinária do Brasil.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: RESTAURANTE.name,
    images: [
      {
        url: '/fotos/social-share-pattern.webp',
        alt: `${RESTAURANTE.name}, ${RESTAURANTE.tagline}`,
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
}

/**
 * Chrome compartilhada pelas quatro telas do Ancestral Design System.
 *
 * Cabeçalho, rodapé, WhatsApp flutuante, cortina de entrada e aviso de
 * cookies vivem aqui, no layout, e não em cada página: assim a navegação
 * entre rotas não remonta nada disso, e o estado da gaveta e do splash
 * sobrevive à troca de tela.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell>
      <SplashScreen />
      <NavBar />
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppFlutuante />
      <BannerCookies />
    </Shell>
  )
}
