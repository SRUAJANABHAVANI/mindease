from app import db
from bson import ObjectId
import bcrypt
from datetime import datetime

class User:
    collection = db['users']
    
    @staticmethod
    def create(username, email, password, role='student'):
        # Check if user already exists
        if User.collection.find_one({'email': email}):
            return {'success': False, 'message': 'Email already registered'}
        
        # Hash the password
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        
        # Create user document
        user = {
            'username': username,
            'email': email,
            'password': hashed_password,
            'role': role,
            'created_at': datetime.now()
        }
        
        # Insert user into database
        result = User.collection.insert_one(user)
        user['_id'] = str(result.inserted_id)
        
        # Remove password from response
        del user['password']
        
        return {'success': True, 'user': user}
    
    @staticmethod
    def find_by_email(email):
        return User.collection.find_one({'email': email})
    
    @staticmethod
    def verify_password(stored_password, provided_password):
        return bcrypt.checkpw(provided_password.encode('utf-8'), stored_password)
    
    @staticmethod
    def get_by_id(user_id):
        try:
            user = User.collection.find_one({'_id': ObjectId(user_id)})
            if user:
                user['_id'] = str(user['_id'])
                del user['password']
            return user
        except:
            return None 