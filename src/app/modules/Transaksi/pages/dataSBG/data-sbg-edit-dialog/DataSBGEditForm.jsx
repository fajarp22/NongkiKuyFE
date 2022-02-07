// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Table, Button } from 'react-bootstrap';
import * as transactionAPI from '../../../api/transactionAPI';
import { DataSBGEditPelunasan } from './DataSBGEditPelunasan';
import { DataSBGEditPerpanjangan } from './DataSBGEditPerpanjangan';
import { DataSBGEditPelunasanPenuh } from './DataSBGEditPelunasanPenuh';
import { convertLanguage } from '../../../../GlobalFunctions/transactionFunction';
import moment from 'moment-timezone';
import 'moment/locale/id';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function DataSBGEditForm({ dataSBG, onHide }) {
  // Redux
  const { user } = useSelector(state => state.auth);

  // Hooks
  const [showPelunasan, setShowPelunasan] = useState(false);
  const [showPerpanjangan, setShowPerpanjangan] = useState(false);
  const [showPelunasanPenuh, setShowPelunasanPenuh] = useState(false);
  const [maxExtend, setMaxExtend] = useState(false);

  // Use Effect
  useEffect(() => {
    checkLimitExtend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSBG]);

  // Functions
  const checkLimitExtend = async () => {
    if (dataSBG.mortgageCode) {
      const response = await transactionAPI.checkExtend(dataSBG.mortgageCode);
      if (response.status === 'error') {
        setMaxExtend(true);
      } else {
        setMaxExtend(false);
      }
    }
  };

  const notify = (status, message) => {
    switch (status) {
      case 'loading':
        return toast.info(message, {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        });
      case 'done':
        return toast.success(message, {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        });
      case 'success':
        return toast.success(message, {
          position: 'bottom-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        });
      case 'error':
        return toast.error(message, {
          position: 'bottom-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'colored'
        });
      default:
        return '';
    }
  };

  const thousandSeparator = str => {
    return `Rp ${(str || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},-`;
  };

  const print = (status, id = 0) => {
    switch (status) {
      case 'Initial Payment':
        transactionAPI.printMortgage(dataSBG.mortgageCode).then(data => {
          const printDoc = document.getElementById('printed_frame').contentWindow;
          printDoc.document.open();
          printDoc.document.write(data);
          printDoc.document.close();
          printDoc.focus();
          setTimeout(() => {
            printDoc.print();
          }, 1000);
        });
        break;
      case 'Extend':
        transactionAPI.SBPer(id).then(data => {
          const printDoc = document.getElementById('printed_frame').contentWindow;
          printDoc.document.open();
          printDoc.document.write(data);
          printDoc.document.close();
          printDoc.focus();
          setTimeout(() => {
            printDoc.print();
          }, 1000);
        });
        break;
      case 'Repayment':
        transactionAPI.SBPel(id).then(data => {
          const printDoc = document.getElementById('printed_frame').contentWindow;
          printDoc.document.open();
          printDoc.document.write(data);
          printDoc.document.close();
          printDoc.focus();
          setTimeout(() => {
            printDoc.print();
          }, 1000);
        });
        break;
      case 'Completed':
        transactionAPI.SBPel(id).then(data => {
          const printDoc = document.getElementById('printed_frame').contentWindow;
          printDoc.document.open();
          printDoc.document.write(data);
          printDoc.document.close();
          printDoc.focus();
          setTimeout(() => {
            printDoc.print();
          }, 1000);
        });
        break;
      default:
        transactionAPI.printMortgage(dataSBG.mortgageCode).then(data => {
          const printDoc = document.getElementById('printed_frame').contentWindow;
          printDoc.document.open();
          printDoc.document.write(data);
          printDoc.document.close();
          printDoc.focus();
          setTimeout(() => {
            printDoc.print();
          }, 1000);
        });
        break;
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <Modal.Body className="overlay overlay-block cursor-default">
        <Table>
          <tbody>
            <tr>
              <td
                colSpan={2}
                align="center"
                style={{
                  backgroundColor: '#f1f1f1',
                  width: '100%'
                }}>
                DATA PEMBAYARAN
              </td>
            </tr>
            <tr>
              <td>Nominal Pinjaman Awal</td>
              <td>{thousandSeparator(dataSBG?.serviceReceived)}</td>
            </tr>
            <tr>
              <td>Sisa Pinjaman Pokok</td>
              <td>{thousandSeparator(dataSBG?.latestPaymentMortgage?.paymentLeft)}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{convertLanguage(dataSBG?.latestPaymentMortgage?.paymentStatus)}</td>
            </tr>
            <tr>
              <td>Tanggal Jatuh Tempo</td>
              <td>
                {moment
                  .tz(dataSBG?.latestPaymentMortgage?.paymentDate, 'Asia/Jakarta')
                  .add(29, 'days')
                  .format('LL')}
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                <Button
                  disabled={
                    dataSBG?.latestPaymentMortgage?.paymentStatus === 'Completed' ||
                    dataSBG?.latestPaymentMortgage?.paymentStatus === 'Repayment' ||
                    dataSBG?.latestPaymentMortgage?.paymentStatus === 'Overdue' ||
                    maxExtend ||
                    user?.kode_cabang?._id !== dataSBG?.branch?._id
                  }
                  variant="primary"
                  className="ml-1 mr-3"
                  onClick={() => {
                    setShowPerpanjangan(true);
                    checkLimitExtend();
                  }}>
                  <span className="font-weight-bold">Perpanjangan</span>
                </Button>
                <Button
                  disabled={
                    dataSBG?.latestPaymentMortgage?.paymentStatus === 'Completed' ||
                    dataSBG?.latestPaymentMortgage?.paymentStatus === 'Repayment' ||
                    dataSBG?.latestPaymentMortgage?.paymentStatus === 'Overdue' ||
                    user?.kode_cabang?._id !== dataSBG?.branch?._id
                  }
                  variant="success"
                  className="ml-1 mr-3"
                  onClick={() => {
                    setShowPelunasan(true);
                    checkLimitExtend();
                  }}>
                  <span className="font-weight-bold">Pelunasan Sebagian (Cicilan)</span>
                </Button>
                <Button
                  disabled={
                    dataSBG?.latestPaymentMortgage?.paymentStatus === 'Completed' ||
                    dataSBG?.latestPaymentMortgage?.paymentStatus === 'Repayment' ||
                    dataSBG?.latestPaymentMortgage?.paymentStatus === 'Overdue' ||
                    user?.kode_cabang?._id !== dataSBG?.branch?._id
                  }
                  variant="warning"
                  className="ml-1 mr-3"
                  onClick={() => {
                    setShowPelunasanPenuh(true);
                    checkLimitExtend();
                  }}>
                  <span className="font-weight-bold">Pelunasan Penuh</span>
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <Table>
          <tbody>
            <tr>
              <td
                colSpan={5}
                align="center"
                style={{
                  backgroundColor: '#f1f1f1',
                  width: '100%'
                }}>
                TIMELINE PEMBAYARAN
              </td>
            </tr>
            <tr
              style={{
                backgroundColor: '#f1f1f1'
              }}>
              <td align="center">TANGGAL</td>
              <td align="center">STATUS</td>
              <td align="center">PEMBAYARAN JASA</td>
              <td align="center">PEMBAYARAN POKOK</td>
              <td align="center">PRINT SURAT BUKTI</td>
            </tr>
            {(dataSBG?.listPayment || []).map((data, idx) => {
              return (
                <tr key={idx}>
                  <td>{moment.tz(data.createdAt, 'Asia/Jakarta').format('LLL')}</td>
                  <td>{convertLanguage(data.paymentStatus)}</td>
                  <td>{thousandSeparator(data.interestValue)}</td>
                  <td>{thousandSeparator(data.paymentValue)}</td>
                  <td
                    style={{
                      textAlign: 'center'
                    }}>
                    <Button
                      disabled={data.paymentStatus === 'Overdue'}
                      onClick={() => {
                        if (data.paymentStatus !== 'Overdue') {
                          print(data.paymentStatus, data._id);
                        } else {
                          return '';
                        }
                      }}>
                      Print
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
      <DataSBGEditPelunasan
        show={showPelunasan}
        onHide={() => {
          setShowPelunasan(false);
        }}
        dataSBG={dataSBG}
        user={user}
        notify={(status, message) => notify(status, message)}
      />
      <DataSBGEditPelunasanPenuh
        show={showPelunasanPenuh}
        onHide={() => {
          setShowPelunasanPenuh(false);
        }}
        dataSBG={dataSBG}
        user={user}
        notify={(status, message) => notify(status, message)}
      />
      <DataSBGEditPerpanjangan
        show={showPerpanjangan}
        onHide={() => {
          setShowPerpanjangan(false);
        }}
        dataSBG={dataSBG}
        user={user}
        notify={(status, message) => {
          notify(status, message);
        }}
      />
      <iframe
        id="printed_frame"
        style={{
          display: 'none'
        }}
        title={`Cetak SBG`}
      />
    </>
  );
}
