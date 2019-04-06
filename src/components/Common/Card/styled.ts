import styled from 'styled-components';

export const ImageWrapper = styled.figure`
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

export const TagWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledArticle = styled.article`
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
    background-color: ${({ theme: { backgroundColor } }) => backgroundColor};
    border-radius: 6px;
    border: 1px solid #e5e5e5;

    &:hover {
      top: -8px;
    }
  }

  a {
    color: ${({ theme: { color } }) => color};

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
