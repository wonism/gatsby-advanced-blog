import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Truncate from 'react-truncate';
import FaTags from 'react-icons/lib/fa/tags';
import styled from 'styled-components';
import fp from 'lodash/fp';

const StyledArticle = styled.article`
  display: inline-block;
  padding: 0 16px;
  width: 25%;
  font-size: 14px;
  vertical-align: top;

  & > div {
    position: relative;
    top: 0;
    padding: 1em;
    background-color: #fff;
    border-radius: 6px;
    transition: all .4s ease .1s;

    &:hover {
      top: -8px;
      background: #efefef;
    }
  }

  a {
    color: #000;

    &:hover {
      h3,
      p,
      small {
        text-decoration: underline;
      }
    }
  }

  h3 {
    padding: 0 0 1em;
    font-size: 18px;
  }

  time {
    font-size: 12px;
  }

  p {
    padding: 1em 0;
    font-size: 16px;
  }

  small {
    margin: 0 0 0 4px;
    font-size: 14px;
  }
`;

const Card = ({
  tags,
  path,
  title,
  date,
  summary,
  hasTags,
}) => (
  <StyledArticle>
    <div>
      <Link to={path}>
        <h3>{title}</h3>
        <time>{date}</time>
        <p>
          <Truncate lines={3} ellipsis={<span>...</span>}>
            {summary}
          </Truncate>
        </p>
      </Link>
      {hasTags ? (
        <div>
          <FaTags />
          {fp.map(tag => (
            <Link
              key={tag}
              to={`/tags/${tag}/1`}
            >
              <small>{tag}</small>
            </Link>
          ))(tags)}
        </div>
      ) : null}
    </div>
  </StyledArticle>
);

Card.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  path: PropTypes.string.isRequired,
  title: PropTypes.string,
  date: PropTypes.string,
  summary: PropTypes.string,
  hasTags: PropTypes.bool.isRequired,
};

Card.defaultProps = {
  tags: [],
  title: '',
  date: '',
  summary: '',
};

export default Card;
