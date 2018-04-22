import { INIT_COPY } from './actionTypes';

export default (store) => {
  store.dispatch({
    type: INIT_COPY,
  });

  return store;
};
