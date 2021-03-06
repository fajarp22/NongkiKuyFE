//

import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, Select } from '../../../../../../_metronic/_partials/controls';
import * as itemCategory from '../../../_api/categoryItem';
import {
  thousandSeparator,
  rmThousandSeparator
} from '../../../../GlobalFunctions/transactionFunction';

const DataBarangEditSchema = Yup.object().shape({
  itemName: Yup.string().required('Perlu diisi.'),
  itemPrice: Yup.number().required('Perlu diisi.'),
  deskripsiHidangan: Yup.string().required('Perlu diisi.'),
  kategoriHidangan: Yup.string().required('Perlu diisi.'),
  urlHidangan: Yup.string().required('Perlu diisi.')
});

export function DataBarangEditForm({ user, saveDataBarang, dataBarang, actionsLoading, onHide }) {
  const [parentCategory, setParentCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(6);
  const [itemCode, setItemCode] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [isCalled, setIsCalled] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [restaurantList, setRestaurantList] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');

  useEffect(() => {
    if (dataBarang.id !== undefined) {
      setSelectedParentCategory(dataBarang.itemParentId);
      setSelectedCategory(dataBarang.itemCategoryId);
      setItemPrice(dataBarang.itemPrice);
    }
  }, [dataBarang]);

  useEffect(() => {
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted) {
        itemCategory.getParentItemCategory().then(res => setParentCategory(res));
        itemCategory.getAllRestaurants().then(res => setRestaurantList(res));
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
      if (!unmounted) {
        if (selectedParentCategory !== '') {
          itemCategory
            .getSelectedItemCategory(selectedParentCategory)
            .then(res => setCategory(res));
        } else {
          setSelectedCategory('');
        }
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
  }, [selectedParentCategory]);

  useEffect(() => {
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted) {
        if (dataBarang.id) {
          setItemCode(dataBarang.itemCode);
        } else if (selectedCategory) {
          itemCategory.generateItemCode(selectedCategory).then(res => setItemCode(res));
        } else {
          setItemCode('');
        }
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
  }, [dataBarang.id, dataBarang.itemCode, selectedCategory]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={dataBarang}
        validationSchema={DataBarangEditSchema}
        onSubmit={values => {
          console.log(values);
          if (!isCalled) {
            setIsCalled(true);
            if (dataBarang.id === undefined) {
              // itemCategory.generateItemCode(selectedCategory).then(res => {
              //   // const itemPrice = values.itemPrice;
              //   saveDataBarang({
              //     ...values,
              //     itemPrice,
              //     // itemCode: res,
              //     modifiedBy: user._id
              //   });
              // });
              saveDataBarang({
                ...values,
                itemPrice,
                // itemCode: res,
                modifiedBy: user._id,
                restaurantId
              });
            } else {
              // const itemPrice = values.itemPrice;
              saveDataBarang({
                ...values,
                itemPrice,
                // itemCode: itemCode,
                modifiedBy: user._id,
                restaurantId
              });
            }
          }
        }}>
        {({ handleSubmit, setFieldValue }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select
                      disabled={dataBarang.id === undefined ? false : true}
                      name="null"
                      label="Nama Restoran"
                      value={restaurantId}
                      autoComplete="off"
                      onChange={e => {
                        setRestaurantId(e.target.value);
                        setItemCode('');
                      }}>
                      <option value="">Pilih Nama Restoran</option>
                      {restaurantList.map(item => {
                        return (
                          <option value={item._id} key={item._id}>
                            {item.nama_nasabah}
                          </option>
                        );
                      })}
                    </Select>
                  </div>
                  {/* <div className="col-lg-4">
                    <Select
                      disabled={
                        selectedParentCategory === ''
                          ? true
                          : dataBarang.id === undefined
                          ? false
                          : true
                      }
                      name="itemCategoryId"
                      label="Kategori Barang"
                      value={selectedCategory}
                      autoComplete="off"
                      onChange={e => {
                        setSelectedCategory(e.target.value);
                        setFieldValue(e.target.name, e.target.value);
                      }}>
                      <option value="">Pilih Kategori Barang</option>
                      {category.map(item => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.categoryName}
                          </option>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="itemCode"
                      disabled={true}
                      component={Input}
                      placeholder="Kode Barang"
                      label="Kode Barang"
                      withFeedbackLabel={false}
                      autoComplete="off"
                      value={itemCode}
                      onChange={e => {
                        setItemCode(e.target.value);
                        setFieldValue(e.target.name, e.target.value);
                      }}
                    />
                  </div> */}
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="itemName"
                      component={Input}
                      placeholder="Nama Hidangan"
                      label="Nama Hidangan"
                      withFeedbackLabel={false}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="itemPrice"
                      component={Input}
                      placeholder="Harga Hidangan"
                      label="Harga Hidangan"
                      withFeedbackLabel={false}
                      autoComplete="off"
                      value={thousandSeparator(itemPrice)}
                      onChange={e => {
                        setItemPrice(rmThousandSeparator(e.target.value));
                        setFieldValue(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="kategoriHidangan"
                      component={Input}
                      placeholder="Kategori Hidangan"
                      label="Kategori Hidangan"
                      withFeedbackLabel={false}
                      autoComplete="off"
                    />
                  </div>
                  </div>
                  <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="deskripsiHidangan"
                      component={Input}
                      placeholder="Deskripsi Hidangan"
                      label="Deskripsi Hidangan"
                      withFeedbackLabel={false}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="urlHidangan"
                      component={Input}
                      placeholder="Gambar Hidangan"
                      label="Gambar Hidangan"
                      withFeedbackLabel={false}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" onClick={onHide} className="btn btn-light btn-elevate">
                Batal
              </button>
              <> </>
              <button
                type="submit"
                disabled={isPressed}
                onClick={() => {
                  setIsPressed(true);
                  handleSubmit();
                }}
                className="btn btn-primary btn-elevate">
                Simpan
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
