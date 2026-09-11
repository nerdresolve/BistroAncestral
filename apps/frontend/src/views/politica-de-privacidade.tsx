import Reveal from '@/components/ds/Reveal'
import { PatternBand, SectionLabel } from '@/components/ds/primitivos'
import { RESTAURANTE } from '@/lib/restaurante'

/**
 * Política de Privacidade, transcrita do site legado.
 *
 * O texto é jurídico e foi mantido palavra por palavra — mexer na redação de
 * um documento de LGPD sem revisão não é decisão de migração. As únicas
 * mudanças são estruturais: a numeração virou <section>, as listas viraram
 * <ul>, e o endereço passou a sair de `RESTAURANTE` para não divergir do
 * resto do site.
 *
 * O e-mail de contato ficou de fora: no WordPress ele vinha ofuscado pelo
 * plugin anti-spam ("[email protected]") e não sobreviveu à extração.
 * Precisa ser preenchido antes de publicar — a seção 10 exige um canal.
 *
 * APRESENTAÇÃO refeita sobre o Ancestral Design System. A versão anterior
 * montava o próprio `<SiteHeader />` (hoje o cabeçalho vem do layout, então
 * a página exibia DOIS) e pintava tudo com tokens da paleta antiga —
 * `cinza-600`, `vinho-700` —, que a migração removeu. Sem token, o Tailwind
 * não emite classe nenhuma e o texto saía sem estilo.
 */

const SECOES = [
  {
    titulo: '1. Introdução',
    paragrafos: [
      'O Bistrô Ancestral é o seu controlador de dados de acordo com a LGPD (Lei Geral de Proteção de Dados), ou seja, é a responsável por decidir como seus dados pessoais serão tratados na empresa.',
      'Valorizamos a sua privacidade e estamos comprometidos em proteger os seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos as informações pessoais que você nos fornece ao acessar e usar nossos serviços.',
    ],
  },
  {
    titulo: '2. Coleta de Dados Pessoais',
    paragrafos: ['Coletamos os seguintes dados pessoais:'],
    itens: [
      'Informações de Contato: Nome, endereço de e-mail, número de telefone;',
      'Informações de Pagamento: Detalhes de cartão de crédito ou outros dados de pagamento, conforme necessário;',
      'Informações de Navegação: Dados coletados automaticamente sobre a sua interação com o nosso site, como endereço IP, tipo de navegador, páginas visitadas e tempo gasto nas páginas.',
    ],
  },
  {
    titulo: '3. Uso dos Dados Pessoais',
    paragrafos: ['Utilizamos os seus dados pessoais para:'],
    itens: [
      'Prestação de Serviços: Reservas no restaurante Bistrô Ancestral;',
      'Comunicação: Entrar em contato com você sobre atualizações do curso, suporte ao cliente e outras informações relevantes;',
      'Pagamento: Processar transações de pagamento e gerenciar informações financeiras;',
      'Melhoria de Serviços: Analisar como nossos serviços são utilizados para melhorá-los continuamente.',
    ],
  },
  {
    titulo: '4. Compartilhamento de Dados Pessoais',
    paragrafos: [
      'Não vendemos, trocamos ou transferimos para terceiros os seus dados pessoais sem o seu consentimento, exceto:',
    ],
    itens: [
      'Prestadores de Serviços: Empresas que nos ajudam a operar o nosso site, conduzir nosso negócio ou fornecer serviços a você, desde que essas partes concordem em manter essas informações confidenciais;',
      'Cumprimento da Lei: Quando acreditarmos que a liberação é apropriada para cumprir a lei, fazer cumprir as políticas do nosso site ou proteger os nossos direitos, propriedade ou segurança.',
    ],
  },
  {
    titulo: '5. Proteção de Dados',
    paragrafos: [
      'Implementamos uma variedade de medidas de segurança para manter a segurança dos seus dados pessoais quando você entra, envia ou acessa suas informações pessoais.',
    ],
  },
  {
    titulo: '6. Transferência Internacional de Dados',
    paragrafos: [
      'Os dados coletados com seu consentimento podem ser armazenados fora do país (Brasil), dependendo dos fornecedores que são contratados para suporte as atividades da empresa, mas sempre mantendo os mesmos padrões de segurança para os dados que já são armazenados em nosso servidor próprio.',
    ],
  },
  {
    titulo: '7. Seus Direitos',
    paragrafos: ['Você tem o direito de:'],
    itens: [
      'Confirmar a existência de tratamento de seus dados pessoais;',
      'Acessar os dados pessoais coletados;',
      'Corrigir ou alterar dados incompletos, incorretos ou desatualizados;',
      'Anonimizar (para que ninguém possa associar os dados a você), bloquear e eliminar dados pessoais tratados com o seu consentimento, desde que cumpridos os requisitos legais;',
      'Fazer a portabilidade dos dados para outro fornecedor de serviço ou produto desde que respeitados os direitos e o segredo de negócio do Bistrô Ancestral;',
      'Limitar e se opor ao tratamento de dados;',
      'Revogar o consentimento previamente concedido, nos termos da lei;',
      'Pedir revisão das decisões baseadas unicamente em tratamento automatizado de dados pessoais que afetem seus interesses e obter informações sobre os critérios utilizados para essas decisões automatizadas (algoritmos);',
      'Dentre outros…',
    ],
  },
  {
    titulo: '8. Cookies',
    paragrafos: [
      'Utilizamos cookies para melhorar a sua experiência no nosso site. Cookies são pequenos arquivos que um site ou seu provedor de serviços transfere para o disco rígido do seu computador através do seu navegador da Web (se você permitir). Estes cookies permitem que o site reconheça o seu navegador e capture e lembre certas informações.',
    ],
  },
  {
    titulo: '9. Alterações na Política de Privacidade',
    paragrafos: [
      'Reservamo-nos o direito de atualizar esta Política de Privacidade a qualquer momento. Notificaremos você sobre quaisquer mudanças, publicando a nova Política de Privacidade neste site.',
    ],
  },
] as const

