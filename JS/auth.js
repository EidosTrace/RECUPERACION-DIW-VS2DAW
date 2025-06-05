// Cargar users desde localStorage o inicializa array vacío
function loadUsers() {
    const usersJSON = localStorage.getItem('users');
    if (usersJSON) {
        return JSON.parse(usersJSON);
    }
    return [];
}

// Guarda users array localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Valida formato email
function validateEmail(email) {
    const re = /^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$/;
    return re.test(email);
}

// Registra nuevo user
function registerUser(userData) {
    const users = loadUsers();

    // Comprueba si username o email ya existe
    const usernameExists = users.some(u => u.user.username === userData.username);
    if (usernameExists) {
        return { success: false, message: 'Error de sistema: El nombre de usuario ya está en uso. Selecciona otro, por favor.' };
    }
    const emailExists = users.some(u => u.user.email === userData.email);
    if (emailExists) {
        return { success: false, message: 'Error de sistema: Email ya registrado.' };
    }

    // Validar los campos requeridos. La validación es grupal, aunque la podríamos trocear en validaciones independientes o incluso revisar aquí dentro cuál falta,
    // Si queremos dar un feedback más preciso. A gusto del consumidor, imagino...
    if (!userData.username || !userData.password || !userData.email) {
        return { success: false, message: 'Error de sistema: Nombre de usuario, clave y correo electrónico: -REQUERIDOS-' };
    }
    if (!validateEmail(userData.email)) {
        return { success: false, message: 'Error de sistema: Formato del correo electrónico: -NO VÁLIDO-' };
    }

    
    // Crear nuevo objeto usuario con moneda y saldo predeterminados
    const newUser = {
        user: {
            username: userData.username,
            name: userData.name || '',
            lastname: userData.lastname || '',
            password: userData.password,
            email: userData.email,
            phone: userData.phone || '',
            address: userData.address || '',
            balance: 0.00,
            currency: 'EUR',
            NIF: userData.NIF || '',
            bets: []
        }
    };

    users.push(newUser);
    saveUsers(users);

    return { success: true, message: 'Usuario registrado correctamente.' };
}

// Autentificación de usuario:
function authenticateUser(username, password) {
    const users = loadUsers();

    const user = users.find(u => u.user.username === username && u.user.password === password);
    if (user) {
        return { success: true, message: 'Inicio de sesión correcto.', user: user.user };
    } else {
        return { success: false, message: 'Error de sistema: Datos de inicio de sesión: -NO VÁLIDOS-' };
    }
}

// Event listeners para los form (asumiendo que estos son los IDs de los form)
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            const userData = {
                username: formData.get('username'),
                name: formData.get('name'),
                lastname: formData.get('lastname'),
                password: formData.get('password'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                NIF: formData.get('NIF')
            };
            const result = registerUser(userData);
            alert(result.message);
            if (result.success) {
                registerForm.reset();
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const username = formData.get('username');
            const password = formData.get('password');
            const result = authenticateUser(username, password);
            alert(result.message);
            if (result.success) {
                // Redireccionamos o realizazmos actiones post-login aquí:
                console.log('Usuario identificado:', result.user);
            }
        });
    }
});
