// API Service
window.api = {
    baseUrl: 'http://localhost:5000/api',
    
    // Authentication methods
    async login(email, password) {
        try {
            const response = await fetch(`${this.baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Login failed');
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    
    async register(username, email, password, role) {
        try {
            const response = await fetch(`${this.baseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password, role })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Registration failed');
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    
    isAuthenticated() {
        return !!localStorage.getItem('token');
    },
    
    getToken() {
        return localStorage.getItem('token');
    },
    
    // Journal methods
    async createJournalEntry(content, mood) {
        try {
            const response = await fetch(`${this.baseUrl}/journal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`
                },
                body: JSON.stringify({ content, mood })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create journal entry');
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    
    async getJournalEntries() {
        try {
            const response = await fetch(`${this.baseUrl}/journal`, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to fetch journal entries');
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    
    // Mood tracking methods
    async trackMood(mood, note) {
        try {
            const response = await fetch(`${this.baseUrl}/mood`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`
                },
                body: JSON.stringify({ mood, note })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to track mood');
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    
    async getMoodHistory() {
        try {
            const response = await fetch(`${this.baseUrl}/mood/history`, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to fetch mood history');
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    
    // Counseling methods
    async requestCounseling(topic, description) {
        try {
            const response = await fetch(`${this.baseUrl}/counseling/request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`
                },
                body: JSON.stringify({ topic, description })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to request counseling');
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    
    async getCounselingSessions() {
        try {
            const response = await fetch(`${this.baseUrl}/counseling/sessions`, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to fetch counseling sessions');
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    
    // AI Support methods
    async getAISupport(message) {
        try {
            const response = await fetch(`${this.baseUrl}/ai/support`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to get AI support');
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}; 