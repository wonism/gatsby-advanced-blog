import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { flow, isEmpty, isEqual, slice, split, filter, map, get, size, toUpper } from 'lodash/fp';
import PostsWrapper from '~/components/Common/PostsWrapper';
import Card from '~/components/Common/Card';
import Pagination from '~/components/Common/Pagination';
import getPosts from '~/utils/getPosts';
import getPage from '~/utils/getPage';
import { CONTENT_PER_PAGE } from '~/constants';

const CategorizedList = ({ data, location }) => {
  const page = getPage(3)(location);
  const category = flow(
    get('pathname'),
    split('/'),
    get('2')
  )(location);
  const allPosts = flow(
    getPosts,
    filter(
      flow(
        get('node.frontmatter.category'),
        isEqual(category)
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
            {`WONISM | ${toUpper(category)}`}
          </title>
          <meta name="og:title" content={`WONISM | ${toUpper(category)}`} />
        </Helmet>
        {isEmpty(posts) ? (
          <div>
            Posts Not Found.
          </div>
        ) : null}
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
      <Pagination
        prefix={`/categories/${category}/`}
        postCount={postCount}
        location={location}
      />
    </Fragment>
  );
};

CategorizedList.propTypes = {
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default CategorizedList;
