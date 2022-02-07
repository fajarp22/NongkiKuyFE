//  

import React, { useState } from 'react';
import { Modal, Table, Card, Row, Col, Image, Button, Badge } from 'react-bootstrap';
import { DataSBGChat } from './DataSBGChat';
import moment from 'moment-timezone';
import 'moment/locale/id';

export function DataSBGShowForm({ dataSBG, onHide }) {
  // Hooks
  const [showFollowUp, setShowFollowUp] = useState(false);

  // Functions
  const thousandSeparator = str => {
    return `Rp ${str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},-`;
  };

  const appraisal = (appraisal = []) => {
    return appraisal.map(data => {
      return `${data.indicatorName} (${data.choiceName}), `;
    });
  };

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

  return (
    <>
      <Modal.Body className="overlay overlay-block cursor-default">
        <Table size="sm" borderless>
          <tbody>
            <tr>
              <td>
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => {
                    setShowFollowUp(true);
                  }}>
                  Follow Up Nasabah
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <Table size="sm">
          <tbody>
            <tr>
              <td
                colSpan={2}
                align="center"
                style={{
                  backgroundColor: '#f1f1f1',
                  width: '100%'
                }}>
                DATA TRANSAKSI
              </td>
            </tr>
            <tr>
              <td>Nomor SBG</td>
              <td>{dataSBG?.mortgageCode}</td>
            </tr>
            <tr>
              <td>Dibuat Pada</td>
              <td>{moment.tz(dataSBG?.createdAt, 'Asia/Jakarta').format('LLLL')}</td>
            </tr>
            <tr>
              <td>Update Pada</td>
              <td>
                {moment.tz(dataSBG?.updatedAt || dataSBG?.createdAt, 'Asia/Jakarta').format('LLLL')}
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                align="center"
                style={{
                  backgroundColor: '#f1f1f1',
                  width: '100%'
                }}>
                DATA Kedai
              </td>
            </tr>
            <tr>
              <td>Nama Kedai</td>
              <td>{dataSBG?.mortgageCustomer?.nama_nasabah}</td>
            </tr>
            <tr>
              <td>Identitas Nasabah (KTP/SIM/NPWP)</td>
              <td>{`${dataSBG?.mortgageCustomer?.identitasKtp} / ${dataSBG?.mortgageCustomer?.identitasSim} / ${dataSBG?.mortgageCustomer?.identitasNpwp}`}</td>
            </tr>
            <tr>
              <td>Tanggal Lahir Nasabah</td>
              <td>
                {moment.tz(dataSBG?.mortgageCustomer?.tanggal_lahir, 'Asia/Jakarta').format('LL')}
              </td>
            </tr>
            <tr>
              <td>Alamat Nasabah</td>
              <td>{dataSBG?.mortgageCustomer?.alamat_sekarang}</td>
            </tr>
            <tr>
              <td>Nomor Handphone Nasabah</td>
              <td>
                {dataSBG?.mortgageCustomer?.nomor_hp}{' '}
                <Badge pill variant="primary">
                  <a
                    style={{ color: 'white' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/${normalisasiNomorHP(
                      dataSBG?.mortgageCustomer?.nomor_hp
                    )}`}>
                    Hubungi via Whatsapp
                  </a>
                </Badge>
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                align="center"
                style={{
                  backgroundColor: '#f1f1f1',
                  width: '100%'
                }}>
                DATA BARANG GADAI
              </td>
            </tr>
            <tr>
              <td>Kategori Barang</td>
              <td>{dataSBG?.itemcategory?.categoryName}</td>
            </tr>
            <tr>
              <td>Nama Barang</td>
              <td>{dataSBG?.item?.itemName}</td>
            </tr>
            <tr>
              <td>No. Serial</td>
              <td>{dataSBG?.serialNo}</td>
            </tr>
            <tr>
              <td>Tahun Pembuatan</td>
              <td>{dataSBG?.productionYear}</td>
            </tr>
            <tr>
              <td>Keterangan</td>
              <td>{dataSBG?.description}</td>
            </tr>
            <tr>
              <td>Nilai Pencairan</td>
              <td>{thousandSeparator(dataSBG?.serviceReceived)}</td>
            </tr>
            <tr>
              <td
                style={{
                  width: '40%'
                }}>
                Kondisi
              </td>
              <td>{appraisal(dataSBG?.mortgageappraisals)}</td>
            </tr>
            <tr>
              <td
                colSpan={2}
                align="center"
                style={{
                  backgroundColor: '#f1f1f1',
                  width: '100%'
                }}>
                FOTO BARANG
              </td>
            </tr>
          </tbody>
        </Table>
        <Card>
          <Card.Body>
            <Row>
              {(dataSBG?.mortgagedocuments || []).map((data, idx) => {
                return (
                  <Col md="6" key={idx}>
                    <Image src={data.documentPath} rounded fluid />
                  </Col>
                );
              })}
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={onHide} className="btn btn-light btn-elevate">
          Kembali
        </button>
      </Modal.Footer>
      <DataSBGChat
        dataSBG={dataSBG}
        show={showFollowUp}
        onHide={() => {
          setShowFollowUp(false);
        }}
      />
    </>
  );
}
