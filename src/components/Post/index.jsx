import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import { FaTags } from 'react-icons/fa';
import Bio from '~/components/Bio';
import PostWrapper from '~/components/Common/PostWrapper';
import { PREFIX, SITE_URL } from '~/constants';
import formattedDate from '~/utils/formattedDate';
import { Tags, PostContent, ImageWrapper } from './styled';

const PostTemplate = ({
  data: {
    post: {
      html,
      frontmatter: {
        title,
        date,
        tags = [],
        images = [],
        tweets = [],
        components = [],
      },
    },
  },
  location,
  loadDisqus,
  renderTweets,
  renderComponents,
  createCopyButton,
}) => {
  useEffect(() => {
    const { pathname: identifier } = location;
    const url = `${SITE_URL}${identifier}`;

    loadDisqus({
      url,
      identifier,
      title,
    });
  }, []);

  useEffect(() => {
    createCopyButton();
    renderTweets(tweets);
    renderComponents(components);
  }, []);

  const [image = null] = images;

  return (
    <PostWrapper>
      <Helmet>
        <title>
          {`${PREFIX}${title}`}
        </title>
        <meta name="og:title" content={`${PREFIX}${title}`} />
      </Helmet>
      {image === null ? null : (
        <ImageWrapper>
          <img
            src={image.includes('//') ? image : require(`~/resources/${image}`)}
            alt={title}
          />
        </ImageWrapper>
      )}
      <h1>
        {title}
      </h1>
      <time>
        {formattedDate(date)}
      </time>
      {tags.length === 0 ? null : (
        <Tags>
          <FaTags />
          {tags.map(tag => (
            <Link
              key={tag}
              to={`/tags/${tag}/1`}
            >
              <small>
                {tag}
              </small>
            </Link>
          ))}
        </Tags>
      )}
      <Bio />
      <PostContent>
        <div id="post-contents" dangerouslySetInnerHTML={{ __html: html }} />
      </PostContent>
      <div id="disqus_thread" />
      <noscript>
        Please enable JavaScript to view the
        &nbsp;
        <a href="https://disqus.com/?ref_noscript">
          comments powered by Disqus.
        </a>
      </noscript>
    </PostWrapper>
  );
};

PostTemplate.propTypes = {
  data: PropTypes.shape({ date: PropTypes.object }).isRequired,
  location: PropTypes.shape({}).isRequired,
  loadDisqus: PropTypes.func.isRequired,
  renderTweets: PropTypes.func.isRequired,
  renderComponents: PropTypes.func.isRequired,
  createCopyButton: PropTypes.func.isRequired,
};

export default PostTemplate;
