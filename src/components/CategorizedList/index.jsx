import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import PostsWrapper from '~/components/Common/PostsWrapper';
import Card from '~/components/Common/Card';
import Pagination from '~/components/Common/Pagination';
import getPosts from '~/utils/getPosts';
import getPage from '~/utils/getPage';
import { PREFIX, CONTENT_PER_PAGE } from '~/constants';

const CategorizedList = ({ data, location }) => {
  const page = getPage(location);
  const [, , category] = location.pathname.split('/');
  const allPosts = data
    |> getPosts
    |> (posts => posts.filter(({ node: { frontmatter: { category: c } } }) => category === c));
  const postCount = allPosts.length;
  const posts = allPosts.slice((page - 1) * CONTENT_PER_PAGE, page * CONTENT_PER_PAGE);

  return (
    <>
      <PostsWrapper>
        <Helmet>
          <title>
            {`${PREFIX}${category.toUpperCase()}`}
          </title>
          <meta name="og:title" content={`${PREFIX}${category.toUpperCase()}`} />
        </Helmet>
        {posts.length === 0 ? (
          <div>
            No posts.
          </div>
        ) : null}
        {posts.map(({ node: { frontmatter: { images, tags, path, ...otherProps } } }) => (
          <Card key={path} path={path} images={images} tags={tags} {...otherProps} />
        ))}
      </PostsWrapper>
      <Pagination
        prefix={`/categories/${category}/`}
        postCount={postCount}
        location={location}
      />
    </>
  );
};

CategorizedList.propTypes = {
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default CategorizedList;
