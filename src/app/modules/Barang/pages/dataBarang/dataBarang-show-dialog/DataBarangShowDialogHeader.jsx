//  

import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { ModalProgressBar } from '../../../../../../_metronic/_partials/controls';

export function DataBarangShowDialogHeader({ id }) {
  const { dataBarangForEdit, actionsLoading } = useSelector(
    state => ({
      dataBarangForEdit: state.dataBarang.dataBarangForEdit,
      actionsLoading: state.dataBarang.actionsLoading
    }),
    shallowEqual
  );

  const [title, setTitle] = useState('');
  useEffect(() => {
    let _title = '';
    if (dataBarangForEdit && id) {
      _title = `Informasi Data Barang ${dataBarangForEdit.itemCode}`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [dataBarangForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
