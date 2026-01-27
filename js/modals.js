let currentMovieId = null;

function openMovieModal(id) {
    currentMovieId = id;
    const movies = getMoviesData();
    const movie = movies.find(m => m.id === id);

    if (!movie) return;

    document.getElementById('modalTitle').textContent = movie.title;
    document.getElementById('modalMeta').textContent = `${movie.year} • ${movie.type}`;
    document.getElementById('modalRating').innerHTML = `⭐ ${movie.rating}/10`;
    document.getElementById('modalDescription').textContent = movie.description;
    document.getElementById('modalPoster').src = movie.poster;

    // ИСПРАВЛЕНИЕ: Правильная обработка трейлера
    const trailerContainer = document.getElementById('modalTrailer');
    if (movie.trailer) {
        // Извлекаем video ID из YouTube URL
        const videoId = extractYouTubeId(movie.trailer);
        if (videoId) {
            trailerContainer.innerHTML = `
                <iframe width="100%" height="315" 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen>
                </iframe>
            `;
        } else {
            trailerContainer.innerHTML = '<p>Ошибка загрузки трейлера</p>';
        }
    } else {
        trailerContainer.innerHTML = '<p class="no-trailer">Трейлер отсутствует</p>';
    }

    // Отзывы
    const reviewsHtml = movie.reviews && movie.reviews.length > 0 
        ? movie.reviews.map(r => `
            <div class="review">
                <strong>${r.author}</strong> (${r.rating}/10)
                <p>${r.text}</p>
            </div>
        `).join('')
        : '<p class="no-reviews">Отзывов пока нет</p>';
    document.getElementById('modalReviews').innerHTML = reviewsHtml;

    // Статус просмотра
    const watched = getWatchedMovies();
    const watchedBtn = document.getElementById('watchedBtn');
    if (watchedBtn) {
        watchedBtn.textContent = watched[id] ? 'Убрать из просмотренных' : 'Отметить как просмотренный';
    }

    // Пользовательская оценка
    const userRatings = getUserRatings();
    const ratingSelect = document.getElementById('userRatingSelect');
    if (ratingSelect) {
        ratingSelect.value = userRatings[id] || '';
        ratingSelect.onchange = function() {
            const rating = this.value;
            const ratings = getUserRatings();
            if (rating) {
                ratings[id] = parseInt(rating);
            } else {
                delete ratings[id];
            }
            saveUserRatings(ratings);
        };
    }

    document.getElementById('movieModal').style.display = 'flex';
}

// НОВАЯ ФУНКЦИЯ: Извлечение YouTube video ID из различных форматов ссылок
function extractYouTubeId(url) {
    if (!url) return null;
    
    // youtube.com/watch?v=VIDEO_ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
        return match[2];
    }
    
    return null;
}

function closeMovieModal() {
    const modalTrailer = document.getElementById('modalTrailer');
    if (modalTrailer) {
        modalTrailer.innerHTML = ''; // Очищаем iframe при закрытии
    }
    
    document.getElementById('movieModal').style.display = 'none';
    currentMovieId = null;
}

function toggleWatched() {
    if (!currentMovieId) return;

    const watched = getWatchedMovies();
    if (watched[currentMovieId]) {
        delete watched[currentMovieId];
    } else {
        watched[currentMovieId] = { watched: true, date: new Date().toISOString() };
    }
    saveWatchedMovies(watched);

    const watchedBtn = document.getElementById('watchedBtn');
    if (watchedBtn) {
        watchedBtn.textContent = watched[currentMovieId] ? 'Убрать из просмотренных' : 'Отметить как просмотренный';
    }

    // Обновляем раздел "Просмотренные" если он открыт
    if (document.getElementById('watched')?.classList.contains('active')) {
        if (typeof loadWatchedContent === 'function') {
            loadWatchedContent();
        }
    }
}

// Закрытие модальных окон по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('movieModal')?.style.display === 'flex') {
            closeMovieModal();
        }
        if (document.getElementById('settingsModal')?.style.display === 'flex') {
            if (typeof closeSettings === 'function') closeSettings();
        }
        if (document.getElementById('authModal')?.style.display === 'flex') {
            if (typeof closeAuthModal === 'function') closeAuthModal();
        }
    }
});

// Закрытие модальных окон при клике на затемненный фон
document.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
            currentMovieId = null;
        }
    });
});
