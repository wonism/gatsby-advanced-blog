import React, { Children, cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticQuery, graphql } from 'gatsby';
import { flow, isString, isEqual, keys, map, filter, reduce, set, get, size, defaultTo } from 'lodash/fp';
import {
  reducers,
  initialState,
  composeEnhancers,
  middleware,
  sagaMiddleware,
  sagas,
  initializeStore,
} from '~/store';
import ConnectedLayout from '~/containers/HigherOrderLayout';
import { POST, PORTFOLIO } from '~/constants';

const GatsbyApp = ({ children, ...otherProps }) => (
  <StaticQuery
    query={graphql`
      query GatsbyQuery {
        allMarkdownRemark(
          filter: { frontmatter: { hide: { ne: true } } }
        ){
          edges {
            node {
              frontmatter {
                path
                type
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
    `}
    render={(data) => {
      const edges = get('allMarkdownRemark.edges')(data);
      const portfolios = filter(flow(
        get('node.frontmatter.type'),
        isEqual(PORTFOLIO)
      ))(edges);
      const categories = flow(
        map(get('node.frontmatter.category')),
        filter(isString),
        _ => (reduce((prev, curr) => ({
          ...prev,
          [curr]: prev[curr] ? prev[curr] + 1 : 1,
        }), { __ALL__: size(_) }))(_),
        _ => flow(
          keys,
          map(key => ({
            key,
            length: _[key],
          }))
        )(_)
      )(edges);
      const postInformations = flow(
        filter(flow(
          get('node.frontmatter.type'),
          defaultTo(POST),
          isEqual(POST)
        )),
        map(edge => ({
          path: get('node.frontmatter.path')(edge),
          title: get('node.frontmatter.title')(edge),
          summary: get('node.frontmatter.summary')(edge),
          tags: get('node.frontmatter.tags')(edge) || [],
          category: get('node.frontmatter.category')(edge),
        }))
      )(edges);

      const state = flow(
        set('app.portfolios', portfolios),
        set('app.categories', categories),
        set('app.postInformations', postInformations),
      )(initialState);

      const createdStore = createStore(reducers, state, composeEnhancers(middleware));
      sagaMiddleware.run(sagas);
      const store = initializeStore(createdStore);

      const childrenWithProps = Children.map(children, child => cloneElement(child, otherProps));

      return (
        <Provider store={store}>
          <ConnectedLayout {...otherProps}>
            <Fragment>
              {childrenWithProps}
            </Fragment>
          </ConnectedLayout>
        </Provider>
      );
    }}
  />
);

GatsbyApp.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GatsbyApp;
