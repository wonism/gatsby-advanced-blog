import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { Tweet } from 'react-twitter-widgets';
import { all, call, put } from 'redux-saga/effects';
import Clipboard from 'clipboard';
import { each, get } from 'lodash/fp';
import {
  INIT_COPY_SUCCESS,
  INIT_COPY_FAILED,
  CREATE_COPY_BUTTON_SUCCESS,
  CREATE_COPY_BUTTON_FAILED,
  LOAD_DISQUS_SCRIPT_SUCCESS,
  LOAD_DISQUS_SCRIPT_FAILED,
  INIT_DISQUS_CONFIG_SUCCESS,
  INIT_DISQUS_CONFIG_FAILED,
  RENDER_TWEETS_SUCCESS,
  RENDER_TWEETS_FAILED,
  RENDER_COMPONENTS_SUCCESS,
  RENDER_COMPONENTS_FAILED,
} from './actionTypes';

export function* initCopy() {
  try {
    yield call(() => {
      const clipboard = new Clipboard('.copy-button', {
        target: get('previousElementSibling'),
      });
      clipboard.on('success', (e) => {
        e.clearSelection();
      });
    });
    yield put({ type: INIT_COPY_SUCCESS });
  } catch (e) {
    yield put({ type: INIT_COPY_FAILED });
  }
}

export function* createCopyButton() {
  try {
    const codes = yield call(() => global.document.querySelectorAll('#post-contents .gatsby-highlight'));
    yield all(each((code) => {
      const button = document.createElement('button');
      button.setAttribute('class', 'copy-button');
      button.innerHTML = 'COPY';

      code.appendChild(button);
    })(codes));
    yield put({ type: CREATE_COPY_BUTTON_SUCCESS });
  } catch (e) {
    yield put({ type: CREATE_COPY_BUTTON_FAILED });
  }
}

export function* loadDisqusScript() {
  try {
    yield call(() => {
      const d = global.document;

      if (!d.getElementById('disqus-sdk')) {
        const s = d.createElement('script');
        s.src = 'https://jaewonism.disqus.com/embed.js';
        s.setAttribute('data-timestamp', Date.now());
        d.body.appendChild(s);
      }
    });

    yield put({ type: LOAD_DISQUS_SCRIPT_SUCCESS });
  } catch (e) {
    yield put({ type: LOAD_DISQUS_SCRIPT_FAILED });
  }
}

export function* initDisqusConfig({ url, identifier, title }) {
  try {
    yield call(() => {
      global.disqus_config = function disqusCallback() {
        this.page.url = url;
        this.page.identifier = identifier;
        this.page.title = title;
      };
    });

    yield put({ type: INIT_DISQUS_CONFIG_SUCCESS });
  } catch (e) {
    yield put({ type: INIT_DISQUS_CONFIG_FAILED });
  }
}

export function* renderTweets({ tweets }) {
  try {
    yield all(each((tweet) => {
      const { rootId: tweetRootId, tweetId, userId: username } = tweet;
      const tweetContainer$ = global.document.getElementById(tweetRootId);

      render(
        <div>
          <Tweet
            tweetId={tweetId}
            options={{
              username,
            }}
          />
        </div>,
        tweetContainer$
      );
    })(tweets));
    yield put({ type: RENDER_TWEETS_SUCCESS });
  } catch (e) {
    yield put({ type: RENDER_TWEETS_FAILED });
  }
}

export function* renderComponents({ components }) {
  try {
    const ComponentInPost = styled.div`
      position: relative;
      margin: 1em 0 1em;
      padding: 55px 16px 16px;
      color: #263238;
      border: 1px solid #263238;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      overflow: hidden;

      &:before {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        padding: 0 0 0 80px;
        width: 100%;
        height: 35px;
        line-height: 35px;
        color: #fff;
        background-color: #263238;
        font-weight: 100;
        content: 'Application for example';
      }

      &:after {
        display: inline-block;
        position: absolute;
        top: 15px;
        left: 20px;
        width: 10px;
        height: 10px;
        background-color: #ff5f56;
        border-radius: 50%;
        content: '';
      }

      & > *:first-child {
        &:before {
          display: inline-block;
          position: absolute;
          top: 15px;
          left: 40px;
          width: 10px;
          height: 10px;
          background-color: #ffbd2e;
          border-radius: 50%;
          content: '';
        }

        &:after {
          display: inline-block;
          position: absolute;
          top: 15px;
          left: 60px;
          width: 10px;
          height: 10px;
          background-color: #27c93f;
          border-radius: 50%;
          content: '';
        }
      }
    `;

    yield all(each((component) => {
      const { rootId: componentRootId, fileName: componentFileName } = component;
      const componentContainer$ = global.document.getElementById(componentRootId);
      const App = require(`~/postComponents/${componentFileName}`).default;

      render(
        <ComponentInPost>
          <App />
        </ComponentInPost>,
        componentContainer$
      );
    })(components));
    yield put({ type: RENDER_COMPONENTS_SUCCESS });
  } catch (e) {
    yield put({ type: RENDER_COMPONENTS_FAILED });
  }
}
