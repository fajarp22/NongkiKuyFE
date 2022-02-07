// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ModalProgressBar } from '../../../../../../_metronic/_partials/controls';
import * as actions from '../../../_redux/dataBarang/dataBarangActions';
import { useDataBarangUIContext } from '../DataBarangUIContext';

export function DataBarangDeleteDialog({ id, show, onHide }) {
  const dataBarangUIContext = useDataBarangUIContext();
  const dataBarangUIProps = useMemo(() => {
    return {
      setIds: dataBarangUIContext.setIds,
      queryParams: dataBarangUIContext.queryParams
    };
  }, [dataBarangUIContext]);

  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    state => ({ isLoading: state.dataBarang.actionsLoading }),
    shallowEqual
  );

  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {}, [isLoading, dispatch]);

  const deleteDataBarang = () => {
    dispatch(actions.deleteDataBarang(id)).then(() => {
      dispatch(actions.fetchDataBarang(dataBarangUIProps.queryParams));
      dataBarangUIProps.setIds([]);
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      {isLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Hapus Data Barang</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>Apa anda yakin menghapus data barang ini?</span>}
        {isLoading && <span>Data barang sedang dihapus...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button type="button" onClick={onHide} className="btn btn-light btn-elevate">
            Cancel
          </button>
          <> </>
          <button type="button" onClick={deleteDataBarang} className="btn btn-danger btn-elevate">
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
