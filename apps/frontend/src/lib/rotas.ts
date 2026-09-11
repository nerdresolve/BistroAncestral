/**
 * Rotas do site, as quatro telas do Ancestral Design System.
 *
 * Fica em `lib/` e não dentro do `NavBar` de propósito: o `NavBar` é
 * componente de CLIENTE, e o rodapé, que é de SERVIDOR, também precisa desta
 * lista. Uma constante exportada de um módulo `'use client'` não atravessa
 * essa fronteira como valor, o servidor recebe só a referência do módulo, e
 * o array chega como `undefined`.
 */
export const ROTAS = [
  { href: '/', rotulo: 'Início' },
  { href: '/cardapio', rotulo: 'Cardápio' },
  { href: '/nossa-historia', rotulo: 'Nossa história' },
  { href: '/como-chegar', rotulo: 'Como chegar' },
] as const
