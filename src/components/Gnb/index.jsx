import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { FaCaretDown, FaSearch, FaTags } from 'react-icons/fa';
import {
  Hamburger,
  MovableFaCaretDown,
  GnbWrapper,
  SubMenu,
  ListMenu,
  Home,
  StyledLink,
  SearchBarWrapper,
  SearchBar,
  SearchedPosts,
  Title,
  Summary,
  Tag,
  SearchedPost,
  Background,
  MobileMenus,
  MobileMenu,
} from './styled';

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
  const filteredPosts = searchKeyword.length > 0
    ? (
      postInformations
        .filter(({ category = '', title = '', tags = [] }) => {
          const c = category.toLowerCase();
          const h = title.toLowerCase();
          const t = tags.map(tag => tag.toLowerCase());

          const searchedWithCategory = c.search(searchKeyword) !== -1;
          const searchedWithTitle = h.search(searchKeyword) !== -1;
          const searchedWithTags = t.filter(t => t.search(searchKeyword) !== -1).length > 0;

          return searchedWithCategory || searchedWithTitle || searchedWithTags;
        }))
    : [];
  const { pathname } = location;
  const isPortfolio = pathname.replace(/\/$/, '').startsWith('/portfolios');
  const isHome = pathname.replace(/\/$/, '') === '';
  const isResume = pathname.replace(/\/$/, '') === '/resume';
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
              {categories.length > 0
                ? (
                  <>
                    &nbsp;
                    <MovableFaCaretDown
                      className={isSubMenuOpened ? 'is-active' : ''}
                      onClick={isSubMenuOpened ? closeSubMenu : openSubMenu}
                    />
                  </>
                )
                : null}
              <SubMenu>
                <div>
                  {categories.map(({ key, length }) => {
                    if (key === '__ALL__') {
                      return null;
                    }

                    return (
                      <li key={key}>
                        <Link to={`/categories/${key}/1`} onClick={closeMenu}>
                          {key}
                          &nbsp;
                          <small>
                            {`(${length})`}
                          </small>
                        </Link>
                      </li>
                    );
                  })}
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
                onChange={(e) => {
                  inputKeyword(e.target.value);
                }}
              />
            </SearchBarWrapper>
            <SearchedPosts isEmpty={filteredPosts.length === 0}>
              {filteredPosts.map(({ path, title, summary, tags }) => (
                <SearchedPost key={path}>
                  <Title onClick={() => { navigateToPath(path); }}>
                    {title}
                  </Title>
                  <Summary onClick={() => { navigateToPath(path); }}>
                    {summary}
                  </Summary>
                  {tags.length > 0 ? (
                    <FaTags />
                  ) : null}
                  {[...new Set(tags)].map(tag => (
                    <Tag key={tag} onClick={() => { navigateToPath(`/tags/${tag}/1`); }}>
                      <small>
                        {tag}
                      </small>
                    </Tag>
                  ))}
                </SearchedPost>
              ))}
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
            {categories.length > 0 ? <FaCaretDown /> : null}
          </StyledLink>
          <SubMenu>
            <div>
              {categories.map(({ key, length }) => {
                if (key === '__ALL__') {
                  return null;
                }

                return (
                  <li key={key}>
                    <Link to={`/categories/${key}/1`}>
                      {key}
                      &nbsp;
                      <small>
                        {`(${length})`}
                      </small>
                    </Link>
                  </li>
                );
              })}
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
            onChange={(e) => {
              inputKeyword(e.target.value);
            }}
          />
        </SearchBarWrapper>
        <SearchedPosts isEmpty={filteredPosts.length === 0}>
          {filteredPosts.map(({ path, title, summary, tags }) => (
            <SearchedPost key={path}>
              <Title onClick={() => { navigateToPath(path); }}>
                {title}
              </Title>
              <Summary onClick={() => { navigateToPath(path); }}>
                {summary}
              </Summary>
              {tags.length > 0 ? (
                <FaTags />
              ) : null}
              {[...new Set(tags)].map(tag => (
                <Tag key={tag} onClick={() => { navigateToPath(`/tags/${tag}/1`); }}>
                  <small>
                    {tag}
                  </small>
                </Tag>
              ))}
            </SearchedPost>
          ))}
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
