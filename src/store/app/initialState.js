const isProduction = JSON.stringify(process.env.NODE_ENV) === 'production';

export default {
  isProduction,
  isClipboardSupported: false,
  searchKeyword: '',
  portfolios: [],
  postInformations: [],
  categories: [],
  isMenuOpened: false,
  isSubMenuOpened: false,
};
