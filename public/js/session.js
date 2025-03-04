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
            showErrorMessage('Guest users cannot access student-only pages.');
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
    
    // Setup the logout modal and button events
    setupLogoutModal();
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
}

function redirectToLogin() {
    window.location.href = '../../index.html';
}

function setupSessionTimeout() {
    let sessionTimeout;
    const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes

    function resetSessionTimer() {
        clearTimeout(sessionTimeout);
        sessionTimeout = setTimeout(() => {
            showSessionTimeoutModal();
        }, TIMEOUT_DURATION);
    }

    ['mousemove', 'keypress', 'click', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetSessionTimer);
    });

    resetSessionTimer();
}

// Show timeout modal instead of immediately clearing session
function showSessionTimeoutModal() {
    // Create modal if it doesn't exist
    if (!document.getElementById('timeout-modal')) {
        const timeoutModal = document.createElement('div');
        timeoutModal.id = 'timeout-modal';
        timeoutModal.className = 'modal';
        timeoutModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Session Expired</h3>
                </div>
                <div class="modal-body">
                    <p>Your session has expired due to inactivity.</p>
                </div>
                <div class="modal-footer">
                    <button id="timeout-logout-btn" class="button primary-button">Return to Login</button>
                </div>
            </div>
        `;
        document.body.appendChild(timeoutModal);
        
        document.getElementById('timeout-logout-btn').addEventListener('click', function() {
            clearSession();
            redirectToLogin();
        });
    }
    
    // Show the modal
    const timeoutModal = document.getElementById('timeout-modal');
    timeoutModal.style.display = 'flex';
    setTimeout(() => {
        timeoutModal.classList.add('active');
    }, 10);
}

// Setup the logout modal
function setupLogoutModal() {
    // First check if logout modal already exists
    if (!document.getElementById('logout-modal')) {
        // Create the logout modal if it doesn't exist
        const logoutModal = document.createElement('div');
        logoutModal.id = 'logout-modal';
        logoutModal.className = 'modal';
        logoutModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Confirm Logout</h3>
                    <button class="modal-close" id="close-logout-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to logout from Campus Navigator?</p>
                </div>
                <div class="modal-footer">
                    <button id="cancel-logout" class="button secondary-button">Cancel</button>
                    <button id="confirm-logout" class="button primary-button">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(logoutModal);
    }
    
    // Setup event listeners for the logout button
    const logoutBtn = document.getElementById('logout');
    const logoutModal = document.getElementById('logout-modal');
    const cancelLogoutBtn = document.getElementById('cancel-logout');
    const confirmLogoutBtn = document.getElementById('confirm-logout');
    const closeModalBtn = document.getElementById('close-logout-modal');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logoutModal.style.display = 'flex';
            setTimeout(() => {
                logoutModal.classList.add('active');
            }, 10);
        });
    }
    
    // Close modal functions
    function closeModal() {
        logoutModal.classList.remove('active');
        setTimeout(() => {
            logoutModal.style.display = 'none';
        }, 300);
    }
    
    // Close modal when cancel button is clicked
    if (cancelLogoutBtn) {
        cancelLogoutBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when X button is clicked
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    logoutModal.addEventListener('click', function(e) {
        if (e.target === logoutModal) {
            closeModal();
        }
    });
    
    // Perform logout when confirm button is clicked
    if (confirmLogoutBtn) {
        confirmLogoutBtn.addEventListener('click', function() {
            // Clear session storage
            clearSession();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'logout-success';
            successMessage.innerHTML = `
                <div class="logout-success-content">
                    <i class="fas fa-check-circle"></i>
                    <p>Successfully logged out! Redirecting...</p>
                </div>
            `;
            document.body.appendChild(successMessage);
            
            // Redirect after short delay
            setTimeout(() => {
                window.location.href = '../../index.html';
            }, 1500);
        });
    }
}

// Error message with modal instead of alert
function showErrorMessage(message) {
    // Create modal if it doesn't exist
    if (!document.getElementById('error-modal')) {
        const errorModal = document.createElement('div');
        errorModal.id = 'error-modal';
        errorModal.className = 'modal';
        errorModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Error</h3>
                    <button class="modal-close" id="close-error-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p id="error-message-text">${message}</p>
                </div>
                <div class="modal-footer">
                    <button id="error-ok-btn" class="button primary-button">OK</button>
                </div>
            </div>
        `;
        document.body.appendChild(errorModal);
        
        document.getElementById('error-ok-btn').addEventListener('click', function() {
            const errorModal = document.getElementById('error-modal');
            errorModal.classList.remove('active');
            setTimeout(() => {
                errorModal.style.display = 'none';
            }, 300);
        });
        
        document.getElementById('close-error-modal').addEventListener('click', function() {
            const errorModal = document.getElementById('error-modal');
            errorModal.classList.remove('active');
            setTimeout(() => {
                errorModal.style.display = 'none';
            }, 300);
        });
    } else {
        // Update error message
        document.getElementById('error-message-text').textContent = message;
    }
    
    // Show the modal
    const errorModal = document.getElementById('error-modal');
    errorModal.style.display = 'flex';
    setTimeout(() => {
        errorModal.classList.add('active');
    }, 10);
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

// Login form event handlers
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    if (document.getElementById('guest-login')) {
        document.getElementById('guest-login').addEventListener('click', handleGuestLogin);
    }
}