export default function PoliticaDePrivacidadeView() {
  return (
    <>
      {/* Cabeçalho da página: fundo escuro, como as demais telas internas. */}
      <div
        style={{
          background: 'var(--surface-ink)',
          padding: 'var(--gutter) var(--gutter) var(--section-y-tight)',
          marginTop: 'calc(-1 * var(--nav-h, 110px))',
          paddingTop: 'calc(var(--nav-h, 110px) + var(--space-8))',
        }}
      >
        <div className="ds-shell" style={{ padding: 0 }}>
          <Reveal variante="up">
            <SectionLabel tom="folha" inverso>
              Seus dados
            </SectionLabel>
          </Reveal>
          <Reveal variante="curtain" atraso={90}>
            <h1 style={{ color: 'var(--sand-50)', margin: '20px 0 0', maxWidth: '16ch' }}>
              Políticas de
              <br />
              privacidade
            </h1>
          </Reveal>
        </div>
      </div>

      <PatternBand motivo="comb" altura={20} tinta="var(--dende-500)" fundo="var(--sand-50)" />

      <section style={{ background: 'var(--surface-page)', padding: 'var(--section-y) 0' }}>
        {/* `ds-shell` para o corpo nascer no MESMO eixo do <h1> do cabeçalho
            (x = --gutter). Com `container-narrow` centralizado, o título
            começava em 72px e o texto em ~426px — dois eixos diferentes na
            mesma página. A coluna de leitura continua estreita, agora por
            `--measure` no bloco de texto, não por centralização do container. */}
        <div className="ds-shell">
          <div style={{ maxWidth: 'var(--container-narrow)' }}>
          {SECOES.map((secao, i) => (
            <Reveal key={secao.titulo} variante="up" indice={Math.min(i, 3)}>
              <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2
                  style={{
                    fontSize: 'var(--display-sm)',
                    marginBottom: 'var(--space-4)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {secao.titulo}
                </h2>
                {secao.paragrafos.map((paragrafo) => (
                  <p
                    key={paragrafo}
                    style={{
                      color: 'var(--text-secondary)',
                      lineHeight: 'var(--text-leading-loose)',
                      maxWidth: 'var(--measure)',
                    }}
                  >
                    {paragrafo}
                  </p>
                ))}
                {'itens' in secao && secao.itens ? (
                  <ul
                    style={{
                      margin: '0 0 1em',
                      paddingLeft: 22,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                      color: 'var(--text-secondary)',
                      lineHeight: 'var(--text-leading-loose)',
                      maxWidth: 'var(--measure)',
                    }}
                  >
                    {secao.itens.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            </Reveal>
          ))}

          <Reveal variante="up">
            <section>
              <h2
                style={{
                  fontSize: 'var(--display-sm)',
                  marginBottom: 'var(--space-4)',
                  color: 'var(--text-primary)',
                }}
              >
                10. Contato
              </h2>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--text-leading-loose)',
                  maxWidth: 'var(--measure)',
                }}
              >
                Se você tiver alguma dúvida sobre esta Política de Privacidade ou desejar
                exercer qualquer um dos seus direitos, entre em contato conosco:
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--text-leading-loose)',
                }}
              >
                <li>Nome da empresa: {RESTAURANTE.name};</li>
                <li>Telefone / WhatsApp: {RESTAURANTE.phone};</li>
                <li>Endereço: {RESTAURANTE.address.full}.</li>
              </ul>
            </section>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
