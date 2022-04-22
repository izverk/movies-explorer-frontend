import { mainApiConfig } from './constants';

class MainApi {
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

	// Регистрация (создание) пользователя (в ответе должны быть name, email, _id)
	register(name, email, password) {
		return fetch(`${this._baseUrl}signup`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
		}).then(this._checkResponse);
	}

	// Авторизация пользователя (в ответе должен быть токен)
	login(email, password) {
		return fetch(`${this._baseUrl}signin`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({ password, email }),
		}).then(this._checkResponse);
	}

	// Установка токена в заголовки
	setTokenHeaders(token) {
		this._headers = {
			...this._headers,
			Authorization: token,
			// Authorization: `Bearer ${token}`,--- если Bearer дбавлять здесь, то и на бэке нужно уго убирать при проверке
		};
	}

	// Проверка токена (получение данных текущего пользователя, (в ответе должны быть name, email, _id))
	checkToken(token) {
		return fetch(`${this._baseUrl}users/me`, {
			method: 'GET',
			headers: {
				...this._headers,
				// Authorization: `Bearer ${token}`,
				Authorization: token,
			},
		}).then(this._checkResponse);
	}

	// Редактирование профиля пользователя (в ответе должны быть name, email, _id)
	editProfile({ name, email }) {
		return fetch(`${this._baseUrl}users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: name,
				email: email,
			}),
		}).then(this._checkResponse);
	}

	// Получение массива сохраненных карточек
	getCards() {
		return fetch(`${this._baseUrl}movies`, {
			method: 'GET',
			headers: this._headers,
		}).then(this._checkResponse);
	}

	// Создание карточки
	createCard(card) {
		return fetch(`${this._baseUrl}movies`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify(card),
		}).then(this._checkResponse);
	}

	// Удаление карточки
	deleteCard(cardId) {
		return fetch(`${this._baseUrl}movies/${cardId}`, {
			method: 'DELETE',
			headers: this._headers,
		}).then(this._checkResponse);
	}
}

const mainApi = new MainApi(mainApiConfig);

export default mainApi;
