import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'styled-components';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaHome from 'react-icons/lib/fa/home';
import FaSearch from 'react-icons/lib/fa/search';
import FaTags from 'react-icons/lib/fa/tags';
import fp from 'lodash/fp';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '~/components/Common/constants';
import './index.css';

const GnbWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100px;
  line-height: 100px;
  background-color: rgba(255, 255, 255, .6);
  font-size: 18px;
  font-family: Lato;
  font-weight: 600;
  z-index: 3000;
`;

const SubMenu = styled.ul`
  position: absolute;
  top: 100px;
  line-height: 2em;
  background-color: #fff;
  overflow: hidden;
  transition: max-height .4s ease-out .1s;

  li {
    padding: 6px 12px;
  }

  a:hover {
    color: ${SECONDARY_COLOR};
    text-decoration: underline;
  }
`;

const ListMenu = styled.li`
  display: inline-block;
  position: relative;
  padding: 0 0 0 2em;
  width: 120px;

  a {
    color: #000;
  }

  ${SubMenu} {
    max-height: 0;
    white-space: nowrap;
  }

  &:hover {
      max-height: 360px;
    ${SubMenu} {
    }
  }

  small {
    font-size: 12px;
  }
`;

const Home = styled(FaHome)`
  font-size: 40px;
`;

const StyledLink = styled(Link)`
  &.active {
    color: ${SECONDARY_COLOR};
    text-decoration: underline;
  }

  &:hover {
    color: ${SECONDARY_COLOR};
    text-decoration: underline;
  }
`;

const SearchBarWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 240px;
  margin: auto;
  padding: 0 36px 0 0;
  text-align: right;

  label {
    position: relative;
    padding: 0 8px 0 0;
    z-index: 1001;
  }
`;

const SearchBar = styled.input`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 36px;
  margin: auto;
  padding: 0 .4em;
  width: 240px;
  height: 2.4em;
  line-height: 2.4em;
  border-radius: 0;
  border: 1px solid #555;
  font-size: 18px;
  outline: 0;
  z-index: 1000;

  &:focus {
    border-color: ${PRIMARY_COLOR};
  }
`;

const SearchedPosts = styled.div`
  position: absolute;
  top: 100px;
  right: 3px;
  width: 317px;
  max-height: 500px;
  background-color: #fff;
  box-shadow: ${({ isEmpty }) => (isEmpty ? '0' : '0 2px 4px rgba(0,0,0,0.2)')};
  box-shadow: ${({ isEmpty }) => (isEmpty ? '0' : '0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)')};
  font-weight: 400;
  overflow-y: auto;
`;

const Title = styled.h4`
  width: 100%;
  height: 2.4em;
  line-height: 2.4em;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Summary = styled.p`
  cursor: pointer;
  margin: 0 0 2px;
  height: 1.8em;
  line-height: 1.8em;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const Tag = styled.span`
  padding: 0 0 0 .4em;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

const SearchedPost = styled.article`
  padding: 4px 8px;
  border-bottom: 1px solid #eee;
  line-height: 1.4em;

  ${Title}, ${Summary} {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Gnb = ({
  location,
  categories,
  postInformations,
  hasPortfolio,
  navigateToPath,
  inputKeyword,
  searchKeyword,
}) => {
  const filteredPosts = !fp.isEmpty(searchKeyword) ?
    fp.filter(({ category = '', title = '', tags = [] }) => {
      const c = fp.toLower(category);
      const h = fp.toLower(title);
      const t = fp.map(fp.toLower)(tags);

      const searchedWithCategory = c.search(searchKeyword) !== -1;
      const searchedWithTitle = h.search(searchKeyword) !== -1;
      const searchedWithTags = fp.flow(
        fp.filter(t => (t.search(searchKeyword) !== -1)),
        filtered => !fp.isEmpty(filtered)
      )(t);

      return searchedWithCategory || searchedWithTitle || searchedWithTags;
    })(postInformations) : [];
  const { pathname } = location;
  const isPortfolio = fp.flow(
    fp.replace(/\/$/, ''),
    fp.includes('/portfolios')
  )(pathname);
  const isHome = fp.flow(
    fp.replace(/\/$/, ''),
    fp.isEqual('')
  )(pathname);
  const isResume = fp.flow(
    fp.replace(/\/$/, ''),
    fp.isEqual('/resume')
  )(pathname);
  const isPost = !(isPortfolio || isHome || isResume);

  return (
    <GnbWrapper>
      <ul>
        <ListMenu>
          <StyledLink to="/">
            <Home />
          </StyledLink>
        </ListMenu>
        <ListMenu>
          <StyledLink to="/pages/1" className={isPost ? 'active' : ''}>
            Posts {fp.size(categories) ? <FaCaretDown /> : null}
          </StyledLink>
          <SubMenu>
            <div>
              {fp.flow(
                fp.filter(({ key }) => !fp.isEqual('__ALL__')(key)),
                fp.map(({ key, length }) => (
                  <li key={key}>
                    <Link to={`/categories/${key}/1`}>
                      {key} <small>({length})</small>
                    </Link>
                  </li>
                ))
              )(categories)}
            </div>
          </SubMenu>
        </ListMenu>
        {hasPortfolio ? (
          <ListMenu>
            <StyledLink to="/portfolios" className={isPortfolio ? 'active' : ''}>
              Portfolio
            </StyledLink>
          </ListMenu>
        ) : null}
        <ListMenu>
          <StyledLink to="/resume" className={isResume ? 'active' : ''}>
            Resume
          </StyledLink>
        </ListMenu>
        <SearchBarWrapper>
          <label htmlFor="search">
            <FaSearch />
          </label>
          <SearchBar
            id="search"
            type="text"
            value={searchKeyword}
            onChange={fp.flow(
              fp.get('target.value'),
              inputKeyword,
            )}
          />
        </SearchBarWrapper>
        <SearchedPosts isEmpty={fp.isEmpty(filteredPosts)}>
          {fp.map(({ path, title, summary, tags }) => (
            <SearchedPost key={path}>
              <Title onClick={() => { navigateToPath(path); }}>
                {title}
              </Title>
              <Summary onClick={() => { navigateToPath(path); }}>
                {summary}
              </Summary>
              {fp.size(tags) ? (
                <FaTags />
              ) : null}
              {fp.flow(
                fp.uniq,
                fp.map(tag => (
                  <Tag key={tag} onClick={() => { navigateToPath(`/tags/${tag}/1`); }}>
                    <small>
                      {tag}
                    </small>
                  </Tag>
                ))
              )(tags)}
            </SearchedPost>
          ))(filteredPosts)}
        </SearchedPosts>
      </ul>
    </GnbWrapper>
  );
};

Gnb.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  postInformations: PropTypes.arrayOf(PropTypes.shape({})),
  hasPortfolio: PropTypes.bool.isRequired,
  navigateToPath: PropTypes.func.isRequired,
  inputKeyword: PropTypes.func.isRequired,
  searchKeyword: PropTypes.string.isRequired,
};

Gnb.defaultProps = {
  categories: [],
  postInformations: [],
};

export default Gnb;
