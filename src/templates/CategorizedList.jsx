import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import fp from 'lodash/fp';
import PostsWrapper from '~/components/Common/PostsWrapper';
import Card from '~/components/Common/Card';
import Pagination from '~/components/Common/Pagination';
import getPosts from '~/utils/getPosts';
import getPage from '~/utils/getPage';
import { CONTENT_PER_PAGE } from '~/constants';

const CategorizedList = ({
  data,
  location,
}) => {
  const page = getPage(3)(location);
  const category = fp.flow(
    fp.get('pathname'),
    fp.split('/'),
    fp.get('2')
  )(location);
  const allPosts = fp.flow(
    getPosts,
    fp.filter(
      fp.flow(
        fp.get('node.frontmatter.category'),
        fp.isEqual(category)
      )
    )
  )(data);
  const postCount = fp.size(allPosts);
  const posts = fp.slice(
    (page - 1) * CONTENT_PER_PAGE,
    page * CONTENT_PER_PAGE
  )(allPosts);

  return ([
    <PostsWrapper key="posts-wrapper">
      <Helmet>
        <title>WONISM | {fp.toUpper(category)}</title>
        <meta name="og:title" content={`WONISM | ${fp.toUpper(category)}`} />
      </Helmet>
      {fp.isEmpty(posts) ? (
        <div>Posts Not Found.</div>
      ) : null}
      {fp.map((post) => {
        if (post.node.path !== '/404/') {
          const frontmatter = fp.get('node.frontmatter')(post);
          const { images, tags, path } = frontmatter;

          return (
            <Card key={path} path={path} images={images} tags={tags} {...frontmatter} />
          );
        }

        return null;
      })(posts)}
    </PostsWrapper>,
    <Pagination
      key="pagination"
      prefix={`/categories/${category}/`}
      postCount={postCount}
      location={location}
    />,
  ]);
};

CategorizedList.propTypes = {
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default connect(
  state => state,
  {
  }
)(CategorizedList);

/* eslint-disable no-undef */
export const pageQuery = graphql`
  query CategorizedListQuery {
    allMarkdownRemark (
      filter: {
        frontmatter: {
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
            images
            path
            category
            tags
            date
            summary
          }
        }
      }
    }
  }
`;
/* eslint-enable no-undef */
