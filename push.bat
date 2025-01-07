@echo off
REM Change directory to the repository (optional)
cd /d "%~dp0"

REM Check if git is initialized
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo This is not a git repository. Initializing git...
    git init
)

REM Check if a remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo No remote repository found.
    set /p remoteUrl=Enter the remote repository URL:
    git remote add origin %remoteUrl%
)

REM Stage all changes
git add .

REM Commit changes with a default message
echo Enter commit message:
if "%commitMsg%"=="" set commitMsg=Auto commit: %date% %time%
set /p commitMsg=
git commit -m "%commitMsg%"

REM Push changes to the remote repository
git push origin master

REM Confirmation message
echo Changes pushed to GitHub successfully!
pause
