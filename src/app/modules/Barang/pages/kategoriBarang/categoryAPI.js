//  

import myAPI from './myAPI';

const api = new myAPI();
const DEFAULT_DATA = {
  data: [],
  message: '',
  status: 'ERROR'
};

class categoryAPI {
  getTreeView = async () => {
    const endpoint = `api/itemcategory`;

    try {
      const res = await api.get(endpoint);
      const data = res.data[0] || [];
      return data.map(item => {
        return {
          ...item,
          text: item.categoryName,
          children: [],
          state: false
        };
      });
    } catch (err) {
      return { ...DEFAULT_DATA, message: err };
    }
  };

  getAll = async () => {
    const endpoint = `api/itemcategory`;

    try {
      return api.get(endpoint);
    } catch (err) {
      return { ...DEFAULT_DATA, message: err };
    }
  };

  getTreeCategory = async () => {
    const endpoint = `api/itemcategory`;

    try {
      const result = await api.get(endpoint);
      const data = result.data[0] || [];
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
    } catch (err) {
      return { ...DEFAULT_DATA, message: err };
    }
  };

  updateIndicatorTree = async content => {
    const endpoint = `api/resetindicatortree`;

    try {
      return api.post(endpoint, content);
    } catch (err) {
      return { ...DEFAULT_DATA, error: err };
    }
  };

  getIndicatorByCategory = async categoryId => {
    const endpoint = `api/itemcategorytree/${categoryId}`;

    try {
      return api.get(endpoint);
    } catch (err) {
      return { ...DEFAULT_DATA, message: err };
    }
  };

  getOne = async id => {
    const endpoint = `api/itemcategory/${id}`;

    try {
      return api.get(endpoint);
    } catch (err) {
      return { ...DEFAULT_DATA, message: err };
    }
  };
}

export default categoryAPI;
