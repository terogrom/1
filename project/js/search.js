function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();

        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const movies = getMoviesData();
        const results = movies.filter(m =>
            m.title.toLowerCase().includes(query) ||
            m.description.toLowerCase().includes(query) ||
            m.genre.some(g => g.toLowerCase().includes(query))
        );

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-item">Ничего не найдено</div>';
            searchResults.style.display = 'block';
            return;
        }

        searchResults.innerHTML = results.map(m => `
            <div class="search-item" onclick="selectMovie(${m.id})">
                <img src="${m.poster}" alt="${m.title}">
                <div>
                    <div class="search-item-title">${m.title}</div>
                    <div class="search-item-meta">${m.year} • ${m.type}</div>
                </div>
            </div>
        `).join('');
        searchResults.style.display = 'block';
    });

    // Закрытие результатов поиска при клике вне области
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    // Закрытие результатов поиска по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchResults.style.display = 'none';
            searchInput.blur(); // Убираем фокус с поля поиска
        }
    });
}

// Функция выбора фильма из результатов поиска
function selectMovie(id) {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    // Очищаем поле поиска
    searchInput.value = '';
    
    // Скрываем результаты поиска
    searchResults.style.display = 'none';
    
    // Открываем модальное окно с фильмом
    openMovieModal(id);
}
