// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useState, useEffect } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { toInteger } from 'lodash';

export function DropDown(props) {
  const [data, setData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [parentId, setParentId] = useState(0);
  const [id, setId] = useState(0);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    if (parentId !== 0) {
      const child = data.find(data => {
        return data.id === parentId;
      });
      setChildData(child.children);
    } else {
      setChildData([]);
    }
    setId(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId]);

  useEffect(() => {
    props.onClickNode(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Form>
      <Row>
        <Col>
          <Form.Label>Kategori Barang</Form.Label>
          <Form.Control
            as="select"
            onChange={e => {
              setParentId(toInteger(e.target.value));
            }}>
            <option value="0">Pilih Kategori Barang</option>
            {data.map(item => {
              return (
                <option value={item.id} key={item.id}>
                  {item.text}
                </option>
              );
            })}
          </Form.Control>
        </Col>
        <Col>
          <Form.Label>Sub Kategori Barang</Form.Label>
          <Form.Control
            as="select"
            onChange={e => {
              setId(toInteger(e.target.value));
            }}
            disabled={!parentId}>
            <option value="0">Pilih Kategori Barang</option>
            {childData.map(item => {
              return (
                <option value={item.id} key={item.id}>
                  {item.text}
                </option>
              );
            })}
          </Form.Control>
        </Col>
      </Row>
    </Form>
  );
}
