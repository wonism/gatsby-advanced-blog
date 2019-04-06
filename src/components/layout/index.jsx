import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { POST, PORTFOLIO } from '~/constants';
import Gnb from '~/components/Gnb';
import Footer from '~/components/Footer';
import { Background } from './styled';

const GatsbyApp = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query GatsbyQuery {
        posts: allMarkdownRemark(
          filter: { frontmatter: { hide: { ne: true } } }
        ){
          edges {
            node {
              frontmatter {
                path
                type
                title
                category
                summary
                tags
                images
              }
            }
          }
        }
      }
    `}
    render={({ posts }) => {
      const { edges } = posts;
      const portfolios = edges.filter(({ node: { frontmatter: { type } } }) => type === PORTFOLIO);
      const categories = edges.reduce((categories, { node }) => {
        const { category } = node.frontmatter;

        if (category === null) {
          return categories;
        }

        const [{ length: total }] = categories;
        const categoryIndex = categories.findIndex(({ key }) => key === category);

        if (categoryIndex === -1) {
          return [
            { key: '__ALL__', length: total + 1 },
            ...categories.slice(1),
            { key: category, length: 1 },
          ];
        }

        return [
          { key: '__ALL__', length: total + 1 },
          ...categories.slice(1, categoryIndex - 1),
          { key: category, length: categories[categoryIndex].length + 1 },
          ...categories.slice(categoryIndex + 1),
        ];
      }, [{ key: '__ALL__', length: 0 }]);
      const postInformations = edges.reduce((postInformations, { node: { frontmatter } }) => {
        const { type, path, title, summary, tags = [], category } = frontmatter;

        if (type === POST || type === null) {
          return [
            ...postInformations,
            {
              path,
              title,
              summary,
              tags,
              category,
            },
          ];
        }

        return postInformations;
      }, []);

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
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </Background>
      );
    }}
  />
);

GatsbyApp.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default GatsbyApp;
