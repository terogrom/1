let currentMovieId = null;

function openMovieModal(id) {
    currentMovieId = id;
    const movies = getMoviesData();
    const movie = movies.find(m => m.id == id);
    if (!movie) return;

    // Cache-busting для постера
    const timestamp = Date.now();
    document.getElementById('modalPoster').src = movie.poster + (movie.poster.includes('?') ? '&' : '?') + 'v=' + timestamp;
    document.getElementById('modalTitle').textContent = movie.title;
    document.getElementById('modalMeta').textContent = `${movie.year} • ${movie.type}`;
    document.getElementById('modalRating').innerHTML = `${movie.rating}/10`;
    document.getElementById('modalDescription').textContent = movie.description;

    if (movie.trailer) {
        document.getElementById('modalTrailer').innerHTML = `
            <iframe width="100%" height="315" src="${movie.trailer}" frameborder="0" allowfullscreen></iframe>
        `;
    } else {
        document.getElementById('modalTrailer').innerHTML = '';
    }

    const reviewsHtml = movie.reviews?.map(r => `
        <div class="review">
            <strong>${r.author}</strong> ${r.rating}/10
            <p>${r.text}</p>
        </div>
    `).join('') || '<p>Отзывов пока нет</p>';
    document.getElementById('modalReviews').innerHTML = reviewsHtml;

    const watched = getWatchedMovies();
    const watchedBtn = document.getElementById('watchedBtn');
    watchedBtn.textContent = watched[id] ? 'Убрать из просмотренных' : 'Добавить в просмотренные';
    watchedBtn.classList.toggle('active', !!watched[id]);

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
    watchedBtn.textContent = watched[currentMovieId] ? 'Убрать из просмотренных' : 'Добавить в просмотренные';
    watchedBtn.classList.toggle('active', !!watched[currentMovieId]);
    
    if (document.getElementById('watched').classList.contains('active')) {
        loadWatchedContent();
    }
}

// Закрытие модалок по ESC и клику вне
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('movieModal').style.display === 'flex') closeMovieModal();
        if (document.getElementById('settingsModal').style.display === 'flex') closeSettingsModal();
        if (document.getElementById('authModal').style.display === 'flex') closeAuthModal();
        if (document.getElementById('adminPanel').style.display === 'flex') closeAdminPanel();
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
