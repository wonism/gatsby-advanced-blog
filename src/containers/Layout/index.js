import { connect } from 'react-redux';
import { historyGoBack, printPage } from '~/store/app/actions';
import { copyText } from '~/store/posts/actions';
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
