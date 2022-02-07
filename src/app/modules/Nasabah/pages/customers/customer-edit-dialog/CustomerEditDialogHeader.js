// contact me @ https://linktr.ee/rifqiahmad.f

import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { ModalProgressBar } from '../../../../../../_metronic/_partials/controls';

export function CustomerEditDialogHeader({ id }) {
  const { customerForEdit, actionsLoading } = useSelector(
    state => ({
      customerForEdit: state.customers.customerForEdit,
      actionsLoading: state.customers.actionsLoading
    }),
    shallowEqual
  );

  const [title, setTitle] = useState('');
  useEffect(() => {
    let _title = id ? '' : 'Nasabah Baru';
    if (customerForEdit && id) {
      _title = `Edit nasabah ${customerForEdit.nama_nasabah}`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [customerForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
