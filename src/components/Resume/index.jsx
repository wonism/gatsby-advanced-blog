import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { FaPrint, FaGithub, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { forEach, startsWith, get } from 'lodash/fp';
import Clearfix from '~/components/Common/Clearfix';
import * as profileUrl from '~/resources/me.png';

const Wrapper = styled.section`
  padding: 100px 0 0;
  @media (max-width: 414px) {
    padding: 70px 16px 0;
  }

  & > ${Clearfix} {
    margin: auto;
    max-width: 640px;
  }

  button {
    float: right;
  }
`;

const BasicInformation = styled.section`
  text-align: center;
  font-size: 16px;

  h1 {
    font-size: 2em;
    margin: .67em 0;
  }

  p {
    margin: .67em 0;
  }

  img {
    border-radius: 50%;
  }
`;

const SocialInformation = styled.section`
  font-size: 20px;
  text-align: center;

  a {
    padding: 0 6px;
  }
`;

const MDInformation = styled.section`
  font-size: 16px;

  h2 {
    font-size: 1.5em;
    margin: .67em 0;
  }

  ul {
    margin: 16px 0 0;
    padding: 0 0 0 20px;
    line-height: 2em;
    list-style: disc;
  }

  li ul {
    margin: 0 0 16px;;
    padding: 0 0 0 20px;
    list-style: circle;
  }

  a {
    text-decoration: underline;
  }
`;

const Resume = ({
  data,
  printPage,
}) => {
  const $mdWrapper = useRef(null);

  useEffect(() => {
    const anchors = $mdWrapper.current.getElementsByTagName('a');

    forEach((anchor) => {
      const href = anchor.getAttribute('href');
      if (startsWith('http')(href)) {
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('rel', 'noreferrer noopener');
      }
    })(anchors);
  }, []);

  const resume = data.markdownRemark;

  return (
    <Wrapper>
      <Clearfix>
        <Helmet>
          <title>
            WONISM | RESUME
          </title>
          <meta name="og:title" content="WONISM | RESUME" />
        </Helmet>
        <Clearfix>
          <button type="button" onClick={printPage}>
            <FaPrint />
            Print
          </button>
        </Clearfix>
        <BasicInformation>
          <img
            src={profileUrl.default}
            alt=""
            width="120"
            height="120"
          />
          <h1>
            wonism
          </h1>
          <p>
            yocee57@gmail.com
          </p>
        </BasicInformation>
        <SocialInformation>
          <a
            href="https://github.com/wonism"
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/j1ism"
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.facebook.com/j1.chic"
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.linkedin.com/in/wonism/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaLinkedin />
          </a>
        </SocialInformation>
        <MDInformation>
          <div
            ref={$mdWrapper}
            dangerouslySetInnerHTML={{ __html: get('html')(resume) }}
          />
        </MDInformation>
      </Clearfix>
    </Wrapper>
  );
};

Resume.propTypes = {
  data: PropTypes.shape({ date: PropTypes.object }).isRequired,
  printPage: PropTypes.func.isRequired,
};

export default Resume;
