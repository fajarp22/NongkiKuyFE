// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useState, useEffect } from 'react';
import * as reportApi from '../../_api/reportApi';
import { thousandSeparator } from '../../../GlobalFunctions/transactionFunction';
import { Form, Col, Row, Card, Table } from 'react-bootstrap';
import moment from 'moment-timezone';
import 'moment/locale/id';

export default () => {
  const [startDate, setStartDate] = useState(moment(new Date()).format());
  const [listIncomeBranch, setListIncomeBranch] = useState([]);
  const [sumCountNewMortgage, setSumCountNewMortgage] = useState(0);
  const [sumCountExtend, setSumCountExtend] = useState(0);
  const [sumCountRepayment, setSumCountRepayment] = useState(0);
  const [sumCountCompleted, setSumCountCompleted] = useState(0);
  const [sumTotalExpense, setSumTotalExpense] = useState(0);
  const [sumTotalInterestExtend, setSumTotalInterestExtend] = useState(0);
  const [sumTotalBaseCompleted, setSumTotalBaseCompleted] = useState(0);
  const [sumTotalInterestCompleted, setSumTotalInterestCompleted] = useState(0);
  const [sumTotalBaseRepayment, setSumTotalBaseRepayment] = useState(0);
  const [sumTotalInterestRepayment, setSumTotalInterestRepayment] = useState(0);

  useEffect(() => {
    reportApi.recapdailyreport(startDate).then(res => {
      setListIncomeBranch(res);
    });
  }, [startDate]);

  useEffect(() => {
    let xsumCountNewMortgage = 0;
    let xsumCountExtend = 0;
    let xsumCountRepayment = 0;
    let xsumCountCompleted = 0;
    let xsumTotalExpense = 0;
    let xsumTotalInterestExtend = 0;
    let xsumTotalBaseCompleted = 0;
    let xsumTotalInterestCompleted = 0;
    let xsumTotalBaseRepayment = 0;
    let xsumTotalInterestRepayment = 0;
    listIncomeBranch.forEach(elm => {
      xsumCountNewMortgage += elm.countNewMortgage;
      xsumCountExtend += elm.countExtend;
      xsumCountRepayment += elm.countRepayment;
      xsumCountCompleted += elm.countCompleted;
      xsumTotalExpense += elm.totalExpense;
      xsumTotalInterestExtend += elm.totalInterestExtend;
      xsumTotalBaseCompleted += elm.totalBaseCompleted;
      xsumTotalInterestCompleted += elm.totalInterestCompleted;
      xsumTotalBaseRepayment += elm.totalBaseRepayment;
      xsumTotalInterestRepayment += elm.totalInterestRepayment;
    });
    setSumCountNewMortgage(xsumCountNewMortgage);
    setSumCountExtend(xsumCountExtend);
    setSumCountRepayment(xsumCountRepayment);
    setSumCountCompleted(xsumCountCompleted);
    setSumTotalExpense(xsumTotalExpense);
    setSumTotalInterestExtend(xsumTotalInterestExtend);
    setSumTotalBaseCompleted(xsumTotalBaseCompleted);
    setSumTotalInterestCompleted(xsumTotalInterestCompleted);
    setSumTotalBaseRepayment(xsumTotalBaseRepayment);
    setSumTotalInterestRepayment(xsumTotalInterestRepayment);
  }, [listIncomeBranch]);

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header className="text-danger">
              HANYA SEBAGAI REFERENSI, DATA AKTUAL DI GOOGLE SHEET
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label column md="1">
                    Tanggal
                  </Form.Label>
                  <Col md="3">
                    <Form.Control
                      type="date"
                      value={moment(startDate).format('YYYY-MM-DD')}
                      onChange={e => {
                        const event = new Date(e.target.value);
                        setStartDate(moment(event).format());
                      }}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table responsive bordered hover size="sm">
                <thead>
                  <tr>
                    <td>No.</td>
                    <td>Kode Cabang</td>
                    <td style={{ textAlign: 'right' }}>Gadai Baru</td>
                    <td style={{ textAlign: 'right' }}>TTL</td>
                    <td style={{ textAlign: 'right' }}>Jasa PPJ</td>
                    <td style={{ textAlign: 'right' }}>TTL</td>
                    <td style={{ textAlign: 'right' }}>Pokok PLS</td>
                    <td style={{ textAlign: 'right' }}>Jasa PLS</td>
                    <td style={{ textAlign: 'right' }}>TTL</td>
                    <td style={{ textAlign: 'right' }}>Pokok PLP</td>
                    <td style={{ textAlign: 'right' }}>Jasa PLP</td>
                    <td style={{ textAlign: 'right' }}>TTL</td>
                  </tr>
                  <tr className="table-warning">
                    <td colSpan="2" className="font-weight-bold" style={{ textAlign: 'center' }}>
                      TOTAL
                    </td>
                    <td
                      className="font-weight-bold"
                      style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {thousandSeparator(sumTotalExpense)}
                    </td>
                    <td
                      className="font-weight-bold"
                      style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {sumCountNewMortgage}
                    </td>
                    <td
                      className="font-weight-bold"
                      style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {thousandSeparator(sumTotalInterestExtend)}
                    </td>
                    <td
                      className="font-weight-bold"
                      style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {sumCountExtend}
                    </td>
                    <td
                      className="font-weight-bold"
                      style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {thousandSeparator(sumTotalBaseRepayment)}
                    </td>
                    <td
                      className="font-weight-bold"
                      style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {thousandSeparator(sumTotalInterestRepayment)}
                    </td>
                    <td
                      className="font-weight-bold"
                      style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {sumCountRepayment}
                    </td>
                    <td
                      className="font-weight-bold"
                      style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {thousandSeparator(sumTotalBaseCompleted)}
                    </td>
                    <td
                      className="font-weight-bold"
                      style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {thousandSeparator(sumTotalInterestCompleted)}
                    </td>
                    <td
                      className="font-weight-bold"
                      style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                      {sumCountCompleted}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {listIncomeBranch.map((data, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td style={{ fontFamily: 'monospace' }}>{data.branchCode}</td>
                        <td
                          className="table-primary"
                          style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                          {thousandSeparator(data.totalExpense) || 0}
                        </td>
                        <td
                          className="table-primary"
                          style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                          {thousandSeparator(data.countNewMortgage) || 0}
                        </td>
                        <td
                          className="table-success"
                          style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                          {thousandSeparator(data.totalInterestExtend) || 0}
                        </td>
                        <td
                          className="table-success"
                          style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                          {thousandSeparator(data.countExtend) || 0}
                        </td>
                        <td
                          className="table-primary"
                          style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                          {thousandSeparator(data.totalBaseRepayment) || 0}
                        </td>
                        <td
                          className="table-primary"
                          style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                          {thousandSeparator(data.totalInterestRepayment) || 0}
                        </td>
                        <td
                          className="table-primary"
                          style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                          {thousandSeparator(data.countRepayment) || 0}
                        </td>
                        <td
                          className="table-success"
                          style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                          {thousandSeparator(data.totalBaseCompleted) || 0}
                        </td>
                        <td
                          className="table-success"
                          style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                          {thousandSeparator(data.totalInterestCompleted) || 0}
                        </td>
                        <td
                          className="table-success"
                          style={{ fontFamily: 'monospace', textAlign: 'right' }}>
                          {thousandSeparator(data.countCompleted) || 0}
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
