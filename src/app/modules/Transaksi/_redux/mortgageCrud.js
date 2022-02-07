//  

import axios from 'axios';

let baseUrl = process.env.REACT_APP_API_URL;
if (process.env.REACT_APP_MODE) {
  baseUrl = process.env.REACT_APP_ONLINE_API_URL;
}

export function findMortgage(queryParams) {
  return axios.post(`${baseUrl}/mortgage/show`, { ...queryParams });
}

export function findMortgageById(id) {
  return axios.get(`${baseUrl}/mortgage/showbyid/${id}`);
}

export function createMortgagePayment(content) {
  return axios.post(`${baseUrl}/mortgagepayment/create`, { ...content });
}

export function printMortgageDocumentById(id) {
  return axios.get(`${baseUrl}/mortgage/printsbg/${id}`);
}

export function printSBGById(id) {
  return axios.get(`${baseUrl}/mortgage/printsbg/${id}`);
}

export function printSBPerById(id) {
  return axios.get(`${baseUrl}/mortgage/printsbper/${id}`);
}

export function printSBPelById(id) {
  return axios.get(`${baseUrl}/mortgage/printsbpel/${id}`);
}
