import styled from 'styled-components';

export const WrapperOuter = styled.section`
  position: relative;
  padding: 56.25% 0 0;
  width: 100%;
  height: 0;
  @media (max-width: 414px) {
    padding: 178% 0 0;
    padding: 100vh 0 0;
  }
`;

export const WrapperInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${({ isHome }) => (isHome ? '' : 'padding: 100px 0 0;')}
`;
