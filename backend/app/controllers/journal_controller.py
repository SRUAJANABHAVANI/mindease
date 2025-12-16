from app.models.journal_model import Journal

def create_journal_entry(user_id, content, mood=None):
    return Journal.create(user_id, content, mood)

def get_user_journals(user_id):
    return Journal.get_by_user_id(user_id) 