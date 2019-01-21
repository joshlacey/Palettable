import actions from '../../../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ColorsContainer from './ColorsContainer.component';

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(null, mapDispatchToProps)(ColorsContainer);
