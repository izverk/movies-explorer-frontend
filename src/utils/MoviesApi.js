import { moviesApiConfig } from '../utils/constants';

class MoviesApi {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	// Проверка ответа сервера
	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
	}

	// Получение массива фильмов
	getMovies() {
		return fetch(`${this._baseUrl}`, {
			method: 'GET',
			headers: this._headers,
		}).then(this._checkResponse);
	}
}

const moviesApi = new MoviesApi(moviesApiConfig);

export default moviesApi;
