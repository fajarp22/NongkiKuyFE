//  

import * as requestFromServer from './mortgageCrud';
import { mortgageSlice, callTypes } from './mortgageSlice';

const { actions } = mortgageSlice;

export const fetchMortgage = queryParams => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  try {
    const response = await requestFromServer.findMortgage(queryParams);
    const { totalCount, entities } = response.data;
    dispatch(actions.mortgageFetched({ totalCount, entities }));
  } catch (error) {
    error.clientMessage = 'Data SBG tidak dapat ditemukan.';
    dispatch(actions.catchError({ error, callType: callTypes.list }));
  }
};

export const fetchOneMortgage = id => async dispatch => {
  if (!id) {
    return dispatch(actions.oneMortgageFetched({ mortgage: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    const response = await requestFromServer.findMortgageById(id);
    const mortgageData = response.data.data[0];
    dispatch(actions.oneMortgageFetched({ mortgageData }));
  } catch (error) {
    error.clientMessage = 'Data SBG tidak dapat ditemukan.';
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  }
};

export const createMortgagePayment = content => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    await requestFromServer.createMortgagePayment(content);
    dispatch(actions.MortgagePaymentCreated({ content }));
  } catch (error) {
    error.clientMessage = 'Tidak dapat membuat data pembayaran transaksi.';
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  }
};

export const printSBG = id => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    const response = await requestFromServer.printSBGById(id);
    const printSBG = response.data;
    dispatch(actions.printSBG({ printSBG: printSBG }));
  } catch (error) {
    error.clientMessage = 'Data print Surat Bukti Gadai tidak dapat ditemukan.';
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  }
};

export const printSBPer = id => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    const response = await requestFromServer.printSBPerById(id);
    const printSBPer = response.data;
    dispatch(actions.printSBPer({ printSBPer: printSBPer }));
  } catch (error) {
    error.clientMessage = 'Data Surat Bukti Perpanjangan tidak dapat ditemukan.';
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  }
};

export const printSBPel = id => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    const response = await requestFromServer.printSBPelById(id);
    const printSBPel = response.data;
    dispatch(actions.printSBPel({ printSBPel: printSBPel }));
  } catch (error) {
    error.clientMessage = 'Data Surat Bukti Pelunasan tidak dapat ditemukan.';
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  }
};
