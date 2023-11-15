import { lazy } from 'react';
import PrivateRoute from './protect';
import { Route, Routes, useLocation } from 'react-router-dom';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const TacheList = Loadable(lazy(() => import('views/taches/liste')));
const CategorieListCreate = Loadable(lazy(() => import('views/categories/liste')));
const CategorieDetailView = Loadable(lazy(() => import('views/categories/detail')));
const ActiviteListCreate = Loadable(lazy(() => import('views/activites/liste')));
const ActiviteDetailView = Loadable(lazy(() => import('views/activites/detail')));
const TacheDetails = Loadable(lazy(() => import('views/taches/detail')));
// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const AgenceDetail = Loadable(lazy(() => import('views/agences/detail')));
const AppelantDetail = Loadable(lazy(() => import('views/appelants/detail')));
const ClientDetail = Loadable(lazy(() => import('views/clients/detail')));
const AgenceListCreate = Loadable(lazy(() => import('views/agences/liste')));
const AppelantListCreate = Loadable(lazy(() => import('views/appelants/liste')));
const ClientListCreate = Loadable(lazy(() => import('views/clients/liste')));
const TechnicienListCreate = Loadable(lazy(() => import('views/techniciens/liste')));
const TechnicienDetail = Loadable(lazy(() => import('views/techniciens/detail')));
const Profile = Loadable(lazy(() => import('views/profile')));
// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

const MainRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route
        path="/"
        element={<AuthGuard><MainLayout /></AuthGuard>}
      >
        <Route index element={<DashboardDefault />} />
        <Route path="agence-list" element={<AgenceListCreate />} />
        <Route path="agence/:id" element={<AgenceDetail />} />
        <Route path="technicien-list" element={<TechnicienListCreate />} />
        <Route path="technicien/:id" element={<TechnicienDetail />} />
        <Route path="appelant-list" element={<AppelantListCreate />} />
        <Route path="appelant/:id" element={<AppelantDetail />} />
        <Route path="client-list" element={<ClientListCreate />} />
        <Route path="client/:id" element={<ClientDetail />} />
        <Route path="tache-list" element={<TacheList />} />
        <Route path="tache/:id" element={<TacheDetails />} />
        <Route path="activite-list" element={<ActiviteListCreate />} />
        <Route path="activite/:id" element={<ActiviteDetailView />} />
        <Route path="categorie-list" element={<CategorieListCreate />} />
        <Route path="categorie/:id" element={<CategorieDetailView />} />
        <Route path="utils/util-typography" element={<UtilsTypography />} />
        <Route path="utils/util-color" element={<UtilsColor />} />
        <Route path="utils/util-shadow" element={<UtilsShadow />} />
        <Route path="icons/tabler-icons" element={<UtilsTablerIcons />} />
        <Route path="icons/material-icons" element={<UtilsMaterialIcons />} />
        <Route path="profile" element={<Profile />} />
        <Route path="sample-page" element={<SamplePage />} />

      </Route>
    </Routes>
  );
};

export default MainRoutes;