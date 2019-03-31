import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FaPrint, FaGithub, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Clearfix from '~/components/Common/Clearfix';
import * as profileUrl from '~/resources/me.png';
import { Wrapper, BasicInformation, SocialInformation, MDInformation } from './styled';

const Resume = ({
  data: {
    resume: {
      html,
    },
  },
  printPage,
}) => {
  const $mdWrapper = useRef(null);

  useEffect(() => {
    const anchors = [...new Set($mdWrapper.current.getElementsByTagName('a'))];

    anchors.forEach((anchor) => {
      const href = anchor.getAttribute('href');

      if (href.startsWith('http')) {
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('rel', 'noreferrer noopener');
      }
    });
  }, []);

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
            dangerouslySetInnerHTML={{ __html: html }}
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
