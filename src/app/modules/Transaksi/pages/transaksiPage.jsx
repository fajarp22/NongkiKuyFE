//  

import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { LayoutSplashScreen, ContentRoute } from '../../../../_metronic/layout';

import CekHargaPage from './cekHarga/CekHargaPage';
import { InputSbgPage } from './inputSbg/InputSbg';
import { DataSBGPage } from './dataSBG/DataSBGPage';

export default function transaksiPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/transaksi" to="/transaksi/cek-harga" />}
        <ContentRoute path="/transaksi/cek-harga" component={CekHargaPage} />
        <ContentRoute path="/transaksi/input-sbg" component={InputSbgPage} />
        <ContentRoute path="/transaksi/cari-sbg" component={DataSBGPage} />
      </Switch>
    </Suspense>
  );
}
