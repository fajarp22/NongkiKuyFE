//  

import axios from 'axios';
import download from 'downloadjs';

let baseUrl = process.env.REACT_APP_API_URL;
if (process.env.REACT_APP_MODE) {
  baseUrl = process.env.REACT_APP_ONLINE_API_URL;
}

export const getDailyIncome = async (branchCode, startDate) => {
  const response = await axios.get(
    `${baseUrl}/transactionreport/dailyincome/${branchCode}/${startDate}`
  );
  return response.data;
};

export const getDailyIncomeAllBranch = async startDate => {
  const response = await axios.get(
    `${baseUrl}/transactionreport/dailyincomeallbranch/${startDate}`
  );
  return response.data;
};

export const getListAllBranch = async () => {
  const response = await axios.get(baseUrl + '/cabangkantor/listallbranch');
  return response.data;
};

export const saveDataBalance = async (branch, initialBalance, topUp, date, createdBy) => {
  const response = await axios.post(baseUrl + '/branchbalance/createbranchbalance', {
    branch,
    initialBalance,
    topUp,
    date,
    createdBy
  });
  return response.data;
};

export const loadDataBalance = async (branch, date) => {
  const response = await axios.get(baseUrl + '/branchbalance/findbranchbalance', {
    params: { branch, date }
  });
  return response.data;
};

export const downloadDailyIncome = async (branch, downloadDate, date) => {
  axios
    .get(baseUrl + '/transactionreport/downloaddailyincome', {
      responseType: 'blob',
      params: { branch, date }
    })
    .then(response => {
      // console.log(response);
      // let blob = new Blob([response.data], {
      //   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      // });
      // let url = window.URL.createObjectURL(blob);
      // window.open(url);
      download(
        response.data,
        `LH_${branch}_${downloadDate}.xlsx`,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
    });
  // return download(response.data, `TEST.xlsx`);
};

export const recapdailyreport = async startDate => {
  const response = await axios.get(baseUrl + '/transactionreport/recapdailyincome', {
    params: { startDate }
  });
  return response.data;
};
