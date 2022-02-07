//  

import React, { useEffect, useMemo } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/customers/customersActions';
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses
} from '../../../../../../_metronic/_helpers';
import * as uiHelpers from '../CustomersUIHelpers';
import * as columnFormatters from './column-formatters';
import { Pagination } from '../../../../../../_metronic/_partials/controls';
import { useCustomersUIContext } from '../CustomersUIContext';

export function CustomersTable() {
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      ids: customersUIContext.ids,
      setIds: customersUIContext.setIds,
      queryParams: customersUIContext.queryParams,
      setQueryParams: customersUIContext.setQueryParams,
      openEditCustomerDialog: customersUIContext.openEditCustomerDialog,
      openShowCustomerDialog: customersUIContext.openShowCustomerDialog,
      openDeleteCustomerDialog: customersUIContext.openDeleteCustomerDialog
    };
  }, [customersUIContext]);

  const { user } = useSelector(state => state.auth);
  const { currentState } = useSelector(state => ({ currentState: state.customers }), shallowEqual);
  const { totalCount, entities, listLoading } = currentState;

  const dispatch = useDispatch();

  useEffect(() => {
    customersUIProps.setIds([]);
    dispatch(actions.fetchCustomers(customersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customersUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: 'createdAt',
      text: 'Tanggal dibuat',
      sort: true,
      sortCaret: sortCaret
    },
    // {
    //   dataField: "identitas",
    //   text: "Identitas",
    //   sort: true,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    // },
    {
      dataField: 'identitasKtp',
      text: 'Nomor KTP',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: (cell, row) => {
        return cell ?? '-';
      }
    },
    {
      dataField: 'identitasSim',
      text: 'Nomor SIM',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: (cell, row) => {
        return cell ?? '-';
      }
    },
    {
      dataField: 'identitasNpwp',
      text: 'Nomor NPWP',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: (cell, row) => {
        return cell ?? '-';
      }
    },
    {
      dataField: 'nama_nasabah',
      text: 'Nama Nasabah',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'nomor_hp',
      text: 'No. HP',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: 'action',
      text: 'Aksi',
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        user: user,
        openEditCustomerDialog: customersUIProps.openEditCustomerDialog,
        openShowCustomerDialog: customersUIProps.openShowCustomerDialog,
        openDeleteCustomerDialog: customersUIProps.openDeleteCustomerDialog
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px'
      }
    }
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: customersUIProps.queryParams.pageSize,
    page: customersUIProps.queryParams.pageNumber
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
                keyField="_id"
                data={entities === null ? [] : entities}
                columns={columns}
                hover
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(customersUIProps.setQueryParams)}
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
