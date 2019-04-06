import styled from 'styled-components';

const Clearfix = styled.div`
  &:before,
  &:after {
    display: block;
    clear: both;
    content: '';
  }
`;

export default Clearfix;
