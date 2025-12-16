from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.controllers.journal_controller import get_user_journals, create_journal_entry
from bson import ObjectId

bp = Blueprint('journal', __name__, url_prefix='/api/journal')

@bp.route('', methods=['GET'])
@jwt_required()
def get_journals():
    user_id = get_jwt_identity()
    journals = get_user_journals(user_id)
    return jsonify(journals)

@bp.route('', methods=['POST'])
@jwt_required()
def create_journal():
    user_id = get_jwt_identity()
    data = request.json
    content = data.get('content')
    mood = data.get('mood')
    
    if not content:
        return jsonify({'success': False, 'message': 'Content is required'}), 400
    
    result = create_journal_entry(user_id, content, mood)
    
    if not result['success']:
        return jsonify(result), 400
    
    return jsonify(result) 