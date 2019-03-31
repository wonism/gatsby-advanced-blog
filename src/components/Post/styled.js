import styled from 'styled-components';

export const Tags = styled.div`
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

export const PostContent = styled.section`
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

export const ImageWrapper = styled.figure`
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
