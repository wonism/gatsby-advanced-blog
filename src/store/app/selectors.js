import { createSelector } from 'reselect';
import fp from 'lodash/fp';

const getAppSubState = fp.get('app');

export const isProduction = createSelector(
  getAppSubState,
  fp.get('isProduction')
);

export const isTickerBarOpened = createSelector(
  getAppSubState,
  fp.get('isTickerBarOpened')
);

export const getSearchKeyword = createSelector(
  getAppSubState,
  fp.get('searchKeyword')
);

export const getCategories = createSelector(
  getAppSubState,
  fp.get('categories')
);

export const getPostInformations = createSelector(
  getAppSubState,
  fp.get('postInformations')
);

export const getPortfolios = createSelector(
  getAppSubState,
  fp.get('portfolios')
);

export const isMenuOpened = createSelector(
  getAppSubState,
  fp.get('isMenuOpened')
);

export const isSubMenuOpened = createSelector(
  getAppSubState,
  fp.get('isSubMenuOpened')
);
