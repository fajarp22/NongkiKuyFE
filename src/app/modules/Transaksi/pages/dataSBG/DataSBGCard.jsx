//  

import React, { useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from '../../../../../_metronic/_partials/controls';
import { DataSBGFilter } from './data-sbg-filter/dataSBGFilter';
import { DataSBGTable } from './data-sbg-table/DataSBGTable';
import { useDataSBGUIContext } from './dataSBGUIContext';

export function DataSBGCard() {
  const dataSBGUIContext = useDataSBGUIContext();
  const dataSBGUIProps = useMemo(() => {
    return {
      ids: dataSBGUIContext.ids
    };
  }, [dataSBGUIContext]);
  const { currentState } = useSelector(
    state => ({
      currentState: state.mortgage
    }),
    shallowEqual
  );
  return (
    <Card>
      <CardHeader title="Data Transaksi">
        <CardHeaderToolbar>
          <button type="button" className="btn btn-primary btn-sm mr-3">
            TODO: __
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* TODO: Filter */}
        <DataSBGFilter listLoading={currentState.listLoading} />
        <DataSBGTable />
      </CardBody>
    </Card>
  );
}
