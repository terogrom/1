function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            
            // Убираем active у всех ссылок
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Скрываем все секции
            document.querySelectorAll('.content-section').forEach(s => {
                s.classList.remove('active');
            });
            
            // Показываем нужную секцию
            document.getElementById(section).classList.add('active');
            
            // Загружаем контент для секции
            if (section === 'movies') {
                loadMoviesContent();
            } else if (section === 'series') {
                loadSeriesContent();
            } else if (section === 'watched') {
                loadWatchedContent();
            } else if (section === 'home') {
                loadHomeContent();
            }
        });
    });
}
