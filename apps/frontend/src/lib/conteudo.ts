/**
 * Conteúdo editorial, extraído do DOM renderizado do site em produção
 * (`extrair.mjs`), não do HTML-fonte.
 *
 * GRAFIA CORRIGIDA conforme sua decisão. Cada correção está anotada com
 * `ORIGINAL:` na linha de cima, para você conferir uma a uma e reverter o
 * que quiser. Nada de conteúdo foi alterado, só ortografia e acentuação.
 */

/**
 * Accordion 1, "Mais pedidos", na seção do cardápio.
 *
 * Cada item traz a SUA foto: no original, abrir o item troca a imagem da
 * coluna ao lado. As fotos foram descobertas clicando item a item, não
 * constam do HTML inicial.
 */
export const DESTAQUES = [
  {
    nome: 'Camarú (P/2)',
    descricao: 'Bobó de camarão com arroz de coco e farofa crocante.',
    foto: '/fotos/namesa-baiana.webp',
    fotoAlt: 'Camarú, bobó de camarão com arroz de coco e farofa',
  },
  {
    nome: 'Caipora',
    descricao:
      'Barriga de porco e risoto finalizado com ervas e demi-glace de redução de porco.',
    foto: '/fotos/prato-caipora.webp',
    fotoAlt: 'Caipora, barriga de porco com risoto',
  },
  {
    // ORIGINAL: "Pastel de fuba recheado com polvo e linguiça de porco"
    nome: 'Terra e Mar',
    descricao:
      'Pastel de fubá recheado com polvo e linguiça de porco, acompanhado de vinagrete.',
    foto: '/fotos/prato-terra-e-mar.webp',
    fotoAlt: 'Terra e Mar, pastel de fubá com polvo e linguiça',
  },
] as const

/** Accordion 2, "Serviços oferecidos:", na seção Comodidade. */
export const SERVICOS = [
  {
    titulo: 'Ambiente Acolhedor & Familiar',
    // ORIGINAL: "lhe trazer as raizes" / "experiência gastronomica"
    descricao:
      'Nosso espaço é pensado para lhe trazer as raízes, lhe fornecer conforto e uma ótima experiência gastronômica.',
    foto: '/fotos/servico-local.webp',
    fotoAlt: 'Salão do Bistrô Ancestral',
  },
  {
    titulo: 'Atendimento Humanizado',
    descricao:
      'Esqueça o afastamento causado por cardápios digitais e todos os inconvenientes correlatos. Nossa equipe está pronta para lhe fornecer a melhor experiência possível de forma pessoal e sincera.',
    foto: '/fotos/servico-atendimento.webp',
    fotoAlt: 'Max e Cláudia, do Bistrô Ancestral',
  },
  {
    titulo: 'Destaque absoluto da região',
    // ORIGINAL: "por isso mesmo a mais de 1 ano em funcionamento ostentamos"
    descricao:
      'Valorizamos e muito sua experiência! Por isso mesmo, há mais de 1 ano em funcionamento, ostentamos avaliação máxima em nossa página do Google. Confira os reviews e venha ser nosso mais novo cliente satisfeito! 🥰',
    foto: '/fotos/destaque.webp',
    fotoAlt: 'Prato servido no Bistrô Ancestral',
  },
] as const

/** Accordion 3, FAQ. */
export const FAQ = [
  {
    pergunta: 'Quais são os horários de funcionamento?',
    resposta:
      'Estamos disponíveis Sextas e Sábados de 12hrs às 22h, e Domingos de 12hrs às 18hrs.',
  },
  {
    pergunta: 'Preciso fazer reserva ou aceitam clientes por ordem de chegada?',
    resposta:
      'Os clientes são recebidos por ordem de chegada. Fazemos reservas apenas para grupos de 5 pessoas ou mais.',
  },
  {
    // ORIGINAL: "Sim! nós trabalhamos com opções vegetarianas"
    pergunta: 'O restaurante possui opções para dietas específicas?',
    resposta:
      'Sim! Nós trabalhamos com opções vegetarianas para grande parte de nosso cardápio.',
  },
  {
    pergunta: 'Quais formas de pagamento são aceitas?',
    resposta:
      'Aceitamos pagamento em Dinheiro, Pix e também cartões de todas as bandeiras nacionais.',
  },
] as const

