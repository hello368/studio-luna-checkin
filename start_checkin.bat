@echo off
TITLE MedSpa Check-in Server
cd /d "%~dp0"

echo Checking dependencies...
if not exist node_modules (
    echo Installing npm packages...
    call npm.cmd install
)

echo Starting Server...
node server.js
pause
