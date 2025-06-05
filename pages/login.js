document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');

        
        const result = authenticateUser(username, password);
        alert(result.message);
        if (result.success) {
            
            window.location.href = 'profile.html';
        }
    });
});
