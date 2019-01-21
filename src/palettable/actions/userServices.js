/*globals alert, window*/
import * as api from '../../utils/api';
import * as utils from '../../utils/helpers';
import * as types from '../../utils/actionTypes';

function loggedIn(user) {
	return {
		type: types.LOGGED_IN,
		payload: user
	};
}

export function loginUser(loginParams) {
	return dispatch => {
		api.loginUser({ loginParams }).then(user => {
			if (user.message) {
				alert(user.message);
				return null;
			} else {
				api.checkForJWT(user);
				dispatch(loggedIn(user));
				window.location.reload(true);
			}
		});
	};
}

export function createUser(signupParams) {
	return function(dispatch) {
		api.createUser({ signupParams }).then(user => {
			if (user.jwt !== undefined) {
				api.setLocalStorage(user);
				dispatch(loggedIn(user));
				window.location.reload(true);
			} else {
				alert(user.message);
			}
		});
	};
}

export function logoutUser() {
	utils.removeUser();
	return { type: types.LOGGING_OUT };
}

function loadingMyPalettes() {
	return {
		type: types.LOADING,
		loader: 'myPalettes'
	};
}

export function deletePalate(id) {
	return function(dispatch) {
		dispatch(loadingMyPalettes());
		api.deletePalate({ id })
		.then(res => {
			dispatch(updateMyPalates(res));
			dispatch(loadingMyPalettes());
		});
	};
}

function updateMyPalates(palates) {
	return {
		type: types.UPDATE_MY_PALATES,
		payload: palates
	};
}

export function getMyPalates() {
	return function(dispatch) {
		dispatch(loadingMyPalettes());
		api.getMyPalates()
			.then(resp => {
				dispatch(updateMyPalates(resp));
				dispatch(loadingMyPalettes());
			});
	};
}
