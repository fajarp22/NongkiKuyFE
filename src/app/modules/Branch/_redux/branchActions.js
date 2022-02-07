// 👉🏻 https://linktr.ee/rifqiahmad.f

import * as requestFromServer from './branchCrud';
import { branchSlice, callTypes } from './branchSlice';

const { actions } = branchSlice;

export const fetchBranch = queryParams => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  try {
    const response = await requestFromServer.findBranch(queryParams);
    const { totalCount, entities } = response.data;
    dispatch(actions.branchFetched({ totalCount, entities }));
  } catch (error) {
    error.clientMessage = 'Data Kantor Cabang tidak dapat ditemukan.';
    dispatch(actions.catchError({ error, callTypes: callTypes.list }));
  }
};

export const fetchOneBranch = id => async dispatch => {
  if (!id) {
    return dispatch(actions.oneBranchFetched({ branch: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    const response = await requestFromServer.findBranchById(id);
    const branch = response.data;
    dispatch(actions.oneBranchFetched({ branch }));
  } catch (error) {
    error.clientMessage = 'Data Kantor Cabang tidak dapat ditemukan.';
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  }
};

export const deleteBranch = id => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    await requestFromServer.deleteBranch(id);
    dispatch(actions.branchDeleted({ id }));
  } catch (error) {
    error.clientMessage = 'Data Kantor Cabang tidak dapat dihapus.';
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  }
};

export const createBranch = branch => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    await requestFromServer.createBranch(branch);
    dispatch(actions.branchCreated({ branch }));
  } catch (error) {
    error.clientMessage = 'Data Kantor Cabang tidak dapat dibuat.';
    dispatch(actions.catchError({ error, callType: callTypes.action }));
  }
};

export const updateBranch = branch => async dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  try {
    await requestFromServer.updateBranch(branch);
    dispatch(actions.branchUpdated({ branch }));
  } catch (error) {}
};
