import fp from 'lodash/fp';
import {
  SUPPORT_CLIPBOARD,
  DO_NOT_SUPPORT_CLIPBOARD,
  INPUT_KEYWORD,
} from './actionTypes';

export default {
  [SUPPORT_CLIPBOARD]: fp.set('isClipboardSupported', true),
  [DO_NOT_SUPPORT_CLIPBOARD]: fp.set('isClipboardSupported', false),
  [INPUT_KEYWORD]: (state, { input }) => fp.set('searchKeyword', input)(state),
};
