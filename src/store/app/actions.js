import {
  HISTORY_GO_BACK,
  NAVIGATE_TO_PATH,
  PRINT,
  INPUT_KEYWORD,
  OPEN_MENU,
  CLOSE_MENU,
  OPEN_SUB_MENU,
  CLOSE_SUB_MENU,
} from './actionTypes';

export const historyGoBack = () => dispatch =>
  dispatch({
    type: HISTORY_GO_BACK,
  });

export const navigateToPath = path => dispatch =>
  dispatch({
    type: NAVIGATE_TO_PATH,
    path,
  });

export const printPage = () => dispatch =>
  dispatch({
    type: PRINT,
  });

export const inputKeyword = input => dispatch =>
  dispatch({
    type: INPUT_KEYWORD,
    input,
  });

export const openMenu = () => dispatch =>
  dispatch({
    type: OPEN_MENU,
  });

export const closeMenu = () => dispatch =>
  dispatch({
    type: CLOSE_MENU,
  });

export const openSubMenu = () => dispatch =>
  dispatch({
    type: OPEN_SUB_MENU,
  });

export const closeSubMenu = () => dispatch =>
  dispatch({
    type: CLOSE_SUB_MENU,
  });
