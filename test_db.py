from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

def test_mongodb_connection():
    try:
        # Connect to MongoDB
        client = MongoClient(os.getenv('MONGO_URI', 'mongodb://localhost:27017/'))
        
        # Get database
        db = client['mindease']
        
        # Test connection by getting server info
        server_info = client.server_info()
        print("✅ Successfully connected to MongoDB!")
        print(f"Server version: {server_info.get('version', 'unknown')}")
        
        # Test database operations
        test_collection = db['test']
        test_collection.insert_one({"test": "connection"})
        print("✅ Successfully inserted test document")
        
        # Clean up
        test_collection.delete_one({"test": "connection"})
        print("✅ Successfully cleaned up test document")
        
        return True
    except Exception as e:
        print("❌ Failed to connect to MongoDB")
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    test_mongodb_connection() 