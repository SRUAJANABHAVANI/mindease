from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.models.user_model import User
from app.controllers.auth_controller import register_user, login_user
from bson import ObjectId
from datetime import datetime

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'student')
    
    if not all([username, email, password]):
        return jsonify({'success': False, 'message': 'All fields are required'}), 400
    
    result = register_user(username, email, password, role)
    
    if not result['success']:
        return jsonify(result), 400
    
    return jsonify(result)

@bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not all([email, password]):
        return jsonify({'success': False, 'message': 'Email and password are required'}), 400
    
    result = login_user(email, password)
    
    if not result['success']:
        return jsonify(result), 401
    
    return jsonify(result) 