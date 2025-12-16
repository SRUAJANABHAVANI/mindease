# Simple Login System

A basic username/password authentication system implemented in Python. This system provides user registration and login functionality with secure password hashing.

## Features

- User registration with username and password
- Secure password hashing using SHA-256
- User login with credentials verification
- Persistent storage of user data in JSON format
- Simple command-line interface

## Requirements

- Python 3.x
- No additional packages required (uses only standard library)

## How to Use

1. Run the program:
   ```
   python login_system.py
   ```

2. Choose from the following options:
   - Register (1): Create a new account
   - Login (2): Sign in with existing credentials
   - Exit (3): Close the program

3. Follow the prompts to enter your username and password

## Security Features

- Passwords are hashed using SHA-256 before storage
- Passwords are not displayed when typing (using getpass)
- User data is stored in a JSON file (users.json)

## File Structure

- `login_system.py`: Main program file
- `users.json`: Database file for storing user credentials (created automatically)
- `README.md`: This documentation file

## Note

This is a basic implementation for educational purposes. For production use, consider adding:
- Password complexity requirements
- Account recovery options
- Session management
- More secure storage methods
- Input validation
- Rate limiting 