import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../../actions';
import Palette from './Palette.component';

function mapStateToProps(state) {
	const { note, title } = state.palate;
	return {
		note,
		title
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Palette);
