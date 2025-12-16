from flask import Blueprint, request, jsonify
from app.controllers.ai_controller import get_ai_support_response

bp = Blueprint('ai', __name__, url_prefix='/api/ai')

@bp.route('/support', methods=['POST'])
def get_support():
    data = request.json
    message = data.get('message')
    
    if not message:
        return jsonify({'success': False, 'message': 'Message is required'}), 400
    
    response = get_ai_support_response(message)
    
    if not response['success']:
        return jsonify(response), 400
    
    return jsonify(response) 