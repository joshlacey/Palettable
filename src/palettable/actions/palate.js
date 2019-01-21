/*globals alert, window*/
import * as api from '../../utils/api';
import * as types from '../../utils/actionTypes';

export function addColor(color) {
	return{
		type: types.ADD_COLOR,
		payload: color
	};
}

export function removeColors() {
	return {
		type: types.REMOVE_COLORS
	};
}

export function removeOneColor(color) {
	return {
		type: types.REMOVE_ONE_COLOR,
		payload: color
	};
}

function savedPalate(svg) {
	return {
		type: types.PALATE_SAVED,
		payload: svg
	};
}

function savingPalate() {
	return {
		type: types.SAVING_PALATE
	};
}

export function savePalate(userId, copy, colors) {
	return (dispatch, getState) => {
		dispatch(savingPalate());
		const { palate } = getState();
		const { title, note } = palate;
		api.savePalate({ userId, copy, title, note, colors })
			.then((json) => {
				if (json){
					dispatch(savedPalate(json));
					window.location.replace(window.location.origin + '/palates/' + json.id);
				} else {
					alert( 'didn\'t work' );
				}
			});
	};
}

export function handleTitleChange(event) {
	return {
		type: types.TITLE,
		payload: event.target.value
	};
}


export function handleNoteChange(event) {
	return {
		type: types.NOTE,
		payload: event.target.value
	};
}

function palateUpdated() {
	return {
		type: types.UPDATE_TITLE_NOTE
	};
}

export function editPalate (title, note, id) {
	return function(dispatch) {
		api.editPalate({title, note, id})
			.then((json) => {
				if (json){
					dispatch(palateUpdated(json));
				} else {
					alert('didn\'t work');
				}
			});
	};
}
