import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { PREFIX } from '~/constants';
import SimpleWrapper from '~/components/Common/SimpleWrapper';

const Wrapper = styled(SimpleWrapper)`
  padding: 100px 0 0;
  min-height: 100vh;
  text-align: center;
  @media (max-width: 414px) {
    padding: 70px 0 0;
  }

  h1 {
    margin: 0 0 .67em;
    font-size: 24px;
  }

  a {
    text-decoration: underline;
  }
`;

const NotFoundPage = () => (
  <Wrapper>
    <Helmet>
      <title>
        {`${PREFIX}PAGE NOT FOUND`}
      </title>
      <meta name="og:title" content={`${PREFIX}PAGE NOT FOUND`} />
    </Helmet>
    <h1>
      Page Not Found
    </h1>
    <Link to="/">
      ← Go Home
    </Link>
  </Wrapper>
);

export default NotFoundPage;
