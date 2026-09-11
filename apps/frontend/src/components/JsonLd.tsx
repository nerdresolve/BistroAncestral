/**
 * Injeta JSON-LD no documento.
 *
 * Aceita um objeto ou uma lista: o layout raiz manda restaurante + site
 * juntos, e cada `<script type="application/ld+json">` sai separado, que é
 * como o validador do Google espera.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const blocos = Array.isArray(data) ? data : [data]
  return (
    <>
      {blocos.map((bloco, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bloco) }}
        />
      ))}
    </>
  )
}
