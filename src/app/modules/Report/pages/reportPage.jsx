//  

import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { LayoutSplashScreen, ContentRoute } from '../../../../_metronic/layout';
import dailyReportPage from './dailyReport/dailyReportPage';
import recapDailyReportPage from './recapDailyReport/recapDailyReportPage';

export default function reportPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/report" to="/report/dailyreport" />}
        <ContentRoute path="/report/dailyreport" component={dailyReportPage} />
        <ContentRoute path="/report/recapdailyreport" component={recapDailyReportPage} />
      </Switch>
    </Suspense>
  );
}
