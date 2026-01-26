// Расширенные данные фильмов и сериалов
let defaultMoviesData = [
    // ФИЛЬМЫ
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
        poster: "https://avatars.mds.yandex.net/i?id=7ded75bbc69b10a8508bde9b425981dc_l-12523274-images-thumbs&n=13",
        trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
        reviews: [
            {author: "Дмитрий", rating: 10, text: "Визуально потрясающий и эмоционально мощный фильм"}
        ]
    },
    {
        id: 4,
        title: "Побег из Шоушенка",
        year: 1994,
        genre: ["драма"],
        rating: 9.3,
        type: "фильм",
        description: "История банкира Энди Дюфрейна, ошибочно осуждённого за убийство жены и её любовника. В тюрьме он заводит дружбу с Редом и меняет жизнь заключённых.",
        poster: "https://avatars.mds.yandex.net/i?id=031302e556a29e30b5615a81dce9ac36_l-4363966-images-thumbs&n=13https://static.kinoafisha.info/k/movie_posters/800x1200/upload/movie_posters/1/7/5/7731571/0c4b4ffa097248647fe5ed7dc155336b.jpeg",
        trailer: "https://www.youtube.com/embed/6hB3S9bIaco",
        reviews: []
    },
    {
        id: 5,
        title: "Тёмный рыцарь",
        year: 2008,
        genre: ["боевик", "драма", "триллер"],
        rating: 9.0,
        type: "фильм",
        description: "Бэтмен поднимает ставки в войне с криминалом. С помощью лейтенанта Джима Гордона и прокурора Харви Дента он намерен очистить улицы от преступности. Но появляется Джокер.",
        poster: "https://via.placeholder.com/300x450/1a1a1a/e50914?text=Тёмный+рыцарь",
        trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
        reviews: []
    },
    {
        id: 6,
        title: "Форрест Гамп",
        year: 1994,
        genre: ["драма", "комедия"],
        rating: 8.8,
        type: "фильм",
        description: "История жизни простодушного парня из Алабамы по имени Форрест Гамп, который становится свидетелем и невольным участником самых важных событий в США второй половины XX века.",
        poster: "https://via.placeholder.com/300x450/1a1a1a/e50914?text=Форрест+Гамп",
        trailer: "https://www.youtube.com/embed/bLvqoHBptjg",
        reviews: []
    },
    {
        id: 7,
        title: "Криминальное чтиво",
        year: 1994,
        genre: ["триллер", "комедия"],
        rating: 8.9,
        type: "фильм",
        description: "Двое бандитов, философствующий киллер и его напарник, жена гангстера и пара грабителей — их истории переплетаются в этом культовом фильме Тарантино.",
        poster: "https://via.placeholder.com/300x450/1a1a1a/e50914?text=Криминальное+чтиво",
        trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY",
        reviews: []
    },
    {
        id: 8,
        title: "Бойцовский клуб",
        year: 1999,
        genre: ["драма", "триллер"],
        rating: 8.8,
        type: "фильм",
        description: "Страдающий бессонницей офисный работник и безалаберный торговец мылом создают подпольный бойцовский клуб, который перерастает во что-то большее.",
        poster: "https://via.placeholder.com/300x450/1a1a1a/e50914?text=Бойцовский+клуб",
        trailer: "https://www.youtube.com/embed/SUXWAEX2jlg",
        reviews: []
    },

    // СЕРИАЛЫ
    {
        id: 9,
        title: "Игра престолов",
        year: 2011,
        genre: ["фэнтези", "драма"],
        rating: 9.3,
        type: "сериал",
        description: "К концу подходит время благоденствия, и лето, длившееся почти десятилетие, угасает. Вокруг средоточия власти Семи королевств разворачивается ожесточённая борьба за Железный трон.",
        poster: "https://via.placeholder.com/300x450/1a1a1a/e50914?text=Игра+престолов",
        trailer: "https://www.youtube.com/embed/KPLWWIOCOOQ",
        reviews: [
            {author: "Ольга", rating: 10, text: "Лучший сериал в истории (до 6 сезона)"}
        ]
    },
    {
        id: 10,
        title: "Во все тяжкие",
        year: 2008,
        genre: ["драма", "триллер"],
        rating: 9.5,
        type: "сериал",
        description: "Школьный учитель химии Уолтер Уайт узнаёт, что болен раком лёгких. Вместе с бывшим учеником он начинает варить метамфетамин ради благополучия семьи.",
        poster: "https://via.placeholder.com/300x450/1a1a1a/e50914?text=Во+все+тяжкие",
        trailer: "https://www.youtube.com/embed/HhesaQXLuRY",
        reviews: [
            {author: "Сергей", rating: 10, text: "Идеальный сценарий и актёрская игра"}
        ]
    },
    {
        id: 11,
        title: "Stranger Things",
        year: 2016,
        genre: ["фэнтези", "триллер", "драма"],
        rating: 8.7,
        type: "сериал",
        description: "Действие происходит в вымышленном городе Хокинс, штат Индиана, в 1980-х годах. После исчезновения мальчика его друзья, семья и местный шериф сталкиваются с необъяснимыми явлениями.",
        poster: "https://via.placeholder.com/300x450/1a1a1a/e50914?text=Stranger+Things",
        trailer: "https://www.youtube.com/embed/b9EkMc79ZSU",
        reviews: []
    },
    {
        id: 12,
        title: "Шерлок",
        year: 2010,
        genre: ["драма", "триллер"],
        rating: 9.1,
        type: "сериал",
        description: "Современная адаптация рассказов о Шерлоке Холмсе. Блестящий детектив и его верный друг доктор Ватсон расследуют преступления в современном Лондоне.",
        poster: "https://via.placeholder.com/300x450/1a1a1a/e50914?text=Шерлок",
        trailer: "https://www.youtube.com/embed/xK7S9mrFWL4",
        reviews: []
    },
    {
        id: 13,
        title: "Чернобыль",
        year: 2019,
        genre: ["драма", "документальный"],
        rating: 9.4,
        type: "сериал",
        description: "Драматический пересказ катастрофы на Чернобыльской АЭС 1986 года и жертв, которые были принесены для спасения Европы от немыслимой трагедии.",
        poster: "https://via.placeholder.com/300x450/1a1a1a/e50914?text=Чернобыль",
        trailer: "https://www.youtube.com/embed/s9APLXM9Ei8",
        reviews: []
    },
    {
        id: 14,
        title: "Друзья",
        year: 1994,
        genre: ["комедия"],
        rating: 8.9,
        type: "сериал",
        description: "Шесть друзей — Рэйчел, Моника, Фиби, Джоуи, Чендлер и Росс — делят свои радости и горести в Манхэттене.",
        poster: "https://via.placeholder.com/300x450/1a1a1a/e50914?text=Друзья",
        trailer: "https://www.youtube.com/embed/IEEbUzffzrk",
        reviews: []
    },
    {
        id: 15,
        title: "Ведьмак",
        year: 2019,
        genre: ["фэнтези", "драма"],
        rating: 8.2,
        type: "сериал",
        description: "Геральт из Ривии, мутант-охотник на чудовищ, путешествует по миру в поисках своей судьбы.",
        poster: "https://upload.wikimedia.org/wikipedia/ru/thumb/f/f4/The_Witcher_Season_1.jpg/540px-The_Witcher_Season_1.jpg",
        trailer: "https://www.youtube.com/embed/ndl1W4ltcmg",
        reviews: []
    },
    {
        id: 16,
        title: "Офис",
        year: 2005,
        genre: ["комедия"],
        rating: 8.9,
        type: "сериал",
        description: "Псевдодокументальная комедия о повседневной жизни сотрудников филиала компании Dunder Mifflin в Скрэнтоне, штат Пенсильвания.",
        poster: "https://via.placeholder.com/300x450/1a1a1a/e50914?text=Офис",
        trailer: "https://www.youtube.com/embed/LHOtME2DL4g",
        reviews: []
    }
];

// Жанры для фильтров
const movieGenres = ["драма", "фантастика", "боевик", "триллер", "комедия", "приключения"];
const seriesGenres = ["фэнтези", "драма", "триллер", "комедия", "документальный"];

// Функции для работы с localStorage
function getMoviesData() {
    const data = localStorage.getItem('moviesData');
    if (data) {
        return JSON.parse(data);
    }
    saveMoviesData(defaultMoviesData);
    return defaultMoviesData;
}

function saveMoviesData(data) {
    localStorage.setItem('moviesData', JSON.stringify(data));
}

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








