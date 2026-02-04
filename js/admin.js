function setupAdminPanel() {
    document.getElementById('adminToggle').addEventListener('click', () => {
        document.getElementById('adminPanel').style.display = 'flex';
        loadAdminMovieList();
    });
}

function loadAdminMovieList() {
    const movies = getMoviesData();
    const list = document.getElementById('adminMovieList');
    list.innerHTML = movies.map(movie => `
        <div class="admin-movie-item">
            <div class="admin-movie-info">
                <strong>${movie.title}</strong> (${movie.year} - ${movie.type})
            </div>
            <div class="admin-actions">
                <button class="btn btn-small" onclick="editMovie(${movie.id})">Изменить</button>
                <button class="btn btn-small btn-danger" onclick="deleteMovie(${movie.id})">Удалить</button>
            </div>
        </div>
    `).join('');
}

function showAddMovieForm() {
    document.getElementById('addMovieForm').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Добавить фильм/сериал';
    document.getElementById('editMovieId').value = '';
    // Очистить форму
    document.querySelectorAll('#addMovieForm input, #addMovieForm textarea, #addMovieForm select').forEach(el => {
        el.value = '';
    });
}

function editMovie(id) {
    const movies = getMoviesData();
    const movie = movies.find(m => m.id == id);
    if (!movie) return;

    document.getElementById('addMovieForm').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Редактировать';
    document.getElementById('editMovieId').value = movie.id;
    document.getElementById('movieTitle').value = movie.title;
    document.getElementById('movieYear').value = movie.year;
    document.getElementById('movieType').value = movie.type;
    document.getElementById('movieGenre').value = movie.genre.join(', ');
    document.getElementById('movieRating').value = movie.rating;
    document.getElementById('movieDescription').value = movie.description;
    document.getElementById('moviePoster').value = movie.poster;
    document.getElementById('movieTrailer').value = movie.trailer;
}

function deleteMovie(id) {
    if (!confirm('Удалить этот фильм?')) return;
    let movies = getMoviesData();
    movies = movies.filter(m => m.id != id);
    adminSaveMoviesData(movies);
    loadAdminMovieList();
    loadMoviesContent();
    loadSeriesContent();
}

function saveMovie() {
    const id = document.getElementById('editMovieId').value;
    const movies = getMoviesData();
    const movieData = {
        title: document.getElementById('movieTitle').value,
        year: parseInt(document.getElementById('movieYear').value),
        type: document.getElementById('movieType').value,
        genre: document.getElementById('movieGenre').value.split(',').map(g => g.trim()).filter(g => g),
        rating: parseFloat(document.getElementById('movieRating').value),
        description: document.getElementById('movieDescription').value,
        poster: document.getElementById('moviePoster').value,
        trailer: document.getElementById('movieTrailer').value,
        reviews: []
    };

    if (id) {
        const index = movies.findIndex(m => m.id == parseInt(id));
        movies[index] = {...movies[index], ...movieData};
    } else {
        movieData.id = Math.max(...movies.map(m => m.id || 0)) + 1;
        movies.push(movieData);
    }

    adminSaveMoviesData(movies);
    cancelMovieForm();
    loadAdminMovieList();
    loadMoviesContent();
    loadSeriesContent();
    alert('✅ Фильм сохранён! Обновите movies-data.json на сервере.');
}

function cancelMovieForm() {
    document.getElementById('addMovieForm').style.display = 'none';
}

function closeAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('addMovieForm').style.display = 'none';
}
