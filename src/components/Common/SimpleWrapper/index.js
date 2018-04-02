import styled from 'styled-components';

export default styled.div`
  position: relative;
  min-height: 100vh;

  &:before,
  &:after {
    display: block;
    content: '';
    clear: both;
  }
`;
