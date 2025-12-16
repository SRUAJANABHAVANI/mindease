from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.controllers.counseling_controller import request_counseling_session, get_user_counseling_sessions
from bson import ObjectId

bp = Blueprint('counseling', __name__, url_prefix='/api/counseling')

@bp.route('/request', methods=['POST'])
@jwt_required()
def request_counseling():
    user_id = get_jwt_identity()
    data = request.json
    topic = data.get('topic')
    description = data.get('description')
    
    if not all([topic, description]):
        return jsonify({'success': False, 'message': 'Topic and description are required'}), 400
    
    result = request_counseling_session(user_id, topic, description)
    
    if not result['success']:
        return jsonify(result), 400
    
    return jsonify(result)

@bp.route('/sessions', methods=['GET'])
@jwt_required()
def get_sessions():
    user_id = get_jwt_identity()
    sessions = get_user_counseling_sessions(user_id)
    return jsonify(sessions) 