import { flow, filter, get } from 'lodash/fp';
import { POST } from '~/constants';

const getPosts = flow(
  get('allMarkdownRemark.edges'),
  filter((edge) => {
    const frontmatter = get('node.frontmatter')(edge);
    const { hide, type } = frontmatter;
    return (hide !== true) && ((type || POST) === POST);
  })
);

export default getPosts;
