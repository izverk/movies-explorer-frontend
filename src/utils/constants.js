// Конфиг API получения фильмов со стороннего сервиса
export const moviesApiConfig = {
	baseUrl: 'https://api.nomoreparties.co/beatfilm-movies/',
	headers: {
		'Content-Type': 'application/json',
	},
};

// Конфиг API основного сервера приложения
export const mainApiConfig = {
	// baseUrl: 'http://localhost:3001/api/',
	baseUrl: 'https://api.movies-explorer.izver.nomoredomains.work/api/',
	headers: {
		'Content-Type': 'application/json',
	},
};

// Страницы, не требующие авторизации
export const PAGES_WITHOUT_AUT = ['/signup', '/signin'];

// URL сервера для API получения фильмов для преобразования относительных ссылок на изображения фильмов в абсолютные
export const moviesApiURL = 'https://api.nomoreparties.co';

// Сообщения пользователю
export const queryErrorMessageText =
	'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const formSubmitErrorText = 'Что-то пошло не так! Попробуйте ещё раз.';
export const formSubmitSuccesText = 'Данные успешно отправлены!';
export const nothingFoundMessageText = 'Ничего не найдено';
export const needKeyWordMessageText = 'Нужно ввести ключевое слово';
export const NAME_INPUT_ERROR_MESSAGE =
	'Некорректное имя (должно содержать только латиницу, кириллицу, пробел или дефис)';
export const EMAIL_INPUT_ERROR_MESSAGE =
	'email не соответствует шаблону электронной почты';
