//  

import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/customers/customersActions';
import { CustomerShowDialogHeader } from './CustomerShowDialogHeader';
import { CustomerShowForm } from './CustomerShowForm';
import { useCustomersUIContext } from '../CustomersUIContext';

export function CustomerShowDialog({ id, show, onHide }) {
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      initCustomer: customersUIContext.initCustomer
    };
  }, [customersUIContext]);

  const dispatch = useDispatch();
  const { actionsLoading, customerForEdit } = useSelector(
    state => ({
      actionsLoading: state.customers.actionsLoading,
      customerForEdit: state.customers.customerForEdit
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchCustomer(id));
  }, [id, dispatch]);

  return (
    <Modal size="lg" show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      <CustomerShowDialogHeader id={id} />
      <CustomerShowForm
        actionsLoading={actionsLoading}
        customer={customerForEdit || customersUIProps.initCustomer}
        onHide={onHide}
      />
    </Modal>
  );
}
