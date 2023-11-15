import React from 'react';
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //



const Routes = () => {
  return (

         <>
              {/* Routes for authentication pages */}
              <AuthenticationRoutes />


              {/* Routes for main layouts */}
              <MainRoutes />
         </>
  );
};

export default Routes;
