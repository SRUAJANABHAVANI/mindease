import os
import openai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure OpenAI
openai.api_key = os.getenv('AI_API_KEY')

def get_ai_support_response(message):
    try:
        # In a real app, this would call the OpenAI API
        # For now, return a simple response
        response = {
            'success': True,
            'message': f"I understand you're feeling {message}. Remember that it's okay to feel this way. Would you like to talk more about it?",
            'suggestions': [
                "Try taking a deep breath",
                "Write down your thoughts",
                "Talk to someone you trust"
            ]
        }
        
        return response
    except Exception as e:
        return {'success': False, 'message': str(e)} 