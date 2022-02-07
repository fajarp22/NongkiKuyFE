//  

import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/mortgageActions';

import { useDataSBGUIContext } from '../dataSBGUIContext';
import { DataSBGEditDialogHeader } from './DataSBGEditDialogHeader';
import { DataSBGEditForm } from './DataSBGEditForm';

export function DataSBGEditDialog({ id, show, onHide }) {
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
      <DataSBGEditDialogHeader id={id} />
      <DataSBGEditForm
        actionsLoading={actionsLoading}
        dataSBG={dataSBG || dataSBGUIProps.initDataSBG}
        onHide={onHide}
      />
    </Modal>
  );
}
