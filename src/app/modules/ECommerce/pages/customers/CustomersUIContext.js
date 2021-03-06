import React, { createContext, useContext, useState, useCallback } from 'react';
import { isEqual, isFunction } from 'lodash';
import { initialFilter } from './CustomersUIHelpers';

const CustomersUIContext = createContext();

export function useCustomersUIContext() {
  return useContext(CustomersUIContext);
}

export const CustomersUIConsumer = CustomersUIContext.Consumer;

export function CustomersUIProvider({ customersUIEvents, children }) {
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

  const initCustomer = {
    id: undefined,
    nama_nasabah: '',
    tipe_identitas: '',
    nomor_identitas: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    nomor_telepon_rumah: '',
    nomor_hp: '',
    nama_ibu_kandung: '',
    nama_darurat: '',
    nomor_hp_darurat: '',
    status_hubungan: '',
    alamat_ktp: '',
    provinsi_ktp: '',
    kota_ktp: '',
    kecamatan_ktp: '',
    kelurahan_ktp: '',
    alamat_sekarang: 'X',
    provinsi_sekarang: 'X',
    kota_sekarang: 'X',
    kecamatan_sekarang: 'X',
    kelurahan_sekarang: 'X'
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initCustomer,
    newCustomerButtonClick: customersUIEvents.newCustomerButtonClick,
    openEditCustomerDialog: customersUIEvents.openEditCustomerDialog,
    openShowCustomerDialog: customersUIEvents.openShowCustomerDialog,
    openDeleteCustomerDialog: customersUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: customersUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: customersUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog: customersUIEvents.openUpdateCustomersStatusDialog
  };

  return <CustomersUIContext.Provider value={value}>{children}</CustomersUIContext.Provider>;
}
