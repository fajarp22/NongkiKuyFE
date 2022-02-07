/* eslint-disable jsx-a11y/anchor-is-valid */
//  

import React from 'react';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../../../../../../_metronic/_helpers';

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  // TODO: add another actions (if needed)
  { openShowDataSBGDialog, openEditDataSBGDialog }
) {
  return (
    <>
      <a
        title="Lihat Data Transaksi"
        className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
        onClick={() => openShowDataSBGDialog(row.id)}>
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={toAbsoluteUrl('/media/svg/icons/General/Visible.svg')}
            title="Lihat Data Transaksi"
          />
        </span>
      </a>
      <a
        title="Lihat Data Pembayaran"
        className="btn btn-icon btn-light btn-hover-success btn-sm mr-3"
        onClick={() => openEditDataSBGDialog(row.id)}>
        <span className="svg-icon svg-icon-md svg-icon-success">
          <SVG
            src={toAbsoluteUrl('/media/svg/icons/Shopping/Money.svg')}
            title="Lihat Data Pembayaran"
          />
        </span>
      </a>
    </>
  );
}
