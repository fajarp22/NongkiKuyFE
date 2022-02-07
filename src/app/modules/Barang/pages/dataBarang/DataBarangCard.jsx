// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useMemo } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from '../../../../../_metronic/_partials/controls';
import { DataBarangFilter } from './dataBarang-filter/DataBarangFilter';
import { DataBarangTable } from './dataBarang-table/DataBarangTable';
import { useDataBarangUIContext } from './DataBarangUIContext';

export function DataBarangCard() {
  const dataBarangUIContext = useDataBarangUIContext();
  const dataBarangUIProps = useMemo(() => {
    return {
      ids: dataBarangUIContext.ids,
      newDataBarangButtonClick: dataBarangUIContext.newDataBarangButtonClick
    };
  }, [dataBarangUIContext]);

  return (
    <Card>
      <CardHeader title="Data Barang">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary btn-sm mr-3"
            onClick={dataBarangUIProps.newDataBarangButtonClick}>
            Tambah Barang
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DataBarangFilter />
        <DataBarangTable />
      </CardBody>
    </Card>
  );
}
