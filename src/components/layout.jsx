import React, { Children, cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticQuery, graphql } from 'gatsby';
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
        posts: allMarkdownRemark(
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
    render={({ posts }) => {
      const { edges } = posts;
      const portfolios = edges.filter(({ node: { frontmatter: { type } } }) => type === PORTFOLIO);
      const categories = edges.reduce((categories, { node }) => {
        const { category } = node.frontmatter;

        if (category === null) {
          return categories;
        }

        const [{ length: total }] = categories;
        const categoryIndex = categories.findIndex(({ key }) => key === category);

        if (categoryIndex === -1) {
          return [
            { key: '__ALL__', length: total + 1 },
            ...categories.slice(1),
            { key: category, length: 1 },
          ];
        }

        return [
          { key: '__ALL__', length: total + 1 },
          ...categories.slice(1, categoryIndex - 1),
          { key: category, length: categories[categoryIndex].length + 1 },
          ...categories.slice(categoryIndex + 1),
        ];
      }, [{ key: '__ALL__', length: 0 }]);
      const postInformations = edges.reduce((postInformations, { node: { frontmatter } }) => {
        const { type, path, title, summary, tags = [], category } = frontmatter;

        if (type === POST || type === null) {
          return [
            ...postInformations,
            {
              path,
              title,
              summary,
              tags,
              category,
            },
          ];
        }

        return postInformations;
      }, []);

      const state = {
        ...initialState,
        app: {
          ...initialState.app,
          portfolios,
          categories,
          postInformations,
        },
      };

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
