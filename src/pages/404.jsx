import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import SimpleWrapper from '~/components/Common/SimpleWrapper';

const Wrapper = SimpleWrapper.extend`
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
        WONISM | PAGE NOT FOUND
      </title>
      <meta name="og:title" content="WONISM | PAGE NOT FOUND" />
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
