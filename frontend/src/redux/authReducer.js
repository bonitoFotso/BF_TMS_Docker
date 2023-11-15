// authReducer.js

const initialState = {
  id: null,
  username: '',
  user_type: '',
  access_token: '',
  refresh_token: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      // Mettez à jour l'état de l'utilisateur avec les données du payload de l'action
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        user_type: action.payload.user_type,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
      };
    case 'LOGOUT':
      // Réinitialisez l'état de l'utilisateur à sa valeur initiale
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
