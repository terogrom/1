// admin.js - Панель администратора с автосохранением в GitHub

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
                <strong>${movie.title}</strong> (${movie.year}) - ${movie.type}
            </div>
            <div class="admin-actions">
                <button class="btn btn-small" onclick="editMovie(${movie.id})">✏️ Редактировать</button>
                <button class="btn btn-small btn-danger" onclick="deleteMovie(${movie.id})">🗑️ Удалить</button>
            </div>
        </div>
    `).join('');
}

function showAddMovieForm() {
    document.getElementById('addMovieForm').style.display = 'block';
    document.getElementById('editMovieId').value = '';
    document.getElementById('movieTitle').value = '';
    document.getElementById('movieYear').value = '';
    document.getElementById('movieType').value = 'фильм';
    document.getElementById('movieGenre').value = '';
    document.getElementById('movieRating').value = '';
    document.getElementById('movieDescription').value = '';
    document.getElementById('moviePoster').value = '';
    document.getElementById('movieTrailer').value = '';
}

function editMovie(id) {
    const movies = getMoviesData();
    const movie = movies.find(m => m.id === id);
    if (!movie) return;

    document.getElementById('addMovieForm').style.display = 'block';
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

async function deleteMovie(id) {
    if (!confirm('Вы уверены, что хотите удалить этот фильм?')) return;

    let movies = getMoviesData();
    movies = movies.filter(m => m.id !== id);
    
    const success = await saveMoviesData(movies);
    
    if (success) {
        loadAdminMovieList();
        loadMoviesContent();
        loadSeriesContent();
    }
}

async function saveMovie() {
    const id = document.getElementById('editMovieId').value;
    let movies = getMoviesData();

    const movieData = {
        title: document.getElementById('movieTitle').value,
        year: parseInt(document.getElementById('movieYear').value),
        type: document.getElementById('movieType').value,
        genre: document.getElementById('movieGenre').value.split(',').map(g => g.trim()),
        rating: parseFloat(document.getElementById('movieRating').value),
        description: document.getElementById('movieDescription').value,
        poster: document.getElementById('moviePoster').value,
        trailer: document.getElementById('movieTrailer').value,
        reviews: []
    };

    if (id) {
        // Редактирование существующего
        const index = movies.findIndex(m => m.id === parseInt(id));
        movies[index] = { ...movies[index], ...movieData };
    } else {
        // Добавление нового
        movieData.id = Math.max(...movies.map(m => m.id)) + 1;
        movies.push(movieData);
    }

    const success = await saveMoviesData(movies);
    
    if (success) {
        cancelMovieForm();
        loadAdminMovieList();
        loadMoviesContent();
        loadSeriesContent();
    }
}

function cancelMovieForm() {
    document.getElementById('addMovieForm').style.display = 'none';
}

function closeAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
}

// ===== НОВЫЕ ФУНКЦИИ ДЛЯ ЭКСПОРТА/ИМПОРТА =====

function exportMoviesToJSON() {
    const movies = getMoviesData();
    const json = JSON.stringify(movies, null, 2);
    
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `movies-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert('✅ Резервная копия скачана!');
}

function showImportDialog() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            await importMoviesFromJSON(file);
            alert('✅ Данные импортированы и сохранены в GitHub!');
        } catch (error) {
            alert('❌ Ошибка импорта:\n' + error.message);
        }
    };
    
    input.click();
}

async function refreshDataFromGitHub() {
    try {
        const movies = await refreshMoviesData();
        loadAdminMovieList();
        loadHomeContent();
        loadMoviesContent();
        loadSeriesContent();
        alert('✅ Данные обновлены из GitHub!\nЗагружено фильмов: ' + movies.length);
    } catch (error) {
        alert('❌ Ошибка обновления:\n' + error.message);
    }
}
