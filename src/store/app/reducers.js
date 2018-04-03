import fp from 'lodash/fp';
import {
  INPUT_KEYWORD,
  OPEN_MENU,
  CLOSE_MENU,
  OPEN_SUB_MENU,
  CLOSE_SUB_MENU,
} from './actionTypes';

export default {
  [INPUT_KEYWORD]: (state, { input }) => fp.set('searchKeyword', input)(state),
  [OPEN_MENU]: fp.set('isMenuOpened', true),
  [CLOSE_MENU]: fp.set('isMenuOpened', false),
  [OPEN_SUB_MENU]: fp.set('isSubMenuOpened', true),
  [CLOSE_SUB_MENU]: fp.set('isSubMenuOpened', false),
};
