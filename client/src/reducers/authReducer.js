import { LOG_IN, LOG_OUT } from '../actions/types';

const INIT_STATE = {
	isSignedIn: false,
};

const authReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case LOG_IN:
			return {
				...state,
				isSignedIn: true,
				user: action.payload.user,
				token: action.payload.token,
			};
		case LOG_OUT:
			return { ...state, isSignedIn: false, user: null, token: null };
		default:
			return state;
	}
};

export default authReducer;
