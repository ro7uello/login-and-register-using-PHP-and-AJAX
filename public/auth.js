document.addEventListener('DOMContentLoaded', function() {
    // Handle Registration
    const registerForm = document.querySelector('#registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                username: document.querySelector('#username').value,
                email: document.querySelector('#email').value,
                password: document.querySelector('#password').value
            };

            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Registration successful!');
                    window.location.href = '/login.html';
                } else {
                    alert(data.message || 'Registration failed!');
                }
            })
            .catch(error => {
                alert('An error occurred!');
                console.error('Error:', error);
            });
        });
    }

    // Handle Login
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                username: document.querySelector('#username').value,
                password: document.querySelector('#password').value
            };

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Login successful!');
                    // Redirect to dashboard or home page
                } else {
                    alert(data.message || 'Login failed!');
                }
            })
            .catch(error => {
                alert('An error occurred!');
                console.error('Error:', error);
            });
        });
    }
});