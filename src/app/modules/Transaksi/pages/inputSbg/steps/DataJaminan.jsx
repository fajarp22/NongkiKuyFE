// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from '../../../../../../_metronic/_partials/controls/Card';
import { Form, Col, Button, Row, InputGroup, FormControl, Image, Modal } from 'react-bootstrap';
import * as transactionAPI from '../../../api/transactionAPI';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as _ from 'lodash';

const DataJaminan = function(props) {
  const [selectedFile, setSelectedFile] = useState([]);
  const [serialNumber, setSerialNumber] = useState('');
  const [productionYear, setProductionYear] = useState('');
  const [listParentCategory, setListParentCategory] = useState([]);
  const [parentCategory, setParentCategory] = useState('');
  const [category, setCategory] = useState('');
  const [listItem, setListItem] = useState([]);
  const [item, setItem] = useState([]);
  const [upload, setUpload] = useState(undefined);
  const [listIndicator, setListIndicator] = useState({
    categoryindicators: []
  });
  const [selectedIndicator, setSelectedIndicator] = useState({});
  const [serviceOriginValue, setServiceOriginValue] = useState(0);
  const [description, setDescription] = useState('');
  const [serviceLimit, setServiceLimit] = useState(0);
  const [serviceReceived, setServiceReceived] = useState(0);
  const [servicePercentage, setServicePercentage] = useState(10);
  const [serviceInterest, setServiceInterest] = useState(0);
  const [parentCategoryName, setParentCategoryName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [administrationFee, setAdministrationFee] = useState(0);
  const [insuranceFee, setInsuranceFee] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      final = final - final * (totalCutPercent / 100) + totalCutNominal;
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

  const handleNext = () => {
    if (_.isEmpty(selectedFile)) {
      props.notify('error', 'Silahkan upload foto barang gadai terlebih dahulu.');
    } else if (_.isEmpty(upload)) {
      props.notify('error', 'Silahkan upload foto barang gadai terlebih dahulu.');
    } else if (_.isEmpty(serialNumber)) {
      props.notify('error', 'Silahkan isi data Serial Number terlebih dahulu.');
    } else if (_.isEmpty(productionYear)) {
      props.notify('error', 'Silahkan isi data Tahun Pembuatan terlebih dahulu.');
    } else if (_.isEmpty(parentCategoryName)) {
      props.notify('error', 'Silahkan pilih Kategori Induk Barang terlebih dahulu.');
    } else if (_.isEmpty(categoryName)) {
      props.notify('error', 'Silahkan pilih Kategori Barang terlebih dahulu.');
    } else if (_.isEmpty(item)) {
      props.notify('error', 'Silahkan pilih Nama Barang terlebih dahulu.');
    } else if (_.isEmpty(description)) {
      props.notify('error', 'Silahkan isi data Deskripsi terlebih dahulu.');
    } else if (serviceLimit === 0) {
      props.notify('error', 'Nilai jaminan tidak boleh 0.');
    } else if (serviceReceived === '0') {
      props.notify('error', 'Nilai pencairan tidak boleh 0.');
    } else if (servicePercentage === 0) {
      props.notify('error', 'Jasa Tarif % tidak boleh 0.');
    } else {
      transactionAPI.checkIdentity(localStorage.getItem('customer_id'), category).then(data => {
        if (data.status === 'success') {
          props.dataJaminan({
            images: upload,
            imgBlob: selectedFile,
            appraisal: selectedIndicator,
            serialNo: serialNumber,
            productionYear,
            description,
            parentCategory: parentCategoryName,
            category: categoryName,
            itemName: item[0]?.itemName,
            itemId: item[0]?._id,
            createdBy: props.user._id,
            serviceInterest,
            serviceLimit,
            serviceOriginValue,
            serviceReceived,
            servicePercentage,
            administrationFee,
            insuranceFee
          });
          props.nextStep();
        } else {
          props.notify('error', data.message);
        }
      });
    }
  };

  return (
    <>
      <Row>
        <Col md="6">
          <Card>
            <CardHeader title="Data Barang" />
            <CardBody>
              <Form>
                <Form.Group>
                  <Form.Label>Foto</Form.Label>
                  <Form.File id="formcheck-api-custom" custom>
                    <Form.File.Input
                      accept="image/*"
                      multiple
                      onChange={e => {
                        setUpload(e.target.files);
                        let arrayObj = [];
                        let arrayImage = [];
                        arrayObj.push(e.target.files);
                        for (let i = 0; i < arrayObj[0].length; i++) {
                          arrayImage.push(URL.createObjectURL(arrayObj[0][i]));
                        }
                        setSelectedFile(arrayImage);
                      }}
                    />
                    <Form.File.Label data-browse="Upload">Pilih File</Form.File.Label>
                  </Form.File>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Serial Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Serial Number"
                    value={serialNumber}
                    onChange={e => {
                      setSerialNumber(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tahun Pembuatan</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Tahun Pembuatan"
                    value={productionYear}
                    onChange={e => {
                      setProductionYear(e.target.value);
                    }}
                  />
                </Form.Group>
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
                        setServiceOriginValue(selected[0].itemPrice - selected[0].itemPrice * 0.1);
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
                <Form.Group>
                  <Form.Label>Keterangan</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Keterangan"
                    value={description}
                    onChange={e => {
                      setDescription(e.target.value);
                    }}
                    rows={3}></Form.Control>
                </Form.Group>
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
            <CardFooter>
              <Button
                variant="primary"
                className="float-right mx-1"
                onClick={() => {
                  // props.nextStep();
                  handleNext();
                }}>
                Selanjutnya
              </Button>
              <Button
                variant="primary"
                className="float-right mx-1"
                onClick={() => {
                  // props.prevStep();
                  handleShow();
                }}>
                Sebelumnya
              </Button>
            </CardFooter>
          </Card>
          {!_.isEmpty(selectedFile) ? (
            <Card>
              <CardHeader title="Preview Gambar" />
              <CardBody>
                <Row>
                  {selectedFile.map((data, idx) => {
                    return (
                      <Col className="my-2" md="6" key={idx}>
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
        </Col>
      </Row>
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
    </>
  );
};

export default DataJaminan;
