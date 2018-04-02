import { connect } from 'react-redux';
import {
  navigateToPath,
  inputKeyword,
  openMenu,
  closeMenu,
  openSubMenu,
  closeSubMenu,
} from '~/store/app/actions';
import * as appSelectors from '~/store/app/selectors';
import Gnb from '~/components/Gnb';

export default connect(
  state => ({
    searchKeyword: appSelectors.getSearchKeyword(state),
    isMenuOpened: appSelectors.isMenuOpened(state),
    isSubMenuOpened: appSelectors.isSubMenuOpened(state),
  }),
  {
    navigateToPath,
    inputKeyword,
    openMenu,
    closeMenu,
    openSubMenu,
    closeSubMenu,
  }
)(Gnb);
