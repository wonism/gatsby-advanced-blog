import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'gatsby-link';
import fp from 'lodash/fp';
import Helmet from 'react-helmet';
import Wrapper from '~/components/Common/Wrapper';
import SimpleWrapper from '~/components/Common/SimpleWrapper';
import PortfolioCard from '~/components/Common/PortfolioCard';
import './index.less';

const Title = styled.h1`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 80%;
  height: 1.5em;
  line-height: 1.5em;
  font-size: 48px;
  font-size: 10vw;
  font-family: 'Kaushan Script';
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

/* eslint-disable react/no-unescaped-entities */
const Home = ({
  portfolios,
}) => ([
  <Wrapper key="main" isHome>
    <Title>
      Hello, Blog!
    </Title>
    <Helmet>
      <title>I'm Wonism!</title>
      <meta name="og:title" content="I'm Wonism!" />
    </Helmet>
  </Wrapper>,
  fp.size(portfolios) >= 4 ? (
    <SimpleWrapper key="portfolios">
      {fp.flow(
        fp.slice(0, 4),
        fp.map((edge) => {
          const portfolio = fp.get('node.frontmatter')(edge);
          const { path, title, images } = portfolio;
          const image = fp.isArray(images) ? fp.first(images) : null;

          if (!fp.isEmpty(image)) {
            return (
              <PortfolioCard key={path}>
                <Link to={path}>
                  {fp.includes('//')(image) ? (
                    <img src={image} alt="portfolio" />
                  ) : (
                    <img src={require(`~/resources/${image}`)} alt="portfolio" />
                  )}
                  <h6>{title}</h6>
                </Link>
              </PortfolioCard>
            );
          }

          return (
            <PortfolioCard key={path}>
              <Link to={path}>
                <h4>{title}</h4>
              </Link>
            </PortfolioCard>
          );
        })
      )(portfolios)}
    </SimpleWrapper>
  ) : null,
]);
/* eslint-enable react/no-unescaped-entities */

Home.propTypes = {
  portfolios: PropTypes.arrayOf(PropTypes.shape({})),
};

Home.defaultProps = {
  portfolios: [],
};

export default Home;
