@echo off
title AmritaNaV Campus Navigation Server
echo ====================================================================
echo        AMRITANAV CAMPUS NAVIGATION SERVER (GPS ^& MOBILE READY)
echo ====================================================================
echo Starting dual HTTP (8000) ^& Secure HTTPS (8443) server...
echo.
echo For Android / Mobile Phone GPS:
echo   Connect phone to same Wi-Fi, then open https://^<your-lan-ip^>:8443
echo   (Accept self-signed certificate: Advanced -^> Proceed)
echo.
echo Opening PC browser at http://localhost:8000...
start http://localhost:8000
python server.py --mode both
pause
