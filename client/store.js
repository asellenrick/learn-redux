import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';

import comments from './data/comments';
import posts from './data/posts';

const defaultState = {
	posts,
	comments
};

window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const enhancers = compose(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);

const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

// Allow hot reloading of reducers
if (module.hot) {
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('./reducers/index').default;
		store.replaceReducer(nextRootReducer);
	});
}

export default store;
