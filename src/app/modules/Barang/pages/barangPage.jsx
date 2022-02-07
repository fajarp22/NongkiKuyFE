// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { dataBarangPage } from './dataBarang/DataBarangPage';
import { kategoriBarangPage } from './kategoriBarang/KategoriBarangPage';
import { LayoutSplashScreen, ContentRoute } from '../../../../_metronic/layout';

export default function barangPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/barang" to="/barang/data-barang" />}
        <ContentRoute path="/barang/data-barang" component={dataBarangPage} />
        <ContentRoute path="/barang/kategori-barang" component={kategoriBarangPage} />
      </Switch>
    </Suspense>
  );
}
