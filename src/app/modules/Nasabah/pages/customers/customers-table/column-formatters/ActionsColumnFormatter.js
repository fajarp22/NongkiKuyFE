// contact me @ https://linktr.ee/rifqiahmad.f

/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../../../../../../_metronic/_helpers';

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { user, openEditCustomerDialog, openShowCustomerDialog, openDeleteCustomerDialog }
) {
  const access = user?.peran_user?.akses?.find(data => data?.nama_akses === 'NASABAH');
  return (
    <>
      {access.update ? (
        <a
          title="Ubah Nasabah"
          className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
          onClick={() => openEditCustomerDialog(row.id)}>
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')} />
          </span>
        </a>
      ) : (
        ''
      )}
      <> </>
      {access.read ? (
        <a
          title="Lihat Nasabah"
          className="btn btn-icon btn-light btn-hover-success btn-sm mr-3"
          onClick={() => openShowCustomerDialog(row.id)}>
          <span className="svg-icon svg-icon-md svg-icon-success">
            <SVG src={toAbsoluteUrl('/media/svg/icons/General/Visible.svg')} />
          </span>
        </a>
      ) : (
        ''
      )}
      <> </>
      {access.delete ? (
        <a
          title="Hapus Nasabah"
          className="btn btn-icon btn-light btn-hover-danger btn-sm mr-3"
          onClick={() => openDeleteCustomerDialog(row.id)}>
          <span className="svg-icon svg-icon-md svg-icon-danger ">
            <SVG src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} />
          </span>
        </a>
      ) : (
        ''
      )}

      <> </>
    </>
  );
}
