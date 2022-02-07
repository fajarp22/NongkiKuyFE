//  

import axios from 'axios';

let baseUrl = process.env.REACT_APP_API_URL;
if (process.env.REACT_APP_MODE) {
  baseUrl = process.env.REACT_APP_ONLINE_API_URL;
}

export function createDataBarang(dataBarang) {
  return axios.post(baseUrl + '/item', { ...dataBarang });
}

export function getDataBarangById(dataBarangId) {
  return axios.get(`${baseUrl}/item/showbyid/${dataBarangId}`);
}

export function findDataBarang(queryParams) {
  return axios.post(baseUrl + '/item/show', { ...queryParams });
}

export function updateDataBarang(dataBarang) {
  return axios.put(`${baseUrl}/item/${dataBarang._id}`, { ...dataBarang });
}

export function deleteDataBarang(dataBarangId) {
  return axios.delete(`${baseUrl}/item/${dataBarangId}`);
}
