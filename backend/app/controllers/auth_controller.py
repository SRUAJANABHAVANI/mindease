from app.models.user_model import User
from flask_jwt_extended import create_access_token

def register_user(username, email, password, role='student'):
    # Create user
    result = User.create(username, email, password, role)
    
    if not result['success']:
        return result
    
    # Create access token
    user = result['user']
    access_token = create_access_token(identity=user['_id'])
    
    return {
        'success': True,
        'token': access_token,
        'user': user
    }

def login_user(email, password):
    # Find user by email
    user = User.find_by_email(email)
    
    if not user:
        return {'success': False, 'message': 'Invalid credentials'}
    
    # Verify password
    if not User.verify_password(user['password'], password):
        return {'success': False, 'message': 'Invalid credentials'}
    
    # Create access token
    user_id = str(user['_id'])
    access_token = create_access_token(identity=user_id)
    
    # Remove password from response
    del user['password']
    user['_id'] = user_id
    
    return {
        'success': True,
        'token': access_token,
        'user': user
    } 