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
			Authorization: `Bearer ${token}`,
			// Authorization: token, --- без Bearer лучше не делать, т.к. браузер всё равно его подставляет, лучше пусть будет единая логика (на фронте добавили Bearer, на бэке - убрали), + так было в тренажере
		};
	}

	// Проверка токена (получение данных текущего пользователя, (в ответе должны быть name, email, _id))
	checkToken(token) {
		return fetch(`${this._baseUrl}users/me`, {
			method: 'GET',
			headers: {
				...this._headers,
				Authorization: `Bearer ${token}`,
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

	// // Получение профиля пользователя
	// getUserInfo() {
	// 	return fetch(`${this._baseUrl}users/me`, {
	// 		method: 'GET',
	// 		headers: this._headers,
	// 	}).then(this._checkResponse);
	// }

	// // Обновление аватара
	// setUserAvatar({ avatarUrl }) {
	// 	return fetch(`${this._baseUrl}users/me/avatar`, {
	// 		method: 'PATCH',
	// 		headers: this._headers,
	// 		body: JSON.stringify({
	// 			avatar: avatarUrl,
	// 		}),
	// 	}).then(this._checkResponse);
	// }
	// // Получение начального массива карточек
	// getInitialCards() {
	// 	return fetch(`${this._baseUrl}cards`, {
	// 		method: 'GET',
	// 		headers: this._headers,
	// 	}).then(this._checkResponse);
	// }
	// // Запостить карточку
	// postCard({ placeName, placeUrl }) {
	// 	return fetch(`${this._baseUrl}cards`, {
	// 		method: 'POST',
	// 		headers: this._headers,
	// 		body: JSON.stringify({
	// 			name: placeName,
	// 			link: placeUrl,
	// 		}),
	// 	}).then(this._checkResponse);
	// }
	// // Удаление карточки
	// deleteCard(cardId) {
	// 	return fetch(`${this._baseUrl}cards/${cardId}`, {
	// 		method: 'DELETE',
	// 		headers: this._headers,
	// 	}).then(this._checkResponse);
	// }
	// // Постановка лайка карточки
	// setLike(cardId) {
	// 	return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
	// 		method: 'PUT',
	// 		headers: this._headers,
	// 	}).then(this._checkResponse);
	// }
	// // Удаление лайка карточки
	// deleteLike(cardId) {
	// 	return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
	// 		method: 'DELETE',
	// 		headers: this._headers,
	// 	}).then(this._checkResponse);
	// }
	// // Переключение лайка карточки
	// changeLikeCardStatus(cardId, notLiked) {
	// 	if (notLiked) {
	// 		return this.setLike(cardId);
	// 	} else {
	// 		return this.deleteLike(cardId);
	// 	}
	// }
}

const mainApi = new MainApi(mainApiConfig);

export default mainApi;
