'use client'

import Script from 'next/script'
import { useCallback, useSyncExternalStore } from 'react'
import { EVENTO_CONSENTIMENTO, lerConsentimento } from '@/lib/consentimento'

/**
 * Google Tag Manager, carregado SOMENTE após o aceite de cookies.
 *
 * O contêiner é o mesmo do site em WordPress (`GTM-KTKQZQTP`), então as tags
 * e conversões já configuradas no painel seguem valendo — a diferença é o
 * momento da carga: lá o GTM subia antes de qualquer clique, aqui espera o
 * consentimento.
 *
 * `strategy="afterInteractive"`: o GTM não pode bloquear a pintura da página.
 * Como ele só entra depois de um clique do visitante, a carga inicial (que é
 * a que o Lighthouse mede e a que a campanha paga) não carrega JS de
 * terceiro nenhum.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? ''

const store = {
  subscribe(onChange: () => void) {
    window.addEventListener(EVENTO_CONSENTIMENTO, onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener(EVENTO_CONSENTIMENTO, onChange)
      window.removeEventListener('storage', onChange)
    }
  },
  getSnapshot: () => lerConsentimento() === 'aceito',
  /* No servidor não há como saber: assume "não aceito" para o HTML servido
     nunca conter a tag. */
  getServerSnapshot: () => false,
}

export default function Gtm() {
  const aceitou = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot)

  const aoCarregar = useCallback(() => {
    // O dataLayer precisa existir antes do GTM ler: eventos disparados
    // enquanto o visitante ainda não tinha aceitado ficam na fila e são
    // processados agora.
    window.dataLayer = window.dataLayer ?? []
  }, [])

  if (!GTM_ID || !aceitou) return null

  return (
    <>
      <Script
        id="gtm"
        strategy="afterInteractive"
        onLoad={aoCarregar}
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
      {/* O <noscript> do GTM é um iframe de rastreamento: só faz sentido para
          quem está sem JavaScript, e mesmo assim depois do aceite. */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  )
}
