import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Mesma escolha do Coral: empacota só o necessário para rodar, sem
  // node_modules, para a imagem Docker ficar pequena.
  output: 'standalone',
  compress: true,

  images: {
    // Mídia ainda servida pelo WordPress durante a migração. As fotos já
    // baixadas vivem em /public, mas o domínio antigo segue no ar e algum
    // link pode apontar para lá até o corte de DNS.
    remotePatterns: [
      { protocol: 'https', hostname: 'bistroancestral.com.br', pathname: '/wp-content/uploads/**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    const base = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
    ]
    return [{ source: '/:path*', headers: base }]
  },
}

export default nextConfig
