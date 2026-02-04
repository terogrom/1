// data.js - Загрузка и сохранение данных через GitHub API

// ===== КОНФИГУРАЦИЯ GITHUB =====
const GITHUB_CONFIG = {
    username: 'terogrom',           // Например: 'ivanov'
    repo: 'KinoPoisk Admin',            // Например: 'kinopoisk'
    branch: 'main',                      // Ветка (обычно 'main' или 'master')
    token: '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',                  // Personal Access Token (ghp_...)
    filePath: 'movies.json'              // Путь к файлу в репозитории
};

const GITHUB_JSON_URL = `https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.filePath}`;
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.filePath}`;

// ===== ЖАНРЫ =====
const movieGenres = ["драма", "фантастика", "боевик", "триллер", "комедия", "приключения"];
const seriesGenres = ["фэнтези", "драма", "триллер", "комедия", "документальный"];

// ===== КЭШ ДАННЫХ =====
let moviesCache = null;
let isLoading = false;
let fileSha = null; // SHA файла для обновления в GitHub

// ===== ДЕФОЛТНЫЕ ДАННЫЕ =====
let defaultMoviesData = [
    {
        id: 1,
        title: "Начало",
        year: 2010,
        genre: ["фантастика", "боевик", "триллер"],
        rating: 8.8,
        type: "фильм",
        description: "Профессиональный вор, который крадёт корпоративные секреты с помощью технологии проникновения в сознание, получает шанс исправить своё криминальное прошлое, но для этого он и его команда должны совершить невозможное — inception.",
        poster: "https://thumbs.dfs.ivi.ru/storage33/contents/4/a/0f4090e23061da066907771deb278e.jpg/858x483/?q=85&mod=to_webp",
        trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
        reviews: [
            {author: "Алексей", rating: 10, text: "Шедевр кинематографа! Нолан в своём лучшем проявлении."},
            {author: "Мария", rating: 9, text: "Сложно, но очень интересно. Нужно пересматривать."}
        ]
    },
    {
        id: 2,
        title: "Матрица",
        year: 1999,
        genre: ["фантастика", "боевик"],
        rating: 8.7,
        type: "фильм",
        description: "Жизнь Томаса Андерсона разделена на две части: днём он — самый обычный офисный работник, а ночью — хакер по имени Нео. Однажды он узнаёт страшную правду о реальности.",
        poster: "https://via.placeholder.com/300x450/1a1a1a/e50914?text=Матрица",
        trailer: "https://www.youtube.com/embed/m8e-FF8MsqU",
        reviews: [
            {author: "Иван", rating: 10, text: "Революция в киноиндустрии"},
            {author: "Светлана", rating: 9, text: "Культовый фильм всех времён"}
        ]
    },
    {
        id: 3,
        title: "Интерстеллар",
        year: 2014,
        genre: ["фантастика", "драма", "приключения"],
        rating: 8.6,
        type: "фильм",
        description: "Когда засуха приводит человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину в путешествие, чтобы найти новый дом для человечества.",
        poster: "https://ru-images-s.kinorium.com/movie/1080/384511.jpg?1678571416",
        trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
        reviews: [
            {author: "Дмитрий", rating: 10, text: "Визуально потрясающий и эмоционально мощный фильм"}
        ]
    }
];

// ===== ЗАГРУЗКА ИЗ GITHUB =====
async function loadMoviesFromGitHub() {
    if (isLoading) return moviesCache || defaultMoviesData;
    isLoading = true;

    try {
        console.log('📥 Загружаем данные из GitHub...');
        
        // Загружаем через GitHub API (чтобы получить SHA)
        const response = await fetch(GITHUB_API_URL, {
            headers: {
                'Authorization': `token ${GITHUB_CONFIG.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            // Если файл не существует, создаём его
            if (response.status === 404) {
                console.log('⚠️ Файл не найден в GitHub, создаём новый...');
                await saveMoviesToGitHub(defaultMoviesData, 'Инициализация базы данных фильмов');
                moviesCache = defaultMoviesData;
                return defaultMoviesData;
            }
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        fileSha = data.sha; // Сохраняем SHA для будущих обновлений
        
        // Декодируем содержимое (GitHub возвращает base64)
        const content = atob(data.content);
        const movies = JSON.parse(content);
        
        if (Array.isArray(movies) && movies.length > 0) {
            moviesCache = movies;
            localStorage.setItem('moviesData', JSON.stringify(movies));
            localStorage.setItem('moviesDataTimestamp', Date.now().toString());
            console.log('✅ Данные загружены из GitHub:', movies.length, 'фильмов');
            return movies;
        } else {
            throw new Error('Пустой массив');
        }
        
    } catch (error) {
        console.error('❌ Ошибка загрузки из GitHub:', error);
        
        // Fallback на localStorage
        const localData = localStorage.getItem('moviesData');
        if (localData) {
            console.log('📦 Используем данные из localStorage');
            moviesCache = JSON.parse(localData);
            return moviesCache;
        }
        
        // Крайний fallback на дефолтные данные
        console.log('⚠️ Используем дефолтные данные');
        moviesCache = defaultMoviesData;
        return moviesCache;
        
    } finally {
        isLoading = false;
    }
}

