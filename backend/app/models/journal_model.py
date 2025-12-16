from app import db
from bson import ObjectId
from datetime import datetime

class Journal:
    collection = db['journals']
    
    @staticmethod
    def create(user_id, content, mood=None):
        journal = {
            'user_id': ObjectId(user_id),
            'content': content,
            'mood': mood,
            'created_at': datetime.now()
        }
        
        result = Journal.collection.insert_one(journal)
        journal['_id'] = str(result.inserted_id)
        journal['user_id'] = str(journal['user_id'])
        
        return {'success': True, 'journal': journal}
    
    @staticmethod
    def get_by_user_id(user_id):
        try:
            journals = list(Journal.collection.find({'user_id': ObjectId(user_id)}))
            
            # Convert ObjectId to string for JSON serialization
            for journal in journals:
                journal['_id'] = str(journal['_id'])
                journal['user_id'] = str(journal['user_id'])
            
            return {'success': True, 'journals': journals}
        except Exception as e:
            return {'success': False, 'message': str(e)} 