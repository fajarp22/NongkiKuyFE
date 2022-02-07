// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter
} from '../../../../../../_metronic/_partials/controls/Card';
import { Button, Row, Col, Table, Image, Modal, ButtonGroup, ToggleButton } from 'react-bootstrap';
import * as transactionAPI from '../../../api/transactionAPI';
import _ from 'lodash';
import moment from 'moment-timezone';
import 'moment/locale/id';
import { LinkContainer } from 'react-router-bootstrap';

const Ringkasan = function(props) {
  const [isMigrated, setIsMigrated] = useState(false);
  const [customer, setCustomer] = useState({});
  const [dataJaminan, setDataJaminan] = useState({});
  const [show, setShow] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [branchCode, setBranchCode] = useState('RGJB XX');
  const [isCalled, setIsCalled] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseComplete = () => setShowComplete(false);
  const handleShowComplete = () => setShowComplete(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted) {
        transactionAPI.findCustomerById(localStorage.getItem('customer_id')).then(response => {
          setCustomer(response);
        });
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    setDataJaminan(props.dataJaminan);
  }, [props.dataJaminan]);

  useEffect(() => {
    setBranchCode(props.user?.kode_cabang?.kode_cabang);
  }, [props.user]);

  const thousandSeparator = str => {
    return str !== undefined ? str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0;
  };

  const radios = [
    { name: 'Ya', value: true },
    { name: 'Tidak', value: false }
  ];

  const handleSubmit = async () => {
    if (!isCalled) {
      setIsCalled(true);
      props.notify('loading', 'SBG sedang disiapkan. Harap tunggu...');
      const code = await transactionAPI.generateCode(branchCode);
      if (code.status === 'success') {
        // props.notify('loading', 'Pemrosesan tahap 1 dari 5 tahap. Harap tunggu...');
        const appraisal = dataJaminan.appraisal;
        const resAprraisal = await transactionAPI.createAppraisal({
          appraisal,
          mortgageCode: code.data
        });
        if (resAprraisal.status === 'success') {
          // props.notify('loading', 'Pemrosesan tahap 2 dari 5 tahap. Harap tunggu...');
          const mortgage = { ...dataJaminan };
          delete mortgage.images;
          delete mortgage.appraisal;
          delete mortgage.imgBlob;
          const mortgageCustomer = localStorage.getItem('customer_id');
          const branch = props.user.kode_cabang?._id;
          const item = props.dataJaminan.itemId;
          const resMortgage = await transactionAPI.createMortgage({
            ...mortgage,
            branch,
            mortgageCode: code.data,
            mortgageCustomer,
            item,
            mortgageOriginCode: code.data
          });
          if (resMortgage.status === 'success') {
            // props.notify('loading', 'Pemrosesan tahap 3 dari 5 tahap. Harap tunggu...');
            const resPayment = await transactionAPI.createPayment({
              id: resMortgage.data._id,
              paymentDate: Date.now(),
              paymentLeft: resMortgage.data.serviceReceived,
              paymentStatus: 'Initial Payment',
              paymentValue: 0,
              interestValue: 0,
              mortgageCode: code.data,
              createdBy: mortgage.createdBy,
              isMigrated
            });
            if (resPayment.status === 'success') {
              let resDocument;
              let i = 0;

              // do looping until all images uploaded or after 3 attemps
              do {
                i += 0;
                // props.notify(
                //   'loading',
                //   `Pemrosesan tahap 4 dari 5 tahap, percobaan ke-${i + 1} . Harap tunggu...`
                // );
                const images = dataJaminan.images;
                resDocument = await transactionAPI.createDocument({
                  images,
                  mortgageCode: code.data
                });
              } while (!resDocument.status === 'success' && i !== 3);

              if (resDocument.status === 'success') {
                // props.notify('loading', 'Pemrosesan tahap 5 dari 5 tahap. Harap tunggu...');
                localStorage.removeItem('customer_id');
                const data = await transactionAPI.printMortgage(resMortgage.data.mortgageCode);
                if (data) {
                  props.notify('done', 'SBG telah siap. Menyiapkan laman print SBG...');
                  const printDoc = document.getElementById('printed_frame').contentWindow;
                  printDoc.document.open();
                  printDoc.document.write(data);
                  printDoc.document.close();
                  printDoc.focus();
                  setTimeout(() => {
                    printDoc.print();
                    handleShowComplete();
                  }, 500);
                }
              } else {
                props.notify(
                  'error',
                  'Terjadi kesalahan pada saat memprint SBG. Silahkan cek pada menu SBG terlebih dahulu, dan refresh browser. kode: 5'
                );
              }
            } else {
              props.notify(
                'error',
                'Terjadi kesalahan pada saat upload foto. Pastikan foto untuk diresize terlebih dahulu, silahkan cek pada menu SBG terlebih dahulu, dan refresh browser kode: 4'
              );
            }
          } else {
            props.notify(
              'error',
              'Terjadi kesalahan pembuatan transaksi. Silahkan cek pada menu SBG terlebih dahulu, dan refresh browser. kode: 3'
            );
          }
        } else {
          props.notify(
            'error',
            'Terjadi kesalahan ketika penginputan data jaminan, silahkan refresh browser. kode: 2'
          );
        }
      } else {
        props.notify(
          'error',
          'Terjadi kesalahan pada pembuatan kode SBG, silahkan refresh browser. kode: 1'
        );
      }
    }
  };

  return (
    <>
      <Card>
        <CardHeader title="Ringkasan" />
        <CardBody>
          <Row>
            <Col md="6">
              <h4 className="text-primary">Nasabah</h4>
              <Table bordered>
                <tbody>
                  <tr>
                    <td>
                      <strong>Nama</strong>
                    </td>
                    <td>{customer.nama_nasabah}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Identitas</strong>
                    </td>
                    <td>
                      {customer.identitasKtp} (KTP) / {customer.identitasSim} (SIM) /{' '}
                      {customer.identitasNpwp} (NPWP)
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Tempat, Tanggal Lahir</strong>
                    </td>
                    <td>
                      {customer.tempat_lahir},{' '}
                      {moment.tz(customer.tanggal_lahir, 'Asia/Jakarta').format('LL')}{' '}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>No. HP Aktif</strong>
                    </td>
                    <td>{customer.nomor_hp}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md="6">
              <h4 className="text-primary">Jaminan</h4>
              <Table bordered>
                <tbody>
                  <tr>
                    <td>
                      <strong>Jenis Barang</strong>
                    </td>
                    <td>{dataJaminan.parentCategory}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Kategori Barang</strong>
                    </td>
                    <td>{dataJaminan.category}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Nama Barang</strong>
                    </td>
                    <td>{dataJaminan.itemName}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Nilai Taksiran</strong>
                    </td>
                    <td>Rp. {thousandSeparator(dataJaminan.serviceOriginValue)}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <h4 className="text-primary">Keterangan</h4>
              <Table bordered>
                <tbody>
                  <tr>
                    <td>
                      <strong>Nilai Jaminan</strong>
                    </td>
                    <td>Rp. {thousandSeparator(dataJaminan.serviceLimit)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Nilai Pencairan</strong>
                    </td>
                    <td>Rp. {thousandSeparator(dataJaminan.serviceReceived)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Biaya Administrasi</strong>
                    </td>
                    <td>{dataJaminan.administrationFee}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Biaya Asuransi</strong>
                    </td>
                    <td>{dataJaminan.insuranceFee}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Jumlah Diterima</strong>
                    </td>
                    <td>Rp. {thousandSeparator(dataJaminan.serviceReceived)}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md="6">
              <h4 className="text-primary">Hasil Pengecekan</h4>
              <Table bordered>
                <tbody>
                  <tr>
                    <td>
                      <strong>
                        Jasa Tarif Sewa Modal ({dataJaminan.servicePercentage}
                        %)
                      </strong>
                    </td>
                    <td>Rp. {thousandSeparator(dataJaminan.serviceInterest)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Tanggal Jatuh Tempo (30 Hari)</strong>
                    </td>
                    <td>
                      {moment.tz(moment().add(29, 'days'), 'Asia/Jakarta').format('LL')}
                      {}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md="6">
              <h4 className="text-primary">Migrasi Dari Sistem Lama?</h4>
              <ButtonGroup toggle>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    size="lg"
                    key={idx}
                    type="radio"
                    variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                    name="radio"
                    value={radio.value}
                    checked={isMigrated === radio.value}
                    onChange={e => {
                      setIsMigrated(JSON.parse(e.currentTarget.value));
                    }}>
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Button
            variant="primary"
            disabled={isPressed}
            className="float-right mx-1"
            onClick={() => {
              handleSubmit();
              setIsPressed(true);
            }}>
            {isPressed ? 'Harap Tunggu' : 'Konfirmasi dan Cetak SBG'}
          </Button>
          <Button
            variant="primary"
            disabled={isPressed}
            className="float-right mx-1"
            onClick={() => {
              handleShow();
            }}>
            Sebelumnya
          </Button>
        </CardFooter>
      </Card>
      {!_.isEmpty(props.dataJaminan.imgBlob) ? (
        <Card>
          <CardHeader title="Preview Gambar" />
          <CardBody>
            <Row>
              {props.dataJaminan.imgBlob.map((data, idx) => {
                return (
                  <Col className="my-2" md="4" key={idx}>
                    <Image src={data} rounded fluid />
                  </Col>
                );
              })}
            </Row>
          </CardBody>
        </Card>
      ) : (
        ''
      )}
      <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Tindakan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Data Jaminan akan ter-reset jika kembali ke urutan sebelumnya. Apakah ingin melanjutkan
          tindakan?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tidak
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              props.prevStep();
            }}>
            Ya
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Complete SBG */}
      <Modal
        show={showComplete}
        onHide={handleCloseComplete}
        centered
        backdrop="static"
        keyboard={false}>
        <Modal.Header>
          <Modal.Title>Data SBG</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Data SBG berhasil dimasukan. Anda akan dialihkan ke halaman dashboard.
        </Modal.Body>
        <Modal.Footer>
          <LinkContainer to="/dashboard">
            <Button
              variant="primary"
              onClick={() => {
                handleCloseComplete();
              }}>
              OK
            </Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
      <iframe
        id="printed_frame"
        style={{
          display: 'none'
        }}
        title={`Cetak SBG`}
      />
    </>
  );
};

export default Ringkasan;
