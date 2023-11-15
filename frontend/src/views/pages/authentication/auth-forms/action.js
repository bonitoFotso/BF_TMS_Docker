// LoginSuccessAction.js
export const loginSuccess = (userData) => {
    return {
      type: 'LOGIN_SUCCESS',
      payload: userData,
    };
  };

// LogoutAction.js

export const logout = () => {
    return {
      type: 'LOGOUT',
    };
  };