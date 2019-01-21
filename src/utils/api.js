/*global process, localStorage, fetch */
const endpoint = process.env.REACT_APP_API_ENDPOINT;
const visionAPIKey = process.env.REACT_APP_CLOUDVISION_KEY;

function headers(auth = false) {
	const header = {
		'content-type': 'application/json',
		accept: 'application/json'
	};
	if (auth) {
		header['Authorization'] = localStorage.getItem('jwtToken');
	}
	return header;
}

export function setLocalStorage(resp) {
	localStorage.setItem('jwtToken', resp.jwt);
	localStorage.setItem('userId', resp.user.id);
	localStorage.setItem('username', resp.user.username);
}

export function checkForJWT(user) {
	return user.jwt !== undefined ? setLocalStorage(user) : null;
}

export function loginUser({ loginParams }) {
	const body = JSON.stringify(loginParams);
	return fetch(endpoint + 'login', {
		method: 'POST',
		body: body,
		headers: headers()
	}).then(res => res.json());
}

export function createUser({ signupParams }) {
	const body = JSON.stringify(signupParams);
	return fetch(endpoint + 'signup', {
		method: 'POST',
		body,
		headers: headers()
	}).then(res => res.json());
}

export function deletePalate({ id }) {
	const userId = localStorage.getItem('userId');
	const params = {
		method: 'DELETE',
		body: JSON.stringify({ id: id, userId: userId }),
		headers: headers(true)
	};
	return fetch(endpoint + 'palates/' + id + '/delete', params).then(res =>
		res.json()
	);
}

export function getAllPalates() {
  return fetch(endpoint + 'palates')
    .then(resp => resp.json());
}

export function getPalate(path) {
	return fetch(
		endpoint + path
	)
		.then(resp => resp.json())
}

export function getMyPalates() {
	const params = {
		method: 'GET',
		headers: headers(true)
	};
	const userId = localStorage.getItem('userId');
	return fetch(endpoint + 'users/' + userId + '/palates', params).then(resp =>
		resp.json()
	);
}

export function searchColors({ url }) {
	const body = {
		requests: [
			{
				image: {
					source: {
						imageUri: `${url}`
					}
				},
				features: [
					{
						type: 'IMAGE_PROPERTIES',
						maxResults: 1
					}
				]
			}
		]
	};
	const params = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		cache: 'no-cache',
		body: JSON.stringify(body)
	};

	return fetch(
		'https://vision.googleapis.com/v1/images:annotate?key=' + visionAPIKey,
		params
	).then(res => res.json());
}

export function savePalate({ userId, copy, title, note, colors }) {
	const body = {
		user_id: userId,
		palate_data: { copy, title, note, colors: colors.join(',') }
	};
	const params = {
		method: 'POST',
		headers: headers(true),
		body: JSON.stringify(body)
	};
	return fetch(endpoint + 'users/' + userId + '/palates', params).then(res =>
		res.json()
	);
}

export function editPalate({ title, note, id }) {
	const params = {
		method: 'PATCH',
		headers: headers(true),
		body: JSON.stringify({ title, note })
	};
	return fetch(endpoint + 'palates/' + id + '/edit', params).then(res => res.json());
}
