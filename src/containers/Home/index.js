import { connect } from 'react-redux';
import * as appSelectors from '~/store/app/selectors';
import Home from '~/components/Home';

export default connect(
  state => ({
    portfolios: appSelectors.getPortfolios(state),
  }),
  {
  }
)(Home);
