import json
import os
import hashlib
from getpass import getpass

class LoginSystem:
    def __init__(self):
        self.users_file = "users.json"
        self.users = self.load_users()

    def load_users(self):
        """Load users from the JSON file"""
        if os.path.exists(self.users_file):
            with open(self.users_file, 'r') as f:
                return json.load(f)
        return {}

    def save_users(self):
        """Save users to the JSON file"""
        with open(self.users_file, 'w') as f:
            json.dump(self.users, f, indent=4)

    def hash_password(self, password):
        """Hash the password using SHA-256"""
        return hashlib.sha256(password.encode()).hexdigest()

    def register(self, username, password):
        """Register a new user"""
        if username in self.users:
            return False, "Username already exists!"
        
        hashed_password = self.hash_password(password)
        self.users[username] = hashed_password
        self.save_users()
        return True, "Registration successful!"

    def login(self, username, password):
        """Login a user"""
        if username not in self.users:
            return False, "Username not found!"
        
        hashed_password = self.hash_password(password)
        if self.users[username] == hashed_password:
            return True, "Login successful!"
        return False, "Invalid password!"

def main():
    login_system = LoginSystem()
    
    while True:
        print("\n=== Simple Login System ===")
        print("1. Register")
        print("2. Login")
        print("3. Exit")
        
        choice = input("Enter your choice (1-3): ")
        
        if choice == "1":
            username = input("Enter username: ")
            password = getpass("Enter password: ")
            success, message = login_system.register(username, password)
            print(message)
            
        elif choice == "2":
            username = input("Enter username: ")
            password = getpass("Enter password: ")
            success, message = login_system.login(username, password)
            print(message)
            
        elif choice == "3":
            print("Thank you for using our login system!")
            break
            
        else:
            print("Invalid choice! Please try again.")

if __name__ == "__main__":
    main() 