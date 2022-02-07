import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataNasabah from './steps/DataNasabah';
import DataJaminan from './steps/DataJaminan';
import Ringkasan from './steps/Ringkasan';
import { Card, CardBody } from '../../../../../_metronic/_partials/controls/Card';
import { Col, Row, Alert } from 'react-bootstrap';

export function InputSbgPage() {
  const { user } = useSelector(state => state.auth);
  const [step, setStep] = useState(0);
  const [dataNasabah, setDataNasabah] = useState({});
  const [dataJaminan, setDataJaminan] = useState({});
  const handleDataNasabah = dataNasabah => {
    setDataNasabah(dataNasabah);
  };
  const handleDataJaminan = dataJaminan => {
    setDataJaminan(dataJaminan);
  };

  useEffect(() => {
    if (step === 3) {
      setStep(0);
    }
  }, [step]);

  const prevStep = () => {
    setStep(step - 1);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const notify = (status, message) => {
    switch (status) {
      case 'loading':
        return toast.info(message, {
          position: 'bottom-right',
          autoClose: false,
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
          autoClose: false,
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
          autoClose: 1500,
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
      <Card>
        <CardBody>
          <Row className="text-center">
            <Col lg="4">
              <Alert variant={step === 0 ? 'primary' : 'secondary'}>
                <strong>1. Input Data Kedai</strong>
              </Alert>
            </Col>
            <Col lg="4">
              <Alert variant={step === 1 ? 'primary' : 'secondary'}>
                <strong>2. Input Detail Kedai</strong>
              </Alert>
            </Col>
            <Col lg="4">
              <Alert variant={step === 2 ? 'primary' : 'secondary'}>
                <strong>3. Ringkasan</strong>
              </Alert>
            </Col>
          </Row>
        </CardBody>
      </Card>
      {step === 0 ? (
        <DataNasabah
          user={user}
          nextStep={nextStep}
          notify={(status, message) => notify(status, message)}
          dataNasabah={handleDataNasabah}
        />
      ) : (
        ''
      )}
      {step === 1 ? (
        <DataJaminan
          user={user}
          prevStep={prevStep}
          nextStep={nextStep}
          notify={(status, message) => notify(status, message)}
          dataJaminan={handleDataJaminan}
        />
      ) : (
        ''
      )}
      {step === 2 ? (
        <Ringkasan
          user={user}
          prevStep={prevStep}
          notify={(status, message) => notify(status, message)}
          dataJaminan={dataJaminan}
        />
      ) : (
        ''
      )}
    </>
  );
}
