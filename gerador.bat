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

REM Executa o script Node.js usando o executável portátil
REM %~dp0 é uma variável especial que significa "a pasta onde este .bat está"
"%~dp0\node\node.exe" "%~dp0\app\index.js"

REM Mensagem de finalização (opcional, pois o script node já loga)
REM echo.
REM echo Processo finalizado! Verifique a pasta 'outputs'.

REM Pausa o script para que o usuário possa ler a saída antes de fechar
REM pause

REM Fecha a janela do console
exit