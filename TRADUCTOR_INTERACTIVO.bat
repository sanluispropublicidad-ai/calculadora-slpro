@echo off
title SLPRO - ESTACION DE TRADUCCION 33X
mode con: cols=85 lines=30
color 0C
cd /d "%~dp0"
python traductor_33x.py
pause
