//  

import axios from 'axios';

let baseUrl = process.env.REACT_APP_API_URL;
if (process.env.REACT_APP_MODE) {
  baseUrl = process.env.REACT_APP_ONLINE_API_URL;
}

export const createBranch = branch => {
  return axios.post(baseUrl + '/cabangkantor', branch);
};

export const findBranch = queryparams => {
  return axios.post(baseUrl + '/cabangkantor', queryparams);
};

export const findBranchById = id => {
  return axios.get(baseUrl + `/cabangkantor/${id}`);
};

export const updateBranch = branch => {
  return axios.put(baseUrl + `/cabangkantor/${branch.id}`, branch);
};

export const deleteBranch = id => {
  return axios.delete(baseUrl + `/cabangkantor/${id}`);
};
