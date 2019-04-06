import styled from 'styled-components';

const SimpleWrapper = styled.div`
  position: relative;

  &:before,
  &:after {
    display: block;
    content: '';
    clear: both;
  }
`;

export default SimpleWrapper;
