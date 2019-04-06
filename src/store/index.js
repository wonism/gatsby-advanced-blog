import { applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeLatest, takeEvery } from 'redux-saga/effects';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { flow } from 'lodash/fp';
import createReducer from '~/utils/createReducer';

/* reducers */
import appReducers from '~/store/app/reducers';
import postsReducers from '~/store/posts/reducers';

/* sagas */
import * as appSagas from '~/store/app/sagas';
import * as postsSagas from '~/store/posts/sagas';

/* initial states */
import appInitialState from '~/store/app/initialState';
import postsInitialState from '~/store/posts/initialState';

/* initializers */
import appInitializer from '~/store/app/initializer';
import postsInitializer from '~/store/posts/initializer';

import {
  HISTORY_GO_BACK,
  NAVIGATE_TO_PATH,
  PRINT,
} from '~/store/app/actionTypes';
import {
  INIT_COPY,
  CREATE_COPY_BUTTON,
  LOAD_DISQUS_SCRIPT,
  LOAD_DISQUS_SCRIPT_SUCCESS,
  RENDER_TWEETS,
  RENDER_COMPONENTS,
} from '~/store/posts/actionTypes';

const isProduction = process.env.NODE_ENV === 'production';

const reducers = combineReducers({
  app: createReducer(appReducers, appInitialState),
  posts: createReducer(postsReducers, postsInitialState),
});

const initialState = {
  app: appInitialState,
  posts: postsInitialState,
};

const initializeStore = flow(
  appInitializer,
  postsInitializer,
);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  thunk,
];

const middleware = applyMiddleware.apply(null, [...middlewares]);

function* sagas() {
  // history
  yield takeEvery(HISTORY_GO_BACK, appSagas.historyGoBack);
  yield takeEvery(NAVIGATE_TO_PATH, appSagas.navigateToPath);
  // clipboard
  yield takeLatest(INIT_COPY, postsSagas.initCopy);
  yield takeLatest(CREATE_COPY_BUTTON, postsSagas.createCopyButton);
  // print
  yield takeEvery(PRINT, appSagas.printPage);
  // disqus
  yield takeEvery(LOAD_DISQUS_SCRIPT, postsSagas.loadDisqusScript);
  yield takeEvery(LOAD_DISQUS_SCRIPT_SUCCESS, postsSagas.initDisqusConfig);
  // twitter
  yield takeEvery(RENDER_TWEETS, postsSagas.renderTweets);
  yield takeEvery(RENDER_COMPONENTS, postsSagas.renderComponents);
}

const composeEnhancers = isProduction
  ? compose
  : global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools;

export { reducers, initialState, composeEnhancers, middleware, sagaMiddleware, sagas, initializeStore };
