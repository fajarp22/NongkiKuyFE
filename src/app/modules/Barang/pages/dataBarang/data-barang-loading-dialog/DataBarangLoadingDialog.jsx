//  

import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { LoadingDialog } from '../../../../../../_metronic/_partials/controls';

export function DataBarangLoadingDialog() {
  const { isLoading } = useSelector(
    state => ({ isLoading: state.dataBarang.listLoading }),
    shallowEqual
  );
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Harap tunggu..." />;
}
