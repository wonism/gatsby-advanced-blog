import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { flow, isEmpty, split, slice, filter, map, includes, get, size, toUpper } from 'lodash/fp';
import PostsWrapper from '~/components/Common/PostsWrapper';
import Card from '~/components/Common/Card';
import Pagination from '~/components/Common/Pagination';
import getPosts from '~/utils/getPosts';
import getPage from '~/utils/getPage';
import { CONTENT_PER_PAGE } from '~/constants';

const TaggedList = ({ data, location }) => {
  const page = getPage(3)(location);
  const tag = flow(
    get('pathname'),
    split('/'),
    get('2')
  )(location);
  const allPosts = flow(
    getPosts,
    filter(
      flow(
        get('node.frontmatter.tags'),
        includes(tag)
      )
    )
  )(data);
  const postCount = size(allPosts);
  const posts = slice(
    (page - 1) * CONTENT_PER_PAGE,
    page * CONTENT_PER_PAGE
  )(allPosts);

  return (
    <Fragment>
      <PostsWrapper>
        <Helmet>
          <title>
            {`WONISM | ${toUpper(tag)}`}
          </title>
          <meta name="og:title" content={`WONISM | ${toUpper(tag)}`} />
        </Helmet>
        {isEmpty(posts) ? (
          <div>
            No posts.
          </div>
        ) : null}
        {map((post) => {
          if (post.node.path !== '/404/') {
            const frontmatter = get('node.frontmatter')(post);
            const { images, tags, path } = frontmatter;

            return (
              <Card key={path} path={path} tags={tags} images={images} {...frontmatter} />
            );
          }

          return null;
        })(posts)}
      </PostsWrapper>
      <Pagination
        prefix={`/tags/${tag}/`}
        postCount={postCount}
        location={location}
      />
    </Fragment>
  );
};

TaggedList.propTypes = {
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default TaggedList;
