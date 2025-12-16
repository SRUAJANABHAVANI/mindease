from app.models.mood_model import Mood

def track_user_mood(user_id, mood, note=None):
    return Mood.create(user_id, mood, note)

def get_user_mood_history(user_id):
    return Mood.get_by_user_id(user_id) 