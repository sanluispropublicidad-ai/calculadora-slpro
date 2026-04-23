@echo off
title SLPRO - ESTACION DE TRADUCCION WEB 33X
mode con: cols=100 lines=30
color 0C
cd /d "%~dp0"

echo [SISTEMA] Iniciando Servidor Proxy en segundo plano...
start /min python servidor_proxy.py

rem Esperar un momento a que el servidor levante
timeout /t 2 /nobreak > nul

echo [SISTEMA] Abriendo Interfaz de Usuario...
start http://localhost:8000

echo.
echo ============================================================
echo TRADUCTOR ELITE 33X - ACTIVO
echo ============================================================
echo No cierres esta ventana mientras uses el traductor.
echo El servidor esta corriendo en http://localhost:8000
echo ============================================================
echo.

pause
taskkill /f /im python.exe
exit
