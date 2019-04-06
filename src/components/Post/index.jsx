import React, { useCallback, useEffect } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Tweet } from 'react-twitter-widgets';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import { FaTags } from 'react-icons/fa';
import Clipboard from 'clipboard';
import Bio from '~/components/Bio';
import PostWrapper from '~/components/Common/PostWrapper';
import { PREFIX, SITE_URL, DISQUS_ID } from '~/constants';
import formattedDate from '~/utils/formattedDate';
import { Tags, PostContent, ImageWrapper, ComponentInPost } from './styled';

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
}) => {
  const loadDisqus = useCallback(({ url, identifier, title }) => {
    const d = global.document;

    if (!d.getElementById('disqus-sdk')) {
      const s = d.createElement('script');

      s.src = `https://${DISQUS_ID}.disqus.com/embed.js`;
      s.setAttribute('data-timestamp', Date.now());
      d.body.appendChild(s);
    }

    global.disqus_config = function disqusCallback() {
      this.page.url = url;
      this.page.identifier = identifier;
      this.page.title = title;
    };
  }, []);

  const createCopyButton = useCallback(() => {
    const codes = global.document.querySelectorAll('#post-contents .gatsby-highlight');

    codes.forEach((code) => {
      const button = document.createElement('button');
      button.setAttribute('class', 'copy-button');
      button.innerHTML = 'COPY';

      code.appendChild(button);
    });

    const clipboard = new Clipboard('.copy-button', {
      target: ({ previousElementSibling }) => previousElementSibling,
    });

    clipboard.on('success', (e) => {
      e.clearSelection();
    });
  }, []);

  const renderComponents = useCallback((components) => {
    if (Array.isArray(components)) {
      try {
        components.forEach(({ rootId: componentRootId, fileName: componentFileName }) => {
          const $componentContainer = global.document.getElementById(componentRootId);
          const App = require(`~/postComponents/${componentFileName}`).default;

          render(
            <ComponentInPost>
              <App />
            </ComponentInPost>,
            $componentContainer
          );
        });
      } catch (e) {
        console.warn(e); // eslint-disable-line no-console
      }
    }
  }, []);

  const renderTweets = useCallback((tweets) => {
    if (Array.isArray(tweets)) {
      try {
        tweets.forEach(({ rootId: tweetRootId, tweetId, userId: username }) => {
          const $tweetContainer = global.document.getElementById(tweetRootId);

          render(
            <div>
              <Tweet tweetId={tweetId} options={{ username }} />
            </div>,
            $tweetContainer
          );
        });
      } catch (e) {
        console.warn(e); // eslint-disable-line no-console
      }
    }
  }, []);

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
};

export default PostTemplate;