/** Textos longos da home, na ordem em que aparecem. */
export const TEXTOS = {
  heroTitulo: 'O melhor da culinária contemporânea baseada em raízes ancestrais.',
  heroSubtitulo: 'Sinta o aconchego dos aromas e sabores que remetem às nossas origens.',

  // ORIGINAL: "De uma comida de confortoque te retorna pras suas raizes."
  selo: 'Anos trazendo a Experiência de uma comida de conforto que te retorna para as suas raízes.',

  apresentacao:
    'Cansado do comum? Surpreenda-se com uma experiência que te transporta para as raízes da culinária do Brasil, incluindo elementos da cozinha internacional que compõem a diversidade de nossas tradições e culturas. No Bistrô Ancestral, cada prato é uma viagem no tempo, uma celebração da nossa rica gastronomia, enriquecida por ingredientes e técnicas que atravessaram os oceanos.',

  cardapioSobretitulo: 'conheça nosso cardápio',
  // ORIGINAL: "que você encontra no aqui no Bistrô Ancestral"
  cardapioTitulo: 'As principais atrações que você encontra aqui no Bistrô Ancestral',

  comodidadeSobretitulo: 'Comodidade',
  comodidadeTitulo: 'Um restaurante de tradição',
  // ORIGINAL: "Cada um de nossos pratos trás consigo uma história"
  comodidadeTexto:
    'Localizado na Região Oceânica de Niterói, próximo a áreas verdes preservadas e algumas das mais belas praias do Brasil, nosso objetivo é lhe trazer o conforto da comida de casa, a comida de mãe, de vó. Feita com carinho de verdade, acolhendo você em cada garfada. Cada um de nossos pratos traz consigo uma história, e sempre fazemos com todo amor e cuidado para valorizar sua experiência.',

  comoChegarSobretitulo: 'Como chegar',
  // ORIGINAL: "Venha viver essa experiência grastonômica"
  comoChegarTitulo: 'Venha viver essa experiência gastronômica',
  comoChegarSubtitulo: 'Veja aqui como chegar',

  ofertaTitulo: 'Como viver essa experiência',
  /* ORIGINAL: "Para desfrutar de nossa clunária" e "a c hegada deve ser até
     as 13 h" (a quebra no meio da palavra vinha do próprio HTML). */
  ofertaTexto:
    'Para desfrutar de nossa culinária, basta nos visitar no endereço abaixo no seu horário de preferência. Fazemos reservas para grupos de 6 ou mais pessoas através de nosso contato via WhatsApp. Em caso de reserva, a chegada deve ser até as 13 h para almoço e até as 19:30 h para o jantar.',
  ofertaTexto2: 'As reservas devem ser feitas com antecedência de 24h.',
  ofertaTexto3:
    'Estaremos a sua disposição e prontos para lhe proporcionar uma experiência gastronômica incrível',

  historiaSobretitulo: 'Nossa História',
  // ORIGINAL: "Conheça um pouco mais sobrenossa missão."
  historiaTitulo: 'Conheça um pouco mais sobre nossa missão.',

  faqSobretitulo: 'FICOU COM ALGUMA DÚVIDA?',
  // ORIGINAL: "Confira as dúvidasmais frequentes"
  faqTitulo: 'Confira as dúvidas mais frequentes',

  ctaPadrao: 'Venha viver essa experiência',
} as const

/**
 * Faixa de estatísticas.
 *
 * O número fica separado do texto porque o `CountUp` do design system anima a
 * contagem a partir do zero, precisa do valor como número, não como string.
 * Cada um recebe um dos três tons da marca, na ordem dos ladrilhos do
 * logotipo: dendê, açafrão, folha.
 */
export const ESTATISTICAS = [
  {
    valor: 2,
    prefixo: '+',
    sufixo: ' anos',
    tom: 'dende' as const,
    rotulo: 'de experiência, trazendo a cozinha de tradição para as pessoas.',
  },
  {
    valor: 100,
    prefixo: '+ de ',
    sufixo: '',
    tom: 'acafrao' as const,
    rotulo: 'eventos realizados, com memórias incríveis que nossos clientes sempre irão carregar.',
  },
  {
    valor: 1000,
    prefixo: '+ de ',
    sufixo: '',
    tom: 'folha' as const,
    rotulo:
      'clientes atendidos, com um índice de satisfação extraordinário, comprovando nosso compromisso com você.',
  },
] as const

/** Pop-up da promoção. A frase muda todo mês, é o campo mais editado. */
export const CASHBACK = {
  ativo: true,
  percentual: 10,
  fraseDoMes: 'Família Ancestral',
  observacao: 'Bônus exclusivo para Jantar.',
} as const

/** Banner de cookies (plugin Cookie Notice no WordPress). */
export const COOKIES = {
  texto:
    'Bistrô Ancestral usa cookies para melhorar sua experiência de navegação. Ao clicar em "Aceitar", você concorda com o uso de TODOS os cookies. Detalhes na "Política de Privacidade"',
  aceitar: 'Aceitar',
  link: 'Política de privacidade',
} as const

/** Cartões da página /links (o "BistroLinks", usado na bio do Instagram). */
export const LINKS = [
  {
    titulo: 'WhatsApp e Reservas',
    descricao: 'Entre em contato diretamente pelo WhatsApp e faça sua reserva rapidamente.',
    cta: 'Quero Reservar',
    tipo: 'whatsapp' as const,
  },
  {
    titulo: 'Nosso Cardápio',
    descricao: 'Explore nosso cardápio e descubra as deliciosas opções que preparamos para você.',
    cta: 'Ver Cardápio',
    tipo: 'cardapio' as const,
  },
  {
    titulo: 'Playlist do Ancestral',
    descricao:
      'Preparamos com muito carinho uma playlist especial, inspirada nas raízes da cultura africana.',
    cta: 'Ouvir Playlist',
    tipo: 'playlist' as const,
  },
  {
    titulo: 'Nossa Localização',
    descricao: 'Veja como é fácil nos encontrar e venha nos fazer uma visita presencialmente.',
    cta: 'Ver Localização',
    tipo: 'maps' as const,
  },
] as const
