import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import PostsWrapper from '~/components/Common/PostsWrapper';
import Card from '~/components/Common/Card';
import Pagination from '~/components/Common/Pagination';
import getPosts from '~/utils/getPosts';
import getPage from '~/utils/getPage';
import { PREFIX, CONTENT_PER_PAGE } from '~/constants';

const TaggedList = ({ data, location }) => {
  const page = getPage(location);
  const [, , tag] = location.pathname.split('/');
  const allPosts = data
    |> getPosts
    |> (posts => posts.filter(({ node: { frontmatter: { tags } } }) => tags.includes(tag)));
  const postCount = allPosts.length;
  const posts = allPosts.slice((page - 1) * CONTENT_PER_PAGE, page * CONTENT_PER_PAGE);

  return (
    <>
      <PostsWrapper>
        <Helmet>
          <title>
            {`${PREFIX}${tag.toUpperCase()}`}
          </title>
          <meta name="og:title" content={`${PREFIX}${tag.toUpperCase()}`} />
        </Helmet>
        {posts.length === 0 ? (
          <div>
            No posts.
          </div>
        ) : null}
        {posts.map(({ node: { frontmatter: { images, tags, path, ...otherProps } } }) => (
          <Card key={path} path={path} tags={tags} images={images} {...otherProps} />
        ))}
      </PostsWrapper>
      <Pagination
        prefix={`/tags/${tag}/`}
        postCount={postCount}
        location={location}
      />
    </>
  );
};

TaggedList.propTypes = {
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default TaggedList;
