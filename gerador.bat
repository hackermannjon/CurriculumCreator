@echo off
REM Define o título da janela do console
TITLE Gerador de Curriculo

REM Limpa a tela
cls

REM Exibe uma mensagem inicial para o usuário
echo.
echo =======================================================
echo     INICIANDO O GERADOR DE CURRICULOS EM PDF
echo =======================================================
echo.
echo Por favor, aguarde enquanto o processo e executado...
echo Esta janela se fechara ao final.
echo.

REM Define variáveis de ambiente para automação
set npm_config_yes=true
set CI=true

echo 🚀 Iniciando geracao dos PDFs...
echo.

REM Executa o script Node.js usando o executável portátil
REM %~dp0 é uma variável especial que significa "a pasta onde este .bat está"
"%~dp0\node\node.exe" "%~dp0\app\index.js"

REM Verifica se houve erro na execução
if errorlevel 1 (
    echo.
    echo ❌ Houve um erro durante a execucao.
    echo Verifique os arquivos JSON na pasta 'inputs' e tente novamente.
    pause
) else (
    echo.
    echo ✅ Processo concluido com sucesso!
    echo Verifique a pasta 'outputs' para os PDFs gerados.
)

REM Fecha a janela do console
exit