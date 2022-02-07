//  

import React, { useMemo } from 'react';
import { Formik } from 'formik';
import { isEqual } from 'lodash';
import { useCustomersUIContext } from '../CustomersUIContext';

const prepareFilter = (queryParams, values) => {
  const { searchText = '' } = values;
  const newQueryParams = { ...queryParams };
  let filter = '';
  filter = searchText ? searchText : '';
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function CustomersFilter({ listLoading }) {
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      queryParams: customersUIContext.queryParams,
      setQueryParams: customersUIContext.setQueryParams
    };
  }, [customersUIContext]);

  const applyFilter = values => {
    const newQueryParams = prepareFilter(customersUIProps.queryParams, values);
    if (!isEqual(newQueryParams, customersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      customersUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          searchText: ''
        }}
        onSubmit={values => {
          applyFilter(values);
        }}>
        {({ values, handleSubmit, handleBlur, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row ">
              <div className="col-lg-2 ">
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
