// 👉🏻 https://linktr.ee/rifqiahmad.f

import axios from 'axios';

let baseUrl = process.env.REACT_APP_API_URL;
if (process.env.REACT_APP_MODE) {
  baseUrl = process.env.REACT_APP_ONLINE_API_URL;
}

export function findCustomersByIdentity(queryParams) {
  return axios.post(baseUrl + '/nasabah/findbyidentity', {
    ...queryParams
  });
}

export const getProvinces = async () => {
  const response = await axios.get(baseUrl + '/province');
  return response.data;
};

export const getRegencies = async provinceId => {
  const response = await axios.post(baseUrl + '/regency', {
    id_province: provinceId
  });
  return response.data;
};

export const getDistricts = async regencyId => {
  const response = await axios.post(baseUrl + '/district', {
    id_regency: regencyId
  });
  return response.data;
};

export const getVillages = async districtId => {
  const response = await axios.post(baseUrl + '/village', {
    id_district: districtId
  });
  return response.data;
};

export const getNameProvince = async id => {
  const response = await axios.post(baseUrl + '/province/getname', { id });
  return response.data;
};

export const getNameRegency = async id => {
  const response = await axios.post(baseUrl + '/regency/getname', { id });
  return response.data;
};
export const getNameDistrict = async id => {
  const response = await axios.post(baseUrl + '/district/getname', { id });
  return response.data;
};
export const getNameVillage = async id => {
  const response = await axios.post(baseUrl + '/village/getname', { id });
  return response.data;
};

const DEFAULT_DATA = {
  data: [],
  message: '',
  status: 'error'
};

export const getTreeView = async () => {
  try {
    const response = await axios.get(baseUrl + '/itemcategory/showitemcategory');
    const data = response.data.data[0] || [];
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

export const getAll = async () => {
  try {
    const response = await axios.get(baseUrl + '/itemcategory/showitemcategory');
    return response;
  } catch (err) {
    return { ...DEFAULT_DATA, message: err };
  }
};

export const getTreeCategory = async () => {
  try {
    const response = await axios.get(baseUrl + '/itemcategory/showitemcategory');
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
  } catch (err) {
    return { ...DEFAULT_DATA, message: err };
  }
};

export const getIndicatorByCategory = async categoryId => {
  try {
    const response = await axios.get(
      baseUrl + '/itemcategory/showdetailitemcategory/' + categoryId
    );
    return response.data;
  } catch (err) {
    return { ...DEFAULT_DATA, message: err };
  }
};

export const getOne = async id => {
  try {
    const response = await axios.get(baseUrl + '/itemcategory/showitemcategory/' + id);
    return response.data;
  } catch (err) {
    return { ...DEFAULT_DATA, message: err };
  }
};

export const updateIndicatorTree = async content => {
  try {
    const response = await axios.post(baseUrl + '/itemcategory/updatetree', {
      ...content
    });
    return response.data;
  } catch (err) {
    return { ...DEFAULT_DATA, error: err };
  }
};

export const getItemByCategory = async id => {
  try {
    const response = await axios.get(baseUrl + '/item/showbycategory/' + id);
    return response.data;
  } catch (err) {
    return { error: err };
  }
};

export const createUser = async content => {
  try {
    const response = await axios.post(baseUrl + '/nasabah/', {
      ...content
    });
    return response.data;
  } catch (err) {
    return { status: 'error' };
  }
};

export const editUser = async (id, content) => {
  try {
    const response = await axios.put(baseUrl + '/nasabah/' + id, {
      ...content
    });
    return { ...response.data, status: 'success' };
  } catch (err) {
    return { status: 'error' };
  }
};

export const findUserId = async id => {
  try {
    const response = await axios.get(baseUrl + '/nasabah/' + id);
    return { ...response.data, status: 'success' };
  } catch (err) {
    return { status: 'error' };
  }
};

// DATA PINJAMAN (STEP 2)
export const createAppraisal = async content => {
  try {
    const response = await axios.post(baseUrl + '/mortgageappraisal/create', {
      ...content
    });
    return response.data;
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};

export const createDocument = async content => {
  const data = new FormData();
  data.append('mortgageCode', content.mortgageCode);
  for (let i = 0; i < content.images.length; i++) {
    data.append('image', content.images[i]);
  }
  try {
    const response = await axios.post(baseUrl + '/mortgagedocument/create', data, {
      header: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};

export const createPayment = async content => {
  try {
    const response = await axios.post(baseUrl + '/mortgagepayment/create', {
      ...content
    });
    return response.data;
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};

export const checkIdentity = async (id, itemCategoryId) => {
  try {
    const response = await axios.get(baseUrl + `/mortgage/checkidentity/${id}/${itemCategoryId}`);
    return response.data;
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};

// RINGKASAN (STEP 3)
export const generateCode = async branchCode => {
  try {
    const response = await axios.get(baseUrl + '/mortgage/generatecode/' + branchCode);
    return response.data;
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};

export const findCustomerById = async id => {
  try {
    const response = await axios.get(baseUrl + '/nasabah/' + id);
    return response.data;
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};

export const createMortgage = async content => {
  try {
    const response = await axios.post(baseUrl + '/mortgage/create', {
      ...content
    });
    return response.data;
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};

export const printMortgage = async mortgageCode => {
  try {
    const response = await axios.get(baseUrl + '/mortgage/printmortgage/' + mortgageCode);
    return response.data;
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};

// dataSBG
export const SBPer = async id => {
  try {
    const response = await axios.get(baseUrl + '/mortgage/printsbper/' + id);
    return response.data;
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};

export const SBPel = async id => {
  try {
    const response = await axios.get(baseUrl + '/mortgage/printsbpel/' + id);
    return response.data;
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};

export const checkExtend = async id => {
  try {
    const response = await axios.get(baseUrl + '/mortgage/checkextend/' + id);
    return response.data;
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};

export const makeMortgageObsolete = async id => {
  try {
    const response = await axios.get(baseUrl + '/mortgage/makemortgageobsolete/' + id);
    return response.data;
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};

export const addLogMortgage = async (id, oldMortgageCode) => {
  try {
    const response = await axios.post(baseUrl + '/mortgage/addlogmortgage', {
      id,
      oldMortgageCode
    });
    return response.data;
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};
