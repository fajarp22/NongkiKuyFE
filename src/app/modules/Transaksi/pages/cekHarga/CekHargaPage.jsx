// import React from "react";

// export function CekHargaPage() {
// 	return <div>CekHargaPage</div>;
// }

// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from '../../../../../_metronic/_partials/controls/Card';
import { Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import * as transactionAPI from '../../api/transactionAPI';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as _ from 'lodash';

const CekHargaPage = function(props) {
  const [listParentCategory, setListParentCategory] = useState([]);
  const [parentCategory, setParentCategory] = useState('');
  const [category, setCategory] = useState('');
  const [listItem, setListItem] = useState([]);
  const [item, setItem] = useState([]);
  const [listIndicator, setListIndicator] = useState({
    categoryindicators: []
  });
  const [selectedIndicator, setSelectedIndicator] = useState({});
  const [serviceOriginValue, setServiceOriginValue] = useState(0);
  const [serviceLimit, setServiceLimit] = useState(0);
  const [serviceReceived, setServiceReceived] = useState(0);
  const [servicePercentage, setServicePercentage] = useState(10);
  const [serviceInterest, setServiceInterest] = useState(0);
  const [parentCategoryName, setParentCategoryName] = useState('');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted) {
        transactionAPI.getAll().then(response => {
          setListParentCategory(response.data.data[0]);
        });
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted && category) {
        transactionAPI.getItemByCategory(category).then(response => {
          setListItem(response.data[0]);
        });
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
  }, [category]);

  useEffect(() => {
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted && category) {
        transactionAPI.getIndicatorByCategory(category).then(response => {
          setListIndicator(response.data[0]);
        });
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
  }, [category]);

  useEffect(() => {
    if (!category || !parentCategory) {
      setListIndicator({
        categoryindicators: []
      });
    }
  }, [category, parentCategory]);

  useEffect(() => {
    let totalCutPercent = 0;
    let totalCutNominal = 0;
    let final = serviceOriginValue;
    if (!_.isEmpty(selectedIndicator)) {
      for (const key in selectedIndicator) {
        if (selectedIndicator[key].decrement.includes('%')) {
          totalCutPercent += parseInt(selectedIndicator[key].decrement);
        } else {
          totalCutNominal += parseInt(selectedIndicator[key].decrement);
        }
      }
      final = final - final * (totalCutPercent / 100) - totalCutNominal;
      if (final <= 0) {
        final = 0;
      }
    }
    setServiceLimit(final);
    setServiceReceived(final);
  }, [selectedIndicator, serviceOriginValue]);

  useEffect(() => {
    setServiceInterest(Math.round(serviceReceived * (servicePercentage / 100)));
  }, [servicePercentage, serviceReceived]);

  const thousandSeparator = str => str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const rmThousandSeparator = str => str.toString().replace(/\./g, '');

  return (
    <>
      <Row>
        <Col md="6">
          <Card>
            <CardHeader title="Data Barang" />
            <CardBody>
              <Form>
                <Form.Group>
                  <Form.Label>Kategori Induk Barang</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={e => {
                      setParentCategoryName(e.target.selectedOptions[0].getAttribute('name'));
                      setParentCategory(e.target.value);
                      setCategory('');
                      setItem([]);
                    }}>
                    <option value="">Pilih Kategori Induk Barang</option>
                    {listParentCategory
                      .filter(item => {
                        return item.parentId === 0;
                      })
                      .map(item => {
                        return (
                          <option value={item.id} key={item.id} name={item.categoryName}>
                            {item.categoryName}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Kategori Barang</Form.Label>
                  <Form.Control
                    as="select"
                    disabled={!parentCategory ?? false}
                    onChange={e => {
                      setCategoryName(e.target.selectedOptions[0].getAttribute('name'));
                      setCategory(e.target.value);
                      setItem([]);
                    }}>
                    <option value="">Pilih Kategori Barang</option>
                    {listParentCategory
                      .filter(item => {
                        return item.parentId === parseInt(parentCategory);
                      })
                      .map(item => {
                        return (
                          <option value={item.id} key={item.id} name={item.categoryName}>
                            {item.categoryName}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Nama Barang</Form.Label>
                  <Typeahead
                    disabled={!category ?? false}
                    clearButton={true}
                    id="basic-typeahead-single"
                    labelKey="itemName"
                    options={listItem}
                    onChange={selected => {
                      setItem(selected);
                      if (selected[0]) {
                        setServiceOriginValue(selected[0].itemPrice);
                      } else {
                        setServiceOriginValue(0);
                      }
                    }}
                    placeholder="Pilih Nama Barang"
                    selected={item}
                  />
                </Form.Group>
                {listIndicator.categoryindicators.map((indicator, idx) => {
                  return (
                    <Form.Group key={idx}>
                      <Form.Label>{indicator.indicatorName}</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={e => {
                          if (_.isEmpty(e.target.value)) {
                            const tempIndicator = selectedIndicator;
                            delete tempIndicator[indicator.indicatorName];
                            setSelectedIndicator({
                              ...tempIndicator
                            });
                          } else {
                            setSelectedIndicator({
                              ...selectedIndicator,
                              [indicator.indicatorName]: {
                                indicatorName: indicator.indicatorName,
                                choiceName: indicator.indicatorchoices[e.target.value].choiceName,
                                decrement: indicator.indicatorchoices[e.target.value].decrement
                              }
                            });
                          }
                        }}>
                        <option value="">--Pilih--</option>
                        {indicator.indicatorchoices.map((choice, idx) => {
                          return (
                            <option value={idx} key={choice.id}>
                              {choice.choiceName}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  );
                })}
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col md="6">
          <Card>
            <CardHeader title="Kisaran Harga" />
            <CardBody>
              <Form>
                <Form.Group>
                  <Form.Label>Nilai Taksiran</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Rp</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      disabled={true}
                      type="text"
                      value={thousandSeparator(serviceOriginValue)}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Nilai Jaminan</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Rp</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      disabled={true}
                      type="text"
                      value={thousandSeparator(serviceLimit)}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Nilai Pencairan</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Rp</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      value={thousandSeparator(serviceReceived)}
                      onChange={e => {
                        setServiceReceived(rmThousandSeparator(e.target.value));
                      }}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Jasa Tarif Sewa Modal (%)</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      disabled={true}
                      type="text"
                      value={servicePercentage}
                      onChange={e => {
                        setServicePercentage(e.target.value);
                      }}></Form.Control>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Jasa Tarif Sewa Modal</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Rp</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      disabled={true}
                      type="text"
                      value={thousandSeparator(serviceInterest)}
                    />
                  </InputGroup>
                </Form.Group>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CekHargaPage;
