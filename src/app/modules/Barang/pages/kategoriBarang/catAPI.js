// 👉🏻 https://linktr.ee/rifqiahmad.f

import axios from 'axios';

let baseUrl = process.env.REACT_APP_API_URL;
if (process.env.REACT_APP_MODE) {
  baseUrl = process.env.REACT_APP_ONLINE_API_URL;
}

const DEFAULT_DATA = {
  data: [],
  message: '',
  status: 'ERROR'
};

export const getTreeView = () => {
  return axios
    .get(baseUrl + '/itemcategory/showitemcategory')
    .then(response => {
      const data = response.data.data[0] || [];
      return data.map(item => {
        return {
          ...item,
          text: item.categoryName,
          children: [],
          state: false
        };
      });
    })
    .catch(err => {
      return { ...DEFAULT_DATA, message: err };
    });
};

export const getAll = () => {
  return axios
    .get(baseUrl + '/itemcategory/showitemcategory')
    .then(response => response)
    .catch(err => {
      return { ...DEFAULT_DATA, message: err };
    });
};

export const getTreeCategory = () => {
  return axios
    .get(baseUrl + '/itemcategory/showitemcategory')
    .then(response => {
      const data = response.data[0] || [];
      let map = {};
      let node;
      let roots = [];

      data.forEach((item, idx) => {
        map[data[idx].id] = idx;
        data[idx].children = [];
      });

      data.forEach((item_1, idx_1) => {
        node = data[idx_1];
        if (node.parentId !== 0) {
          data[map[node.parentId]].children.push(node);
        } else {
          roots.push(node);
        }
      });

      return roots;
    })
    .catch(err => {
      return { ...DEFAULT_DATA, message: err };
    });
};

export const getIndicatorByCategory = categoryId => {
  return axios
    .get(baseUrl + '/itemcategory/showdetailitemcategory/' + categoryId)
    .then(response => response.data)
    .catch(err => {
      return { ...DEFAULT_DATA, message: err };
    });
};

export const getOne = id => {
  return axios
    .get(baseUrl + '/itemcategory/showitemcategory/' + id)
    .then(response => response.data)
    .catch(err => {
      return { ...DEFAULT_DATA, message: err };
    });
};

export const updateIndicatorTree = content => {
  return axios
    .post(baseUrl + '/itemcategory/updatetree', { ...content })
    .then(response => response.data)
    .catch(err => {
      return { ...DEFAULT_DATA, error: err };
    });
};
