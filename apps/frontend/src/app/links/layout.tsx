/**
 * Layout próprio do BistroLinks.
 *
 * A página vive na bio do Instagram: é tela de destino, onde cabeçalho,
 * rodapé e botão flutuante só disputariam o clique com os quatro cartões.
 * Este layout aninhado substitui a chrome do layout raiz, sem ele, a rota
 * herdaria `NavBar`, `SiteFooter` e o WhatsApp flutuante.
 *
 * O aviso de cookies continua vindo da raiz, porque é exigência legal em
 * qualquer página, não decoração.
 */
export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
