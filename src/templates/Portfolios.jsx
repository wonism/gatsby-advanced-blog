import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import fp from 'lodash/fp';
import SimpleWrapper from '~/components/Common/SimpleWrapper';
import PortfolioCard from '~/components/Common/PortfolioCard';

const Wrapper = SimpleWrapper.extend`
  padding: 100px 0 0;
`;

const Portfolios = ({
  data,
}) => {
  const siteTitle = fp.get('site.siteMetadata.title')(data);
  const portfolios = fp.get('allMarkdownRemark.edges')(data);

  return (
    <Wrapper>
      <Helmet>
        <title>{siteTitle}</title>
        <meta name="og:title" content={siteTitle} />
      </Helmet>
      {fp.map((portfolio) => {
        if (portfolio.node.path !== '/404/') {
          const frontmatter = fp.get('node.frontmatter')(portfolio);
          const { path, title, images } = frontmatter;

          if (fp.size(images)) {
            return (
              <PortfolioCard key={path}>
                <Link to={path}>
                  <img src={fp.first(images)} alt="portfolio" />
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

/* eslint-disable no-undef */
export const pageQuery = graphql`
  query PortfoliosQuery {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark (
      filter: {
        frontmatter: {
          type: { eq: "portfolio" }
          hide: { ne: true }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            type
            title
            path
            images
            date(formatString: "DD MMMM, YYYY")
          }
        }
      }
    }
  }
`;
/* eslint-enable no-undef */
