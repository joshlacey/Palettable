import { combineReducers } from 'redux';
import palateReducer from './palettable/reducers/palateReducer';
import userReducer from './palettable/reducers/userReducer';
import uiReducer from './ui-reducer';

export default combineReducers({
	palate: palateReducer,
	user: userReducer,
	uiReducer
});
