// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useEffect, useMemo } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/dataBarang/dataBarangActions';
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses
} from '../../../../../../_metronic/_helpers';
import * as uiHelpers from '../DataBarangUIHelpers';
import * as columnFormatters from './column-formatters';
import { Pagination } from '../../../../../../_metronic/_partials/controls';
import { useDataBarangUIContext } from '../DataBarangUIContext';

export function DataBarangTable() {
  const dataBarangUIContext = useDataBarangUIContext();
  const dataBarangUIProps = useMemo(() => {
    return {
      ids: dataBarangUIContext.ids,
      setIds: dataBarangUIContext.setIds,
      queryParams: dataBarangUIContext.queryParams,
      setQueryParams: dataBarangUIContext.setQueryParams,
      openEditDataBarangDialog: dataBarangUIContext.openEditDataBarangDialog,
      openShowDataBarangDialog: dataBarangUIContext.openShowDataBarangDialog,
      openDeleteDataBarangDialog: dataBarangUIContext.openDeleteDataBarangDialog
    };
  }, [dataBarangUIContext]);

  const { currentState } = useSelector(state => ({ currentState: state.dataBarang }), shallowEqual);
  const { totalCount, entities, listLoading } = currentState;
  const dispatch = useDispatch();

  useEffect(() => {
    dataBarangUIProps.setIds([]);
    dispatch(actions.fetchDataBarang(dataBarangUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataBarangUIProps.queryParams, dispatch]);

  const thousandSeparator = str => {
    return `Rp ${str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},-`;
  };

  const columns = [
    {
      dataField: 'itemCode',
      text: 'Kode Barang',
      sort: true,
      sortCaret: sortCaret,
      style: {
        Width: '145px'
      }
    },
    {
      dataField: 'itemName',
      text: 'Nama Barang',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: '275px',
        maxWidth: '300px'
      }
    },
    {
      dataField: 'itemcategory.categoryName',
      text: 'Kategori Barang',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        maxWidth: '150px'
        // maxWidth: "275px",
      }
    },
    {
      dataField: 'itemPrice',
      text: 'Nilai Taksiran',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      align: 'right',
      formatter: (cell, row) => thousandSeparator(cell),
      style: {
        maxWidth: '100px'
      }
    },
    {
      dataField: 'action',
      text: 'Aksi',
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditDataBarangDialog: dataBarangUIProps.openEditDataBarangDialog,
        openShowDataBarangDialog: dataBarangUIProps.openShowDataBarangDialog,
        openDeleteDataBarangDialog: dataBarangUIProps.openDeleteDataBarangDialog
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        maxWidth: '140px'
      },
      csvExport: false
    }
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: dataBarangUIProps.queryParams.pageSize,
    page: dataBarangUIProps.queryParams.pageNumber
  };

  const { ExportCSVButton } = CSVExport;

  return (
    <>
      <PaginationProvider
        pagination={paginationFactory(paginationOptions)}
        keyField="id"
        data={entities === null ? [] : entities}
        columns={columns}>
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider
            keyField="id"
            data={entities === null ? [] : entities}
            columns={columns}
            exportCSV={{
              fileName: 'Data Barang.xlsx'
            }}>
            {toolkitprops => (
              <div>
                <ExportCSVButton className="btn btn-primary btn-sm mb-3" {...toolkitprops.csvProps}>
                  Download .xlsx
                </ExportCSVButton>
                <Pagination isLoading={listLoading} paginationProps={paginationProps}>
                  <BootstrapTable
                    wrapperClasses="table-responsive"
                    bordered={false}
                    classes="table table-head-custom table-vertical-center overflow-hidden"
                    bootstrap4
                    remote
                    keyField="id"
                    data={entities === null ? [] : entities}
                    columns={columns}
                    hover
                    defaultSorted={uiHelpers.defaultSorted}
                    onTableChange={getHandlerTableChange(dataBarangUIProps.setQueryParams)}
                    {...toolkitprops.baseProps}
                    {...paginationTableProps}>
                    <PleaseWaitMessage entities={entities} />
                    <NoRecordsFoundMessage entities={entities} />
                  </BootstrapTable>
                </Pagination>
              </div>
            )}
          </ToolkitProvider>
        )}
      </PaginationProvider>
    </>
  );
}
