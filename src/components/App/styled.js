import styled from 'styled-components';

export const Wrapper = styled.div`
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.backgroundColor};
  transition: background-color .3s ease .1s, color .3s ease .1s;

  @media print {
    & > nav,
    & > footer {
      display: none;
    }

    & > main {
      & > section {
        padding: 0;
      }
    }

    button {
      display: none;
    }
  }
`;
