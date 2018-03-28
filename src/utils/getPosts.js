import fp from 'lodash/fp';
import { POST } from '~/constants';

const getPosts = fp.flow(
  fp.get('allMarkdownRemark.edges'),
  fp.filter((edge) => {
    const frontmatter = fp.get('node.frontmatter')(edge);
    const { hide, type } = frontmatter;
    return (hide !== true) && ((type || POST) === POST);
  })
);

export default getPosts;
