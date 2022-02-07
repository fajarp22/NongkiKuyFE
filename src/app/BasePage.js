//  

import React, { Suspense, lazy } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { LayoutSplashScreen, ContentRoute } from '../_metronic/layout';
import { BuilderPage } from './pages/BuilderPage';
// import { MyPage } from "./pages/MyPage";
import { DashboardPage } from './pages/DashboardPage';
import CabangPage from './pages/CabangPage';
import ComingsoonPage from './pages/ComingsoonPage';
import UserPage from './pages/UserPage';

// import TransaksiPage from "./modules/Transaksi/pages/TransaksiPage";
// import NasabahPage from "./modules/Nasabah/pages/NasabahPage"

// const GoogleMaterialPage = lazy(() =>
//   import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
// );
// const ReactBootstrapPage = lazy(() =>
//   import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
// );
const ECommercePage = lazy(() => import('./modules/ECommerce/pages/eCommercePage'));

const CustomerPage = lazy(() => import('./modules/Nasabah/pages/customerPage'));
const BarangPage = lazy(() => import('./modules/Barang/pages/barangPage'));
// const UserProfilepage = lazy(() =>
//   import("./modules/UserProfile/UserProfilePage")
// );

const TransaksiPage = lazy(() => import('./modules/Transaksi/pages/transaksiPage'));
const ReportPage = lazy(() => import('./modules/Report/pages/reportPage'));

// const NasabahPage = lazy(() =>
//   import("./modules/Nasabah/pages/NasabahPage"));

// const BarangPage = lazy(() =>
//   import("./modules/Barang/BarangPage"));

export default function BasePage() {
  // useEffect(() => {
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/cabang" component={CabangPage} />
        <ContentRoute path="/comingsoon" component={ComingsoonPage} />
        <ContentRoute path="/user" component={UserPage} />
        {/* <ContentRoute path="/my-page" component={MyPage} /> */}
        {/* <Route path="/nasabah" component={NasabahPage} /> */}

        {/* <Route path="/google-material" component={GoogleMaterialPage} /> */}
        {/* <Route path="/react-bootstrap" component={ReactBootstrapPage} /> */}
        <Route path="/transaksi" component={TransaksiPage} />
        <Route path="/e-commerce" component={ECommercePage} />
        <Route path="/nasabah" component={CustomerPage} />
        <Route path="/barang" component={BarangPage} />
        <Route path="/report" component={ReportPage} />

        {/* <Route path="/user-profile" component={UserProfilepage} /> */}
        {/* <Redirect to="error/error-v1" /> */}
      </Switch>
    </Suspense>
  );
}
