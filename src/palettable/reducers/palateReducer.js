const initialState = {
	palate: {},
	title: '',
	note: '',
	saving: false
};

export default function palateReducer(state = initialState, action) {
	switch (action.type) {
	case 'PALATE_SAVED':
		return {
			...state,
			palate: action.payload,
			saving: false,
			title: '',
			note: ''
		};
	case 'SAVING_PALATE':
		return { ...state, saving: true };
	case 'TITLE':
		return { ...state, title: action.payload };
	case 'NOTE':
		return { ...state, note: action.payload };
	case 'UPDATE_TITLE_NOTE':
		return { ...state, note: '', title: '' };
	default:
		return state;
	}
}
