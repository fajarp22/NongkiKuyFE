import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ModalProgressBar } from '../../../../../../_metronic/_partials/controls';
import * as actions from '../../../_redux/customers/customersActions';
import { useCustomersUIContext } from '../CustomersUIContext';

export function CustomerDeleteDialog({ id, show, onHide }) {
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      setIds: customersUIContext.setIds,
      queryParams: customersUIContext.queryParams
    };
  }, [customersUIContext]);

  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    state => ({ isLoading: state.customers.actionsLoading }),
    shallowEqual
  );

  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCustomer = () => {
    dispatch(actions.deleteCustomer(id)).then(() => {
      dispatch(actions.fetchCustomers(customersUIProps.queryParams));
      customersUIProps.setIds([]);
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      {isLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Customer Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>Are you sure to permanently delete this customer?</span>}
        {isLoading && <span>Customer is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button type="button" onClick={onHide} className="btn btn-light btn-elevate">
            Cancel
          </button>
          <> </>
          <button type="button" onClick={deleteCustomer} className="btn btn-primary btn-elevate">
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
