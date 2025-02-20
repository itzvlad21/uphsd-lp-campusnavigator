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
});

function setupSessionTimeout() {
    let sessionTimeout;
    const TIMEOUT_DURATION = 30 * 60 * 1000;

    function resetSessionTimer() {
        clearTimeout(sessionTimeout);
        sessionTimeout = setTimeout(function() {
            if (sessionStorage.getItem('authToken')) {
                sessionStorage.clear();
                alert('Your session has expired due to inactivity. Please login again.');
                window.location.href = 'index.html';
            }
        }, TIMEOUT_DURATION);
    }

    ['mousemove', 'keypress', 'click', 'scroll'].forEach(event => {
        document.addEventListener(event, resetSessionTimer);
    });

    resetSessionTimer();
}

document.getElementById('start-navigation').addEventListener('click', function() {
    const userType = sessionStorage.getItem('userType');
    
    sessionStorage.setItem('showInstructions', 'true');
    
    document.getElementById('loading-screen').style.display = 'flex';
    
    setTimeout(() => {
        if (userType === 'guest') {
            window.location.href = 'guest.html';
        } else if (userType === 'student') {
            window.location.href = 'student.html';
        } else {
            alert('Session error. Please login again.');
            window.location.href = '/index.html';
        }
    }, 4000);
});

document.getElementById('logout').addEventListener('click', function() {
    sessionStorage.clear();
    
    localStorage.removeItem('userPreferences');
    
    document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    alert('You have been logged out successfully!');
    window.location.href = 'index.html';
});