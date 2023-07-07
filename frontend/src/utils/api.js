import { address } from './constants'

class Api {
	constructor({ address }) {
		this._address = address;
	};

	// обрабатываем ошибки с сервера
	_checkResponse(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	};

	// получаем карточки 
	getInitialCards() {
		const token = localStorage.getItem('token')
		return fetch(`${this._address}/cards`, {
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}).then((res) => this._checkResponse(res))
	};

	// информация о пользователе с сервера
	getUserInfo() {
		const token = localStorage.getItem('token')
		return fetch(`${this._address}/users/me`, {
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}).then((res) => this._checkResponse(res))
	};

	// обновление данных профиля
	updateProfile({ name, about }) {
		const token = localStorage.getItem('token')
		return fetch(`${this._address}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, about })
		}).then((res) => this._checkResponse(res))
	};

	// обновление аватара
	updateAvatar(avatar) {
		const token = localStorage.getItem('token')
		return fetch(`${this._address}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ avatar })
		}).then((res) => this._checkResponse(res))
	};

	// добавление лайка
	_addLike(id) {
		const token = localStorage.getItem('token')
		return fetch(`${this._address}/cards/${id}/likes`, {
			method: 'PUT',
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}).then((res) => this._checkResponse(res))
	};

	// удаление лайка
	_removeLike(id) {
		const token = localStorage.getItem('token')
		return fetch(`${this._address}/cards/${id}/likes`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}).then((res) => this._checkResponse(res))
	};

	// публичный метод для лайк/анлайк
	toggleLike(cardId, isLiked) {
		return isLiked ? this._removeLike(cardId) : this._addLike(cardId)
	};

	// добавление карточки на сервер
	setCard({ name, link }) {
		const token = localStorage.getItem('token')
		return fetch(`${this._address}/cards`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, link })
		}).then((res) => this._checkResponse(res))
	};

	// удаление карточки
	deleteCard(cardId) {
		const token = localStorage.getItem('token')
		return fetch(`${this._address}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}).then((res) => this._checkResponse(res))
	};
};

export const api = new Api({ address }) 
