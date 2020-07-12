import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import SignUp from './user/UserSignUp';
import Login from './user/UserLogin';

import history from '../history';

const App = () => {
	return (
		<div className="ui container">
			<Router history={history}>
				<div>
					<Header />
					<Switch>
						<Route path="/signup" exact={true} component={SignUp} />
						<Route path="/signin" exact={true} component={Login} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
