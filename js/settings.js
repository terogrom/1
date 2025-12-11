let selectedTheme = 'default';

function setupSettings() {
    document.getElementById('settingsBtn').addEventListener('click', () => {
        document.getElementById('settingsModal').style.display = 'flex';
    });

    // Загрузить сохранённую тему
    const savedTheme = localStorage.getItem('theme') || 'default';
    applyTheme(savedTheme);
    selectedTheme = savedTheme;
    
    // Установить активную тему в UI
    updateActiveThemeUI(savedTheme);
}

function selectTheme(theme) {
    selectedTheme = theme;
    updateActiveThemeUI(theme);
}

function updateActiveThemeUI(theme) {
    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.classList.remove('active');
    });
    const activeOption = document.querySelector(`[data-theme="${theme}"]`);
    if (activeOption) {
        activeOption.classList.add('active');
    }
}

function saveSettings() {
    applyTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    closeSettingsModal();
    
    // Создаём красивое уведомление
    showNotification('Настройки сохранены!');
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    selectedTheme = theme;
    
    // Обновляем meta theme-color для мобильных браузеров
    updateMetaThemeColor(theme);
}

function updateMetaThemeColor(theme) {
    let themeColor;
    
    switch(theme) {
        case 'dark':
            themeColor = '#121212';
            break;
        case 'light':
            themeColor = '#f9f9f9';
            break;
        default:
            themeColor = '#0a0a0a';
    }
    
    let metaTag = document.querySelector('meta[name="theme-color"]');
    
    if (metaTag) {
        metaTag.setAttribute('content', themeColor);
    } else {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', 'theme-color');
        metaTag.setAttribute('content', themeColor);
        document.head.appendChild(metaTag);
    }
}

function closeSettingsModal() {
    document.getElementById('settingsModal').style.display = 'none';
}

function showNotification(message) {
    // Создаём элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 15px 25px;
        border-radius: var(--border-radius);
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Добавляем анимацию
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Добавляем возможность переключения темы по клавише (опционально)
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Shift + T для быстрого переключения темы
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        const themes = ['default', 'dark', 'light'];
        const currentIndex = themes.indexOf(selectedTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        applyTheme(themes[nextIndex]);
        localStorage.setItem('theme', themes[nextIndex]);
        showNotification(`Тема изменена: ${getThemeName(themes[nextIndex])}`);
    }
});

function getThemeName(theme) {
    const names = {
        'default': 'Стандартная',
        'dark': 'Тёмная',
        'light': 'Светлая'
    };
    return names[theme] || theme;
}
