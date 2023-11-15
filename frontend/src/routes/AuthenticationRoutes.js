import { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import GuestGuard from 'utils/route-guard/GuestGuard';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route
        path="/"
        element={<MinimalLayout />}
      >   

        <Route path="/pages/login/login3" element={<AuthLogin3 />} />
        <Route path="/pages/register/register3" element={<AuthRegister3 />} />

      </Route>
    </Routes>
  );
};

export default AuthenticationRoutes;






