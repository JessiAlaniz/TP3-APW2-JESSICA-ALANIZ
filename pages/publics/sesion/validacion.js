import { validateUser } from "../../../api/user.js";



document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    try {
        const result = await validateUser(email, password);
        sessionStorage.setItem('userId', result.id);
        sessionStorage.setItem('email', result.email);
        sessionStorage.setItem('loginUrl', window.location.href);
        window.location.href = '../../privates/home/home.html'; // Redireccionar a la página principal
    } catch (error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = error.message || 'Error en el servidor. Intente nuevamente más tarde.';
    }
});
