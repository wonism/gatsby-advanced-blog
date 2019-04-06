import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { size, slice, map, get } from 'lodash/fp';
import PostsWrapper from '~/components/Common/PostsWrapper';
import Card from '~/components/Common/Card';
import Pagination from '~/components/Common/Pagination';
import getPosts from '~/utils/getPosts';
import getPage from '~/utils/getPage';
import { CONTENT_PER_PAGE } from '~/constants';

const List = ({ data, location }) => {
  const page = getPage(2)(location);
  const allPosts = getPosts(data);
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
            WONISM | POST
          </title>
          <meta name="og:title" content="WONISM | POST" />
        </Helmet>
        {map((post) => {
          if (post.node.path !== '/404/') {
            const frontmatter = get('node.frontmatter')(post);
            const { images, tags, path } = frontmatter;

            return (
              <Card key={path} path={path} images={images} tags={tags} {...frontmatter} />
            );
          }

          return null;
        })(posts)}
      </PostsWrapper>
      <Pagination postCount={postCount} location={location} />
    </Fragment>
  );
};

List.propTypes = {
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default List;
