import { createSlice } from '@reduxjs/toolkit';

const initialLocationsState = {
  provinces: [],
  regencies: [],
  districts: [],
  villages: []
};
export const locationsSlice = createSlice({
  name: 'locations',
  initialState: initialLocationsState,
  reducers: {
    //   findProvinces
    provincesFetched: (state, action) => {
      state.provinces = action.payload.provinces;
    },
    //   getRegenciesById
    regenciesFetched: (state, action) => {
      state.regencies = action.payload.regencies;
    },
    //   getRegenciesById
    districtsFetched: (state, action) => {
      state.districts = action.payload.districts;
    },
    //   getRegenciesById
    villagesFetched: (state, action) => {
      state.villages = action.payload.villages;
    }
  }
});
