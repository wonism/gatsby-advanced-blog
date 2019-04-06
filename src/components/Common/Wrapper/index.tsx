import React from 'react';
import PropTypes from 'prop-types';
import { WrapperOuter, WrapperInner } from './styled';

const Wrapper = ({
  children,
}) => (
  <WrapperOuter>
    <WrapperInner>
      {children}
    </WrapperInner>
  </WrapperOuter>
);

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
  ]),
};

Wrapper.defaultProps = {
  children: null,
};

export default Wrapper;
