document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:5000/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                if (data.message === "Login successful") {
                    localStorage.setItem('currentUser', username);
                    window.location.href = 'main.html';
                } else {
                    alert('Login failed, please try again later!');
                }
            } else if (xhr.status === 401) {
                alert('Incorrect username or password!');
            } else {
                console.error('Request failed:', xhr.status);
                alert('Network error, please try again later!');
            }
        };
        
        xhr.onerror = function() {
            console.error('Request error');
            alert('Network error, please try again later!');
        };
        
        xhr.send(JSON.stringify({ username, password }));
    });
});
