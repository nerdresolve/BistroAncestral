/**
 * Dados institucionais do Bistrô Ancestral.
 *
 * Origem: extração do site em produção com Chrome (`extrair.mjs`), que lê o
 * DOM renderizado — e não o HTML-fonte. Foi assim que apareceram os destinos
 * reais dos botões, diferentes dos que o HTML sugeria.
 *
 * DIVERGÊNCIAS DO SITE DE ORIGEM, mantidas como estão até você decidir:
 *   - Reservas: a seção "Como viver essa experiência" fala em grupos de 6 ou
 *     mais; o FAQ, na mesma página, fala em 5 ou mais.
 *   - Horário: o icon-box de contato diz "Sextas de 12hrs às 22h, Aos Sábados
 *     de 12hrs às 22hrs e Domingos de 12hrs às 18hrs"; o FAQ resume como
 *     "Sextas e Sábados de 12hrs às 22h, e Domingos de 12hrs às 18hrs".
 *   - O e-mail da política de privacidade vem ofuscado pelo plugin
 *     ("[email protected]") e não foi recuperável.
 */

export const RESTAURANTE = {
  name: 'Bistrô Ancestral',
  tagline: 'Gastronomia & Cultura',
  city: 'Niterói',
  state: 'RJ',

  address: {
    street: 'R. São Sebastião Lot Eng Mato, 246',
    district: 'Engenho do Mato',
    city: 'Niterói',
    state: 'RJ',
    zip: '24346-190',
    /* Grafia do site: "R. Sao Sebastiao Lot Eng Mato, 246 - Engenho do Mato,
       Niterói - RJ, 24346-190" (sem acento em "Sao Sebastiao"). Acentuado
       aqui conforme sua decisão de corrigir a grafia. */
    full: 'R. São Sebastião Lot Eng Mato, 246 – Engenho do Mato, Niterói – RJ, 24346-190',
  },

  phone: '(21) 97492-7979',

  /**
   * Coordenadas do marcador oficial no Google Maps (parametros !3d/!4d do
   * link resolvido) — e nao o centro do mapa (@), que fica ~260 m deslocado.
   * Alimentam o `geo` do JSON-LD: e o que mais pesa na busca local
   * ("restaurante perto de mim") e no pacote de mapas.
   */
  geo: { lat: -22.9357714, lng: -43.0075508 },

  /** Nome como consta na ficha do Google Meu Negocio. */
  nomeGoogle: 'Bistrô Ancestral Restaurante - Niterói',

  /**
   * O botão do telefone aponta para este encurtador — NÃO para um link
   * `wa.me` montado à mão. Medido no site em produção.
   */
  whatsappLink: 'https://wa.link/1ak96u',
  /** Número em E.164 sem "+", para quando for preciso montar um link novo. */
  whatsapp: '5521974927979',

  hours: {
    sexta: '12hrs às 22h',
    sabado: '12hrs às 22hrs',
    domingo: '12hrs às 18hrs',
    /* Texto integral do icon-box "Horário de Funcionamento". */
    completo:
      'Sextas de 12hrs às 22h, Aos Sábados de 12hrs às 22hrs e Domingos de 12hrs às 18hrs.',
  },

  reservas: {
    minPessoas: 6,
    antecedenciaHoras: 24,
    chegadaAlmoco: '13 h',
    chegadaJantar: '19:30 h',
  },

  numeros: {
    anos: '+2',
    eventos: '+ de 100',
    clientes: '+ de 1000',
  },

  external: {
    /* Medido no botão "Ver endereço no mapa" da home. A página /links usa
       OUTRO link de mapa (BULt3jZ7ncQVAw3R9) — os dois existem no site. */
    maps: 'https://maps.app.goo.gl/MKxZYRMX2R2NYSDYA',
    mapsLinks: 'https://maps.app.goo.gl/BULt3jZ7ncQVAw3R9',
    cardapio:
      'https://www.canva.com/design/DAF6zgN8Hzw/-xgWcEZWlHoRgl0t3VCUiw/view?utm_content=DAF6zgN8Hzw&utm_campaign=designshare&utm_medium=link&utm_source=editor',
    playlist:
      'https://open.spotify.com/playlist/1rRbC0crynaLzaM47j1i1E?si=81C9hVwQTNqfktHbN6VF3w&pi=u-lO4lFi5JR_iq',
    googleReviews: 'https://www.google.com/search?q=bistro+ancestral',
    /* YouTube Short da seção "Como chegar". O player só é montado no clique
       (ver `VideoFacade`), então aqui fica apenas o id. */
    videoComoChegar: 'https://www.youtube-nocookie.com/embed/eGxuIUODxAk',
  },

  /**
   * Âncora da seção da oferta. TODOS os botões "Venha viver essa experiência"
   * do site apontam para cá — e não para o WhatsApp, como parecia.
   */
  /** Id do vídeo do YouTube usado pela fachada em "Como chegar". */
  videoId: 'eGxuIUODxAk',

  ancoraOferta: '#oferta',
} as const

/** Link de WhatsApp com mensagem pré-preenchida, para usos novos. */
export function whatsappHref(mensagem = 'Olá! Gostaria de tirar uma dúvida.') {
  return `https://wa.me/${RESTAURANTE.whatsapp}?text=${encodeURIComponent(mensagem)}`
}
