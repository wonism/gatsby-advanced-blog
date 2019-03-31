import React from 'react';
import { graphql } from 'gatsby';
import Layout from '~/components/layout';
import CategorizedList from '~/components/CategorizedList';

const CategorizedListTemplate = props => (
  <Layout {...props}>
    <CategorizedList {...props} />
  </Layout>
);

export default CategorizedListTemplate;

export const pageQuery = graphql`
  query CategorizedListQuery {
    site {
      siteMetadata {
        title
        author
        homepage
      }
    }
    posts: allMarkdownRemark (
      filter: { frontmatter: { hide: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            type
            title
            category
            images
            path
            tags
            date
            summary
          }
        }
      }
    }
  }
`;
