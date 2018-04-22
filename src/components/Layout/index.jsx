import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import fp from 'lodash/fp';
// import Header from '~/components/Header';
import Gnb from '~/containers/Gnb';
import Footer from '~/components/Footer';

// common styles
import './index.less';

const Background = styled.div`
  background-color: #fff;
`;

/* eslint-disable react/prefer-stateless-function */
export default class Layout extends Component {
  static propTypes = {
    // historyGoBack: PropTypes.func.isRequired,
    printPage: PropTypes.func.isRequired,
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
  };

  static defaultProps = {
    categories: [],
    postInformations: [],
    children: null,
  };

  render() {
    const {
      // historyGoBack,
      printPage,
      categories,
      postInformations,
      portfolios,
      children,
      location,
    } = this.props;

    const childrenWithProps = Children.map(children, child =>
      cloneElement(child, {
        location,
        printPage,
        portfolios,
      }));

    return (
      <Background>
        {/*
        <header>
          <Header pathname={location.pathname} historyGoBack={historyGoBack} />
        </header>
        */}
        <nav>
          <Gnb
            location={location}
            categories={categories}
            postInformations={postInformations}
            hasPortfolio={fp.size(portfolios) > 0}
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
/* eslint-enable react/prefer-stateless-function */
