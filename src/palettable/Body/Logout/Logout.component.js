import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import actions from '../../actions';

const Logout = (props) => {
	props.actions.logoutUser();
	return <Redirect to='/palates' />;
};

Logout.propTypes = {
	actions: PropTypes.objectOf(PropTypes.func)
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(null, mapDispatchToProps)(Logout);
