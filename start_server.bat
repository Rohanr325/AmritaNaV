@echo off
echo ========================================================
echo Starting AmritaNaV Local Web Server...
echo ========================================================
echo Modern browsers (Chrome, Edge, Firefox) enable live GPS
echo permissions when served via http://localhost!
echo.
start http://localhost:8000
python -m http.server 8000
pause
