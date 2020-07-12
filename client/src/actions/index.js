import api from '../api';
import { LOG_IN, LOG_OUT } from './types';
import history from '../history';

export const signUp = (formValues) => {
	return async (dispatch) => {
		try {
			const response = await api.post('/users', {
				...formValues,
			});

			if (response.status === 201) {
				dispatch({ type: LOG_IN, payload: response.data });
				history.push('/');
			}
		} catch (error) {
			if (error.response.status === 400) {
				return error;
			}
		}
	};
};

export const logIn = (formValues) => {
	return async (dispatch) => {
		try {
			const response = await api.post('/users/login', {
				...formValues,
			});
			if (response.status === 200) {
				dispatch({ type: LOG_IN, payload: response.data });
				history.push('/');
			}
		} catch (error) {
			if (error.response.status === 400) {
				return error.response.status;
			}
		}
	};
};

export const logOut = () => {
	return {
		type: LOG_OUT,
	};
};

export const fetchUser = (token) => {
	return async (dispatch) => {
		try {
			const response = await api.get('/users/me', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.status === 200) {
				dispatch({ type: LOG_IN, payload: response.data });
			} else {
				console.log(response.status);
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: LOG_OUT });
		}
	};
};
