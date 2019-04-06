require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const path = require('path');
const { flow, isNull, isArray, isString, each, filter, reduce, range, flatten, uniq, includes, get, size } = require('lodash/fp');
const { createFilePath } = require('gatsby-source-filesystem');
const {
  CONTENT_PER_PAGE,
  POST,
  PORTFOLIO,
  RESUME,
} = require('./src/constants');

exports.onCreateWebpackConfig = ({
  stage,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    externals: {
      document: true,
      discus_config: true,
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      plugins.define({
        __DEVELOPMENT__: stage === 'develop' || stage === 'develop-html',
      }),
    ],
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const contentTypes = [POST, PORTFOLIO, RESUME];

  return new Promise((resolve, reject) => {
    const post = path.resolve('./src/templates/Post.jsx');
    const list = path.resolve('./src/templates/List.jsx');
    const taggedList = path.resolve('./src/templates/TaggedList.jsx');
    const categorizedList = path.resolve('./src/templates/CategorizedList.jsx');
    const resume = path.resolve('./src/templates/Resume.jsx');
    const portfolios = path.resolve('./src/templates/Portfolios.jsx');
    const portfolio = path.resolve('./src/templates/Portfolio.jsx');

    resolve(
      graphql(`
        {
          allMarkdownRemark(limit: 10000) {
            edges {
              node {
                frontmatter {
                  path
                  category
                  tags
                  type
                  hide
                }
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const edges = get('data.allMarkdownRemark.edges')(result);
        const tagMatrix = [];
        const categoryMatrix = [];

        // Create blog posts pages.
        each((edge) => {
          const frontmatter = get('node.frontmatter')(edge);
          const { tags, category, type, hide } = frontmatter;

          if (hide !== true) {
            if (isArray(tags)) {
              tagMatrix.push(tags);
            }

            if (isString(category)) {
              categoryMatrix.push(category);
            }

            let component = null;
            switch (type) {
              case PORTFOLIO:
                component = portfolio;
                break;
              case RESUME:
                component = resume;
                break;
              case POST:
              default:
                component = post;
                break;
            }

            if (!isNull(component)) {
              createPage({
                path: edge.node.frontmatter.path,
                component,
                context: {
                },
              });
            }
          }
        })(edges);

        const portfoliosCount = flow(
          filter((edge) => {
            const frontmatter = get('node.frontmatter')(edge);
            const { type } = frontmatter;

            return type === PORTFOLIO;
          }),
          size
        )(edges);

        if (portfoliosCount) {
          createPage({
            path: '/portfolios',
            component: portfolios,
            context: {
            },
          });
        }

        const postsCount = flow(
          filter((edge) => {
            const frontmatter = get('node.frontmatter')(edge);
            const { hide, type } = frontmatter;

            return !hide && (type || POST) === POST;
          }),
          size
        )(edges);
        const pagesCount = postsCount ? (Math.ceil(postsCount / CONTENT_PER_PAGE) + 1) : 1;
        const pages = range(1, pagesCount);

        if (size(pages)) {
          each((page) => {
            createPage({
              path: `/pages/${page}`,
              component: list,
              context: {
              },
            });
          })(pages);
        } else {
          createPage({
            path: `/pages/1`,
            component: list,
            context: {
            },
          });
        }

        const tags = flow(
          flatten,
          uniq
        )(tagMatrix);

        each((tag) => {
          const taggedPostCount = reduce((count, edge) => {
            const postTags = get('node.frontmatter.tags')(edge);

            if (includes(tag)(postTags)) {
              return count + 1;
            }

            return count;
          }, 0)(edges);
          const taggedListCount = taggedPostCount ?
            (Math.ceil(taggedPostCount / CONTENT_PER_PAGE) + 1) : 1;
          const taggedListPages = range(1, taggedListCount);

          each((taggedListPage) => {
            createPage({
              path: `/tags/${tag}/${taggedListPage}`,
              component: taggedList,
              context: {
              },
            });
          })(taggedListPages);
        })(tags);

        const categories = flow(
          flatten,
          uniq
        )(categoryMatrix);

        each((category) => {
          const categorizedPostCount = reduce((count, edge) => {
            const postCategory = get('node.frontmatter.category')(edge);

            if (includes(category)(postCategory)) {
              return count + 1;
            }

            return count;
          }, 0)(edges);
          const categorizedListCount = categorizedPostCount ?
            (Math.ceil(categorizedPostCount / CONTENT_PER_PAGE) + 1) : 1;
          const categorizedListPages = range(1, categorizedListCount);

          each((categorizedListPage) => {
            createPage({
              path: `/categories/${category}/${categorizedListPage}`,
              component: categorizedList,
              context: {
              },
            });
          })(categorizedListPages);
        })(categories);
      })
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
