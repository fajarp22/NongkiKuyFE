import { createSlice } from '@reduxjs/toolkit';

const initialNasabahState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  nasabahForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: 'list',
  action: 'action'
};

export const nasabahSlice = createSlice({
  name: 'nasabah',
  initialState: initialNasabahState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type} : ${action.payload.error}`;
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
    nasabahCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.nasabah);
    },
    nasabahFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    nasabahUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.nasabah.id) {
          return action.payload.nasabah;
        }
        return entity;
      });
    },
    nasabahDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    }
  }
});
