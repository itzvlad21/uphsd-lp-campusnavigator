document.addEventListener('DOMContentLoaded', function() {
    const token = sessionStorage.getItem('authToken');
    const userType = sessionStorage.getItem('userType');
    
    if (!token || !userType) {
        window.location.href = 'index.html';
        return;
    }

    if (userType === 'student') {
        setupSessionTimeout();
    }

    // Setup logout functionality with modal
    setupLogout();
});

function setupSessionTimeout() {
    let sessionTimeout;
    const TIMEOUT_DURATION = 30 * 60 * 1000;

    function resetSessionTimer() {
        clearTimeout(sessionTimeout);
        sessionTimeout = setTimeout(function() {
            if (sessionStorage.getItem('authToken')) {
                // Show timeout modal instead of alert
                showTimeoutModal();
            }
        }, TIMEOUT_DURATION);
    }

    ['mousemove', 'keypress', 'click', 'scroll'].forEach(event => {
        document.addEventListener(event, resetSessionTimer);
    });

    resetSessionTimer();
}

function showTimeoutModal() {
    // Create and show a session timeout modal
    const timeoutModal = document.createElement('div');
    timeoutModal.className = 'modal';
    timeoutModal.id = 'timeout-modal';
    timeoutModal.style.display = 'flex';
    timeoutModal.innerHTML = `
        <div class="modal-content">
            <h3>Session Expired</h3>
            <p>Your session has expired due to inactivity. Please login again.</p>
            <div class="modal-buttons">
                <button id="timeout-ok" class="primary-button">OK</button>
            </div>
        </div>
    `;
    document.body.appendChild(timeoutModal);

    document.getElementById('timeout-ok').addEventListener('click', function() {
        sessionStorage.clear();
        redirectToLogin();
    });
}

function setupLogout() {
    const logoutBtn = document.getElementById('logout');
    const logoutModal = document.getElementById('logout-modal');
    const cancelLogoutBtn = document.getElementById('cancel-logout');
    const confirmLogoutBtn = document.getElementById('confirm-logout');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (logoutModal) {
                logoutModal.style.display = 'flex';
            }
        });
    }

    if (cancelLogoutBtn) {
        cancelLogoutBtn.addEventListener('click', function() {
            if (logoutModal) {
                logoutModal.style.display = 'none';
            }
        });
    }

    if (confirmLogoutBtn) {
        confirmLogoutBtn.addEventListener('click', function() {
            performLogout();
        });
    }
}

function performLogout() {
    // Clear all session data
    sessionStorage.clear();
    
    // Clear user preferences
    localStorage.removeItem('userPreferences');
    
    // Clear cookies
    document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    // Show transition if element exists
    const pageTransition = document.querySelector('.page-transition');
    if (pageTransition) {
        pageTransition.classList.add('active');
    }
    
    // Redirect with slight delay to allow for transition
    setTimeout(function() {
        redirectToLogin();
    }, 500);
}

function redirectToLogin() {
    window.location.href = 'index.html';
}

document.getElementById('start-navigation').addEventListener('click', function() {
    const userType = sessionStorage.getItem('userType');
    
    sessionStorage.setItem('showInstructions', 'true');
    
    // Show loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
    }
    
    // Show transition if element exists
    const pageTransition = document.querySelector('.page-transition');
    if (pageTransition) {
        pageTransition.classList.add('active');
    }
    
    setTimeout(() => {
        if (userType === 'guest') {
            window.location.href = 'guest.html';
        } else if (userType === 'student') {
            window.location.href = 'student.html';
        } else {
            // Show error modal instead of alert
            showErrorModal('Session error. Please login again.');
        }
    }, 1000);
});

function showErrorModal(message) {
    // Create and show an error modal
    const errorModal = document.createElement('div');
    errorModal.className = 'modal';
    errorModal.id = 'error-modal';
    errorModal.style.display = 'flex';
    errorModal.innerHTML = `
        <div class="modal-content">
            <h3>Error</h3>
            <p>${message}</p>
            <div class="modal-buttons">
                <button id="error-ok" class="primary-button">OK</button>
            </div>
        </div>
    `;
    document.body.appendChild(errorModal);

    document.getElementById('error-ok').addEventListener('click', function() {
        errorModal.remove();
        redirectToLogin();
    });
}
