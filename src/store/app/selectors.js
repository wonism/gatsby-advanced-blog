import { createSelector } from 'reselect';
import { get } from 'lodash/fp';

const getAppSubState = get('app');

export const isProduction = createSelector(
  getAppSubState,
  get('isProduction')
);

export const isTickerBarOpened = createSelector(
  getAppSubState,
  get('isTickerBarOpened')
);

export const getSearchKeyword = createSelector(
  getAppSubState,
  get('searchKeyword')
);

export const getCategories = createSelector(
  getAppSubState,
  get('categories')
);

export const getPostInformations = createSelector(
  getAppSubState,
  get('postInformations')
);

export const getPortfolios = createSelector(
  getAppSubState,
  get('portfolios')
);

export const isMenuOpened = createSelector(
  getAppSubState,
  get('isMenuOpened')
);

export const isSubMenuOpened = createSelector(
  getAppSubState,
  get('isSubMenuOpened')
);
