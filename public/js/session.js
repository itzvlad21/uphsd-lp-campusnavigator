// session.js
function checkSession() {
    const token = sessionStorage.getItem('authToken');
    const userType = sessionStorage.getItem('userType');

    if (!token) {
        redirectToLogin();
        return false;
    }

    const currentPage = window.location.pathname.split('/').pop();

    if (userType === 'guest') {
        const studentOnlyPages = ['student.html'];
        
        if (studentOnlyPages.includes(currentPage)) {
            alert('Guest users cannot access student-only pages.');
            window.location.href = 'guest.html';
            return false;
        }
    }

    if (userType === 'student') {
        const guestOnlyPages = ['guest.html'];
        
        if (guestOnlyPages.includes(currentPage)) {
            window.location.href = 'student.html';
            return false;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('authToken');
    const userType = sessionStorage.getItem('userType');

    if (!token) {
        redirectToLogin();
        return;
    }

    if (!checkSession()) {
        return;
    }

    if (userType === 'student') {
        setupSessionTimeout();
    }
});

function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp < Date.now() / 1000;
    } catch {
        return true;
    }
}

function clearSession() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('showInstructions');
    redirectToLogin();
}

function redirectToLogin() {
    window.location.href = '../../index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('authToken');
    const userType = sessionStorage.getItem('userType');

    if (!token) {
        redirectToLogin();
        return;
    }

    if (userType === 'student') {
        setupSessionTimeout();
    }
});

function setupSessionTimeout() {
    let sessionTimeout;
    const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes

    function resetSessionTimer() {
        clearTimeout(sessionTimeout);
        sessionTimeout = setTimeout(() => {
            clearSession();
        }, TIMEOUT_DURATION);
    }

    ['mousemove', 'keypress', 'click', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetSessionTimer);
    });

    resetSessionTimer();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkSession,
        clearSession,
        isTokenExpired,
        setupSessionTimeout
    };
}

// Login handler for the login page
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Student login
    fetch('YOUR_API_URL/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            sessionStorage.setItem('authToken', data.token);
            sessionStorage.setItem('userType', 'student');
            window.location.href = 'home.html';
        } else {
            throw new Error('Login failed');
        }
    })
    .catch(error => {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').textContent = error.message;
    });
}

function handleGuestLogin() {
    sessionStorage.setItem('authToken', 'guest-' + Date.now());
    sessionStorage.setItem('userType', 'guest');
    window.location.href = 'home.html';
}

function handleLogout() {
    clearSession();
    alert('You have been logged out successfully!');
    window.location.href = '../../index.html';
}

if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('guest-login').addEventListener('click', handleGuestLogin);
}

if (document.getElementById('logout')) {
    document.getElementById('logout').addEventListener('click', handleLogout);
}