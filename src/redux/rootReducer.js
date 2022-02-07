// 👉🏻 https://linktr.ee/rifqiahmad.f

import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import * as auth from '../app/modules/Auth/_redux/authRedux';
import { customersSlice } from '../app/modules/ECommerce/_redux/customers/customersSlice';
import { productsSlice } from '../app/modules/ECommerce/_redux/products/productsSlice';
import { remarksSlice } from '../app/modules/ECommerce/_redux/remarks/remarksSlice';
import { specificationsSlice } from '../app/modules/ECommerce/_redux/specifications/specificationsSlice';
import { locationsSlice } from '../app/_redux/locations/locationsSlice';

import { dataBarangSlice } from '../app/modules/Barang/_redux/dataBarang/dataBarangSlice';
import { mortgageSlice } from '../app/modules/Transaksi/_redux/mortgageSlice';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  locations: locationsSlice.reducer,
  dataBarang: dataBarangSlice.reducer,
  mortgage: mortgageSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
