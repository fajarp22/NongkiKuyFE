//  

import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { ModalProgressBar } from '../../../../../../_metronic/_partials/controls';

export function DataSBGShowDialogHeader({ id }) {
  const { dataSBG, actionsLoading } = useSelector(
    state => ({
      dataSBG: state.mortgage.mortgageData,
      actionsLoading: state.mortgage.actionsLoading
    }),
    shallowEqual
  );

  const [title, setTitle] = useState('');
  useEffect(() => {
    setTitle(dataSBG?.mortgageCode);
  }, [dataSBG, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{`Data Transaksi ${title}`}</Modal.Title>
      </Modal.Header>
    </>
  );
}
