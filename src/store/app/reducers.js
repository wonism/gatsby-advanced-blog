import fp from 'lodash/fp';
import {
  SUPPORT_CLIPBOARD,
  DO_NOT_SUPPORT_CLIPBOARD,
  INPUT_KEYWORD,
  OPEN_MENU,
  CLOSE_MENU,
  OPEN_SUB_MENU,
  CLOSE_SUB_MENU,
} from './actionTypes';

export default {
  [SUPPORT_CLIPBOARD]: fp.set('isClipboardSupported', true),
  [DO_NOT_SUPPORT_CLIPBOARD]: fp.set('isClipboardSupported', false),
  [INPUT_KEYWORD]: (state, { input }) => fp.set('searchKeyword', input)(state),
  [OPEN_MENU]: fp.set('isMenuOpened', true),
  [CLOSE_MENU]: fp.set('isMenuOpened', false),
  [OPEN_SUB_MENU]: fp.set('isSubMenuOpened', true),
  [CLOSE_SUB_MENU]: fp.set('isSubMenuOpened', false),
};
