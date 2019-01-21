import { connect } from 'react-redux';
import actions from '../../actions';
import LoginSignUp from '../modules/LoginSignUp';

function mapStateToProps() {
	return {
		title: 'Sign Up'
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onSubmit: (signUpParams) => dispatch(actions.createUser(signUpParams))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignUp);
