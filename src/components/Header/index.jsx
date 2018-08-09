import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';

const BackButtonIcon = styled(FaAngleLeft)`
  display: none;
`;

const HeaderWrapper = styled.section`
`;

const StyledLink = styled(Link)`
`;

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
