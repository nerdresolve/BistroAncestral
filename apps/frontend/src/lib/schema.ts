import { RESTAURANTE } from './restaurante'

/**
 * Dados estruturados (JSON-LD, schema.org).
 *
 * Descrevem para o buscador o que as páginas já mostram para pessoas: quem é
 * o restaurante, onde fica, quando abre e o que responde no FAQ.
 *
 * Regra que vale para tudo aqui: só afirmar o que a página de fato mostra.
 * Marcar horário ou avaliação que não estão na tela é motivo de penalidade
 * manual, não só de perda de rich result. Por isso NÃO declaramos
 * `aggregateRating`: o site fala em "avaliação máxima no Google", mas não
 * exibe nota nem contagem próprias, então não há o que marcar.
 */

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bistroancestral.com.br'

/** Absolutiza caminhos internos; deixa passar URLs que já são absolutas. */
const abs = (caminho: string) =>
  caminho.startsWith('http') ? caminho : `${SITE}${caminho.startsWith('/') ? '' : '/'}${caminho}`

/** Só entra no JSON o que existe: campos vazios viram ruído para o validador. */
function limpar<T extends Record<string, unknown>>(obj: T): T {
  const saida = {} as T
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined || v === '') continue
    if (Array.isArray(v) && v.length === 0) continue
    saida[k as keyof T] = v as T[keyof T]
  }
  return saida
}

/**
 * O restaurante. Vai uma vez, no layout raiz.
 *
 * `openingHoursSpecification` usa os três dias que o site publica. Sexta e
 * sábado têm a mesma faixa e poderiam ser um item só, mas ficam separados
 * para espelhar exatamente o que está na página.
 */
export function restaurantSchema() {
  return limpar({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE}/#restaurant`,
    name: RESTAURANTE.name,
    description:
      'Culinária contemporânea baseada em raízes ancestrais, na Região Oceânica de Niterói.',
    url: SITE,
    telephone: RESTAURANTE.phone,
    image: abs('/fotos/destaque.webp'),
    logo: abs('/brand/logo.webp'),
    servesCuisine: 'Brasileira',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: RESTAURANTE.address.street,
      addressLocality: RESTAURANTE.address.city,
      addressRegion: RESTAURANTE.address.state,
      postalCode: RESTAURANTE.address.zip,
      addressCountry: 'BR',
    },
    /* Coordenadas: sem elas o buscador depende de geocodificar o endereco
       escrito, o que e menos preciso para o resultado local. */
    geo: {
      '@type': 'GeoCoordinates',
      latitude: RESTAURANTE.geo.lat,
      longitude: RESTAURANTE.geo.lng,
    },
    hasMap: RESTAURANTE.external.maps,
    menu: RESTAURANTE.external.cardapio,
    acceptsReservations: true,
    openingHoursSpecification: [
      { dayOfWeek: 'Friday', opens: '12:00', closes: '22:00' },
      { dayOfWeek: 'Saturday', opens: '12:00', closes: '22:00' },
      { dayOfWeek: 'Sunday', opens: '12:00', closes: '18:00' },
    ].map((d) => ({ '@type': 'OpeningHoursSpecification', ...d })),
  })
}

/** O site em si. Habilita a caixa de busca e o nome próprio no resultado. */
export function websiteSchema() {
  return limpar({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: SITE,
    name: RESTAURANTE.name,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${SITE}/#restaurant` },
  })
}

/** FAQ da home. Só use na página que de fato exibe as perguntas. */
export function faqSchema(itens: ReadonlyArray<{ pergunta: string; resposta: string }>) {
  return limpar({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: itens.map((i) => ({
      '@type': 'Question',
      name: i.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: i.resposta },
    })),
  })
}
