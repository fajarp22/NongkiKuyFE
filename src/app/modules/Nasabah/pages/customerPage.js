//  

import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { CustomersPage } from './customers/CustomersPage';
import { LayoutSplashScreen, ContentRoute } from '../../../../_metronic/layout';

export default function customerPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path="/nasabah" component={CustomersPage} />
      </Switch>
    </Suspense>
  );
}
