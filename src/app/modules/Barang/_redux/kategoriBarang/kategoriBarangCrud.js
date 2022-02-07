// contact me 👉🏻 https://linktr.ee/rifqiahmad.f

import axios from 'axios';

// const baseUrl = process.env.REACT_APP_API_URL;

export function createKategori(kategori) {
  return axios.post();
}

export function createSubKategori(subKategori) {
  return axios.post();
}

export function getKategoriById(KategoriId) {
  return axios.get();
}

export function getSubKategoriById(SubKategoriId) {
  return axios.get();
}

export function findKategori(queryParams) {
  return axios.post();
}

export function findSubKategori(queryParams) {
  return axios.post();
}

export function updateKategori(kategori) {
  return axios.put();
}

export function updateSubKategori(subKategori) {
  return axios.put();
}

export function deleteKategori(kategoriId) {
  return axios.delete();
}

export function deleteSubKategori(subKategoriId) {
  return axios.delete();
}
