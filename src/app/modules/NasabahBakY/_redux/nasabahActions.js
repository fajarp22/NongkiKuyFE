import * as requestFromServer from './nasabahCrud';
import { nasabahSlice, callTypes } from './nasabahSlice';

const { actions } = nasabahSlice;

export const fetchNasabah = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findNasabah(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.nasabahFFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = 'Tidak dapat mencari nasabah';
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteNasabah = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteNasabah(id)
    .then(response => {
      dispatch(actions.nasabahDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = 'Tidak dapat menghapus nasabah';
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createNasabah = nasabahForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createNasabah(nasabahForCreation)
    .then(response => {
      const { nasabah } = response.data;
      dispatch(actions.nasabahCreated({ nasabah }));
    })
    .catch(error => {
      error.clientMessage = 'Tidak dapat membuat nasabah';
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateNasabah = nasabah => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateNasabah(nasabah)
    .then(() => {
      dispatch(actions.nasabahUpdated({ nasabah }));
    })
    .catch(error => {
      error.clientMessage = 'Tidak dapat memperbarui nasabah';
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
