import axios from 'axios';

let baseUrl = process.env.REACT_APP_API_URL;
if (process.env.REACT_APP_MODE) {
  baseUrl = process.env.REACT_APP_ONLINE_API_URL;
}

export function login(username, password) {
  return axios.post(baseUrl + '/user/signin', {
    username,
    password
  });
}

export function getUserByToken() {
  return axios.get(baseUrl + '/user/me');
}

// TODO: hapus kodingan dibawah ini

export const LOGIN_URL = `${process.env.REACT_APP_API_URL}/user/signin`;
export const REGISTER_URL = 'NEED_CHANGE_LATER_REGISTER';
export const REQUEST_PASSWORD_URL = 'NEED_CHANGE_LATER_PASSWORD';
export const ME_URL = 'NEED_CHANGE_LATER_ME';
export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}
export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}
