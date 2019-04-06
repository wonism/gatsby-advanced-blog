import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { size } from 'lodash/fp';
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

export default class HigherOrderLayout extends Component {
  static propTypes = {
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

  static defaultProps = {
    categories: [],
    postInformations: [],
    children: null,
  };

  render() {
    const {
      categories,
      postInformations,
      portfolios,
      children,
      location,
      loadDisqus,
      renderTweets,
      renderComponents,
      createCopyButton,
    } = this.props;

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
            hasPortfolio={size(portfolios) > 0}
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
  }
}
