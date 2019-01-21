/*global localStorage */

export function getUserName() {
	return localStorage.getItem('username');
}

export function getToken() {
	return localStorage.getItem('jwtToken');
}

export function getUserId() {
	return localStorage.getItem('userId');
}

export function removeUser() {
	localStorage.removeItem('jwtToken');
	localStorage.removeItem('userId');
	localStorage.removeItem('username');
}

export function hexToRgb(hex) {
	//[a-f\d] match a-f and digits between (0-9), {2} match 2 times, () group, i make case insensitive
	const result = /([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			}
		: null;
}

function componentToHex(c) {
	const hex = c.toString(16); //converts number into its hex value
	return hex.length === 1 ? '0' + hex : hex;
}

export function rgbToHex(rgbString) {
	const array = rgbString.split('rgb(')[1].split(')')[0].split(',');
	const hexValues = array.map(number =>
		componentToHex(parseInt(number, 10))
	);
	return '#' + hexValues.join('');
}
