@echo off
echo A pause will be appeared among commands to give chance stopping program.
set /p now=Working branch name:
set /p target=Target branch name:

@rem change to target branch
git checkout %target%
if %errorlevel% NEQ 0 goto bye

@rem update target branch
git pull
if %errorlevel% NEQ 0 goto bye

@rem change to working branch
git checkout %now%
if %errorlevel% NEQ 0 goto bye

@rem REBASE to target branch
git rebase %target%
if %errorlevel% NEQ 0 goto bye

@rem change to working branch
git checkout %target%
if %errorlevel% NEQ 0 goto bye

@rem merge target branch into working branch
git merge %now%
if %errorlevel% NEQ 0 goto bye

@rem push the target
git push
if %errorlevel% NEQ 0 goto bye

echo Done.0 error(s),0 warning(s)
goto bye

:bye
pause