@echo off
goto again
:again
    set /p answer=Is the CRES system connected to the computer? (Y/N)
    if /i "%answer:~,1%" EQU "Y" goto run
    if /i "%answer:~,1%" EQU "N" exit /b
    echo Please type Y for Yes or N for No
    goto again

:run
    start startProgram.bat