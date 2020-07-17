import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser, logOut } from '../actions';

class Auth extends React.Component {
	componentDidMount = () => {
		const token = localStorage.getItem('token');
		if (token) {
			this.props.fetchUser(token);
		}
	};

	componentDidUpdate = () => {
		if (this.props.isSignedIn === null) {
			return;
		} else if (this.props.isSignedIn === true) {
			localStorage.setItem('token', this.props.token);
		} else {
			localStorage.setItem('token', '');
		}
	};

	onSignOutClick = () => {
		this.props.logOut(this.props.token);
	};

	renderAuthButton = () => {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn === true) {
			return (
				<div
					className="ui big red button"
					onClick={this.onSignOutClick}
				>
					Logout
				</div>
			);
		} else {
			return (
				<Link to="/signin" className="ui big red button">
					Login
				</Link>
			);
		}
	};

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		token: state.auth.token,
	};
};

const mapDispatchToProps = {
	fetchUser,
	logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
