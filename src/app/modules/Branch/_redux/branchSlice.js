// 👉🏻 https://linktr.ee/rifqiahmad.f

import { createSlice } from '@reduxjs/toolkit';

const initialBranchState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  branchForEdit: undefined,
  lastError: null
};

export const callTypes = {
  list: 'list',
  action: 'action'
};

export const branchSlice = createSlice({
  name: 'branchSlice',
  initialState: initialBranchState,
  reducers: {
    catchError: (state, action) => {
      state.lastError = `${action.type}: ${action.payload.lastError}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.lastError = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    branchFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.lastError = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    oneBranchFetched: (state, action) => {
      state.actionsLoading = false;
      state.branchForEdit = action.payload.branch;
      state.lastError = null;
    },
    branchCreated: (state, action) => {
      state.actionsLoading = false;
      state.lastError = null;
      state.entities.push(action.payload.branch);
    },
    branchUpdated: (state, action) => {
      state.lastError = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity._id === action.payload.branch._id) {
          return action.payload.branch;
        } else {
          return entity;
        }
      });
    },
    branchDeleted: (state, action) => {
      state.lastError = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    }
  }
});
