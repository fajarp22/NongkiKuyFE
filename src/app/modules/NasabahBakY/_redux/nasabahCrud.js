import axios from 'axios';

export const createNasabah = nasabah => {
  return axios.post('http://localhost:8080/api/nasabah', { ...nasabah });
};

export const getNasabahById = nasabahId => {
  return axios.get(`http://localhost:8080/api/nasabah/${nasabahId}`);
};

export const findNasabah = queryParams => {
  return axios.post('http://localhost:8080/api/nasabah/show', {
    ...queryParams
  });
};

export const updateNasabah = nasabah => {
  return axios.put(process.env.API_URL + '/nasabah/' + nasabah.id, { nasabah });
};

export const deleteNasabah = nasabahId => {
  return axios.delete(process.env.API_URL + '/nasabah/' + nasabahId);
};
