import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

/**
 * `eslint-config-next` 16 já exporta flat config pronto, então os presets
 * entram direto na lista.
 *
 * A ponte `FlatCompat` (usada no Coral, que veio de uma versão anterior)
 * quebra aqui: ela passa o preset pelo validador legado do `@eslint/eslintrc`,
 * que faz `JSON.stringify` num objeto onde o plugin `react` se referencia a
 * si mesmo — e estoura "Converting circular structure to JSON" antes de
 * lintar qualquer arquivo.
 */
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
]

export default eslintConfig
