//  

import React, { useState, useEffect, useMemo } from 'react';
import {
  Modal,
  Form,
  InputGroup,
  FormControl,
  Button,
  ButtonGroup,
  ToggleButton
} from 'react-bootstrap';
import moment from 'moment-timezone';
import 'moment/locale/id';
import { useDispatch } from 'react-redux';
import * as actions from '../../../_redux/mortgageActions';
import { useDataSBGUIContext } from '../dataSBGUIContext';
import * as transactionAPI from '../../../api/transactionAPI';

export function DataSBGEditPelunasan({ dataSBG, show, onHide, user, notify }) {
  // Redux
  const dispatch = useDispatch();
  const dataSBGUIContext = useDataSBGUIContext();
  const dataSBGUIProps = useMemo(() => {
    return {
      initDataSBG: dataSBGUIContext.initDataSBG,
      queryParams: dataSBGUIContext.queryParams
    };
  }, [dataSBGUIContext]);

  // Hooks
  const [payment, setPayment] = useState(0);
  const [interest, setInterest] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [chosedInterest, setChosedInterest] = useState(0);
  const [isCalled, setIsCalled] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // UseEffect
  useEffect(() => {
    setInterest(dataSBG?.latestPaymentMortgage?.paymentLeft * chosedInterest);
  }, [chosedInterest, dataSBG]);

  useEffect(() => {
    setInterest(
      jasaTarif(
        dataSBG?.latestPaymentMortgage?.paymentDate,
        dataSBG?.latestPaymentMortgage?.paymentLeft
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSBG]);

  useEffect(() => {
    if (payment > dataSBG?.latestPaymentMortgage?.paymentLeft) {
      setPayment(dataSBG?.latestPaymentMortgage?.paymentLeft);
    }
  }, [dataSBG, payment]);

  // Variabels
  const radios = [
    { name: 'Cash', value: 'cash' },
    { name: 'Transfer', value: 'transfer' }
  ];
  const interestList = [
    { name: '5%', value: 0.05 },
    { name: '10%', value: 0.1 },
    { name: '15%', value: 0.15 },
    { name: '20%', value: 0.2 }
  ];

  // Functions
  const thousandSeparator = str => {
    return `${(str || '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const rmThousandSeparator = str => (str || '').toString().replace(/\./g, '');

  const jasaTarif = (date, paymentLeft) => {
    let differenceDays = moment
      .tz('Asia/Jakarta')
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .diff(
        moment.tz(date, 'Asia/Jakarta').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
        'days'
      );
    differenceDays += 1;
    if (differenceDays <= 15) {
      return paymentLeft * 0.05;
    } else if (differenceDays > 15 && differenceDays <= 30) {
      return paymentLeft * 0.1;
    } else if (differenceDays > 30 && differenceDays <= 45) {
      return paymentLeft * 0.15;
    } else {
      return 'Overdue';
    }
  };

  const handleRepayment = async () => {
    if (!isCalled) {
      setIsCalled(true);
      notify('loading', 'Data sedang disiapkan. Harap tunggu...');

      // new mortgage code
      const code = await transactionAPI.generateCode(user?.kode_cabang?.kode_cabang);

      // for repayment
      await transactionAPI.createPayment({
        id: dataSBG?._id,
        paymentDate: Date.now(),
        paymentStatus: 'Repayment',
        paymentLeft: dataSBG?.latestPaymentMortgage?.paymentLeft - payment,
        paymentValue: payment,
        interestValue: interest,
        mortgageCode: dataSBG?.mortgageCode,
        createdBy: user?._id,
        paymentMethod,
        newMortgageCode: code.data
      });

      await transactionAPI.makeMortgageObsolete(dataSBG?._id);

      // for new transaction
      const newMortgage = await transactionAPI.createMortgage({
        isDeleted: false,
        serialNo: dataSBG?.serialNo,
        productionYear: dataSBG?.productionYear,
        description: dataSBG?.description,
        createdBy: user?._id,
        serviceInterest: parseInt(dataSBG?.latestPaymentMortgage?.paymentLeft - payment, 10) * 0.1,
        serviceLimit: dataSBG?.serviceLimit,
        serviceOriginValue: dataSBG?.serviceOriginValue,
        serviceReceived: dataSBG?.latestPaymentMortgage?.paymentLeft - payment,
        servicePercentage: 10,
        administrationFee: 0,
        insuranceFee: 0,
        branch: user?.kode_cabang?._id,
        mortgageCode: code.data,
        mortgageOriginCode: dataSBG?.mortgageOriginCode ?? dataSBG?.mortgageCode,
        mortgageCustomer: dataSBG?.mortgageCustomer?._id,
        item: dataSBG?.item?._id,
        isRepayment: true,
        logMortgageCode: dataSBG?.logMortgageCode
          ? [...dataSBG?.logMortgageCode, dataSBG?.mortgageCode]
          : []
      });
      await transactionAPI.createPayment({
        id: newMortgage?.data?._id,
        paymentDate: Date.now(),
        paymentStatus: 'Initial Payment',
        paymentLeft: dataSBG?.latestPaymentMortgage?.paymentLeft - payment,
        paymentValue: 0,
        interestValue: 0,
        mortgageCode: code.data,
        createdBy: user?._id,
        isRepayment: true
      });
      const data = await transactionAPI.printMortgage(code.data);
      dispatch(actions.fetchMortgage(dataSBGUIProps.queryParams));
      dispatch(actions.fetchOneMortgage(dataSBG._id));
      notify('done', 'Data telah siap. Menyiapkan laman print...');
      const printDoc = document.getElementById('printed_frame').contentWindow;
      printDoc.document.open();
      printDoc.document.write(data);
      printDoc.document.close();
      printDoc.focus();
      setTimeout(() => {
        printDoc.print();
      }, 500);
      onHide();
    }
  };

  return (
    <>
      <Modal centered size="md" show={show} onHide={onHide}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Pelunasan Sebagian {dataSBG?.mortgageCode}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Sisa Pinjaman Pokok</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Rp</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  disabled={true}
                  type="text"
                  value={thousandSeparator(dataSBG?.latestPaymentMortgage?.paymentLeft)}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Persentase Jasa</Form.Label>
              <InputGroup>
                <ButtonGroup toggle>
                  {interestList.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      type="radio"
                      variant={'outline-primary'}
                      name="radio"
                      value={radio.value}
                      checked={chosedInterest === radio.value}
                      onChange={e => {
                        setChosedInterest(parseFloat(e.currentTarget.value));
                      }}>
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Jasa Tarif</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Rp</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl disabled={true} type="text" value={thousandSeparator(interest)} />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Pelunasan yang Dibayar</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Rp</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="text"
                  placeholder="Kelipatan 50.000"
                  value={thousandSeparator(payment)}
                  onChange={e => {
                    setPayment(rmThousandSeparator(e.target.value));
                  }}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Total yang harus dibayar</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Rp</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="text"
                  disabled={true}
                  value={thousandSeparator(parseInt(payment) + parseInt(interest))}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Metode Pembayaran</Form.Label>
              <InputGroup>
                <ButtonGroup toggle>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      type="radio"
                      variant={idx % 2 ? 'outline-warning' : 'outline-primary'}
                      name="radio"
                      value={radio.value}
                      checked={paymentMethod === radio.value}
                      onChange={e => {
                        setPaymentMethod(e.currentTarget.value);
                      }}>
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Tutup
          </Button>
          <Button
            variant="primary"
            disabled={isPressed || payment <= 0}
            onClick={() => {
              setIsPressed(true);
              handleRepayment();
            }}>
            {isPressed ? 'Harap Tunggu' : 'Selesaikan Transaksi'}
          </Button>
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
}
