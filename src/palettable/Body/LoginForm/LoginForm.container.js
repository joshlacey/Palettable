import { connect } from 'react-redux';
import actions from '../../actions';
import LoginSignUp from '../modules/LoginSignUp';

function mapStateToProps() {
	return {
		title: 'Login'
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onSubmit: (loginParams) => dispatch(actions.loginUser(loginParams))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignUp);
