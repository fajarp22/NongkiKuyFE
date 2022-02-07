//  

import React from 'react';
import { Route } from 'react-router';
import { DataSBGUIProvider } from './dataSBGUIContext';
import { DataSBGCard } from './DataSBGCard';
import { DataSBGShowDialog } from './data-sbg-show-dialog/DataSBGShowDialog';
import { DataSBGEditDialog } from './data-sbg-edit-dialog/DataSBGEditDialog';

export function DataSBGPage({ history }) {
  const dataSBGUIEvents = {
    openShowDataSBGDialog: id => {
      history.push(`/transaksi/cari-sbg/${id}/show`);
    },
    openEditDataSBGDialog: id => {
      history.push(`/transaksi/cari-sbg/${id}/edit`);
    }
  };
  return (
    <DataSBGUIProvider dataSBGUIEvents={dataSBGUIEvents}>
      {/* TODO: Loading */}
      <Route path="/transaksi/cari-sbg/:id/show">
        {({ history, match }) => (
          <DataSBGShowDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/transaksi/cari-sbg');
            }}
          />
        )}
      </Route>
      <Route path="/transaksi/cari-sbg/:id/edit">
        {({ history, match }) => (
          <DataSBGEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/transaksi/cari-sbg');
            }}
          />
        )}
      </Route>{' '}
      <DataSBGCard />
    </DataSBGUIProvider>
  );
}
