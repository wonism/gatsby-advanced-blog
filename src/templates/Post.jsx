import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Tweet } from 'react-twitter-widgets';
import FaTags from 'react-icons/lib/fa/tags';
import fp from 'lodash/fp';
import PostsWrapper from '~/components/Common/PostsWrapper';
import {
  historyGoBack,
  copyText,
  printPage,
} from '~/store/app/actions';
import Bio from '~/components/Bio';
import { SITE_URL } from '~/constants';
import './post.css';

const Tags = styled.div`
  margin: 1em 0;

  a {
    margin: 0 0 0 4px;
    color: #000;
    text-decoration: underline;
  }
`;

const PostContent = styled.section`
  padding: 1em 0 4em;
`;

const ComponentInPost = styled.div`
  position: relative;
  margin: 1em 0 1em;
  padding: 55px 16px 16px;
  color: #263238;
  border: 1px solid #263238;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  overflow: hidden;

  &:before {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    padding: 0 0 0 80px;
    width: 100%;
    height: 35px;
    line-height: 35px;
    color: #fff;
    background-color: #263238;
    font-weight: 100;
    content: 'Application for example';
  }

  &:after {
    display: inline-block;
    position: absolute;
    top: 15px;
    left: 20px;
    width: 10px;
    height: 10px;
    background-color: #ff5f56;
    border-radius: 50%;
    content: '';
  }

  & > *:first-child {
    &:before {
      display: inline-block;
      position: absolute;
      top: 15px;
      left: 40px;
      width: 10px;
      height: 10px;
      background-color: #ffbd2e;
      border-radius: 50%;
      content: '';
    }

    &:after {
      display: inline-block;
      position: absolute;
      top: 15px;
      left: 60px;
      width: 10px;
      height: 10px;
      background-color: #27c93f;
      border-radius: 50%;
      content: '';
    }
  }
`;

class Post extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({ date: PropTypes.object }).isRequired,
    location: PropTypes.shape({}).isRequired,
  };

  componentDidMount() {
    const { data, location } = this.props;
    const slug = fp.get('pathname')(location);
    const disqusConfig = 'discus_config';

    window[disqusConfig] = function disqusCallback() {
      this.page.url = `${SITE_URL}${slug}`;
      this.page.identifier = slug;
      this.page.title = fp.get('markdownRemark.frontmatter.title')(data);
    };

    const d = document;
    const s = d.createElement('script');
    s.src = 'https://jaewonism.disqus.com/embed.js';
    s.setAttribute('data-timestamp', Date.now());
    (d.head || d.body).appendChild(s);

    const tweets = fp.get('markdownRemark.frontmatter.tweets')(data);
    const components = fp.get('markdownRemark.frontmatter.components')(data);

    fp.each((tweet) => {
      const tweetRootId = fp.get('rootId')(tweet);
      const tweetContainer$ = global.document.getElementById(tweetRootId);
      const tweetId = fp.get('tweetId')(tweet);
      const username = fp.get('userId')(tweet);

      render(
        <div>
          <Tweet
            tweetId={tweetId}
            options={{
              username,
            }}
          />
        </div>,
        tweetContainer$
      );
    })(tweets);

    fp.each((component) => {
      const componentRootId = fp.get('rootId')(component);
      const componentContainer$ = global.document.getElementById(componentRootId);
      const componentFileName = fp.get('fileName')(component);

      try {
        const App = require(`~/postComponents/${componentFileName}`).default; // eslint-disable-line

        render(
          <ComponentInPost>
            <App />
          </ComponentInPost>,
          componentContainer$
        );
      } catch (e) {
        console.log(e);
      }
    })(components);
  }

  render() {
    const { data } = this.props;
    const post = fp.get('markdownRemark')(data);
    const siteTitle = fp.get('site.siteMetadata.title')(data);
    const title = `${fp.get('frontmatter.title')(post)} | ${siteTitle}`;
    const tags = fp.get('frontmatter.tags')(post);

    return (
      <PostsWrapper post>
        <Helmet>
          <title>{title}</title>
          <meta name="og:title" content={title} />
        </Helmet>
        <h1>
          {fp.get('frontmatter.title')(post)}
        </h1>
        <time>
          {fp.get('frontmatter.date')(post)}
        </time>
        {fp.isEmpty(tags) ? null : (
          <Tags>
            <FaTags />
            {fp.map(tag => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
              >
                <small>{tag}</small>
              </Link>
            ))(tags)}
          </Tags>
        )}
        <Bio />
        <PostContent>
          {/* eslint-disable react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: fp.get('html')(post) }} />
          {/* eslint-enable react/no-danger */}
        </PostContent>
        <div id="disqus_thread" />
        <noscript>
          Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
        </noscript>
      </PostsWrapper>
    );
  }
}

export default connect(
  state => state,
  {
    historyGoBack,
    copyText,
    printPage,
  }
)(Post);

/* eslint-disable no-undef */
export const pageQuery = graphql`
  query PostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark (
      frontmatter: { path: { eq: $path } }
    ) {
      id
      html
      frontmatter {
        title
        path
        category
        tags
        date(formatString: "MMMM DD, YYYY")
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
