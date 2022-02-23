//

import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment-timezone';
import 'moment/locale/id';
import * as location from '../../../../../_redux/locations/locationsCrud';

export function CustomerShowForm({ customer, onHide }) {
  const nama_user = customer.modifiedBy ? customer.modifiedBy.nama_user : 'Harap Tunggu...';
  const [selectedProvinceKTP, setSelectedProvinceKTP] = useState({});
  const [selectedRegencyKTP, setSelectedRegencyKTP] = useState({});
  const [selectedDistrictKTP, setSelectedDistrictKTP] = useState({});
  const [selectedVillageKTP, setSelectedVillageKTP] = useState({});

  const [selectedProvinceSekarang, setSelectedProvinceSekarang] = useState({});
  const [selectedRegencySekarang, setSelectedRegencySekarang] = useState({});
  const [selectedDistrictSekarang, setSelectedDistrictSekarang] = useState({});
  const [selectedVillageSekarang, setSelectedVillageSekarang] = useState({});

  const normalisasiNomorHP = (phone = '') => {
    phone = String(phone).trim();
    phone = phone.replace(/[- .]/g, '');
    if (phone.startsWith('0')) {
      phone = '+62' + phone.slice(1);
    } else if (phone.startsWith('62')) {
      phone = '+62' + phone.slice(2);
    }
    return phone;
  };

  useEffect(() => {
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted && customer._id) {
        location.getNameProvince(customer.provinsi_ktp).then(res => {
          setSelectedProvinceKTP(res);
        });
        location.getNameProvince(customer.provinsi_sekarang).then(res => {
          setSelectedProvinceSekarang(res);
        });
        location.getNameRegency(customer.kota_ktp).then(res => {
          setSelectedRegencyKTP(res);
        });
        location.getNameRegency(customer.kota_sekarang).then(res => {
          setSelectedRegencySekarang(res);
        });
        location.getNameDistrict(customer.kecamatan_ktp).then(res => {
          setSelectedDistrictKTP(res);
        });
        location.getNameDistrict(customer.kecamatan_sekarang).then(res => {
          setSelectedDistrictSekarang(res);
        });
        location.getNameVillage(customer.kelurahan_ktp).then(res => {
          setSelectedVillageKTP(res);
        });
        location.getNameVillage(customer.kelurahan_sekarang).then(res => {
          setSelectedVillageSekarang(res);
        });
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer._id]);

  return (
    <>
      <Modal.Body className="overlay overlay-block cursor-default">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th scope="row">Nama Kedai</th>
              <td>{customer.nama_nasabah}</td>
            </tr>
            <tr>
              <th scope="row">Alamat</th>
              <td>
                PROV. {selectedProvinceKTP.province}, {selectedRegencyKTP.regency}, KEC.{' '}
                {selectedDistrictKTP.district}, KEL. {selectedVillageKTP.village}
              </td>
            </tr>
            <tr>
              <th scope="row">Tahun Berdiri</th>
              <td>
                {/* {customer.tanggal_lahir} */}
                {moment.tz(customer.tanggal_lahir, 'Asia/Jakarta').format('LL')}
              </td>
            </tr>
            {/* <tr>
              <th scope="row">Nomor Telephone Kedai</th>
              <td>{customer.nomor_telepon_rumah}</td>
            </tr> */}
            <tr>
              <th scope="row">Nomor Telephone</th>
              <td>
                {customer.identitasKtp}{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://wa.me/${normalisasiNomorHP(customer.identitasKtp)}`}>
                  Hubungi via Whatsapp
                </a>
              </td>
            </tr>
            <tr>
              <th scope="row">Jam Operasional</th>
              <td>{customer.identitasSim}</td>
            </tr>
            <tr>
              <th scope="row">Website</th>
              <td>{customer.identitasNpwp}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{customer.nomor_hp}</td>
            </tr>
            <tr>
              <th scope="row">Pembayaran</th>
              <td>{customer.nomor_telepon_rumah}</td>
            </tr>
            <tr>
              <th scope="row">Kapasitas Maksimal</th>
              <td>{customer.nama_ibu_kandung}</td>
            </tr>
            <tr>
              <th scope="row">Fasilitas</th>
              <td>{customer.nama_darurat}</td>
            </tr>
            {/* <tr>
              <th scope="row">Nama darurat / Status Hubungan</th>
              <td>
                {customer.nama_darurat} / {customer.status_hubungan}
              </td>
            </tr>
            <tr>
              <th scope="row">Nomor darurat yang dapat dihubungi</th>
              <td>
                {customer.nomor_hp_darurat}{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://wa.me/${normalisasiNomorHP(customer.nomor_hp_darurat)}`}>
                  Hubungi via Whatsapp
                </a>
              </td>
            </tr> */}
            {/* <tr>
              <th scope="row" rowSpan="2">
                Alamat Sesuai KTP
              </th>
              <td>
                PROV. {selectedProvinceKTP.province}, {selectedRegencyKTP.regency}, KEC.{' '}
                {selectedDistrictKTP.district}, KEL. {selectedVillageKTP.village}
              </td>
            </tr>
            <tr>
              <td>{customer.alamat_ktp}</td>
            </tr>
            <tr>
              <th scope="row" rowSpan="2">
                Alamat Domisili
              </th>
              <td>
                PROV. {selectedProvinceSekarang.province}, {selectedRegencySekarang.regency}, KEC.{' '}
                {selectedDistrictSekarang.district}, KEL. {selectedVillageSekarang.village}
              </td>
            </tr>
            <tr>
              <td>{customer.alamat_sekarang}</td>
            </tr>
            <tr>
              <td colSpan="2"></td>
            </tr> */}
            <tr>
              <th scope="row">Tanggal Dibuat</th>
              <td>{moment.tz(customer.createdAt, 'Asia/Jakarta').format('lll')}</td>
            </tr>
            <tr>
              <th scope="row">Tanggal Diubah</th>
              <td>
                {moment
                  .tz(
                    customer.modifiedAt ? customer.modifiedAt : customer.createdAt,
                    'Asia/Jakarta'
                  )
                  .format('lll')}
              </td>
            </tr>
            <tr>
              <th scope="row">Oleh</th>
              <td className="text-primary font-weight-bold">{nama_user}</td>
            </tr>
          </tbody>
        </table>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama Menu</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            {customer?.menu?.map((data, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{data.itemName}</td>
                <td>{data.itemPrice}</td>
              </tr>
            ))}
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
