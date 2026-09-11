'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'
import { COOKIES } from '@/lib/conteudo'
import { aceitarCookies, EVENTO_CONSENTIMENTO, lerConsentimento } from '@/lib/consentimento'

/**
 * Banner de cookies.
 *
 * No WordPress era o plugin Cookie Notice (`#cn-accept-cookie`), que a
 * primeira versão desta migração deixou de fora por inteiro. O texto e o
 * rótulo do botão são os do site.
 *
 * ATENÇÃO: isto reproduz o aviso, não um mecanismo de consentimento. O
 * banner original também não bloqueava nada — o GTM (`GTM-KTKQZQTP`) carrega
 * antes de qualquer clique. Se a intenção for consentimento de verdade sob a
 * LGPD, os scripts precisam esperar a escolha, e aí isto vira outra coisa.
 */
const store = {
  subscribe(onChange: () => void) {
    window.addEventListener('storage', onChange)
    window.addEventListener(EVENTO_CONSENTIMENTO, onChange)
    return () => {
      window.removeEventListener('storage', onChange)
      window.removeEventListener(EVENTO_CONSENTIMENTO, onChange)
    }
  },
  getSnapshot: () => lerConsentimento() === 'aceito',
  /* No servidor assume aceito para o banner nao piscar no HTML inicial. */
  getServerSnapshot: () => true,
}

export default function BannerCookies() {
  const jaAceitou = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  )

  if (jaAceitou) return null

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[90] px-5 py-4 backdrop-blur"
      style={{ background: 'var(--ink-900)', color: 'var(--text-inverse)' }}
    >
      <div className="container-site flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-center sm:text-left" style={{ fontSize: '14px', lineHeight: '22px' }}>
          {COOKIES.texto}
        </p>
        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            onClick={aceitarCookies}
            className="px-6 py-3 font-bold uppercase transition"
            style={{
              fontSize: '15px',
              lineHeight: 1,
              background: 'var(--action-primary-bg)',
              color: 'var(--action-primary-fg)',
              border: 'var(--border-2) solid var(--ink-900)',
              borderRadius: 'var(--radius-xs)',
              boxShadow: 'var(--shadow-block-sm)',
              letterSpacing: '0.14em',
            }}
          >
            {COOKIES.aceitar}
          </button>
          <Link
            href="/politica-de-privacidade"
            className="underline underline-offset-4"
            style={{ fontSize: '14px', color: 'var(--text-inverse-muted)' }}
          >
            {COOKIES.link}
          </Link>
        </div>
      </div>
    </div>
  )
}
