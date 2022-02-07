// contact me 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/customers/customersActions';
import { CustomerEditDialogHeader } from './CustomerEditDialogHeader';
import { CustomerEditForm } from './CustomerEditForm';
import { useCustomersUIContext } from '../CustomersUIContext';

export function CustomerEditDialog({ id, show, onHide }) {
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      initCustomer: customersUIContext.initCustomer,
      queryParams: customersUIContext.queryParams
    };
  }, [customersUIContext]);

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

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

  const saveCustomer = customer => {
    if (!id) {
      dispatch(actions.createCustomer(customer)).then(() => {
        dispatch(actions.fetchCustomers(customersUIProps.queryParams)).then(() => {
          onHide();
        });
      });
    } else {
      dispatch(actions.updateCustomer(customer)).then(() => {
        dispatch(actions.fetchCustomers(customersUIProps.queryParams)).then(() => {
          onHide();
        });
      });
    }
  };

  return (
    <Modal size="lg" show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      <CustomerEditDialogHeader id={id} />
      <CustomerEditForm
        user={user}
        saveCustomer={saveCustomer}
        actionsLoading={actionsLoading}
        customer={customerForEdit || customersUIProps.initCustomer}
        onHide={onHide}
      />
    </Modal>
  );
}
