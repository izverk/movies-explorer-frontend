// Конфиг API получения фильмов со стороннего сервиса
export const moviesApiConfig = {
	baseUrl: 'https://api.nomoreparties.co/beatfilm-movies/',
	headers: {
		'Content-Type': 'application/json',
	},
};

// Конфиг API основного сервера приложения
export const mainApiConfig = {
	baseUrl: 'https://api.movies-explorer.izver.nomoredomains.work/',
	headers: {
		'Content-Type': 'application/json',
	},
};

// URL сервера для API получения фильмов для преобразования относительных ссылок на изображения фильмов в абсолютные
export const moviesApiURL = 'https://api.nomoreparties.co';

// Сообщения пользователю
export const queryErrorMessageText =
	'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const nothingFoundMessageText = 'Ничего не найдено';
export const needKeyWordMessageText = 'Нужно ввести ключевое слово';
