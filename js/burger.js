// Элементы DOM
const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-link');
const searchInput = document.getElementById('searchInput');

// Функция открытия/закрытия меню
function toggleMenu() {
    burgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Блокировка скролла при открытом меню
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

// Закрытие меню при клике на ссылку
function closeMenu() {
    burgerBtn.classList.remove('active');
    navMenu.classList.remove('active');
    body.classList.remove('menu-open');
    body.style.overflow = '';
}

// Обработчики событий
burgerBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
});

// Закрытие меню при клике на ссылку
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Закрытие меню при клике вне его
document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !burgerBtn.contains(e.target) && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Закрытие меню при нажатии Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Закрытие меню при изменении ориентации устройства (для мобильных)
window.addEventListener('orientationchange', function() {
    if (navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Адаптация поиска для мобильных
function adaptSearchForMobile() {
    if (window.innerWidth <= 992) {
        // При фокусе на поиск на мобильных, можно добавить специальное поведение
        searchInput.addEventListener('focus', function() {
            if (navMenu.classList.contains('active')) {
                // Прокручиваем к поиску в открытом меню
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    adaptSearchForMobile();
});

// Адаптация при изменении размера окна
window.addEventListener('resize', function() {
    // Автоматическое закрытие меню при переходе на десктоп
    if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
        closeMenu();
    }
    adaptSearchForMobile();
});