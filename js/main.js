// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupAuth();
    setupAdminPanel();
    setupSearch();
    setupSettings();
    
    // Загрузить главную страницу
    loadHomeContent();
    
    // Обновить UI авторизации
    updateAuthUI();
});
