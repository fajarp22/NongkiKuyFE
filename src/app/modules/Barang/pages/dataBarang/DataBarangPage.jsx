// 👉🏻 https://linktr.ee/rifqiahmad.f

import React from 'react';
import { Route } from 'react-router';
import { DataBarangLoadingDialog } from './data-barang-loading-dialog/DataBarangLoadingDialog';
import { DataBarangDeleteDialog } from './dataBarang-delete-dialog/DataBarangDeleteDialog';
import { DataBarangEditDialog } from './data-barang-edit-dialog/DataBarangEditDialog';
import { DataBarangShowDialog } from './dataBarang-show-dialog/DataBarangShowDialog';
import { DataBarangUIProvider } from './DataBarangUIContext';
import { DataBarangCard } from './DataBarangCard';

export function dataBarangPage({ history }) {
  const dataBarangUIEvents = {
    newDataBarangButtonClick: () => {
      history.push('/barang/data-barang/new');
    },
    openEditDataBarangDialog: id => {
      history.push(`/barang/data-barang/${id}/edit`);
    },
    openShowDataBarangDialog: id => {
      history.push(`/barang/data-barang/${id}/show`);
    },
    openDeleteDataBarangDialog: id => {
      history.push(`/barang/data-barang/${id}/delete`);
    }
  };

  return (
    <DataBarangUIProvider dataBarangUIEvents={dataBarangUIEvents}>
      <DataBarangLoadingDialog />
      <Route path="/barang/data-barang/new">
        {({ history, match }) => (
          <DataBarangEditDialog
            show={match != null}
            onHide={() => {
              history.push('/barang/data-barang');
            }}
          />
        )}
      </Route>
      <Route path="/barang/data-barang/:id/show">
        {({ history, match }) => (
          <DataBarangShowDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/barang/data-barang');
            }}
          />
        )}
      </Route>
      <Route path="/barang/data-barang/:id/edit">
        {({ history, match }) => (
          <DataBarangEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/barang/data-barang');
            }}
          />
        )}
      </Route>
      <Route path="/barang/data-barang/:id/delete">
        {({ history, match }) => (
          <DataBarangDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/barang/data-barang');
            }}
          />
        )}
      </Route>
      <DataBarangCard />
    </DataBarangUIProvider>
  );
}
