import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import FaTags from 'react-icons/lib/fa/tags';
import { flow, isEmpty, isNil, map, includes, add, get, first, defaultTo } from 'lodash/fp';
import Bio from '~/components/Bio';
import PostWrapper from '~/components/Common/PostWrapper';
import { SITE_URL } from '~/constants';
import formattedDate from '~/utils/formattedDate';

const Tags = styled.div`
  margin: 1em 0;

  a {
    margin: 0 0 0 4px;
    color: #000;
    text-decoration: blink;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const PostContent = styled.section`
  padding: 1em 0 4em;
  line-height: 1.6em;

  h2 {
    margin: 24px 0 10px;
    font-size: 28px;
  }

  h3 {
    margin: 24px 0 10px;
    font-size: 24px;
  }

  h4 {
    margin: 24px 0 10px;
    font-size: 21px;
  }

  p {
    margin: 16px 0 0;
    font-size: 16px;
  }

  blockquote {
    margin: 40px 0 0;
    padding: 0 0 0 2em;
    line-height: 1.2em;
    color: #aaa;
    font-style: italic;
    font-family: 'Kaushan Script';
    font-size: 24px;
  }

  pre {
    margin: 20px 0 0;
  }
`;

const ImageWrapper = styled.figure`
  position: relative;
  margin: 0 0 48px;
  padding: 56.25% 0 0;
  width: 100%;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 100%;
    height: auto;
  }
`;

class PostTemplate extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({ date: PropTypes.object }).isRequired,
    location: PropTypes.shape({}).isRequired,
    loadDisqus: PropTypes.func.isRequired,
    renderTweets: PropTypes.func.isRequired,
    renderComponents: PropTypes.func.isRequired,
    createCopyButton: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { location, loadDisqus } = this.props;
    const { pathname: identifier } = location;
    const url = add(SITE_URL, identifier);
    const title = get('data.markdownRemark.frontmatter.title')(this.props);

    loadDisqus({
      url,
      identifier,
      title,
    });
  }

  componentDidMount() {
    const { data, createCopyButton, renderTweets, renderComponents } = this.props;
    const frontmatter = get('markdownRemark.frontmatter')(data);
    const { tweets, components } = frontmatter;

    createCopyButton();
    renderTweets(tweets);
    renderComponents(components);
  }

  render() {
    const { props } = this;
    const { data } = props;
    const post = flow(get('markdownRemark.frontmatter'), defaultTo({}))(data);
    const { title, tags, date, images } = post;
    const image = first(images);

    return (
      <PostWrapper>
        <Helmet>
          <title>
            {`WONISM | ${title}`}
          </title>
          <meta name="og:title" content={`WONISM | ${title}`} />
        </Helmet>
        {isNil(image) ? null : (
          <ImageWrapper>
            <img
              src={includes('//')(image) ? image : require(`~/resources/${image}`)}
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
        {isEmpty(tags) ? null : (
          <Tags>
            <FaTags />
            {map(tag => (
              <Link
                key={tag}
                to={`/tags/${tag}/1`}
              >
                <small>
                  {tag}
                </small>
              </Link>
            ))(tags)}
          </Tags>
        )}
        <Bio />
        <PostContent>
          <div id="post-contents" dangerouslySetInnerHTML={{ __html: get('markdownRemark.html')(data) }} />
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
  }
}

export default PostTemplate;
