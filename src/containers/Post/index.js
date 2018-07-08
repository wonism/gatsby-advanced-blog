import { connect } from 'react-redux';
import {
  loadDisqus,
  renderTweets,
  renderComponents,
  createCopyButton,
} from '~/store/posts/actions';
import Post from '~/components/Post';

export default connect(
  () => ({}),
  {
    loadDisqus,
    renderTweets,
    renderComponents,
    createCopyButton,
  }
)(Post);
