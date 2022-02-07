//  

import React, { createContext, useContext, useState, useCallback } from 'react';
import { isEqual, isFunction } from 'lodash';
import { initialFilter } from './DataSBGUIHelpers';

const DataSBGUIContext = createContext();

export function useDataSBGUIContext() {
  return useContext(DataSBGUIContext);
}

export const DataSBGUIConsumer = DataSBGUIContext.Consumer;

export function DataSBGUIProvider({ dataSBGUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initDataSBG = {
    mortgageCode: '',
    'mortgageCustomer.nama_nasabah': '',
    'mortgageCustomer.no_hp': '',
    'mortgageCustomer.identitasSim': '',
    'mortgageCustomer.identitasKtp': '',
    'mortgageCustomer.identitasNpwp': '',
    'itemcategory.categoryName': '',
    'item.itemName': '',
    serviceReceived: '',
    'latestPaymentMortgage.createdAt': '',
    'latestPaymentMortgage.paymentStatus': ''
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initDataSBG,

    // TODO: add UIEvents
    openShowDataSBGDialog: dataSBGUIEvents.openShowDataSBGDialog,
    openEditDataSBGDialog: dataSBGUIEvents.openEditDataSBGDialog
  };

  return <DataSBGUIContext.Provider value={value}>{children}</DataSBGUIContext.Provider>;
}
