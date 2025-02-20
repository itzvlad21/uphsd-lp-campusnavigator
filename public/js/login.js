document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessageElement = document.getElementById('error-message');
    
    if (!errorMessageElement) {
        console.error('Error message element not found');
        return;
    }
    
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    errorMessageElement.textContent = '';
    errorMessageElement.style.display = 'block';
    errorMessageElement.style.color = 'red';
    
    const studentNumberRegex = /^\d{2}-\d{4}-\d{3}$/;
    if (!studentNumberRegex.test(username)) {
        errorMessageElement.textContent = 'Invalid student number format';
        return;
    }

    const defaultPassword = 'UPHSD' + username;
    
    if (password === defaultPassword) {
        sessionStorage.setItem('authToken', 'student-' + Date.now());
        sessionStorage.setItem('userType', 'student');
        window.location.href = 'home.html';
    } else {
        errorMessageElement.textContent = 'Incorrect username or password';
        
        const loginContainer = document.querySelector('.login-container');
        if (loginContainer) {
            loginContainer.classList.add('shake-animation');
            
            setTimeout(() => {
                loginContainer.classList.remove('shake-animation');
            }, 500);
        }
    }
});

document.getElementById('guest-login').addEventListener('click', () => {
    const guestToken = 'guest-' + Date.now();
    sessionStorage.setItem('authToken', guestToken);
    sessionStorage.setItem('userType', 'guest');
    
    window.location.href = 'home.html';
});

window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
});