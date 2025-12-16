from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from datetime import timedelta

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure JWT
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'mindease_jwt_secret_key_2024')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
jwt = JWTManager(app)

# Connect to MongoDB
client = MongoClient(os.getenv('MONGO_URI', 'mongodb://localhost:27017/'))
db = client['mindease']

# Import routes after app is created to avoid circular imports
from app.routes import auth_routes, journal_routes, mood_routes, counseling_routes, ai_routes

# Register blueprints
app.register_blueprint(auth_routes.bp)
app.register_blueprint(journal_routes.bp)
app.register_blueprint(mood_routes.bp)
app.register_blueprint(counseling_routes.bp)
app.register_blueprint(ai_routes.bp)

# Create a run.py file in the backend directory to start the application
if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 