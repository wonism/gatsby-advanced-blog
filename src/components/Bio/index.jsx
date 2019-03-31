import React from 'react';
import styled from 'styled-components';
import { AUTHOR, DESCRIPTION, SITE_URL, PROFILE } from '~/constants';

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
      href={SITE_URL}
      target="_blank"
      rel="noreferrer noopener"
    >
      <img
        src={PROFILE}
        width="48"
        height="48"
        alt=""
      />
      <span>
        {AUTHOR}
        <br />
        <small>
          {DESCRIPTION}
        </small>
      </span>
    </a>
  </Wrapper>
);

export default Bio;
