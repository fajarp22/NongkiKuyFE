// 👉🏻 https://linktr.ee/rifqiahmad.f

import { createSlice } from '@reduxjs/toolkit';

const initialMortgageState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  lastError: null,
  mortgageData: undefined,
  printSBG: undefined,
  printSBPer: undefined,
  printSBPel: undefined
};

export const callTypes = {
  list: 'list',
  action: 'action'
};

export const mortgageSlice = createSlice({
  name: 'mortgage',
  initialState: initialMortgageState,
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
    mortgageFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.lastError = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    oneMortgageFetched: (state, action) => {
      state.actionsLoading = false;
      state.mortgageData = action.payload.mortgageData;
      state.lastError = null;
    },
    MortgagePaymentCreated: (state, action) => {
      state.lastError = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.content.id) {
          return action.payload.mortgageData;
        }
        return entity;
      });
    },
    printSBG: (state, action) => {
      state.lastError = null;
      state.actionsLoading = false;
      state.printSBG = action.payload.printSBG;
    },
    printSBPer: (state, action) => {
      state.lastError = null;
      state.actionsLoading = false;
      state.printSBPer = action.payload.printSBPer;
    },
    printSBPel: (state, action) => {
      state.lastError = null;
      state.actionsLoading = false;
      state.printSBPel = action.payload.printSBPel;
    }
  }
});
