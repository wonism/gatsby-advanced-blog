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

const TaggedList = ({
  data,
  location,
}) => {
  const page = getPage(3)(location);
  const tag = fp.flow(
    fp.get('pathname'),
    fp.split('/'),
    fp.get('2')
  )(location);
  const allPosts = fp.flow(
    getPosts,
    fp.filter(
      fp.flow(
        fp.get('node.frontmatter.tags'),
        fp.includes(tag)
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
        <title>WONISM | {fp.toUpper(tag)}</title>
        <meta name="og:title" content={`WONISM | ${fp.toUpper(tag)}`} />
      </Helmet>
      {fp.isEmpty(posts) ? (
        <div>검색된 게시물이 없습니다.</div>
      ) : null}
      {fp.map((post) => {
        if (post.node.path !== '/404/') {
          const frontmatter = fp.get('node.frontmatter')(post);
          const { images, tags, path } = frontmatter;

          return (
            <Card key={path} path={path} tags={tags} images={images} {...frontmatter} />
          );
        }

        return null;
      })(posts)}
    </PostsWrapper>,
    <Pagination
      key="pagination"
      prefix={`/tags/${tag}/`}
      postCount={postCount}
      location={location}
    />,
  ]);
};

TaggedList.propTypes = {
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default connect(
  state => state,
  {
  }
)(TaggedList);

/* eslint-disable no-undef */
export const pageQuery = graphql`
  query TaggedListQuery {
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
