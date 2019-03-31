import React from 'react';
import PropTypes from 'prop-types';
import { BackButtonIcon, HeaderWrapper, StyledLink } from './styled';

const Header = ({ historyGoBack }) => (
  <HeaderWrapper>
    <BackButtonIcon onClick={historyGoBack} />
    <StyledLink to="/">
      Home
    </StyledLink>
  </HeaderWrapper>
);

Header.propTypes = {
  historyGoBack: PropTypes.func.isRequired,
};

export default Header;
