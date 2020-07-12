import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Auth from './Auth';

class Header extends React.Component {
	renderMessage() {
		if (!this.props.user) {
			return 'Hello, Anonymous';
		} else {
			return `Hello, ${this.props.user.name}`;
		}
	}
	render() {
		return (
			<div className="ui secondary pointing menu">
				<Link to="/" className="item">
					Task Manager
				</Link>
				<div className="right menu">
					<Link to="/" className="item">
						{this.renderMessage()}
					</Link>
					<Auth />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
