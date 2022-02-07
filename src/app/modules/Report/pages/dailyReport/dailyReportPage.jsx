//  

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as reportApi from '../../_api/reportApi';
import {
  thousandSeparator,
  rmThousandSeparator
} from '../../../GlobalFunctions/transactionFunction';
import { Form, Col, Row, Card, Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import { convertLanguage } from '../../../GlobalFunctions/transactionFunction';
import moment from 'moment-timezone';
import 'moment/locale/id';

export default () => {
  // useSelector
  const { user } = useSelector(state => state.auth);

  // useState
  const [listDailyReport, setListDailyReport] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBaseCompleted, setTotalBaseCompleted] = useState(0);
  const [totalBaseRepayment, setTotalBaseRepayment] = useState(0);
  const [totalInterestCompleted, setTotalInterestCompleted] = useState(0);
  const [totalInterestRepayment, setTotalInterestRepayment] = useState(0);
  const [totalInterestExtend, setTotalInterestExtend] = useState(0);
  const [countNewMortgage, setCountNewMortgage] = useState(0);
  const [countCompleted, setCountCompleted] = useState(0);
  const [countRepayment, setCountRepayment] = useState(0);
  const [countExtend, setCountExtend] = useState(0);
  const [initialBalance, setInitialBalance] = useState(0);
  const [topUp, setTopUp] = useState(0);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [startDate, setStartDate] = useState(moment(new Date()).format());
  const [listBranch, setListBranch] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');

  // useEffect
  useEffect(() => {
    reportApi.getListAllBranch().then(res => {
      setListBranch(res?.data);
    });
  }, []);

  useEffect(() => {
    const branchCode = user?.kode_cabang?.kode_cabang;
    setSelectedBranch(branchCode);
  }, [user]);

  useEffect(() => {
    if (selectedBranch === 'PUSAT') {
      reportApi.getDailyIncomeAllBranch(startDate).then(res => {
        setListDailyReport(res);
        setIsLoadingButton(false);
      });
    } else if (selectedBranch !== '') {
      reportApi.getDailyIncome(selectedBranch, startDate).then(res => {
        setListDailyReport(res);
        setIsLoadingButton(false);
      });
    }
    if (selectedBranch !== '') {
      loadDataBalance(selectedBranch, startDate);
    }
  }, [selectedBranch, startDate]);

  useEffect(() => {
    let xtotalExpense = 0;
    let xtotalBaseCompleted = 0;
    let xtotalBaseRepayment = 0;
    let xtotalInterestCompleted = 0;
    let xtotalInterestRepayment = 0;
    let xtotalInterestExtend = 0;
    let xcountNewMortgage = 0;
    let xcountCompleted = 0;
    let xcountRepayment = 0;
    let xcountExtend = 0;
    listDailyReport.forEach(elm => {
      if (elm.paymentStatus === 'Initial Payment') {
        xtotalExpense += elm.paymentLeft;
        xcountNewMortgage += 1;
      } else if (elm.paymentStatus === 'Completed') {
        xtotalBaseCompleted += elm.paymentValue;
        xtotalInterestCompleted += elm.interestValue;
        xcountCompleted += 1;
      } else if (elm.paymentStatus === 'Repayment') {
        xtotalBaseRepayment += elm.paymentValue;
        xtotalInterestRepayment += elm.interestValue;
        xcountRepayment += 1;
      } else if (elm.paymentStatus === 'Extend') {
        xtotalInterestExtend += elm.interestValue;
        xcountExtend += 1;
      }
    });
    setTotalExpense(xtotalExpense);
    setCountNewMortgage(xcountNewMortgage);
    setTotalBaseCompleted(xtotalBaseCompleted);
    setTotalInterestCompleted(xtotalInterestCompleted);
    setCountCompleted(xcountCompleted);
    setTotalBaseRepayment(xtotalBaseRepayment);
    setTotalInterestRepayment(xtotalInterestRepayment);
    setCountRepayment(xcountRepayment);
    setTotalInterestExtend(xtotalInterestExtend);
    setCountExtend(xcountExtend);
  }, [listDailyReport]);

  // Local Functions
  const refreshData = () => {
    setIsLoadingButton(true);
    if (selectedBranch === 'PUSAT') {
      reportApi.getDailyIncomeAllBranch(startDate).then(res => {
        setListDailyReport(res);
        setIsLoadingButton(false);
      });
    } else if (selectedBranch !== '') {
      reportApi.getDailyIncome(selectedBranch, startDate).then(res => {
        setListDailyReport(res);
        setIsLoadingButton(false);
      });
    }
    if (selectedBranch !== '') {
      loadDataBalance(
        selectedBranch,
        moment
          .tz('Asia/Jakarta')
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
          .toISOString()
      );
    }
  };

  const saveDataBalance = () => {
    setIsLoadingButton(true);
    reportApi
      .saveDataBalance(
        selectedBranch,
        initialBalance,
        topUp,
        moment
          .tz('Asia/Jakarta')
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
          .toISOString(),
        user?._id
      )
      .then(() => {
        setIsLoadingButton(false);
      });
  };

  const loadDataBalance = (branch, date) => {
    reportApi.loadDataBalance(branch, date).then(result => {
      const [data] = result.data;
      setInitialBalance(data?.initialBalance || 0);
      setTopUp(data?.topUp || 0);
    });
  };

  const checkInitialPayment = data => {
    if (data.paymentStatus === 'Initial Payment') {
      return data.paymentLeft;
    } else {
      return 0;
    }
  };

  const downloadDailyIncome = () => {
    setIsLoadingButton(true);
    reportApi
      .downloadDailyIncome(
        selectedBranch,
        moment
          .tz(startDate, 'Asia/Jakarta')
          .format('LL')
          .replace(/ /g, '_'),
        startDate
      )
      .then(() => {
        // console.log(typeof response);
        // let blob = new Blob([response], {
        //   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        // });
        // let url = window.URL.createObjectURL(blob);
        // window.open(url);
        setIsLoadingButton(false);
      });
  };

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header className="text-danger">
              HANYA SEBAGAI REFERENSI, MASIH INPUT LH DAN SO MANUAL
              <Button
                disabled={user?.kode_cabang?.kode_cabang !== selectedBranch || isLoadingButton}
                variant="primary"
                className="float-right"
                onClick={() => {
                  saveDataBalance();
                }}>
                {isLoadingButton ? 'Tunggu' : 'Simpan Informasi Saldo'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label column md="1">
                    Cabang
                  </Form.Label>
                  <Col md="3">
                    <Form.Control
                      as="select"
                      disabled={user?.kode_cabang?.kode_cabang !== 'PUSAT'}
                      value={selectedBranch}
                      onChange={e => {
                        setSelectedBranch(e.target.value);
                      }}>
                      {listBranch.map((item, idx) => {
                        return (
                          <option value={item.kode_cabang} key={idx}>
                            {item.kode_cabang}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>
                  <Form.Label column md="1">
                    Saldo Awal
                  </Form.Label>
                  <Col md="3">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Rp</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        disabled={user?.kode_cabang?.kode_cabang !== selectedBranch}
                        style={{ fontFamily: 'monospace' }}
                        type="text"
                        value={thousandSeparator(initialBalance)}
                        onChange={e => {
                          setInitialBalance(rmThousandSeparator(e.target.value));
                        }}
                      />
                    </InputGroup>
                  </Col>
                  <Form.Label column md="1">
                    Saldo Akhir
                  </Form.Label>
                  <Col md="3">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Rp</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        style={{ fontFamily: 'monospace' }}
                        disabled={true}
                        type="text"
                        value={
                          thousandSeparator(
                            (parseInt(initialBalance, 10) || 0) +
                              (parseInt(topUp, 10) || 0) -
                              totalExpense
                          ) || 0
                        }
                      />
                    </InputGroup>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md="1">
                    Tanggal
                  </Form.Label>
                  <Col md="3">
                    <Form.Control
                      type="date"
                      disabled={user?.kode_cabang?.kode_cabang !== 'PUSAT'}
                      value={moment(startDate).format('YYYY-MM-DD')}
                      onChange={e => {
                        const event = new Date(e.target.value);
                        setStartDate(moment(event).format());
                      }}
                    />
                  </Col>
                  <Form.Label column md="1">
                    Top Up
                  </Form.Label>
                  <Col md="3">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text style={{ fontFamily: 'monospace' }}>Rp</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        disabled={user?.kode_cabang?.kode_cabang !== selectedBranch}
                        style={{ fontFamily: 'monospace' }}
                        type="text"
                        value={thousandSeparator(topUp)}
                        onChange={e => {
                          setTopUp(rmThousandSeparator(e.target.value));
                        }}
                      />
                    </InputGroup>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md="6">
          <Card>
            <Card.Body>
              <Table bordered hover size="sm">
                <tbody>
                  <tr>
                    <td style={{ width: '50%' }}>Total Pencairan</td>
                    <td style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {thousandSeparator(totalExpense) || 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Pokok Pelunasan</td>
                    <td style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {thousandSeparator(totalBaseCompleted) || 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Pokok Pelunasan Sebagian</td>
                    <td style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {thousandSeparator(totalBaseRepayment) || 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Jasa Pelunasan</td>
                    <td style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {thousandSeparator(totalInterestCompleted) || 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Jasa Pelunasan Sebagian</td>
                    <td style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {thousandSeparator(totalInterestRepayment) || 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Jasa Perpanjangan</td>
                    <td style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {thousandSeparator(totalInterestExtend) || 0}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md="6">
          <Card>
            <Card.Body>
              <Table bordered hover size="sm">
                <tbody>
                  <tr>
                    <td style={{ width: '50%' }}>Total Pokok</td>
                    <td style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {thousandSeparator(totalBaseCompleted + totalBaseRepayment) || 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Jasa</td>
                    <td style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {thousandSeparator(
                        totalInterestCompleted + totalInterestExtend + totalInterestRepayment
                      ) || 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Pokok + Jasa</td>
                    <td style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {thousandSeparator(
                        totalBaseCompleted +
                          totalBaseRepayment +
                          totalInterestCompleted +
                          totalInterestExtend +
                          totalInterestRepayment
                      ) || 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Transaksi Gadai Baru</td>
                    <td style={{ fontFamily: 'monospace' }}>{countNewMortgage}</td>
                  </tr>
                  <tr>
                    <td>Total Transaksi Perpanjangan</td>
                    <td style={{ fontFamily: 'monospace' }}>{countExtend}</td>
                  </tr>
                  <tr>
                    <td>Total Transaksi Pelunasan</td>
                    <td style={{ fontFamily: 'monospace' }}>{countCompleted}</td>
                  </tr>
                  <tr>
                    <td>Total Transaksi Pelunasan Sebagian</td>
                    <td style={{ fontFamily: 'monospace' }}>{countRepayment}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Button
                className="mx-1"
                variant="primary"
                size="sm"
                disabled={isLoadingButton}
                onClick={!isLoadingButton ? refreshData : null}>
                {isLoadingButton ? 'Tunggu' : 'Refresh Data LH'}
              </Button>
              <Button
                className="mx-1"
                variant="primary"
                size="sm"
                disabled={isLoadingButton}
                onClick={!isLoadingButton ? downloadDailyIncome : null}>
                {isLoadingButton ? 'Tunggu' : 'Download LH'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive bordered hover size="sm">
                <thead>
                  <tr>
                    <td>No.</td>
                    <td>Tanggal</td>
                    <td>No. SBG Lama</td>
                    <td>No. SBG Baru</td>
                    <td>Status Transaksi</td>
                    <td style={{ textAlign: 'right' }}>Pencairan</td>
                    <td style={{ textAlign: 'right' }}>Pembayaran Pokok</td>
                    <td style={{ textAlign: 'right' }}>Pembayaran Jasa</td>
                  </tr>
                </thead>
                <tbody>
                  {listDailyReport.map((data, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td style={{ fontFamily: 'monospace' }}>
                          {moment.tz(data.updatedAt, 'Asia/Jakarta').format('ll (LT)')}
                        </td>
                        <td style={{ fontFamily: 'monospace' }}>{data.mortgageCode}</td>
                        <td style={{ fontFamily: 'monospace' }}>{data?.newMortgageCode || '-'}</td>
                        <td>{convertLanguage(data.paymentStatus)}</td>
                        <td style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                          {thousandSeparator(checkInitialPayment(data)) || 0}
                        </td>
                        <td style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                          {thousandSeparator(data.paymentValue) || 0}
                        </td>
                        <td style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                          {thousandSeparator(data.interestValue) || 0}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
