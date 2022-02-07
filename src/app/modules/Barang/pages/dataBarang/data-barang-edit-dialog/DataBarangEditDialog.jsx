//👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/dataBarang/dataBarangActions';

import { DataBarangEditDialogHeader } from './DataBarangEditDialogHeader';
import { DataBarangEditForm } from './DataBarangEditForm';
import { useDataBarangUIContext } from '../DataBarangUIContext';

export function DataBarangEditDialog({ id, show, onHide }) {
  const dataBarangUIContext = useDataBarangUIContext();
  const dataBarangUIProps = useMemo(() => {
    return {
      initDataBarang: dataBarangUIContext.initDataBarang,
      queryParams: dataBarangUIContext.queryParams
    };
  }, [dataBarangUIContext]);

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  const { actionsLoading, dataBarangForEdit } = useSelector(
    state => ({
      actionsLoading: state.dataBarang.actionsLoading,
      dataBarangForEdit: state.dataBarang.dataBarangForEdit
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchIdDataBarang(id));
  }, [id, dispatch]);

  const saveDataBarang = dataBarang => {
    if (!id) {
      dispatch(actions.createDataBarang(dataBarang)).then(() => {
        dispatch(actions.fetchDataBarang(dataBarangUIProps.queryParams)).then(() => {
          onHide();
        });
      });
    } else {
      dispatch(actions.updateDataBarang(dataBarang)).then(() => {
        dispatch(actions.fetchDataBarang(dataBarangUIProps.queryParams)).then(() => {
          onHide();
        });
      });
    }
  };

  return (
    <Modal size="lg" show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      <DataBarangEditDialogHeader id={id} />
      <DataBarangEditForm
        user={user}
        saveDataBarang={saveDataBarang}
        actionsLoading={actionsLoading}
        dataBarang={dataBarangForEdit || dataBarangUIProps.initDataBarang}
        onHide={onHide}
      />
    </Modal>
  );
}
