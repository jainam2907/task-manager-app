import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Auth from './Auth';

class Header extends React.Component {
	renderMessage() {
		if (!this.props.user) {
			return (
				<Link to="/" className="item">
					<h3>Hello, Anonymous</h3>
				</Link>
			);
		} else {
			return (
				<Link to="/profile" className="item">
					<h3>{`Hello, ${this.props.user.name}`}</h3>
				</Link>
			);
		}
	}
	render() {
		return (
			<div className="ui secondary pointing menu">
				<Link to="/" className="item">
					<h3>Task Manager</h3>
				</Link>
				<div className="right menu">
					{this.renderMessage()}
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
