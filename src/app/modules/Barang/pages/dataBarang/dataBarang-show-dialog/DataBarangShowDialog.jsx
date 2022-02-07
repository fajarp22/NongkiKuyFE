// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/dataBarang/dataBarangActions';

import { DataBarangShowDialogHeader } from './DataBarangShowDialogHeader';
import { DataBarangShowForm } from './DataBarangShowForm';
import { useDataBarangUIContext } from '../DataBarangUIContext';

export function DataBarangShowDialog({ id, show, onHide }) {
  const dataBarangUIContext = useDataBarangUIContext();
  const dataBarangUIProps = useMemo(() => {
    return {
      initDataBarang: dataBarangUIContext.initDataBarang
    };
  }, [dataBarangUIContext]);

  const dispatch = useDispatch();

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

  return (
    <Modal size="lg" show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      <DataBarangShowDialogHeader id={id} />
      <DataBarangShowForm
        actionsLoading={actionsLoading}
        dataBarang={dataBarangForEdit || dataBarangUIProps.initDataBarang}
        onHide={onHide}
      />
    </Modal>
  );
}
