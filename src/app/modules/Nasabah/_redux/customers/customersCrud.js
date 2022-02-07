//  

import axios from 'axios';

let baseUrl = process.env.REACT_APP_API_URL;
if (process.env.REACT_APP_MODE) {
  baseUrl = process.env.REACT_APP_ONLINE_API_URL;
}

export function createCustomer(customer) {
  return axios.post(baseUrl + '/nasabah', { ...customer });
}

export function getCustomerById(customerId) {
  return axios.get(`${baseUrl}/nasabah/${customerId}`);
}

export function findCustomers(queryParams) {
  return axios.post(baseUrl + '/nasabah/show', {
    ...queryParams
  });
}

export function updateCustomer(customer) {
  return axios.put(`${baseUrl}/nasabah/${customer._id}`, {
    ...customer
  });
}

export function deleteCustomer(customerId) {
  return axios.delete(`${baseUrl}/nasabah/${customerId}`);
}

// TODO: hapus kodingan dibawah

export const CUSTOMERS_URL = 'api/customers';

export function updateStatusForCustomers(ids, status) {
  return axios.post(`${CUSTOMERS_URL}/updateStatusForCustomers`, {
    ids,
    status
  });
}

export function getAllCustomers() {
  return axios.get(CUSTOMERS_URL);
}

export function deleteCustomers(ids) {
  return axios.post(`${CUSTOMERS_URL}/deleteCustomers`, { ids });
}
