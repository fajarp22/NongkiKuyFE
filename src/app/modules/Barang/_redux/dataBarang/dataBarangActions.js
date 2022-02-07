// 👉🏻 https://linktr.ee/rifqiahmad.f

import * as requestFromServer from './dataBarangCrud';
import { dataBarangSlice, callTypes } from './dataBarangSlice';

const { actions } = dataBarangSlice;

export const fetchDataBarang = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findDataBarang(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.dataBarangFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = 'Tidak dapat mencari Data Barang';
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchIdDataBarang = id => dispatch => {
  if (!id) {
    return dispatch(actions.idDataBarangFetched({ dataBarangForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getDataBarangById(id)
    .then(response => {
      const dataBarang = response.data;
      dispatch(actions.idDataBarangFetched({ dataBarangForEdit: dataBarang }));
    })
    .catch(error => {
      error.clientMessage = 'Tidak dapat mencari Data Barang';
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDataBarang = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDataBarang(id)
    .then(() => {
      dispatch(actions.dataBarangDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = 'Tidak dapat menghapus Data Barang';
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createDataBarang = dataBarangForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createDataBarang(dataBarangForCreation)
    .then(response => {
      dispatch(actions.dataBarangCreated({ dataBarang: response.data }));
    })
    .catch(error => {
      error.clientMessage = 'Tidak dapat membuat Data Barang';
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDataBarang = dataBarang => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateDataBarang(dataBarang)
    .then(() => {
      dispatch(actions.dataBarangUpdated({ dataBarang }));
    })
    .catch(error => {
      error.clientMessage = 'Tidak dapat memperbarui Data Barang';
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
