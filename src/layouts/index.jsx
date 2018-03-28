import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import fp from 'lodash/fp';
import {
  reducers,
  initialState,
  composeEnhancers,
  middleware,
  sagaMiddleware,
  sagas,
  initializeStore,
} from '~/store';
import ConnectedLayout from '~/containers/Layout';
import {
  POST,
  PORTFOLIO,
} from '~/constants';

const Layout = ({
  children,
  data,
  ...otherProps
}) => {
  const edges = fp.get('allMarkdownRemark.edges')(data);
  const portfolios = fp.filter(fp.flow(
    fp.get('node.frontmatter.type'),
    fp.isEqual(PORTFOLIO)
  ))(edges);
  const categories = fp.flow(
    fp.map(fp.get('node.frontmatter.category')),
    fp.filter(fp.isString),
    _ => (fp.reduce((prev, curr) => ({
      ...prev,
      [curr]: prev[curr] ? prev[curr] + 1 : 1,
    }), { __ALL__: fp.size(_) }))(_),
    _ => fp.flow(
      fp.keys,
      fp.map(key => ({
        key,
        length: _[key],
      }))
    )(_)
  )(edges);
  const postInformations = fp.flow(
    fp.filter(fp.flow(
      fp.get('node.frontmatter.type'),
      fp.defaultTo(POST),
      fp.isEqual(POST)
    )),
    fp.map(edge => ({
      path: fp.get('node.frontmatter.path')(edge),
      title: fp.get('node.frontmatter.title')(edge),
      summary: fp.get('node.frontmatter.summary')(edge),
      tags: fp.get('node.frontmatter.tags')(edge) || [],
      category: fp.get('node.frontmatter.category')(edge),
    }))
  )(edges);

  const state = fp.flow(
    fp.set('app.portfolios', portfolios),
    fp.set('app.categories', categories),
    fp.set('app.postInformations', postInformations),
  )(initialState);

  const createdStore = createStore(reducers, state, composeEnhancers(middleware));
  sagaMiddleware.run(sagas);
  const store = initializeStore(createdStore);

  return (
    <Provider store={store}>
      <ConnectedLayout {...otherProps} >
        {children()}
      </ConnectedLayout>
    </Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.func,
  data: PropTypes.shape({}),
};

Layout.defaultProps = {
  children: () => null,
  data: {},
};

export default Layout;

/* eslint-disable no-undef */
export const layoutQuery = graphql`
  query LayoutQuery {
    allMarkdownRemark(
      filter: { frontmatter: { hide: { ne: true } } }
    ){
      edges {
        node {
          frontmatter {
            type
            path
            title
            category
            summary
            tags
            images
          }
        }
      }
    }
  }
`;
/* eslint-enable no-undef */
