@echo off
set hour=%time:~0,2%
if "%hour:~0,1%" == " " set hour=0%hour:~1,1%
set min=%time:~3,2%
if "%min:~0,1%" == " " set min=0%min:~1,1%
set secs=%time:~6,2%
if "%secs:~0,1%" == " " set secs=0%secs:~1,1%
set Day=%Date:~3,2%
set year=%date:~-4%

set destination=logs\%Day%-%hour%%min%%secs%.log
title %date% %year% - Copying Logs
rem This makes the dir
  break>"%destination%"
xcopy "data\log.txt" "%destination%" /y /q
echo Finished