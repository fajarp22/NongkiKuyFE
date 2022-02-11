//

import React, { createContext, useContext, useState, useCallback } from 'react';
import { isEqual, isFunction } from 'lodash';
import { initialFilter } from './DataBarangUIHelpers';

const DataBarangUIContext = createContext();

export function useDataBarangUIContext() {
  return useContext(DataBarangUIContext);
}

export const DataBarangUIConsumer = DataBarangUIContext.Consumer;

export function DataBarangUIProvider({ dataBarangUIEvents, children }) {
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

  const initDataBarang = {
    itemName: '',
    itemPrice: '',
    itemCategoryId: '6',
    deskripsiHidangan: '',
    kategoriHidangan: '',
    urlHidangan: ''
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initDataBarang,
    newDataBarangButtonClick: dataBarangUIEvents.newDataBarangButtonClick,
    openEditDataBarangDialog: dataBarangUIEvents.openEditDataBarangDialog,
    openShowDataBarangDialog: dataBarangUIEvents.openShowDataBarangDialog,
    openDeleteDataBarangDialog: dataBarangUIEvents.openDeleteDataBarangDialog
  };

  return <DataBarangUIContext.Provider value={value}>{children}</DataBarangUIContext.Provider>;
}
