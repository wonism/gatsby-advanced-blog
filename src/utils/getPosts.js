import { POST } from '~/constants';

const getPosts = data =>
  data.posts.edges.filter(({ node: { frontmatter: { hide, type } } }) => (
    hide !== true && (type || POST) === POST
  ));

export default getPosts;
