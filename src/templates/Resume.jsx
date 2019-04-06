import React from 'react';
import { graphql } from 'gatsby';
import Layout from '~/components/layout';
import Resume from '~/components/Resume';

const ResumeTemplate = props => (
  <Layout {...props}>
    <Resume {...props} />
  </Layout>
);

export default ResumeTemplate;

export const pageQuery = graphql`
  query ResumeQuery ($path: String!) {
    site {
      siteMetadata {
        title
        author
        homepage
      }
    }
    resume: markdownRemark (
      frontmatter: { path: { eq: $path } }
    ) {
      id
      html
      frontmatter {
        title
        date
      }
    }
  }
`;
