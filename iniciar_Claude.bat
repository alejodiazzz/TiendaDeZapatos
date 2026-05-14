@echo off
echo Iniciando proxy de Claude Code...

start "Proxy Claude Code" cmd /k "cd /d C:\Users\ASUS\free-claude-code && uv run uvicorn server:app --host 127.0.0.1 --port 8082"

timeout /t 3 /nobreak >nul

start "Claude Code" cmd /k "set ANTHROPIC_AUTH_TOKEN=freecc && set ANTHROPIC_BASE_URL=http://127.0.0.1:8082 && claude"

echo ¡Listo! Proxy y Claude Code iniciados.