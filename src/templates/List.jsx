import React from 'react';
import { graphql } from 'gatsby';
import Layout from '~/components/layout';
import List from '~/components/List';

const ListTemplate = props => (
  <Layout {...props}>
    <List {...props} />
  </Layout>
);

export default ListTemplate;

export const pageQuery = graphql`
  query ListQuery {
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
