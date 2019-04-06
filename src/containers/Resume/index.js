import { connect } from 'react-redux';
import { printPage } from '~/store/app/actions';
import Resume from '~/components/Resume';

export default connect(() => ({}), { printPage })(Resume);
