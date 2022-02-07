//  

import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/mortgageActions';

import { DataSBGShowDialogHeader } from './DataSBGShowDialogHeader';
import { DataSBGShowForm } from './DataSBGShowForm';
import { useDataSBGUIContext } from '../dataSBGUIContext';

export function DataSBGShowDialog({ id, show, onHide }) {
  const dataSBGUIContext = useDataSBGUIContext();
  const dataSBGUIProps = useMemo(() => {
    return {
      initDataSBG: dataSBGUIContext.initDataSBG
    };
  }, [dataSBGUIContext.initDataSBG]);

  const dispatch = useDispatch();

  const { actionsLoading, dataSBG } = useSelector(
    state => ({
      actionsLoading: state.mortgage.actionsLoading,
      dataSBG: state.mortgage.mortgageData
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchOneMortgage(id));
  }, [dispatch, id]);

  return (
    <Modal size="xl" show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      <DataSBGShowDialogHeader id={id} />
      <DataSBGShowForm
        actionsLoading={actionsLoading}
        dataSBG={dataSBG || dataSBGUIProps.initDataSBG}
        onHide={onHide}
      />
    </Modal>
  );
}
