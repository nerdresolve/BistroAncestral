# Garante o Bistro Ancestral no ar depois que a maquina reinicia.
#
# `restart: unless-stopped` sozinho nao basta nesta maquina: o servico
# com.docker.service esta em Manual, entao quem sobe o Docker e o Docker
# Desktop no logon do usuario. Ate ele terminar de subir, nao existe daemon
# para recriar container nenhum.
#
# Este script espera o daemon responder e so entao levanta a pilha. E
# idempotente: se os containers ja voltaram sozinhos, o `up -d` apenas
# confirma que estao de pe e sai.

$ErrorActionPreference = 'Stop'
$compose = Join-Path $PSScriptRoot 'docker-compose.yml'
$log     = Join-Path $PSScriptRoot 'boot.log'

function Registrar($msg) {
  $linha = ('{0}  {1}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $msg)
  Add-Content -Path $log -Value $linha -Encoding utf8
}

# O Docker Desktop leva algum tempo do logon ate o daemon aceitar conexao.
# Dez minutos de folga cobrem um boot lento sem deixar a tarefa presa para
# sempre caso o Docker nao suba.
$limite = (Get-Date).AddMinutes(10)
Registrar 'aguardando o daemon do Docker'
while ($true) {
  # SilentlyContinue nao basta: o erro do nativo ainda dispara com Stop.
  try { docker info *> $null } catch { }
  if ($LASTEXITCODE -eq 0) { break }
  if ((Get-Date) -gt $limite) {
    Registrar 'ERRO: daemon nao respondeu em 10 min, desistindo'
    exit 1
  }
  Start-Sleep -Seconds 10
}

Registrar 'daemon pronto, subindo a pilha'

# Nada de `2>&1` aqui: no PowerShell 5.1 isso embrulha cada linha de stderr
# de um executavel nativo num ErrorRecord, e o compose escreve o progresso
# normal ('Container ... Started') em stderr. Com ErrorActionPreference em
# Stop, a saida de sucesso derrubava o proprio script. A saida vai para um
# arquivo e de la para o log.
$saida = Join-Path $env:TEMP ('bistro-up-{0}.txt' -f $PID)
$proc = Start-Process -FilePath 'docker' `
                      -ArgumentList @('compose','-f',$compose,'up','-d') `
                      -NoNewWindow -Wait -PassThru `
                      -RedirectStandardOutput $saida `
                      -RedirectStandardError  "$saida.err"
foreach ($f in @($saida, "$saida.err")) {
  if (Test-Path $f) {
    Get-Content $f | Where-Object { $_.Trim() } | ForEach-Object { Registrar $_ }
    Remove-Item $f -Force -ErrorAction SilentlyContinue
  }
}
if ($proc.ExitCode -ne 0) { Registrar ('ERRO: compose up saiu com {0}' -f $proc.ExitCode); exit 1 }

Registrar 'pilha no ar'
