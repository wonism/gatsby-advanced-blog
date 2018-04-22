import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import FaTags from 'react-icons/lib/fa/tags';
import fp from 'lodash/fp';
import {
  loadDisqus,
  renderTweets,
  renderComponents,
  createCopyButton,
} from '~/store/posts/actions';
import Bio from '~/components/Bio';
import PostWrapper from '~/components/Common/PostWrapper';
import { SITE_URL } from '~/constants';
import formattedDate from '~/utils/formattedDate';
import './post.less';

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

/* eslint-disable global-require, import/no-dynamic-require */
class Post extends PureComponent {
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
    const { location } = this.props;
    const { pathname: identifier } = location;
    const url = fp.add(SITE_URL, identifier);
    const title = fp.get('data.markdownRemark.frontmatter.title')(this.props);
    console.log('@@@@@@@@@');

    this.props.loadDisqus({
      url,
      identifier,
      title,
    });
  }

  componentDidMount() {
    const { data } = this.props;
    const frontmatter = fp.get('markdownRemark.frontmatter')(data);
    const { tweets, components } = frontmatter;

    this.props.createCopyButton();
    this.props.renderTweets(tweets);
    this.props.renderComponents(components);
  }

  render() {
    const { data } = this.props;
    const post = fp.get('markdownRemark.frontmatter')(data);
    const { title, tags, date, images } = post;
    const image = fp.first(images);

    return (
      <PostWrapper>
        <Helmet>
          <title>
            WONISM | {title}
          </title>
          <meta name="og:title" content={`WONISM | ${title}`} />
        </Helmet>
        {fp.isNil(image) ? null : (
          <ImageWrapper>
            <img
              src={fp.includes('//')(image) ? image : require(`~/resources/${image}`)}
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
        {fp.isEmpty(tags) ? null : (
          <Tags>
            <FaTags />
            {fp.map(tag => (
              <Link
                key={tag}
                to={`/tags/${tag}/1`}
              >
                <small>{tag}</small>
              </Link>
            ))(tags)}
          </Tags>
        )}
        <Bio />
        <PostContent>
          {/* eslint-disable react/no-danger */}
          <div id="post-contents" dangerouslySetInnerHTML={{ __html: fp.get('html')(post) }} />
          {/* eslint-enable react/no-danger */}
        </PostContent>
        <div id="disqus_thread" />
        <noscript>
          Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
        </noscript>
      </PostWrapper>
    );
  }
}
/* eslint-enable global-require, import/no-dynamic-require */

export default connect(
  state => state,
  {
    loadDisqus,
    renderTweets,
    renderComponents,
    createCopyButton,
  }
)(Post);

/* eslint-disable no-undef */
export const pageQuery = graphql`
  query PostByPath($path: String!) {
    markdownRemark (
      frontmatter: { path: { eq: $path } }
    ) {
      id
      html
      frontmatter {
        title
        path
        images
        category
        tags
        date
        components {
          rootId
          fileName
        }
        tweets {
          rootId
          userId
          tweetId
        } summary
      }
    }
  }
`;
/* eslint-enable no-undef */
