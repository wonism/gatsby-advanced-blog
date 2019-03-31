import { createSelector } from 'reselect';

const getAppSubState = ({ app }) => app;

export const isProduction = createSelector(
  getAppSubState,
  ({ isProduction }) => isProduction
);

export const isTickerBarOpened = createSelector(
  getAppSubState,
  ({ isTickerBarOpened }) => isTickerBarOpened
);

export const getSearchKeyword = createSelector(
  getAppSubState,
  ({ searchKeyword }) => searchKeyword
);

export const getCategories = createSelector(
  getAppSubState,
  ({ categories }) => categories
);

export const getPostInformations = createSelector(
  getAppSubState,
  ({ postInformations }) => postInformations
);

export const getPortfolios = createSelector(
  getAppSubState,
  ({ portfolios }) => portfolios
);

export const isMenuOpened = createSelector(
  getAppSubState,
  ({ isMenuOpened }) => isMenuOpened
);

export const isSubMenuOpened = createSelector(
  getAppSubState,
  ({ isSubMenuOpened }) => isSubMenuOpened
);
