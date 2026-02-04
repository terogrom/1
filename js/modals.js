// modals.js — полный файл с фиксами для постеров

function getSafePoster(src) {
    if (!src || typeof src !== 'string') {
        return 'img/placeholder-poster.jpg';
    }
    src = src.trim();
    if (src.startsWith('//')) {
        return 'https:' + src;
    }
    if (src.startsWith('http:')) {
        return src.replace('http://', 'https://');
    }
    if (src.includes('yandex.neti?id') && !src.includes('yandex.net/')) {
        src = src.replace('yandex.neti', 'yandex.net/');
    }
    return src;
}

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

    const posterEl = document.getElementById('modalPoster');
    posterEl.src = getSafePoster(movie.poster);
    posterEl.alt = movie.title;
    posterEl.loading = 'lazy';
    posterEl.onerror = function() {
        this.onerror = null;
        this.src = 'img/placeholder-poster.jpg';
    };

    if (movie.trailer) {
        document.getElementById('modalTrailer').innerHTML = `
            <iframe width="100%" height="315" src="${movie.trailer}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    } else {
        document.getElementById('modalTrailer').innerHTML = '';
    }

    // Отзывы
    const reviewsHtml = movie.reviews.length > 0 
        ? movie.reviews.map(r => `
            <div class="review">
                <strong>${r.author}</strong> ${r.rating}/10
                <p>${r.text}</p>
            </div>
        `).join('')
        : '<p>Отзывов пока нет</p>';
    document.getElementById('modalReviews').innerHTML = reviewsHtml;

    // Статус просмотра
    const watched = getWatchedMovies();
    const watchedBtn = document.getElementById('watchedBtn');
    watchedBtn.textContent = watched[id] ? 'Убрать из просмотренных' : 'Отметить как просмотренный';

    // Пользовательская оценка
    const userRatings = getUserRatings();
    document.getElementById('userRatingSelect').value = userRatings[id] || '';
    document.getElementById('userRatingSelect').onchange = function() {
        const rating = this.value;
        const ratings = getUserRatings();
        if (rating) {
            ratings[id] = parseInt(rating);
        } else {
            delete ratings[id];
        }
        saveUserRatings(ratings);
    };

    document.getElementById('movieModal').style.display = 'flex';
}

function closeMovieModal() {
    document.getElementById('movieModal').style.display = 'none';
    currentMovieId = null;
}

function toggleWatched() {
    if (!currentMovieId) return;
    const watched = getWatchedMovies();
    if (watched[currentMovieId]) {
        delete watched[currentMovieId];
    } else {
        watched[currentMovieId] = true;
    }
    saveWatchedMovies(watched);
    const watchedBtn = document.getElementById('watchedBtn');
    watchedBtn.textContent = watched[currentMovieId] ? 'Убрать из просмотренных' : 'Отметить как просмотренный';
    if (document.getElementById('watched').classList.contains('active')) {
        loadWatchedContent();
    }
}

// Закрытие по Escape и клику на фон (оставляем как было)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('movieModal').style.display === 'flex') closeMovieModal();
        if (document.getElementById('settingsModal').style.display === 'flex') closeSettings();
        if (document.getElementById('authModal').style.display === 'flex') closeAuthModal();
    }
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            currentMovieId = null;
        }
    });
});
