import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../../actions';
import NoteForm from './NoteForm.component';

function mapStateToProps(state) {
	return {
		title: state.palate.title,
		note: state.palate.note
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
