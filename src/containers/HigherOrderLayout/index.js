import { connect } from 'react-redux';
import { historyGoBack, printPage } from '~/store/app/actions';
import { createCopyButton, loadDisqus, renderTweets, renderComponents } from '~/store/posts/actions';
import * as appSelectors from '~/store/app/selectors';
import HigherOrderLayout from '~/components/HigherOrderLayout';

export default connect(
  state => ({
    categories: appSelectors.getCategories(state),
    postInformations: appSelectors.getPostInformations(state),
    portfolios: appSelectors.getPortfolios(state),
  }),
  {
    historyGoBack,
    printPage,
    createCopyButton,
    loadDisqus,
    renderTweets,
    renderComponents,
  }
)(HigherOrderLayout);
