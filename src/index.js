import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import uploaderReducer from './reducers/uploaderReducer';
import palateReducer from './reducers/palateReducer';
import userReducer from './reducers/userReducer';
import { Provider } from 'react-redux';



const rootReducer = combineReducers({uploader: uploaderReducer, palate: palateReducer, user: userReducer})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
