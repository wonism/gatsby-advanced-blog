import { connect } from 'react-redux';
import {
  navigateToPath,
  inputKeyword,
} from '~/store/app/actions';
import * as appSelectors from '~/store/app/selectors';
import Gnb from '~/components/Gnb';

export default connect(
  state => ({
    searchKeyword: appSelectors.getSearchKeyword(state),
  }),
  {
    navigateToPath,
    inputKeyword,
  }
)(Gnb);
