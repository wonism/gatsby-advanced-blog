import {
  HISTORY_GO_BACK,
  NAVIGATE_TO_PATH,
  COPY_TEXT,
  PRINT,
  INPUT_KEYWORD,
} from './actionTypes';

export const historyGoBack = () =>
  dispatch =>
    dispatch({
      type: HISTORY_GO_BACK,
    });

export const navigateToPath = path =>
  dispatch =>
    dispatch({
      type: NAVIGATE_TO_PATH,
      path,
    });

export const copyText = query =>
  dispatch =>
    dispatch({
      type: COPY_TEXT,
      query,
    });

export const printPage = () =>
  dispatch =>
    dispatch({
      type: PRINT,
    });

export const inputKeyword = input =>
  dispatch =>
    dispatch({
      type: INPUT_KEYWORD,
      input,
    });
