//

import axios from 'axios';

let baseUrl = process.env.REACT_APP_API_URL;
if (process.env.REACT_APP_MODE) {
  baseUrl = process.env.REACT_APP_ONLINE_API_URL;
}

export const getParentItemCategory = () => {
  return axios
    .get(baseUrl + '/itemcategory/showparentitemcategory')
    .then(response => response.data);
};

export const getChildItemCategory = () => {
  return axios.get(baseUrl + '/itemcategory/showchilditemcategory').then(response => response.data);
};

export const getSelectedItemCategory = id => {
  return axios
    .get(baseUrl + '/itemcategory/showselecteditemcategory/' + id)
    .then(response => response.data);
};

export const generateItemCode = id => {
  return axios.get(baseUrl + '/item/generatecode/' + id).then(response => response.data.data[0]);
};

export const getAllRestaurants = async () => {
  const response = await axios.get(baseUrl + '/restaurant/showallrestaurants');
  return response.data;
};
