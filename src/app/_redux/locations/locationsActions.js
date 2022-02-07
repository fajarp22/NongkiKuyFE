import * as requestFromServer from './locationsCrud';
import { locationsSlice } from './locationsSlice';

const { actions } = locationsSlice;

export const fetchProvinces = () => dispatch => {
  return requestFromServer.getProvinces().then(response => {
    const provinces = response.data;
    dispatch(actions.provincesFetched(provinces));
  });
};

export const fetchRegencies = provinceId => dispatch => {
  return requestFromServer.getRegencies(provinceId).then(response => {
    const regencies = response.data;
    dispatch(actions.regenciesFetched(regencies));
  });
};

export const fetchDistricts = regencyId => dispatch => {
  return requestFromServer.getDistricts(regencyId).then(response => {
    const districts = response.data;
    dispatch(actions.DistrictsFetched(districts));
  });
};

export const fetchVillages = districtId => dispatch => {
  return requestFromServer.getVillages(districtId).then(response => {
    const villages = response.data;
    dispatch(actions.VillagesFetched(villages));
  });
};
