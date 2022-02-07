//  

import React from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment-timezone';
import 'moment/locale/id';

export function DataBarangShowForm({ dataBarang, onHide }) {
  const kategori = dataBarang.itemcategory
    ? dataBarang.itemcategory.categoryName
    : 'Harap tunggu...';

  const thousandSeparator = str => {
    if (typeof str !== 'undefined') {
      return `Rp ${str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},-`;
    }
    return str;
  };

  return (
    <>
      <Modal.Body className="overlay overlay-block cursor-default">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th scope="row">Kode Barang</th>
              <td>{dataBarang.itemCode}</td>
            </tr>
            <tr>
              <th scope="row">Nama Barang</th>
              <td>{dataBarang.itemName}</td>
            </tr>
            <tr>
              <th scope="row">Nilai Taksiran</th>
              <td>{thousandSeparator(dataBarang.itemPrice)}</td>
            </tr>
            <tr>
              <th scope="row">Kategori</th>
              <td>{kategori}</td>
            </tr>
            <tr>
              <td colSpan="2"></td>
            </tr>
            <tr>
              <th scope="row">Tanggal Dibuat</th>
              <td>{moment.tz(dataBarang.createdAt, 'Asia/Jakarta').format('lll')}</td>
            </tr>
            <tr>
              <th scope="row">Tanggal Diubah</th>
              <td>
                {moment
                  .tz(
                    dataBarang.modifiedAt ? dataBarang.modifiedAt : dataBarang.createdAt,
                    'Asia/Jakarta'
                  )
                  .format('lll')}
              </td>
            </tr>
            <tr>
              <th scope="row">Oleh</th>
              <td className="text-primary font-weight-bold">{dataBarang.modifierName}</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={onHide} className="btn btn-light btn-elevate">
          Kembali
        </button>
      </Modal.Footer>
    </>
  );
}
