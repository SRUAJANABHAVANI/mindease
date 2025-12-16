# MindEase Backend

A Flask-based backend for the MindEase application, a student mental health support system.

## Features

- User authentication (register, login)
- Journal entries
- Mood tracking
- Counseling sessions
- AI-powered support

## Prerequisites

- Python 3.8 or higher
- MongoDB (local or Atlas)
- pip (Python package manager)

## Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/mindease.git
cd mindease/backend
```

2. Create a virtual environment:
```
python -m venv venv
```

3. Activate the virtual environment:
- Windows:
```
venv\Scripts\activate
```
- macOS/Linux:
```
source venv/bin/activate
```

4. Install dependencies:
```
pip install -r requirements.txt
```

5. Create a `.env` file in the backend directory with the following content:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mindease
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
AI_API_KEY=your_openai_api_key_here
```

## Running the Application

1. Start the backend server:
```
python run.py
```

2. The server will start on http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user

### Journal
- GET /api/journal - Get all journal entries for the authenticated user
- POST /api/journal - Create a new journal entry

### Mood Tracking
- GET /api/mood/history - Get mood history for the authenticated user
- POST /api/mood - Track a new mood

### Counseling
- GET /api/counseling/sessions - Get counseling sessions for the authenticated user
- POST /api/counseling/request - Request a new counseling session

### AI Support
- POST /api/ai/support - Get AI-powered support

## License

MIT 