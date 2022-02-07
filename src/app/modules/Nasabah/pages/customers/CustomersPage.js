//  

import React from 'react';
import { Route } from 'react-router-dom';
import { CustomersLoadingDialog } from './customers-loading-dialog/CustomersLoadingDialog';
import { CustomerEditDialog } from './customer-edit-dialog/CustomerEditDialog';
import { CustomerShowDialog } from './customer-show-dialog/CustomerShowDialog';
import { CustomerDeleteDialog } from './customer-delete-dialog/CustomerDeleteDialog';
import { CustomersDeleteDialog } from './customers-delete-dialog/CustomersDeleteDialog';
import { CustomersFetchDialog } from './customers-fetch-dialog/CustomersFetchDialog';
import { CustomersUpdateStateDialog } from './customers-update-status-dialog/CustomersUpdateStateDialog';
import { CustomersUIProvider } from './CustomersUIContext';
import { CustomersCard } from './CustomersCard';

export function CustomersPage({ history }) {
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      history.push('/nasabah/new');
    },
    openEditCustomerDialog: id => {
      history.push(`/nasabah/${id}/edit`);
    },
    openShowCustomerDialog: id => {
      history.push(`/nasabah/${id}/show`);
    },
    openDeleteCustomerDialog: id => {
      history.push(`/nasabah/${id}/delete`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/nasabah/deleteNasabah`);
    },
    openFetchCustomersDialog: () => {
      history.push(`/nasabah/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push('/nasabah/updateStatus');
    }
  };

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      <CustomersLoadingDialog />
      <Route path="/nasabah/new">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            onHide={() => {
              history.push('/nasabah');
            }}
          />
        )}
      </Route>
      <Route path="/nasabah/:id/edit">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/nasabah');
            }}
          />
        )}
      </Route>
      <Route path="/nasabah/:id/show">
        {({ history, match }) => (
          <CustomerShowDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/nasabah');
            }}
          />
        )}
      </Route>
      <Route path="/nasabah/deleteNasabah">
        {({ history, match }) => (
          <CustomersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push('/nasabah');
            }}
          />
        )}
      </Route>
      <Route path="/nasabah/:id/delete">
        {({ history, match }) => (
          <CustomerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/nasabah');
            }}
          />
        )}
      </Route>
      <Route path="/nasabah/fetch">
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push('/nasabah');
            }}
          />
        )}
      </Route>
      <Route path="/nasabah/updateStatus">
        {({ history, match }) => (
          <CustomersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push('/nasabah');
            }}
          />
        )}
      </Route>
      <CustomersCard />
    </CustomersUIProvider>
  );
}
