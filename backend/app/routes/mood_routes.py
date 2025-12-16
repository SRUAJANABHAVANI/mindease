from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.controllers.mood_controller import track_user_mood, get_user_mood_history
from bson import ObjectId

bp = Blueprint('mood', __name__, url_prefix='/api/mood')

@bp.route('', methods=['POST'])
@jwt_required()
def track_mood():
    user_id = get_jwt_identity()
    data = request.json
    mood = data.get('mood')
    note = data.get('note')
    
    if not mood:
        return jsonify({'success': False, 'message': 'Mood is required'}), 400
    
    result = track_user_mood(user_id, mood, note)
    
    if not result['success']:
        return jsonify(result), 400
    
    return jsonify(result)

@bp.route('/history', methods=['GET'])
@jwt_required()
def get_mood_history():
    user_id = get_jwt_identity()
    history = get_user_mood_history(user_id)
    return jsonify(history) 