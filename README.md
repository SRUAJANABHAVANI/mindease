# MindEase - Student Mental Health Support System

MindEase is a comprehensive mental health support system designed specifically for students. It provides accessible and confidential support to help manage stress, anxiety, and other challenges through various features including online counseling, self-help resources, mood tracking, and peer support networks.

## Features

- **User Authentication**: Secure login and registration system
- **Journaling**: Private journal entries with mood tracking
- **Online Counseling**: Schedule and manage counseling sessions
- **Mood Tracking**: Monitor emotional well-being over time
- **AI-Powered Support**: Personalized recommendations and insights
- **Resource Library**: Access to mental health resources and articles
- **Appointment Management**: Easy scheduling and management of counseling sessions

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Modern UI/UX design

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- RESTful API

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mindease.git
cd mindease
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Create a .env file in the backend directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mindease
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
```

4. Start the backend server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile

### Journal
- GET /api/journals - Get all journal entries
- POST /api/journals - Create new journal entry
- GET /api/journals/:id - Get single journal entry
- PUT /api/journals/:id - Update journal entry
- DELETE /api/journals/:id - Delete journal entry

### Appointments
- GET /api/appointments - Get all appointments
- POST /api/appointments - Create new appointment
- GET /api/appointments/:id - Get single appointment
- PUT /api/appointments/:id - Update appointment
- DELETE /api/appointments/:id - Delete appointment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@mindease.com or join our Slack channel.

## Acknowledgments

- Thanks to all contributors who have helped shape MindEase
- Special thanks to the mental health professionals who provided guidance
- Inspired by the need for better mental health support in educational institutions 