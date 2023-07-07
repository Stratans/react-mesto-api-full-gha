const baseUrl = 'http://api.streitan.nomoreparties.sbs'

function checkResponse(res) {
	if (!res.ok) {
		return Promise.reject(`Ошибка: ${res.status}`);
	}
	return res.json();
};

export const checkToken = (token) => {
	return (
		fetch(`${baseUrl}/users/me`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
		}).then((res) => checkResponse(res))
	)
};

export const registration = (password, email) => {
	return (
		fetch(`${baseUrl}/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password, email })
		}).then((res) => checkResponse(res))
	)
};

export const authorization = (password, email) => {
	return (
		fetch(`${baseUrl}/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password, email })
		}).then((res) => checkResponse(res))
	)
};

