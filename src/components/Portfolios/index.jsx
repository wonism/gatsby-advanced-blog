import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { isEmpty, isArray, includes, map, get, first } from 'lodash/fp';
import SimpleWrapper from '~/components/Common/SimpleWrapper';
import PortfolioCard from '~/components/Common/PortfolioCard';

const Wrapper = SimpleWrapper.extend`
  padding: 100px 0 0;
  @media (max-width: 414px) {
    padding: 70px 0 0;
  }
`;

const Portfolios = ({ data }) => {
  const portfolios = get('allMarkdownRemark.edges')(data);

  return (
    <Wrapper>
      <Helmet>
        <title>
          WONISM | PORTFOLIOS
        </title>
        <meta name="og:title" content="WONISM | PORTFOLIOS" />
      </Helmet>
      {map((portfolio) => {
        if (portfolio.node.path !== '/404/') {
          const frontmatter = get('node.frontmatter')(portfolio);
          const { path, title, images } = frontmatter;
          const image = isArray(images) ? first(images) : null;

          if (!isEmpty(image)) {
            return (
              <PortfolioCard key={path}>
                <Link to={path}>
                  {includes('//')(image) ? (
                    <img src={image} alt="portfolio" />
                  ) : (
                    <img src={require(`~/resources/${image}`)} alt="portfolio" />
                  )}
                  <h6>
                    {title}
                  </h6>
                </Link>
              </PortfolioCard>
            );
          }

          return (
            <PortfolioCard key={path}>
              <Link to={path}>
                <h4>
                  {title}
                </h4>
              </Link>
            </PortfolioCard>
          );
        }

        return null;
      })(portfolios)}
    </Wrapper>
  );
};

Portfolios.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default Portfolios;
