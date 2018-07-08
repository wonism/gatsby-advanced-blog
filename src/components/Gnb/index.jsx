import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'styled-components';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaHome from 'react-icons/lib/fa/home';
import FaSearch from 'react-icons/lib/fa/search';
import FaTags from 'react-icons/lib/fa/tags';
import { flow, isEmpty, isEqual, filter, map, uniq, get, size, toLower, replace, startsWith } from 'lodash/fp';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '~/components/Common/constants';
import './index.css';

const Hamburger = styled.div`
  position: fixed;
  display: none;
  top: 0;
  right: 0;
  z-index: 5000;
  @media (max-width: 414px) {
    display: block;
  }

  &:before,
  &:after {
    display: block;
    content: '';
    clear: both;
  }

  & > div {
    float: left;
  }
`;

const MovableFaCaretDown = styled(FaCaretDown)`
  transition: transform .4s ease-out .1s;
  transform: rotate(180deg);

  &.is-active {
    transform: rotate(0deg);
  }
`;

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
  @media (max-width: 414px) {
    height: 60px;
    line-height: 60px;
    background-color: transparent;
  }
`;

const SubMenu = styled.ul`
  position: absolute;
  top: 100px;
  line-height: 1.8em;
  background-color: #fff;
  font-size: 16px;
  font-weight: 500;
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
  font-weight: 500;
  @media (max-width: 414px) {
    display: none;
  }

  a {
    color: #000;
  }

  ul {
    max-height: 0;
    white-space: nowrap;
  }

  &:hover {
    ul {
      max-height: 360px;
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
  @media (max-width: 414px) {
    display: none;
    position: relative;
    padding: 0;
    width: 100%;
  }

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
  @media (max-width: 414px) {
    display: none;
    right: 0;
    left: 0;
    width: 100%;
  }

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
  box-shadow: ${({ isEmpty }) => (isEmpty ? '0 0 0' : '0 2px 4px rgba(0,0,0,0.2)')};
  box-shadow: ${({ isEmpty }) => (isEmpty ? '0 0 0' : '0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)')};
  font-weight: 400;
  overflow-y: auto;
  @media (max-width: 414px) {
    display: none;
    position: static;
    width: 100%;
    max-height: none;
    box-shadow: 0 0 0;
  }
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

  h4,
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Background = styled.div`
  display: none;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
  transition: opacity .4s ease-out .1s;
  opacity: ${({ isActive }) => (isActive ? '.5' : '0')};
  @media (max-width: 414px) {
    display: block;
  }
`;

const MobileMenus = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 16px;
  width: 80%;
  height: 100%;
  background-color: #fff;
  transition: left.4s ease-out .1s;
  z-index: 3;
  overflow-y: auto;
  @media (max-width: 414px) {
    display: block;
  }
`;

const MobileMenu = styled.section`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @media (max-width: 414px) {
    display: block;
    line-height: 60px;
    pointer-events: ${({ isActive }) => (isActive ? 'all' : 'none')};

    ul,
    li,
    div,
    input {
      display: block;
    }
  }

  li {
    padding: 0;
    width: 100%;

    & > ul {
      position: static;
      max-height: ${({ isSubActive }) => (isSubActive ? '0' : '360px')} !important;
    }
  }

  & > div + div {
    left: ${({ isActive }) => (isActive ? '0' : '-100%')};
    box-shadow: ${({ isActive }) => (isActive ? '0 2px 4px rgba(0,0,0,0.2)' : '0 0 0')};
    box-shadow: ${({ isActive }) => (isActive ? '0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)' : '0 0 0')};
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
  isMenuOpened,
  openMenu,
  closeMenu,
  isSubMenuOpened,
  openSubMenu,
  closeSubMenu,
}) => {
  const filteredPosts = !isEmpty(searchKeyword)
    ? filter(({ category = '', title = '', tags = [] }) => {
      const c = toLower(category);
      const h = toLower(title);
      const t = map(toLower)(tags);

      const searchedWithCategory = c.search(searchKeyword) !== -1;
      const searchedWithTitle = h.search(searchKeyword) !== -1;
      const searchedWithTags = flow(
        filter(t => (t.search(searchKeyword) !== -1)),
        filtered => !isEmpty(filtered)
      )(t);

      return searchedWithCategory || searchedWithTitle || searchedWithTags;
    })(postInformations)
    : [];
  const { pathname } = location;
  const isPortfolio = flow(
    replace(/\/$/, ''),
    startsWith('/portfolios')
  )(pathname);
  const isHome = flow(
    replace(/\/$/, ''),
    isEqual('')
  )(pathname);
  const isResume = flow(
    replace(/\/$/, ''),
    isEqual('/resume')
  )(pathname);
  const isPost = !(isPortfolio || isHome || isResume);

  return (
    <GnbWrapper>
      <MobileMenu isActive={isMenuOpened} isSubActive={isSubMenuOpened}>
        <Background onClick={closeMenu} isActive={isMenuOpened} />
        <MobileMenus>
          <ul>
            <ListMenu>
              <StyledLink to="/" onClick={closeMenu}>
                <Home />
              </StyledLink>
            </ListMenu>
            <ListMenu>
              <StyledLink to="/pages/1" className={isPost ? 'active' : ''} onClick={closeMenu}>
                Posts
              </StyledLink>
              {
                size(categories)
                  ? (
                    <Fragment>
                      &nbsp;
                      <MovableFaCaretDown
                        className={isSubMenuOpened ? 'is-active' : ''}
                        onClick={isSubMenuOpened ? closeSubMenu : openSubMenu}
                      />
                    </Fragment>
                  )
                  : null
              }
              <SubMenu>
                <div>
                  {flow(
                    filter(({ key }) => !isEqual('__ALL__')(key)),
                    map(({ key, length }) => (
                      <li key={key}>
                        <Link to={`/categories/${key}/1`} onClick={closeMenu}>
                          {key}
                          &nbsp;
                          <small>
                            {`(${length})`}
                          </small>
                        </Link>
                      </li>
                    ))
                  )(categories)}
                </div>
              </SubMenu>
            </ListMenu>
            {hasPortfolio ? (
              <ListMenu>
                <StyledLink to="/portfolios" className={isPortfolio ? 'active' : ''} onClick={closeMenu}>
                  Portfolio
                </StyledLink>
              </ListMenu>
            ) : null}
            <ListMenu>
              <StyledLink to="/resume" className={isResume ? 'active' : ''} onClick={closeMenu}>
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
                onChange={flow(
                  get('target.value'),
                  inputKeyword,
                )}
              />
            </SearchBarWrapper>
            <SearchedPosts isEmpty={isEmpty(filteredPosts)}>
              {map(({ path, title, summary, tags }) => (
                <SearchedPost key={path}>
                  <Title onClick={() => { navigateToPath(path); }}>
                    {title}
                  </Title>
                  <Summary onClick={() => { navigateToPath(path); }}>
                    {summary}
                  </Summary>
                  {size(tags) ? (
                    <FaTags />
                  ) : null}
                  {flow(
                    uniq,
                    map(tag => (
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
        </MobileMenus>
      </MobileMenu>
      <Hamburger
        className={`hamburger hamburger--spin js-hamburger ${isMenuOpened ? 'is-active' : ''}`}
        onClick={isMenuOpened ? closeMenu : openMenu}
      >
        <div className="hamburger-box">
          <div className="hamburger-inner" />
        </div>
      </Hamburger>
      <ul>
        <ListMenu>
          <StyledLink to="/">
            <Home />
          </StyledLink>
        </ListMenu>
        <ListMenu>
          <StyledLink to="/pages/1" className={isPost ? 'active' : ''}>
            Posts
            &nbsp;
            {size(categories) ? <FaCaretDown /> : null}
          </StyledLink>
          <SubMenu>
            <div>
              {flow(
                filter(({ key }) => !isEqual('__ALL__')(key)),
                map(({ key, length }) => (
                  <li key={key}>
                    <Link to={`/categories/${key}/1`}>
                      {key}
                      &nbsp;
                      <small>
                        {`(${length})`}
                      </small>
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
            onChange={flow(
              get('target.value'),
              inputKeyword,
            )}
          />
        </SearchBarWrapper>
        <SearchedPosts isEmpty={isEmpty(filteredPosts)}>
          {map(({ path, title, summary, tags }) => (
            <SearchedPost key={path}>
              <Title onClick={() => { navigateToPath(path); }}>
                {title}
              </Title>
              <Summary onClick={() => { navigateToPath(path); }}>
                {summary}
              </Summary>
              {size(tags) ? (
                <FaTags />
              ) : null}
              {flow(
                uniq,
                map(tag => (
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
  isMenuOpened: PropTypes.bool.isRequired,
  openMenu: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  isSubMenuOpened: PropTypes.bool.isRequired,
  openSubMenu: PropTypes.func.isRequired,
  closeSubMenu: PropTypes.func.isRequired,
};

Gnb.defaultProps = {
  categories: [],
  postInformations: [],
};

export default Gnb;
