from app.models.counseling_model import Counseling

def request_counseling_session(user_id, topic, description):
    return Counseling.create(user_id, topic, description)

def get_user_counseling_sessions(user_id):
    return Counseling.get_by_user_id(user_id) 