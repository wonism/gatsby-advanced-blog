import {
  INPUT_KEYWORD,
  OPEN_MENU,
  CLOSE_MENU,
  OPEN_SUB_MENU,
  CLOSE_SUB_MENU,
} from './actionTypes';

export default {
  [INPUT_KEYWORD]: (state, { input }) => ({ ...state, searchKeyword: input }),
  [OPEN_MENU]: state => ({ ...state, isMenuOpened: true }),
  [CLOSE_MENU]: state => ({ ...state, isMenuOpened: false }),
  [OPEN_SUB_MENU]: state => ({ ...state, isSubMenuOpened: true }),
  [CLOSE_SUB_MENU]: state => ({ ...state, isSubMenuOpened: false }),
};
