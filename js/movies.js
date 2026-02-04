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
            ${movies.filter(m => m.type === 'фильм').slice(0, 4).map(createMovieCard).join('')}
        </div>
        <h2>Популярные сериалы</h2>
        <div class="movies-grid">
            ${movies.filter(m => m.type === 'сериал').slice(0, 4).map(createMovieCard).join('')}
        </div>
    `;
}

function loadMoviesContent() {
    const movies = getMoviesData();
    const filtered = movies.filter(m => m.type === 'фильм');
    
    const container = document.getElementById('movies-content');
    container.innerHTML = filtered.map(createMovieCard).join('');
}

function loadSeriesContent() {
    const movies = getMoviesData();
    const filtered = movies.filter(m => m.type === 'сериал');
    
    const container = document.getElementById('series-content');
    container.innerHTML = filtered.map(createMovieCard).join('');
}

function loadWatchedContent() {
    const watched = getWatchedMovies();
    const movies = getMoviesData();
    const watchedMovies = movies.filter(m => watched[m.id]);
    
    const container = document.getElementById('watched-content');
    if (watchedMovies.length === 0) {
        container.innerHTML = '<p>Вы ещё не отметили ни одного фильма как просмотренный</p>';
    } else {
        container.innerHTML = watchedMovies.map(createMovieCard).join('');
    }
}

function createMovieCard(movie) {
    return `
        <div class="movie-card" onclick="openMovieModal(${movie.id})">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">${movie.year} • ${movie.type}</div>
                <div class="movie-genre">${movie.genre.join(', ')}</div>
                <div class="movie-rating">⭐ ${movie.rating}/10</div>
            </div>
        </div>
    `;
}
