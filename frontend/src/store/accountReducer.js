// action - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT, REFRESH } from './actions';

export const initialState = {
    token: '',
    refresh: '',
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_INITIALIZE: {
            const { isLoggedIn, user, token,refresh } = action.payload;
            return {
                ...state,
                isLoggedIn,
                isInitialized: true,
                token,
                refresh,
                user
            };
        }
        case REFRESH :{
            const {token, refresh} = action.payload;
            return {
                ...state,
                token,
                refresh
            };
        }
        case LOGIN: {
            const { user } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                user
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                token: '',
                user: null
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
