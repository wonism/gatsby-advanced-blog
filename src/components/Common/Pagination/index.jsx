import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight, FaEllipsisH } from 'react-icons/fa';
import { CONTENT_PER_PAGE, PAGE_PER_SCREEN } from '~/constants';
import getPage from '~/utils/getPage';
import { Wrapper } from './styled';

const Pagination = ({
  postCount,
  location,
  prefix,
}) => {
  const pageCount = postCount ? Math.ceil(postCount / CONTENT_PER_PAGE) : 0;
  const pages = Array.from(new Array(pageCount), (cnt, i) => i + 1);
  const page = getPage(location);
  const hasManyPages = pageCount >= PAGE_PER_SCREEN;
  const filteredPages = hasManyPages ? pages.filter(p => (
    Math.abs(page - p) <= Math.floor(PAGE_PER_SCREEN / 2)
  )) : pages;
  const isNearStart = filteredPages.includes(1);
  const isNearEnd = filteredPages.includes(pageCount);

  if (pages.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      <ul>
        {hasManyPages && !isNearStart ? (
          <>
            <li>
              <Link to={`${prefix}1`}>
                <FaAngleDoubleLeft />
              </Link>
            </li>
            <li>
              <FaEllipsisH />
            </li>
          </>
        ) : null}
        {page !== 1 ? (
          <li>
            <Link to={`${prefix}${page - 1}`}>
              <FaAngleLeft />
            </Link>
          </li>
        ) : null}
        {filteredPages.map((i) => {
          if (page === i) {
            return (
              <li
                key={i}
                className={page === i ? 'active' : ''}
              >
                {i}
              </li>
            );
          }

          return (
            <li
              key={i}
              className={page === i ? 'active' : ''}
            >
              <Link to={`${prefix}${i}`}>
                {i}
              </Link>
            </li>
          );
        })}
        {pageCount !== page ? (
          <li>
            <Link to={`${prefix}${page + 1}`}>
              <FaAngleRight />
            </Link>
          </li>
        ) : null}
        {hasManyPages && !isNearEnd ? (
          <>
            <li>
              <FaEllipsisH />
            </li>
            <li>
              <Link to={`${prefix}${pageCount}`}>
                <FaAngleDoubleRight />
              </Link>
            </li>
          </>
        ) : null}
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
