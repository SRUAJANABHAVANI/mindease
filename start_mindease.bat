@echo off
echo Starting MindEase application...

REM Activate virtual environment
call venv\Scripts\activate

REM Start backend server in a new window
start cmd /k "cd %~dp0 && venv\Scripts\activate && python backend\run.py"

REM Wait a moment for the backend to initialize
timeout /t 3 /nobreak

REM Start frontend server in the current window
python serve_frontend.py

echo MindEase is running!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:8080 