import { call, put } from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import { navigateTo } from 'gatsby-link';
// import fp from 'lodash/fp';
import {
  HISTORY_GO_BACK_SUCCESS,
  HISTORY_GO_BACK_FAILED,
  SUPPORT_CLIPBOARD,
  DO_NOT_SUPPORT_CLIPBOARD,
  COPY_TEXT_SUCCESS,
  COPY_TEXT_FAILED,
  PRINT_SUCCESS,
  PRINT_FAILED,
  INPUT_KEYWORD,
} from './actionTypes';

export function* historyGoBack() {
  try {
    yield call(() => {
      global.history.go(-1);
    });

    yield put({ type: HISTORY_GO_BACK_SUCCESS });
  } catch (e) {
    yield put({ type: HISTORY_GO_BACK_FAILED });
  }
}

export function* navigateToPath({ path }) {
  yield put({ type: INPUT_KEYWORD, input: '' });
  yield call(() => {
    navigateTo(path);
  });
}

export function* initClipboardSupport() {
  try {
    const isSupport = global.document.queryCommandSupported;

    if (!(isSupport && global.document.queryCommandSupported('copy'))) {
      throw new Error('Do not support clipboard');
    }

    yield put({ type: SUPPORT_CLIPBOARD });
  } catch (e) {
    yield put({ type: DO_NOT_SUPPORT_CLIPBOARD });
  }
}

export function* copyText({ query }) {
  try {
    yield call(() => {
      const target = global.document.querySelector(query);
      target.select();
      global.document.execCommand('Copy');
    });

    yield put({ type: COPY_TEXT_SUCCESS });

    yield call(() => {
      const selection = global.getSelection();
      selection.removeAllRanges();
    });
  } catch (e) {
    yield put({ type: COPY_TEXT_FAILED });
  }
}

export function* printPage() {
  try {
    yield call(() => {
      global.print();
    });
    yield put({ type: PRINT_SUCCESS });
  } catch (e) {
    yield put({ type: PRINT_FAILED });
  }
}