// ===== СОХРАНЕНИЕ В GITHUB =====
async function saveMoviesToGitHub(movies, commitMessage = 'Обновление данных фильмов') {
    try {
        console.log('💾 Сохраняем данные в GitHub...');
        
        // Если нет SHA, загружаем файл чтобы получить его
        if (!fileSha) {
            try {
                const response = await fetch(GITHUB_API_URL, {
                    headers: {
                        'Authorization': `token ${GITHUB_CONFIG.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    fileSha = data.sha;
                }
            } catch (e) {
                console.log('Файл не существует, создаём новый');
            }
        }
        
        // Конвертируем данные в JSON и base64
        const jsonContent = JSON.stringify(movies, null, 2);
        const base64Content = btoa(unescape(encodeURIComponent(jsonContent)));
        
        // Отправляем в GitHub
        const requestBody = {
            message: commitMessage,
            content: base64Content,
            branch: GITHUB_CONFIG.branch
        };
        
        // Добавляем SHA только если файл существует
        if (fileSha) {
            requestBody.sha = fileSha;
        }
        
        const response = await fetch(GITHUB_API_URL, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_CONFIG.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`GitHub API error: ${errorData.message}`);
        }

        const result = await response.json();
        fileSha = result.content.sha; // Обновляем SHA
        
        console.log('✅ Данные сохранены в GitHub!');
        console.log('🔗 Commit:', result.commit.html_url);
        
        return true;
        
    } catch (error) {
        console.error('❌ Ошибка сохранения в GitHub:', error);
        alert('❌ Ошибка сохранения в GitHub:\n' + error.message + '\n\nПроверь токен и настройки в data.js');
        return false;
    }
}

// ===== ПОЛУЧЕНИЕ ДАННЫХ (СИНХРОННО) =====
function getMoviesData() {
    if (moviesCache) {
        return moviesCache;
    }
    
    const localData = localStorage.getItem('moviesData');
    if (localData) {
        moviesCache = JSON.parse(localData);
        
        // Проверяем возраст данных (обновляем если старше 5 минут)
        const timestamp = localStorage.getItem('moviesDataTimestamp');
        if (timestamp && Date.now() - parseInt(timestamp) > 5 * 60 * 1000) {
            loadMoviesFromGitHub(); // Асинхронное обновление в фоне
        }
        
        return moviesCache;
    }
    
    moviesCache = defaultMoviesData;
    loadMoviesFromGitHub();
    return moviesCache;
}

// ===== СОХРАНЕНИЕ ДАННЫХ (С СИНХРОНИЗАЦИЕЙ В GITHUB) =====
async function saveMoviesData(data) {
    moviesCache = data;
    
    // Локальное сохранение
    localStorage.setItem('moviesData', JSON.stringify(data));
    localStorage.setItem('moviesDataTimestamp', Date.now().toString());
    
    // Сохранение в GitHub
    const success = await saveMoviesToGitHub(data);
    
    if (success) {
        alert('✅ Изменения сохранены!\n\nВсе пользователи увидят обновления в течение 5 минут.');
    }
    
    return success;
}

// ===== ПРИНУДИТЕЛЬНОЕ ОБНОВЛЕНИЕ =====
async function refreshMoviesData() {
    moviesCache = null;
    fileSha = null;
    localStorage.removeItem('moviesData');
    return await loadMoviesFromGitHub();
}

// ===== ЭКСПОРТ JSON (ДЛЯ РЕЗЕРВНОЙ КОПИИ) =====
function exportMoviesToJSON() {
    const movies = getMoviesData();
    const json = JSON.stringify(movies, null, 2);
    
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'movies-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    
    console.log('✅ JSON файл скачан');
}

// ===== ИМПОРТ JSON =====
function importMoviesFromJSON(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
            try {
                const json = e.target.result;
                const movies = JSON.parse(json);
                
                if (!Array.isArray(movies)) {
                    throw new Error('JSON должен содержать массив фильмов');
                }
                
                const success = await saveMoviesData(movies);
                if (success) {
                    // Обновляем интерфейс
                    if (typeof loadHomeContent === 'function') loadHomeContent();
                    if (typeof loadMoviesContent === 'function') loadMoviesContent();
                    if (typeof loadSeriesContent === 'function') loadSeriesContent();
                    if (typeof loadAdminMovieList === 'function') loadAdminMovieList();
                    
                    resolve(movies);
                } else {
                    reject(new Error('Ошибка сохранения'));
                }
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = () => reject(new Error('Ошибка чтения файла'));
        reader.readAsText(file);
    });
}

// ===== ПОЛЬЗОВАТЕЛЬСКИЕ ДАННЫЕ (ЛОКАЛЬНО) =====
function getUserRatings() {
    const data = localStorage.getItem('userRatings');
    return data ? JSON.parse(data) : {};
}

function saveUserRatings(ratings) {
    localStorage.setItem('userRatings', JSON.stringify(ratings));
}

function getWatchedMovies() {
    const data = localStorage.getItem('watchedMovies');
    return data ? JSON.parse(data) : {};
}

function saveWatchedMovies(watched) {
    localStorage.setItem('watchedMovies', JSON.stringify(watched));
}

// ===== АВТОЗАГРУЗКА ПРИ СТАРТЕ =====
window.addEventListener('DOMContentLoaded', async () => {
    await loadMoviesFromGitHub();
    
    // Обновляем интерфейс после загрузки
    if (typeof loadHomeContent === 'function') {
        const activeSection = document.querySelector('.nav-item.active');
        if (activeSection && activeSection.id === 'home') {
            loadHomeContent();
        }
    }
});
