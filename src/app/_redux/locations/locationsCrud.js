import axios from 'axios';

let baseUrl = process.env.REACT_APP_API_URL;
if (process.env.REACT_APP_MODE) {
  baseUrl = process.env.REACT_APP_ONLINE_API_URL;
}

// READ
export const getProvinces = () => {
  return axios.get(baseUrl + '/province').then(response => response.data);
};

export const getRegencies = provinceId => {
  return axios
    .post(baseUrl + '/regency', { id_province: provinceId })
    .then(response => response.data);
};

export const getDistricts = regencyId => {
  return axios
    .post(baseUrl + '/district', { id_regency: regencyId })
    .then(response => response.data);
};

export const getVillages = districtId => {
  return axios
    .post(baseUrl + '/village', { id_district: districtId })
    .then(response => response.data);
};

export const getNameProvince = id => {
  return axios.post(baseUrl + '/province/getname', { id }).then(response => response.data);
};

export const getNameRegency = id => {
  return axios.post(baseUrl + '/regency/getname', { id }).then(response => response.data);
};
export const getNameDistrict = id => {
  return axios.post(baseUrl + '/district/getname', { id }).then(response => response.data);
};
export const getNameVillage = id => {
  return axios.post(baseUrl + '/village/getname', { id }).then(response => response.data);
};
