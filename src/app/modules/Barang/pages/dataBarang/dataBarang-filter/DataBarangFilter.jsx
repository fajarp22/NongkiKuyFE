// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useState, useEffect, useMemo } from 'react';
import { Formik } from 'formik';
import { isEqual } from 'lodash';
import { useDataBarangUIContext } from '../DataBarangUIContext';
import * as itemCategory from '../../../_api/categoryItem';

const prepareFilter = (queryParams, values) => {
  const { category, searchText = '' } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  filter.category = category ? category : '';
  filter.searchText = searchText ? searchText : '';
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function DataBarangFilter({ listLoading }) {
  const dataBarangUIContext = useDataBarangUIContext();
  const dataBarangUIProps = useMemo(() => {
    return {
      queryParams: dataBarangUIContext.queryParams,
      setQueryParams: dataBarangUIContext.setQueryParams
    };
  }, [dataBarangUIContext]);

  const applyFilter = values => {
    const newQueryParams = prepareFilter(dataBarangUIProps.queryParams, values);
    if (!isEqual(newQueryParams, dataBarangUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      dataBarangUIProps.setQueryParams(newQueryParams);
    }
  };

  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted) {
        itemCategory.getChildItemCategory().then(res => setKategori(res));
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          searchText: '',
          category: ''
        }}
        onSubmit={values => {
          applyFilter(values);
        }}>
        {({ values, handleSubmit, handleBlur, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <select
                  className="form-control"
                  name="status"
                  placeholder="Filter berdasarkan Kategori"
                  onChange={e => {
                    setFieldValue('category', e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.status}>
                  <option value="">Semua</option>
                  {kategori.map(item => {
                    return (
                      <option value={item.categoryName} key={item.id}>
                        {item.categoryName}
                      </option>
                    );
                  })}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> berdasarkan Kategori
                </small>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Cari"
                  autoComplete="off"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={e => {
                    setFieldValue('searchText', e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Cari</b> di semua kolom
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
