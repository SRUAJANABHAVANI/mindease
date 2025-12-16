from app import db
from bson import ObjectId
from datetime import datetime

class Counseling:
    collection = db['counseling']
    
    @staticmethod
    def create(user_id, topic, description):
        session = {
            'user_id': ObjectId(user_id),
            'topic': topic,
            'description': description,
            'status': 'pending',
            'created_at': datetime.now()
        }
        
        result = Counseling.collection.insert_one(session)
        session['_id'] = str(result.inserted_id)
        session['user_id'] = str(session['user_id'])
        
        return {'success': True, 'session': session}
    
    @staticmethod
    def get_by_user_id(user_id):
        try:
            sessions = list(Counseling.collection.find({'user_id': ObjectId(user_id)}))
            
            # Convert ObjectId to string for JSON serialization
            for session in sessions:
                session['_id'] = str(session['_id'])
                session['user_id'] = str(session['user_id'])
            
            return {'success': True, 'sessions': sessions}
        except Exception as e:
            return {'success': False, 'message': str(e)} 