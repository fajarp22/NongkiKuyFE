// 👉🏻 https://linktr.ee/rifqiahmad.f

/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../../../../../../_metronic/_helpers';

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openEditDataBarangDialog, openShowDataBarangDialog, openDeleteDataBarangDialog }
) {
  return (
    <>
      <a
        title="Ubah Data Barang"
        className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
        onClick={() => openEditDataBarangDialog(row.id)}>
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')} />
        </span>
      </a>
      <> </>
      <a
        title="Lihat Data Barang"
        className="btn btn-icon btn-light btn-hover-success btn-sm mr-3"
        onClick={() => openShowDataBarangDialog(row.id)}>
        <span className="svg-icon svg-icon-md svg-icon-success">
          <SVG src={toAbsoluteUrl('/media/svg/icons/General/Visible.svg')} />
        </span>
      </a>
      <> </>
      <a
        title="Hapus Data Barang"
        className="btn btn-icon btn-light btn-hover-danger btn-sm mr-3"
        onClick={() => openDeleteDataBarangDialog(row.id)}>
        <span className="svg-icon svg-icon-md svg-icon-danger ">
          <SVG src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} />
        </span>
      </a>
      <> </>
    </>
  );
}
