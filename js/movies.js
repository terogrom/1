// movies.js — полный файл с фиксами для постеров

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
    // Фикс битых URL (добавляем / если сломано)
    if (src.includes('yandex.neti?id') && !src.includes('yandex.net/')) {
        src = src.replace('yandex.neti', 'yandex.net/');
    }
    return src;
}

function createMovieCard(movie) {
    const safePoster = getSafePoster(movie.poster);
    return `
        <div class="movie-card" onclick="openMovieModal(${movie.id})">
            <img src="${safePoster}" 
                 alt="${movie.title}" 
                 class="movie-poster"
                 loading="lazy"
                 onerror="this.onerror=null; this.src='img/placeholder-poster.jpg';">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">${movie.year} • ${movie.type}</div>
                <div class="movie-genre">${movie.genre.join(', ')}</div>
                <div class="movie-rating">${movie.rating}/10</div>
            </div>
        </div>
    `;
}

let currentFilter = {
    movies: 'all',
    series: 'all'
};

function loadHomeContent() {
    const container = document.getElementById('home-content');
    const movies = getMoviesData();
    container.innerHTML = `
        <h2>Популярные фильмы</h2>
        <div class="movies-grid">
            ${movies.filter(m => m.type === 'movie').slice(0, 4).map(createMovieCard).join('')}
        </div>
        <h2>Популярные сериалы</h2>
        <div class="movies-grid">
            ${movies.filter(m => m.type === 'series').slice(0, 4).map(createMovieCard).join('')}
        </div>
    `;
}

function loadMoviesContent() {
    const movies = getMoviesData();
    const filtered = movies.filter(m => m.type === 'movie');
    const container = document.getElementById('movies-content');
    container.innerHTML = filtered.map(createMovieCard).join('');
}

function loadSeriesContent() {
    const movies = getMoviesData();
    const filtered = movies.filter(m => m.type === 'series');
    const container = document.getElementById('series-content');
    container.innerHTML = filtered.map(createMovieCard).join('');
}

function loadWatchedContent() {
    const watched = getWatchedMovies();
    const movies = getMoviesData();
    const watchedMovies = movies.filter(m => watched[m.id]);
    const container = document.getElementById('watched-content');
    if (watchedMovies.length === 0) {
        container.innerHTML = '<p>Вы ещё ничего не отметили как просмотренное.</p>';
    } else {
        container.innerHTML = watchedMovies.map(createMovieCard).join('');
    }
}
