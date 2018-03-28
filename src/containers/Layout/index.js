import { connect } from 'react-redux';
import {
  historyGoBack,
  copyText,
  printPage,
} from '~/store/app/actions';
import * as appSelectors from '~/store/app/selectors';
import Layout from '~/components/Layout';

export default connect(
  state => ({
    categories: appSelectors.getCategories(state),
    postInformations: appSelectors.getPostInformations(state),
    portfolios: appSelectors.getPortfolios(state),
  }),
  {
    historyGoBack,
    copyText,
    printPage,
  }
)(Layout);
