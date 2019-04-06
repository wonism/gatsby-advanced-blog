import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FaPrint, FaGithub, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Clearfix from '~/components/Common/Clearfix';
import { PREFIX, AUTHOR, EMAIL, GITHUB_ID, TWITTER_ID, FACEBOOK_ID, LINKEDIN_ID } from '~/constants';
import * as profileUrl from '~/resources/me.png';
import { Wrapper, BasicInformation, SocialInformation, MDInformation, Button } from './styled';

const Resume = ({
  data: {
    resume: {
      html,
    },
  },
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

  const printPage = useCallback(() => {
    global.print();
  }, []);

  return (
    <Wrapper>
      <Clearfix>
        <Helmet>
          <title>
            {`${PREFIX}RESUME`}
          </title>
          <meta name="og:title" content={`${PREFIX}RESUME`} />
        </Helmet>
        <Clearfix>
          <Button type="button" onClick={printPage}>
            <FaPrint />
            Print
          </Button>
        </Clearfix>
        <BasicInformation>
          <img
            src={profileUrl.default}
            alt=""
            width="120"
            height="120"
          />
          <h1>
            {AUTHOR}
          </h1>
          <p>
            {EMAIL}
          </p>
        </BasicInformation>
        <SocialInformation>
          {GITHUB_ID ? (
            <a
              href={`https://github.com/${GITHUB_ID}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaGithub />
            </a>
          ) : null}
          {TWITTER_ID ? (
            <a
              href={`https://twitter.com/${TWITTER_ID}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaTwitter />
            </a>
          ) : null}
          {FACEBOOK_ID ? (
            <a
              href={`https://www.facebook.com/${FACEBOOK_ID}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaFacebook />
            </a>
          ) : null}
          {LINKEDIN_ID ? (
            <a
              href={`https://www.linkedin.com/in/${LINKEDIN_ID}/`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaLinkedin />
            </a>
          ) : null}
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
};

export default Resume;
