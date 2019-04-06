import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  margin: 1em 0;

  a {
    color: #000;
  }

  span,
  img {
    display: inline-block;
    vertical-align: middle;
  }

  img {
    margin: 0 4px 0 0;
    border-radius: 50%;
  }

  small {
    color: #999;
    font-size: 90%;
  }
`;

const Bio = () => (
  <Wrapper>
    <a
      href="https://github.com/wonism/gatsby-advanced-blog"
      target="_blank"
      rel="noreferrer noopener"
    >
      <img
        src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"
        width="48"
        height="48"
        alt=""
      />
      <span>
        Gatsby Advanced Blog
        <br />
        <small>
          Gatsby Starter for Advanced Blog
        </small>
      </span>
    </a>
  </Wrapper>
);

export default Bio;
