import {
  INIT_DISQUS_CONFIG,
  RENDER_TWEETS,
  RENDER_COMPONENTS,
  CREATE_COPY_BUTTON,
} from './actionTypes';

export const initDisqusConfig = ({ url, identifier, title }) =>
  dispatch =>
    dispatch({
      type: INIT_DISQUS_CONFIG,
      url,
      identifier,
      title,
    });

export const renderTweets = tweets =>
  dispatch =>
    dispatch({
      type: RENDER_TWEETS,
      tweets,
    });

export const renderComponents = components =>
  dispatch =>
    dispatch({
      type: RENDER_COMPONENTS,
      components,
    });

export const createCopyButton = () =>
  dispatch =>
    dispatch({
      type: CREATE_COPY_BUTTON,
    });
