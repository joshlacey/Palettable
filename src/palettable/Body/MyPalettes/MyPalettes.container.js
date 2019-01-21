import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';
import MyPalettes from './MyPalettes.component';

function mapStateToProps(state) {
	const { palates, updateAfterDelete } = state.user;
	const { loaders } = state.uiReducer;
	const loading = loaders.myPalettes;
	return {
		updateAfterDelete,
		palates,
		loading
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPalettes);
