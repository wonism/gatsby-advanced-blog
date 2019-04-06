import React from 'react';
import { graphql } from 'gatsby';
import Layout from '~/components/layout';
import Post from '~/containers/Post';

const PostTemplate = props => (
  <Layout {...props}>
    <Post {...props} />
  </Layout>
);

export default PostTemplate;

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    markdownRemark (
      frontmatter: { path: { eq: $path } }
    ) {
      id
      html
      frontmatter {
        title
        path
        images
        category
        tags
        date
        components {
          rootId
          fileName
        }
        tweets {
          rootId
          userId
          tweetId
        } summary
      }
    }
  }
`;
