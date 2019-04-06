import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Truncate from 'react-truncate';
import FaTags from 'react-icons/lib/fa/tags';
import styled from 'styled-components';
import { isNil, includes, map, first } from 'lodash/fp';

const ImageWrapper = styled.figure`
  position: relative;
  margin: -14px -14px 14px;
  padding: 50% 0 0;
  height: 0;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2r9//38gYGAEESAAEGAAasgJOgzOKCoAAAAASUVORK5CYII=);

  &:before,
  &:after {
    display: block;
    content: '';
    clear: both;
  }

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

const TagWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledArticle = styled.article`
  display: inline-block;
  padding: 0 16px 16px;
  width: 25%;
  font-size: 14px;
  vertical-align: top;
  @media (max-width: 414px) {
    margin: 0 0 16px;
    padding: 0 0 16px;
    width: 100%;
    border-bottom: 1px solid #eee;
  }

  & > div {
    position: relative;
    top: 0;
    padding: 14px;
    background-color: #fff;
    border-radius: 6px;
    transition: all .4s ease .1s;
    border: 1px solid #e5e5e5;

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
    padding: 0 0 6px;
    height: 2.4em;
    line-height: 1.2em;
    font-size: 20px;
    font-weight: 700;
  }

  time {
    display: block;
    margin: 10px 0 0;
    font-size: 12px;
  }

  p {
    padding: 24px 0 16px;
    height: 106px;
    line-height: 1.4em;
    font-size: 16px;

    span {
      white-space: nowrap;
    }
  }

  small {
    margin: 0 0 0 4px;
    font-size: 14px;
  }
`;

const Card = ({
  tags,
  path,
  images,
  title,
  date,
  summary,
}) => {
  const image = first(images);

  return (
    <StyledArticle>
      <div>
        <Link to={path}>
          <ImageWrapper>
            {isNil(image) ? null : (
              <img
                src={includes('//')(image) ? image : require(`~/resources/${image}`)}
                alt={title}
              />
            )}
          </ImageWrapper>
          <h3>
            <Truncate
              lines={2}
              ellipsis={(
                <span>
                  ...
                </span>
              )}
            >
              {title}
            </Truncate>
          </h3>
          <p>
            <Truncate
              lines={3}
              ellipsis={(
                <span>
                  ...
                </span>
              )}
            >
              {summary}
            </Truncate>
          </p>
        </Link>
        <TagWrapper>
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
        </TagWrapper>
        <time>
          {date}
        </time>
      </div>
    </StyledArticle>
  );
};

Card.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  path: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  date: PropTypes.string,
  summary: PropTypes.string,
};

Card.defaultProps = {
  tags: [],
  images: [],
  title: '',
  date: '',
  summary: '',
};

export default Card;
