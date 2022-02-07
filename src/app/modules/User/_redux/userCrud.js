// 👉🏻 https://linktr.ee/rifqiahmad.f

import axios from 'axios';

let baseUrl = process.env.REACT_APP_API_URL;
if (process.env.REACT_APP_MODE) {
  baseUrl = process.env.REACT_APP_ONLINE_API_URL;
}

export function findUser(queryParams) {}
export function findUserById(id) {}
export function createUser(user) {}
export function updateUser(user) {}
export function deletUser(id) {}
