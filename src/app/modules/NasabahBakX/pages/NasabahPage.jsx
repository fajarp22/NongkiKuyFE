import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import InputNasabah from './inputNasabah/InputNasabahPage';
import LihatNasabah from './lihatNasabah/LihatNasabahPage';
import { LayoutSplashScreen, ContentRoute } from '../../../../_metronic/layout';

const NasabahPage = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          // Redirect from Nasabah root URL to /lihat-nasabah
          <Redirect exact={true} from="/nasabah" to="/nasabah/lihat-nasabah" />
        }
        <ContentRoute path="/nasabah/lihat-nasabah" component={LihatNasabah} />
        <ContentRoute path="/nasabah/input-nasabah" component={InputNasabah} />
      </Switch>
    </Suspense>
  );
};

export default NasabahPage;
