import axios from 'axios';

export const CUSTOMERS_URL = 'api/customers';

// CREATE =>  POST: add a new customer to the server
export function createCustomer(customer) {
  return axios.post('http://localhost:8080/api/nasabah', { ...customer });
}

// READ
export function getAllCustomers() {
  return axios.get(CUSTOMERS_URL);
}

export function getCustomerById(customerId) {
  return axios.get(`http://localhost:8080/api/nasabah/${customerId}`);
  // .then((result) => {
  // });
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCustomers(queryParams) {
  return axios.post('http://localhost:8080/api/nasabah/show', {
    ...queryParams
  });
}

// UPDATE => PUT: update the customer on the server
export function updateCustomer(customer) {
  return axios.put(`http://localhost:8080/api/nasabah/${customer.id}`, {
    ...customer
  });
}

// UPDATE Status
export function updateStatusForCustomers(ids, status) {
  return axios.post(`${CUSTOMERS_URL}/updateStatusForCustomers`, {
    ids,
    status
  });
}

// DELETE => delete the customer from the server
export function deleteCustomer(customerId) {
  return axios.delete(`http://localhost:8080/api/nasabah/${customerId}`);
}

// DELETE Customers by ids
export function deleteCustomers(ids) {
  return axios.post(`${CUSTOMERS_URL}/deleteCustomers`, { ids });
}
