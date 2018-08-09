import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import FaAngleDoubleLeft from 'react-icons/lib/fa/angle-double-left';
import FaAngleDoubleRight from 'react-icons/lib/fa/angle-double-right';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaEllipsisH from 'react-icons/lib/fa/ellipsis-h';
import { isEmpty, isEqual, range, filter, map, includes } from 'lodash/fp';
import {
  CONTENT_PER_PAGE,
  PAGE_PER_SCREEN,
} from '~/constants';
import getPage from '~/utils/getPage';

const Wrapper = styled.nav`
  margin: 1em 0;
  text-align: center;

  li {
    display: inline-block;
    padding: 0 .4em;
  }

  svg {
    margin: -2px 0 0;
  }
`;

const Pagination = ({
  postCount,
  location,
  prefix,
}) => {
  const pageCount = postCount ? Math.ceil(postCount / CONTENT_PER_PAGE) : 0;
  const pages = range(1, pageCount + 1);
  const index = prefix === '/pages/' ? 2 : 3;
  const page = getPage(index)(location);
  const hasManyPages = pageCount >= PAGE_PER_SCREEN;
  const filteredPages = hasManyPages ? filter((p) => {
    const range = page - p;
    return Math.abs(range) <= Math.floor(PAGE_PER_SCREEN / 2);
  })(pages) : pages;
  const isNearStart = includes(1)(filteredPages);
  const isNearEnd = includes(pageCount)(filteredPages);

  if (isEmpty(pages)) {
    return null;
  }

  return (
    <Wrapper>
      <ul>
        {hasManyPages && !isNearStart ? ([
          <li key="first">
            <Link to={`${prefix}1`}>
              <FaAngleDoubleLeft />
            </Link>
          </li>,
          <li key="ellipsis">
            <FaEllipsisH />
          </li>,
        ]) : null}
        {!isEqual(1)(page) ? (
          <li>
            <Link to={`${prefix}${page - 1}`}>
              <FaAngleLeft />
            </Link>
          </li>
        ) : null}
        {map((i) => {
          if (isEqual(i)(page)) {
            return (
              <li
                key={i}
                className={isEqual(i)(page) ? 'active' : ''}
              >
                {i}
              </li>
            );
          }

          return (
            <li
              key={i}
              className={isEqual(i)(page) ? 'active' : ''}
            >
              <Link to={`${prefix}${i}`}>
                {i}
              </Link>
            </li>
          );
        })(filteredPages)}
        {!isEqual(pageCount)(page) ? (
          <li>
            <Link to={`${prefix}${page + 1}`}>
              <FaAngleRight />
            </Link>
          </li>
        ) : null}
        {hasManyPages && !isNearEnd ? ([
          <li key="ellipsis">
            <FaEllipsisH />
          </li>,
          <li key="last">
            <Link to={`${prefix}${pageCount}`}>
              <FaAngleDoubleRight />
            </Link>
          </li>,
        ]) : null}
      </ul>
    </Wrapper>
  );
};

Pagination.propTypes = {
  postCount: PropTypes.number.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  prefix: PropTypes.string,
};

Pagination.defaultProps = {
  prefix: '/pages/',
};

export default Pagination;
