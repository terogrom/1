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

if (movie.trailer) {
document.getElementById('modalTrailer').innerHTML = `
<iframe width="100%" height="315"
src="${movie.trailer}"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen>
</iframe>
`;
} else {
document.getElementById('modalTrailer').innerHTML = '';
}

// Отзывы
const reviewsHtml = movie.reviews.map(r => `
<div class="review">
<strong>${r.author}</strong> (${r.rating}/10)
<p>${r.text}</p>
</div>
`).join('') || '<p>Отзывов пока нет</p>';
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

// Обновляем раздел "Просмотренные" если он открыт
if (document.getElementById('watched').classList.contains('active')) {
loadWatchedContent();
}
}

// Закрытие модальных окон по Escape
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
// Закрываем модальное окно фильма
if (document.getElementById('movieModal').style.display === 'flex') {
closeMovieModal();
}

// Закрываем модальное окно настроек
if (document.getElementById('settingsModal').style.display === 'flex') {
closeSettings();
}

// Закрываем модальное окно авторизации
if (document.getElementById('authModal').style.display === 'flex') {
closeAuthModal();
}
}
});

// Закрытие модальных окон при клике на затемненный фон
document.querySelectorAll('.modal').forEach(modal => {
modal.addEventListener('click', (e) => {
if (e.target === modal) {
modal.style.display = 'none';
currentMovieId = null;
}
});
});
