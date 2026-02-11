@echo off
TITLE Push to GitHub
cd /d "%~dp0"

echo ========================================================
echo  🚀 UPLOADING TO GITHUB
echo ========================================================
echo.
echo We are about to upload your Studio Luna app to GitHub.
echo.
echo 1. If a window pops up asking to sign in, please sign in.
echo 2. If it asks for a username/password in this window:
echo    - Use your GitHub Username
echo    - For Password, use a PERSONAL ACCESS TOKEN (not your login password)
echo.

echo Adding files...
git add .

echo Committing changes...
git commit -m "Ready for Vercel Deployment"

echo Pushing to GitHub...
git push -u origin main

echo.
if %errorlevel% neq 0 (
    echo [ERROR] Upload failed. Please check your internet or credentials.
) else (
    echo [SUCCESS] Code is now on GitHub! You can deploy on Vercel.
)
echo.
pause
