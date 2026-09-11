import type { MetadataRoute } from 'next'

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bistroancestral.com.br'

/**
 * Sitemap.
 *
 * Seis rotas: as quatro telas do Ancestral Design System (home, cardápio,
 * nossa história, como chegar) mais as duas institucionais herdadas do
 * WordPress (BistroLinks e política de privacidade).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date()
  return [
    { url: `${SITE}/`, lastModified: agora, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE}/cardapio`, lastModified: agora, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/como-chegar`, lastModified: agora, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/nossa-historia`, lastModified: agora, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/links`, lastModified: agora, changeFrequency: 'monthly', priority: 0.8 },
    {
      url: `${SITE}/politica-de-privacidade`,
      lastModified: agora,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
