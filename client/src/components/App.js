import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import UserCreate from './user/UserCreate';
import UserLogin from './user/UserLogin';
import UserShow from './user/UserShow';
import UserUpdateAvatar from './user/UserUpdateAvatar';
import UserDelete from './user/UserDelete';
import history from '../history';
import UserUpdate from './user/UserUpdate';

const App = () => {
	return (
		<div className="ui container">
			<Router history={history}>
				<div>
					<Header />
					<Switch>
						<Route
							path="/signup"
							exact={true}
							component={UserCreate}
						/>
						<Route
							path="/signin"
							exact={true}
							component={UserLogin}
						/>
						<Route
							path="/profile"
							exact={true}
							component={UserShow}
						/>
						<Route
							path="/profile/update"
							exact={true}
							component={UserUpdate}
						/>
						<Route
							path="/profile/update-avatar"
							exact={true}
							component={UserUpdateAvatar}
						/>
						<Route
							path="/profile/delete"
							exact={true}
							component={UserDelete}
						/>
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
