@echo off
echo A pause will be appeared among commands to give chance stopping program.
set /p branch=Name of the branch to merge into dev:
set /p work=Working branch:
@rem Change to dev.
git checkout dev
if %errorlevel% NEQ 0 goto bye

@rem Pull dev.
git pull
if %errorlevel% NEQ 0 goto bye

@rem Merge into dev.
git merge %branch%
if %errorlevel% NEQ 0 goto bye

@rem ask for if push.
set /p pushDev=Push dev now?(0=yes)
if %pushDev% EQU 0 git push
if %errorlevel% NEQ 0 goto bye

git checkout %work%
echo Done.0 error(s),0 warning(s)
goto bye

:bye
pause