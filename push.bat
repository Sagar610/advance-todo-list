@echo off
REM Change directory to the repository (optional)
cd /d "%~dp0"

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
