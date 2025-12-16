// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const authButtons = document.getElementById('authButtons');
const userProfile = document.getElementById('userProfile');
const userName = document.getElementById('userName');
const closeButtons = document.querySelectorAll('.close');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const getStartedBtn = document.getElementById('getStartedBtn');

// Event Listeners
loginBtn.addEventListener('click', () => showModal(loginModal));
registerBtn.addEventListener('click', () => showModal(registerModal));
logoutBtn.addEventListener('click', handleLogout);
closeButtons.forEach(btn => btn.addEventListener('click', () => hideModals()));
switchToRegister.addEventListener('click', () => {
    hideModal(loginModal);
    showModal(registerModal);
});
switchToLogin.addEventListener('click', () => {
    hideModal(registerModal);
    showModal(loginModal);
});
loginForm.addEventListener('submit', handleLogin);
registerForm.addEventListener('submit', handleRegister);
getStartedBtn.addEventListener('click', () => {
    if (!window.api.isAuthenticated()) {
        showModal(loginModal);
    } else {
        window.location.href = 'journal.html';
    }
});

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', checkAuthStatus);

// Functions
function showModal(modal) {
    modal.style.display = 'block';
}

function hideModal(modal) {
    modal.style.display = 'none';
}

function hideModals() {
    hideModal(loginModal);
    hideModal(registerModal);
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await window.api.login(email, password);
        if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            updateUIForLoggedInUser(response.user);
            hideModals();
            showNotification('Successfully logged in!', 'success');
        }
    } catch (error) {
        showNotification(error.message || 'Login failed. Please try again.', 'error');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole').value;

    try {
        const response = await window.api.register(username, email, password, role);
        if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            updateUIForLoggedInUser(response.user);
            hideModals();
            showNotification('Successfully registered!', 'success');
        }
    } catch (error) {
        showNotification(error.message || 'Registration failed. Please try again.', 'error');
    }
}

function handleLogout() {
    window.api.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    updateUIForLoggedOutUser();
    showNotification('Successfully logged out!', 'success');
}

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Hide modals by default
    hideModals();
    
    if (token && user) {
        updateUIForLoggedInUser(user);
    } else {
        updateUIForLoggedOutUser();
    }
}

function updateUIForLoggedInUser(user) {
    authButtons.style.display = 'none';
    userProfile.style.display = 'flex';
    userName.textContent = user.username;
}

function updateUIForLoggedOutUser() {
    authButtons.style.display = 'flex';
    userProfile.style.display = 'none';
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add some basic styles for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
    }
    
    .notification.success {
        background-color: #4CAF50;
    }
    
    .notification.error {
        background-color: #f44336;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 