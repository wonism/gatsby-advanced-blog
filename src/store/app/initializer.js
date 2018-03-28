import { INIT_CLIPBOARD_SUPPORT } from './actionTypes';

export default (store) => {
  store.dispatch({
    type: INIT_CLIPBOARD_SUPPORT,
  });

  return store;
};
