from app import db
from bson import ObjectId
from datetime import datetime

class Mood:
    collection = db['mood']
    
    @staticmethod
    def create(user_id, mood, note=None):
        mood_entry = {
            'user_id': ObjectId(user_id),
            'mood': mood,
            'note': note,
            'created_at': datetime.now()
        }
        
        result = Mood.collection.insert_one(mood_entry)
        mood_entry['_id'] = str(result.inserted_id)
        mood_entry['user_id'] = str(mood_entry['user_id'])
        
        return {'success': True, 'mood': mood_entry}
    
    @staticmethod
    def get_by_user_id(user_id):
        try:
            moods = list(Mood.collection.find({'user_id': ObjectId(user_id)}))
            
            # Convert ObjectId to string for JSON serialization
            for mood in moods:
                mood['_id'] = str(mood['_id'])
                mood['user_id'] = str(mood['user_id'])
            
            return {'success': True, 'moods': moods}
        except Exception as e:
            return {'success': False, 'message': str(e)} 