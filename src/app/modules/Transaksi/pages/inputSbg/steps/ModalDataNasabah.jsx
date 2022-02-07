//  

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import * as transactionAPI from '../../../api/transactionAPI';
import _ from 'lodash';

const ModalDataNasabah = function(props) {
  const [typeIdentity, setTypeIdentity] = useState('KTP');
  const [noIdentity, setNoIdentity] = useState('');
  const [customer, setCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(0);

  const searchCustomer = ({ typeIdentity, noIdentity }) => {
    transactionAPI
      .findCustomersByIdentity({ typeIdentity, noIdentity })
      .then(data => {
        setCustomer(data.data);
      })
      .catch(() => {
        setCustomer([]);
      });
  };

  useEffect(() => {
    if (!_.isEmpty(customer)) {
      props.customer(customer[selectedCustomer]);
    }
  }, [customer, props, selectedCustomer]);

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Cari Nasabah</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tipe Identitas</Form.Label>
              <Form.Control
                as="select"
                value={typeIdentity}
                onChange={e => {
                  setTypeIdentity(e.target.value);
                }}>
                <option value="KTP">KTP</option>
                <option value="SIM">SIM</option>
                <option value="NPWP">NPWP</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Identitas Nasabah</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={noIdentity}
                  onChange={e => {
                    setNoIdentity(e.target.value);
                  }}
                />
                <InputGroup.Append>
                  <Button
                    disabled={!noIdentity}
                    variant="success"
                    onClick={e => {
                      searchCustomer({
                        typeIdentity,
                        noIdentity
                      });
                    }}>
                    Cari
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Nasabah Terdaftar </Form.Label>
              <Form.Control
                as="select"
                value={selectedCustomer}
                onChange={e => {
                  setSelectedCustomer(e.target.value);
                }}>
                {customer.map((data, idx) => {
                  return (
                    <option key={idx} value={idx}>
                      {data.nama_nasabah}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Batal
          </Button>
          <Button variant="primary" disabled={_.isEmpty(customer)} onClick={props.onSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDataNasabah;
