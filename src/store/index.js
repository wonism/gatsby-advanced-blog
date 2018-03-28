import { applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeLatest, takeEvery } from 'redux-saga/effects';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import fp from 'lodash/fp';
import createReducer from '~/utils/createReducer';

/* reducers */
import appReducers from '~/store/app/reducers';

/* sagas */
import * as appSagas from '~/store/app/sagas';

/* initial states */
import appInitialState from '~/store/app/initialState';

/* initializers */
import appInitializer from '~/store/app/initializer';

import {
  INIT_CLIPBOARD_SUPPORT,
  HISTORY_GO_BACK,
  NAVIGATE_TO_PATH,
  COPY_TEXT,
  PRINT,
} from '~/store/app/actionTypes';

const isProduction = process.env.NODE_ENV === 'production';

const reducers = combineReducers({
  app: createReducer(appReducers, appInitialState),
});

const initialState = {
  app: appInitialState,
};

const initializeStore = fp.flow(
  appInitializer,
  _ => _
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
  yield takeLatest(INIT_CLIPBOARD_SUPPORT, appSagas.initClipboardSupport);
  yield takeEvery(COPY_TEXT, appSagas.copyText);
  yield takeEvery(PRINT, appSagas.printPage);
}

const composeEnhancers = isProduction ?
  compose :
  global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools;

export { reducers, initialState, composeEnhancers, middleware, sagaMiddleware, sagas, initializeStore };
