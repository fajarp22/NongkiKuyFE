// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useEffect, useMemo } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { convertLanguage } from '../../../../GlobalFunctions/transactionFunction';
import * as actions from '../../../_redux/mortgageActions';
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses
} from '../../../../../../_metronic/_helpers';
import * as uiHelpers from '../DataSBGUIHelpers';
import * as columnFormatters from './column-formatters';
import moment from 'moment-timezone';
import 'moment/locale/id';

// TODO: import column-formatters
import { Pagination } from '../../../../../../_metronic/_partials/controls';
import { useDataSBGUIContext } from '../dataSBGUIContext';

// Function
const thousandSeparator = str => {
  return `Rp ${str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},-`;
};

export function DataSBGTable() {
  const dataSBGUIContext = useDataSBGUIContext();
  const dataSBGUIProps = useMemo(() => {
    return {
      ids: dataSBGUIContext.ids,
      setIds: dataSBGUIContext.setIds,
      queryParams: dataSBGUIContext.queryParams,
      setQueryParams: dataSBGUIContext.setQueryParams,

      // TODO: add Dialog for button function
      openShowDataSBGDialog: dataSBGUIContext.openShowDataSBGDialog,
      openEditDataSBGDialog: dataSBGUIContext.openEditDataSBGDialog
    };
  }, [dataSBGUIContext]);

  const { currentState } = useSelector(
    state => ({
      currentState: state.mortgage
    }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  const dispatch = useDispatch();

  useEffect(() => {
    dataSBGUIProps.setIds([]);
    dispatch(actions.fetchMortgage(dataSBGUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSBGUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: 'mortgageCode',
      text: 'No. SBG',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'mortgageCustomer.nama_nasabah',
      text: 'Nama Nasabah',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'itemcategory.categoryName',
      text: 'Kategori Barang',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'item.itemName',
      text: 'Nama Barang',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        maxWidth: '250px'
      }
    },
    {
      dataField: 'serviceReceived',
      text: 'Nilai Pencairan',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      align: 'right',
      formatter: (cell, row) => thousandSeparator(cell)
    },
    {
      dataField: 'branch.kode_cabang',
      text: 'Kode Cabang',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'latestPaymentMortgage.updatedAt',
      text: 'Tanggal Pembayaran',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: (cell, row) => moment.tz(cell, 'Asia/Jakarta').format('LL')
    },
    {
      dataField: 'latestPaymentMortgage.paymentStatus',
      text: 'Status Terakhir',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: (cell, row) => {
        return convertLanguage(cell);
      }
    },
    {
      dataField: 'action',
      text: 'Aksi',
      style: {
        minWidth: '100px'
      },
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openShowDataSBGDialog: dataSBGUIProps.openShowDataSBGDialog,
        openEditDataSBGDialog: dataSBGUIProps.openEditDataSBGDialog
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3'
    }
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: dataSBGUIProps.queryParams.pageSize,
    page: dataSBGUIProps.queryParams.pageNumber
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination isLoading={listLoading} paginationProps={paginationProps}>
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={entities || []}
                columns={columns}
                hover
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(dataSBGUIProps.setQueryParams)}
                {...paginationTableProps}>
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
