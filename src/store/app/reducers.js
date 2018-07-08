import { set } from 'lodash/fp';
import {
  INPUT_KEYWORD,
  OPEN_MENU,
  CLOSE_MENU,
  OPEN_SUB_MENU,
  CLOSE_SUB_MENU,
} from './actionTypes';

export default {
  [INPUT_KEYWORD]: (state, { input }) => set('searchKeyword', input)(state),
  [OPEN_MENU]: set('isMenuOpened', true),
  [CLOSE_MENU]: set('isMenuOpened', false),
  [OPEN_SUB_MENU]: set('isSubMenuOpened', true),
  [CLOSE_SUB_MENU]: set('isSubMenuOpened', false),
};
