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
poster: "http://images-s.kinorium.com/movie/poster/472809/w1500_52479049.jpg",
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
poster: "https://upload.wikimedia.org/wikipedia/ru/9/9d/Matrix-DVD.jpg",
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
poster: "https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/0fa5bf50-d5ad-446f-a599-b26d070c8b99/300x450",
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
poster: "https://avatars.mds.yandex.net/get-mpic/14220577/2a00000199e2be06ae2b23a90dcd06455dee/orig",
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
poster: "https://avatars.mds.yandex.net/get-mpic/14220577/2a00000199e2be06ae2b23a90dcd06455dee/orig",
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
poster: "https://img.ixbt.site/live/images/original/33/84/42/2025/12/07/cbd943ed68.webp?h=877",
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
poster: "https://s.yimg.com/ny/api/res/1.2/EiPRxJKvJTpdDv81nVhOvw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzU7Y2Y9d2VicA--/https://media.zenfs.com/en/us.news.bgr.com/3b94dee6fb8a537caeefffeb9d4e27a7",
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
poster: "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/74c843e3-132c-49b8-a1cd-7c571213c987/1920x",
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
poster: "https://ir.ozone.ru/s3/multimedia-1-s/8719597504.jpg",
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
poster: "https://images.iptv.rt.ru/images/c70aq73ir4ssllu16860.jpg",
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
poster: "https://upload.wikimedia.org/wikipedia/ru/thumb/a/a7/«Чернобыль»_HBO_2019.jpg/540px-«Чернобыль»_HBO_2019.jpg",
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
poster: "https://resizer.mail.ru/p/86e4a355-53c2-535b-a222-3a33618d90c4/dpr:200/AAAC1NOLdD0GG932fD2Banwdcu4pRLdlva5Ald5NXNHp2LmDT7JqzxCukx6XmAUtUhcOA0dmZ-6AeUaPaA2vmxJw8aw.jpg",
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
poster: "https://images.iptv.rt.ru/images/c6ua443ir4sslltupong.jpg",
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


