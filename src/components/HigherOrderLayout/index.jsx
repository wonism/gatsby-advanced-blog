import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Gnb from '~/containers/Gnb';
import Footer from '~/components/Footer';

const Background = styled.div`
  background-color: #fff;

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

const Layout = ({
  categories,
  postInformations,
  portfolios,
  children,
  location,
  loadDisqus,
  renderTweets,
  renderComponents,
  createCopyButton,
}) => {
  const childrenWithProps = Children.map(children, child =>
    cloneElement(child, {
      location,
      portfolios,
      loadDisqus,
      renderTweets,
      renderComponents,
      createCopyButton,
    }));

  return (
    <Background>
      <nav>
        <Gnb
          location={location}
          categories={categories}
          postInformations={postInformations}
          hasPortfolio={portfolios.length > 0}
        />
      </nav>
      <main>
        {childrenWithProps}
      </main>
      <footer>
        <Footer />
      </footer>
    </Background>
  );
};

Layout.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  postInformations: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.string,
  })),
  portfolios: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  loadDisqus: PropTypes.func.isRequired,
  renderTweets: PropTypes.func.isRequired,
  renderComponents: PropTypes.func.isRequired,
  createCopyButton: PropTypes.func.isRequired,
};

Layout.defaultProps = {
  categories: [],
  postInformations: [],
  children: null,
};

export default Layout;
