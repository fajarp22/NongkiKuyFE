//

import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, Select } from '../../../../../../_metronic/_partials/controls';
import * as location from '../../../../../_redux/locations/locationsCrud';
import 'moment/locale/id';
import { getMonth, getYear } from 'date-fns';
import range from 'lodash/range';
import DatePicker from 'react-datepicker';

const CustomerEditSchema = Yup.object().shape({
  nama_nasabah: Yup.string().required('Perlu diisi.'),
  identitasKtp: Yup.string().required('Perlu diisi.'),
  identitasSim: Yup.string().required('Perlu diisi.'),
  identitasNpwp: Yup.string().required('Perlu diisi.'),
  tempat_lahir: Yup.string().required('Perlu diisi.'),
  nomor_hp: Yup.string().required('Perlu diisi.'),
  nomor_telepon_rumah: Yup.string().required('Perlu diisi.'),
  nama_ibu_kandung: Yup.string().required('Perlu diisi.'),
  nama_darurat: Yup.string().required('Perlu diisi.'),
  nomor_hp_darurat: Yup.string().required('Perlu diisi.'),
  alamat_ktp: Yup.string().required('Perlu diisi.'),
  alamat_sekarang: Yup.string()
});

export function CustomerEditForm({ user, saveCustomer, customer, actionsLoading, onHide }) {
  const [provincesKTP, setProvincesKTP] = useState([]);
  const [regenciesKTP, setRegenciesKTP] = useState([]);
  const [districtsKTP, setDistrictsKTP] = useState([]);
  const [villagesKTP, setVillagesKTP] = useState([]);

  const [provincesSekarang, setProvincesSekarang] = useState([]);
  const [regenciesSekarang, setRegenciesSekarang] = useState([]);
  const [districtsSekarang, setDistrictsSekarang] = useState([]);
  const [villagesSekarang, setVillagesSekarang] = useState([]);

  const [selectedProvinceKTP, setSelectedProvinceKTP] = useState('');
  const [selectedRegencyKTP, setSelectedRegencyKTP] = useState('');
  const [selectedDistrictKTP, setSelectedDistrictKTP] = useState('');
  const [selectedVillageKTP, setSelectedVillageKTP] = useState('');

  const [selectedProvinceSekarang, setSelectedProvinceSekarang] = useState('');
  const [selectedRegencySekarang, setSelectedRegencySekarang] = useState('X');
  const [selectedDistrictSekarang, setSelectedDistrictSekarang] = useState('X');
  const [selectedVillageSekarang, setSelectedVillageSekarang] = useState('X');

  const [alamatKTP, setAlamatKTP] = useState('');
  const [alamatSekarang, setAlamatSekarang] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const years = range(1900, getYear(new Date()) + 1, 1);
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ];

  useEffect(() => {
    if (customer._id !== undefined) {
      setTanggalLahir(new Date(customer.tanggal_lahir));
      setAlamatKTP(customer.alamat_ktp);
      setAlamatSekarang(customer.alamat_sekarang);
      setSelectedProvinceKTP(customer.provinsi_ktp);
      setSelectedRegencyKTP(customer.kota_ktp);
      setSelectedDistrictKTP(customer.kecamatan_ktp);
      setSelectedVillageKTP(customer.kelurahan_ktp);
      setSelectedProvinceSekarang(customer.provinsi_sekarang);
      setSelectedRegencySekarang(customer.kota_sekarang);
      setSelectedDistrictSekarang(customer.kecamatan_sekarang);
      setSelectedVillageSekarang(customer.kelurahan_sekarang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer._id]);

  useEffect(() => {
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted) {
        location.getProvinces().then(response => setProvincesKTP(response));
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
        location.getRegencies(selectedProvinceKTP).then(response => setRegenciesKTP(response));
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
  }, [selectedProvinceKTP]);

  useEffect(() => {
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted) {
        location.getDistricts(selectedRegencyKTP).then(response => setDistrictsKTP(response));
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
  }, [selectedRegencyKTP]);

  useEffect(() => {
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted) {
        location.getVillages(selectedDistrictKTP).then(response => setVillagesKTP(response));
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
  }, [selectedDistrictKTP]);

  useEffect(() => {
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted) {
        location.getProvinces().then(response => setProvincesSekarang(response));
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
        location
          .getRegencies(selectedProvinceSekarang)
          .then(response => setRegenciesSekarang(response));
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
  }, [selectedProvinceSekarang]);

  useEffect(() => {
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted) {
        location
          .getDistricts(selectedRegencySekarang)
          .then(response => setDistrictsSekarang(response));
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
  }, [selectedRegencySekarang]);

  useEffect(() => {
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted) {
        location
          .getVillages(selectedDistrictSekarang)
          .then(response => setVillagesSekarang(response));
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
  }, [selectedDistrictSekarang]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={customer}
        validationSchema={CustomerEditSchema}
        onSubmit={values => {
          saveCustomer({
            ...values,
            modifiedBy: user._id,
            tanggal_lahir: tanggalLahir
          });
        }}>
        {({ handleSubmit, setFieldValue, values }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <h4 className="text-primary">Info Detail Kedai</h4>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="nama_nasabah"
                      component={Input}
                      placeholder="Nama Kedai"
                      label="Nama Kedai"
                      withFeedbackLabel={false}
                      autoComplete="off"
                    />
                  </div>
                  {/* <div className="col-lg-4">
                    <Select name="tipe_identitas" label="Tipe Identitas">
                      <option value="0">Pilih Identitas</option>
                      <option value="KTP">KTP</option>
                      <option value="NPWP">NPWP</option>
                      <option value="SIM">SIM</option>
                    </Select>
                  </div> */}
                  {/* <div className="col-lg-4">
                    <Field
                      name="nomor_identitas"
                      component={Input}
                      placeholder="Nomor Identitas"
                      label="Nomor Identitas"
                      withFeedbackLabel={false}
                      autoComplete="off"
                    />
                  </div> */}
                  <div className="col-lg-4">
                    <Field
                      name="tempat_lahir"
                      component={Input}
                      placeholder="Lokasi Kedai"
                      label="Lokasi Kedai"
                      withFeedbackLabel={false}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-lg-4">
                    <>
                      <label>Tanggal Berdiri</label>
                      <DatePicker
                        name="tanggalLahir"
                        style={{ width: '100%' }}
                        className={'form-control'}
                        renderCustomHeader={({
                          date,
                          changeYear,
                          changeMonth,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled
                        }) => (
                          <div
                            style={{
                              margin: 10,
                              display: 'flex',
                              justifyContent: 'center'
                            }}>
                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                              {'<'}
                            </button>
                            <select
                              value={getYear(date)}
                              onChange={({ target: { value } }) => changeYear(value)}>
                              {years.map(option => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                            <select
                              value={months[getMonth(date)]}
                              onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                              }>
                              {months.map(option => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                              {'>'}
                            </button>
                          </div>
                        )}
                        selected={tanggalLahir}
                        onChange={date => {
                          setTanggalLahir(date);
                        }}
                      />
                    </>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="identitasKtp"
                      component={Input}
                      placeholder="Nomor Telephone"
                      label="Nomor Telephone"
                      withFeedbackLabel={false}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="identitasSim"
                      component={Input}
                      placeholder="Jam Operasional"
                      label="Jam Operasional"
                      withFeedbackLabel={false}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="identitasNpwp"
                      component={Input}
                      placeholder="Website"
                      label="Website"
                      withFeedbackLabel={false}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="nomor_hp"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                      withFeedbackLabel={false}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="nomor_telepon_rumah"
                      component={Input}
                      placeholder="Pembayaran"
                      label="Pembayaran"
                      withFeedbackLabel={false}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="nama_ibu_kandung"
                      component={Input}
                      placeholder="Kapasitas Maksimal"
                      label="Kapasitas Maksimal"
                      withFeedbackLabel={false}
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* <h4 className="text-primary">Keadaan Darurat</h4> */}
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="nama_darurat"
                      component={Input}
                      placeholder="Fasilitas"
                      label="Fasilitas"
                      withFeedbackLabel={false}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="nomor_hp_darurat"
                      component={Input}
                      placeholder="Kategori"
                      label="Kategori"
                      withFeedbackLabel={false}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select name="status_hubungan" label="Kategori Kedai">
                      <option value="0">Kategori Kedai</option>
                      <option value="Bar And Resto">Bar And Resto</option>
                      <option value="Cafe">Cafe</option>
                      <option value="Resto">Resto</option>
                    </Select>
                  </div>
                </div>
                <br />
                <h4 className="text-primary">Alamat Kedai</h4>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="alamat_ktp"
                      component={Input}
                      placeholder="Alamat Kedai"
                      label="Alamat"
                      withFeedbackLabel={false}
                      value={alamatKTP}
                      autoComplete="off"
                      onChange={e => {
                        setAlamatKTP(e.target.value);
                        // setAlamatSekarang(e.target.value);
                        setFieldValue(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select
                      name="provinsi_ktp"
                      label="Provinsi"
                      value={selectedProvinceKTP}
                      autoComplete="off"
                      onChange={e => {
                        setSelectedProvinceKTP(e.target.value);
                        // setSelectedProvinceSekarang(e.target.value);
                        setFieldValue(e.target.name, e.target.value);
                      }}>
                      <option value="">Pilih Provinsi</option>
                      {provincesKTP.map(item => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.province}
                          </option>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Select
                      disabled={selectedProvinceKTP === '' ? true : false}
                      name="kota_ktp"
                      label="Kota"
                      value={selectedRegencyKTP}
                      autoComplete="off"
                      onChange={e => {
                        setSelectedRegencyKTP(e.target.value);
                        setSelectedRegencySekarang(e.target.value);
                        setFieldValue(e.target.name, e.target.value);
                      }}>
                      <option value="">Pilih Kota/Kabupaten</option>
                      {regenciesKTP.map(item => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.regency}
                          </option>
                        );
                      })}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select
                      disabled={selectedRegencyKTP === '' ? true : false}
                      name="kecamatan_ktp"
                      label="Kecamatan"
                      value={selectedDistrictKTP}
                      autoComplete="off"
                      onChange={e => {
                        setSelectedDistrictKTP(e.target.value);
                        setSelectedDistrictSekarang(e.target.value);
                        setFieldValue(e.target.name, e.target.value);
                      }}>
                      <option value="">Pilih Kecamatan</option>
                      {districtsKTP.map(item => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.district}
                          </option>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Select
                      disabled={selectedDistrictKTP === '' ? true : false}
                      name="kelurahan_ktp"
                      label="Kelurahan"
                      value={selectedVillageKTP}
                      autoComplete="off"
                      onChange={e => {
                        setSelectedVillageKTP(e.target.value);
                        setSelectedVillageSekarang(e.target.value);
                        setFieldValue(e.target.name, e.target.value);
                      }}>
                      <option value="">Pilih Kelurahan</option>
                      {villagesKTP.map(item => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.village}
                          </option>
                        );
                      })}
                    </Select>
                  </div>
                </div>
                <br />
                <h4 className="text-primary">Informasi Tambahan</h4>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="alamat_sekarang"
                      component={Input}
                      placeholder="Rating Kedai"
                      label="Rating Kedai"
                      withFeedbackLabel={false}
                      value={alamatSekarang}
                      autoComplete="off"
                      onChange={e => {
                        setAlamatSekarang(e.target.value);
                        setFieldValue(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="provinsi_sekarang"
                      component={Input}
                      placeholder="ID Kedai"
                      label="ID Kedai"
                      withFeedbackLabel={false}
                      value={selectedProvinceSekarang}
                      autoComplete="off"
                      onChange={e => {
                        setSelectedProvinceSekarang(e.target.value);
                        setFieldValue(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                  {/* <div className="col-lg-4">
                    <Select
                      disabled={selectedProvinceSekarang === '' ? true : false}
                      name="kota_sekarang"
                      label="Kota Sekarang"
                      value={selectedRegencySekarang}
                      autoComplete="off"
                      onChange={e => {
                        setSelectedRegencySekarang(e.target.value);
                        setFieldValue(e.target.name, e.target.value);
                      }}>
                      <option value="0">Pilih Kota/Kabupaten</option>
                      {regenciesSekarang.map(item => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.regency}
                          </option>
                        );
                      })}
                    </Select>
                  </div> */}
                </div>
                <div className="form-group row">
                  {/* <div className="col-lg-4">
                    <Select
                      disabled={selectedRegencySekarang === '' ? true : false}
                      name="kecamatan_sekarang"
                      label="Kecamatan Sekarang"
                      value={selectedDistrictSekarang}
                      autoComplete="off"
                      onChange={e => {
                        setSelectedDistrictSekarang(e.target.value);
                        setFieldValue(e.target.name, e.target.value);
                      }}>
                      <option value="0">Pilih Kecamatan</option>
                      {districtsSekarang.map(item => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.district}
                          </option>
                        );
                      })}
                    </Select>
                  </div> */}
                  {/* <div className="col-lg-4">
                    <Select
                      disabled={selectedDistrictSekarang === '' ? true : false}
                      name="kelurahan_sekarang"
                      label="Kelurahan Sekarang"
                      value={selectedVillageSekarang}
                      autoComplete="off"
                      onChange={e => {
                        setSelectedVillageSekarang(e.target.value);
                        setFieldValue(e.target.name, e.target.value);
                      }}>
                      <option value="0">Pilih Kelurahan</option>
                      {villagesSekarang.map(item => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.village}
                          </option>
                        );
                      })}
                    </Select>
                  </div> */}
                  {/* <div className="col-lg-4">
                    <label>Salin Alamat KTP</label>
                    <button
                      type="button"
                      onClick={() => {
                        setAlamatSekarang(alamatKTP);
                        setProvincesSekarang(provincesKTP);
                        setRegenciesSekarang(regenciesKTP);
                        setDistrictsSekarang(districtsSekarang);
                        setVillagesSekarang(villagesSekarang);

                        setSelectedProvinceSekarang(selectedProvinceKTP);
                        setSelectedRegencySekarang(selectedRegencyKTP);
                        setSelectedDistrictSekarang(selectedDistrictKTP);
                        setSelectedVillageSekarang(selectedVillageKTP);

                        // values.alamat_sekarang = alamatKTP;
                        // values.provinsi_sekarang = selectedProvinceKTP;
                        // values.kota_sekarang = selectedRegencyKTP;
                        // values.kecamatan_sekarang = selectedDistrictKTP;
                        // values.kelurahan_sekarang = selectedVillageKTP;

                        setAlamatSekarang(alamatKTP);
                        setSelectedProvinceSekarang(selectedProvinceKTP);
                        setSelectedRegencySekarang(selectedRegencyKTP);
                        setSelectedDistrictSekarang(selectedDistrictKTP);
                        setSelectedVillageSekarang(selectedVillageKTP);

                        setFieldValue('alamat_sekarang', alamatKTP);
                        setFieldValue('provinsi_sekarang', selectedProvinceKTP);
                        setFieldValue('kota_sekarang', selectedRegencyKTP);
                        setFieldValue('kecamatan_sekarang', selectedDistrictKTP);
                        setFieldValue('kelurahan_sekarang', selectedVillageKTP);
                      }}
                      className="btn btn-success btn-elevate form-control">
                      Salin
                    </button>
                  </div> */}
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
                onClick={() => handleSubmit()}
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
