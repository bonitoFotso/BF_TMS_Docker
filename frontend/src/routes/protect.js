// PrivateRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../authContext'; // Importez useAuth depuis le contexte

const PrivateRoute = ({ ...props }) => {
  const { isAuthenticated } = useAuth(); // Accédez à l'état d'authentification depuis le contexte
    console.log(isAuthenticated);
  return isAuthenticated ? <Route {...props} /> : <Navigate to="/pages/login/login3" />;

};

export default PrivateRoute;

