let currentUser = null;

function setupAuth() {
    const authBtn = document.getElementById('authBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    authBtn.addEventListener('click', () => {
        document.getElementById('authModal').style.display = 'flex';
    });
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Простая проверка (в реальном проекте - через сервер)
        currentUser = { email };
        updateAuthUI();
        closeAuthModal();
        alert('Вход выполнен успешно!');
    });
    
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }
        
        alert('Регистрация успешна! Теперь войдите.');
        switchAuthTab('login');
    });
}

function updateAuthUI() {
    const authBtn = document.getElementById('authBtn');
    if (currentUser) {
        authBtn.textContent = currentUser.email;
        authBtn.onclick = () => {
            if (confirm('Выйти из аккаунта?')) {
                currentUser = null;
                updateAuthUI();
            }
        };
    } else {
        authBtn.textContent = 'Войти';
        authBtn.onclick = () => {
            document.getElementById('authModal').style.display = 'flex';
        };
    }
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        tabs[1].classList.add('active');
    }
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}
