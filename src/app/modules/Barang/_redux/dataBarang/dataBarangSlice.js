// 👉🏻 https://linktr.ee/rifqiahmad.f

import { createSlice } from '@reduxjs/toolkit';

const initialDataBarangState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  dataBarangForEdit: undefined,
  lastError: null
};

export const callTypes = {
  list: 'list',
  action: 'action'
};

export const dataBarangSlice = createSlice({
  name: 'dataBarang',
  initialState: initialDataBarangState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    dataBarangFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    idDataBarangFetched: (state, action) => {
      state.actionsLoading = false;
      state.dataBarangForEdit = action.payload.dataBarangForEdit;
      state.error = null;
    },
    dataBarangCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.dataBarang);
    },
    dataBarangUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.dataBarang.id) {
          return action.payload.dataBarang;
        }
        return entity;
      });
    },
    dataBarangDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(entity => entity.id !== action.payload.id);
    }
  }
});
