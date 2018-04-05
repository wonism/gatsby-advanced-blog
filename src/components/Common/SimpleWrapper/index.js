import styled from 'styled-components';

export default styled.div`
  position: relative;

  &:before,
  &:after {
    display: block;
    content: '';
    clear: both;
  }
`;
