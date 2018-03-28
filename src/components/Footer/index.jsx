import React from 'react';
import styled from 'styled-components';
import { PRIMARY_COLOR } from '~/components/Common/constants';

const FooterWrapper = styled.section`
  padding: 10px 0;
  color: #fff;
  background-color: ${PRIMARY_COLOR};
  text-align: center;

  a {
    color: #fff;
  }
`;

const Footer = () => (
  <FooterWrapper>
    theme by
    &nbsp;
    <a
      href="https://github.com/wonism/gatsby-advanced-blog"
      target="_blank"
      rel="noreferrer noopener"
    >
      wonism
    </a>
  </FooterWrapper>
);

export default Footer;
