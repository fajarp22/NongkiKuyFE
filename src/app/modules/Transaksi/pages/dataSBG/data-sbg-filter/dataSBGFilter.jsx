// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useState, useEffect, useMemo } from 'react';
import { Formik } from 'formik';
import { isEqual, values } from 'lodash';
import { useDataSBGUIContext } from '../dataSBGUIContext';
import { Button } from 'react-bootstrap';

// TODO: import API

const prepareFilter = (queryParams, values) => {
  const { category, searchText = '' } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  filter.category = category ? category : '';
  filter.searchText = searchText ? searchText : '';
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function DataSBGFilter({ listLoading }) {
  const dataSBGUIContext = useDataSBGUIContext();
  const dataSBGUIProps = useMemo(() => {
    return {
      queryParams: dataSBGUIContext.queryParams,
      setQueryParams: dataSBGUIContext.setQueryParams
    };
  }, [dataSBGUIContext]);

  const applyFilter = values => {
    const newQueryParams = prepareFilter(dataSBGUIProps.queryParams, values);
    if (!isEqual(newQueryParams, dataSBGUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      dataSBGUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ searchText: '', category: '' }}
        onSubmit={values => {
          applyFilter(values);
        }}>
        {({ values, handleSubmit, handleBlur, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
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
                  }}
                />
                <small className="form-text text-muted">
                  <b>Cari</b> di semua kolom
                </small>
              </div>
              <div className="col-lg-2">
                <Button
                  disabled={listLoading}
                  variant="primary"
                  onClick={e => {
                    handleSubmit();
                  }}>
                  {listLoading ? 'Tunggu' : 'Cari'}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
