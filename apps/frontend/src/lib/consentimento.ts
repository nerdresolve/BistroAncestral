/**
 * Consentimento de cookies — fonte única para o banner e para o GTM.
 *
 * ATENÇÃO ao que muda em relação ao site antigo: lá o banner era decorativo.
 * O GTM (`GTM-KTKQZQTP`) carregava junto com a página, antes de qualquer
 * clique, então "Aceitar" não decidia nada. Aqui o GTM só entra DEPOIS do
 * aceite — é o que a LGPD espera de um pedido de consentimento.
 *
 * Consequência prática para a campanha: visitante que recusa não é medido.
 * É o custo de fazer certo; a alternativa é medir quem disse não.
 */

export const CHAVE_COOKIES = 'bistro:cookies'

/** Evento local: `storage` não dispara na aba que escreveu. */
export const EVENTO_CONSENTIMENTO = 'cookies-aceitos'

export type Consentimento = 'aceito' | 'pendente'

export function lerConsentimento(): Consentimento {
  // Em aba anônima o acesso pode lançar; aí tratamos como pendente.
  try {
    return localStorage.getItem(CHAVE_COOKIES) ? 'aceito' : 'pendente'
  } catch {
    return 'pendente'
  }
}

export function aceitarCookies() {
  try {
    localStorage.setItem(CHAVE_COOKIES, '1')
  } catch {}
  window.dispatchEvent(new Event(EVENTO_CONSENTIMENTO))
}

/* ------------------------------------------------------------------ */
/* Eventos de conversão                                                */
/* ------------------------------------------------------------------ */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

/**
 * Ações que levam o visitante ao restaurante físico. São ESTAS que a
 * campanha precisa contar como conversão — não o pageview.
 */
export type EventoConversao =
  | 'clique_whatsapp'
  | 'clique_mapa'
  | 'clique_telefone'
  | 'clique_cardapio'

/**
 * Empurra o evento para o dataLayer. Seguro chamar sempre: se o GTM ainda
 * não carregou (ou o visitante recusou), o array existe e o evento fica lá
 * sem efeito, em vez de quebrar o clique.
 */
export function registrarConversao(evento: EventoConversao, extra?: Record<string, unknown>) {
  try {
    window.dataLayer = window.dataLayer ?? []
    window.dataLayer.push({ event: evento, ...extra })
  } catch {}
}
