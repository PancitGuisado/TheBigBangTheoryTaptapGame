@echo off
adb start-server
timeout /t 1 /nobreak >nul
echo %2| adb pair %1
