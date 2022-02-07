// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, Select, DatePickerField } from '../../../../../../_metronic/_partials/controls';

// LOCATION API
import * as location from '../../../../../_redux/locations/locationsCrud';

// Validation schema
const CustomerEditSchema = Yup.object().shape({
  nama_nasabah: Yup.string().required('Perlu diisi.'),
  // tipe_identitas: Yup.string().required("Perlu diisi."),
  nomor_identitas: Yup.string().required('Perlu diisi.'),
  tempat_lahir: Yup.string().required('Perlu diisi.'),
  tanggal_lahir: Yup.mixed().required('Perlu diisi.'),
  nomor_hp: Yup.string().required('Perlu diisi.'),
  nomor_telepon_rumah: Yup.string().required('Perlu diisi.'),
  nama_ibu_kandung: Yup.string().required('Perlu diisi.'),
  nama_darurat: Yup.string().required('Perlu diisi.'),
  nomor_hp_darurat: Yup.string().required('Perlu diisi.'),
  // status_hubungan: Yup.string().required("Perlu diisi."),
  alamat_ktp: Yup.string().required('Perlu diisi.'),
  // provinsi_ktp: Yup.string().required("Perlu diisi."),
  // kota_ktp: Yup.string().required("Perlu diisi."),
  // kecamatan_ktp: Yup.string().required("Perlu diisi."),
  // kelurahan_ktp: Yup.string().required("Perlu diisi."),
  alamat_sekarang: Yup.string().required('Perlu diisi.')
  // provinsi_sekarang: Yup.string().required("Perlu diisi."),
  // kota_sekarang: Yup.string().required("Perlu diisi."),
  // kecamatan_sekarang: Yup.string().required("Perlu diisi."),
  // kelurahan_sekarang: Yup/.string().required("Perlu diisi."),
});

export function CustomerEditForm({ saveCustomer, customer, actionsLoading, onHide }) {
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
  const [selectedRegencySekarang, setSelectedRegencySekarang] = useState('');
  const [selectedDistrictSekarang, setSelectedDistrictSekarang] = useState('');
  const [selectedVillageSekarang, setSelectedVillageSekarang] = useState('');

  const [alamatKTP, setAlamatKTP] = useState('');
  const [alamatSekarang, setAlamatSekarang] = useState('');

  // INITIAL VALUE
  useEffect(() => {
    if (customer.id !== undefined) {
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
  }, [
    customer.id,
    customer.alamat_ktp,
    customer.alamat_sekarang,
    customer.provinsi_ktp,
    customer.kota_ktp,
    customer.kecamatan_ktp,
    customer.kelurahan_ktp,
    customer.provinsi_sekarang,
    customer.kota_sekarang,
    customer.kecamatan_sekarang,
    customer.kelurahan_sekarang
  ]);

  // KTP
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

  // SEKARANG
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
          saveCustomer(values);
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
                <h4 className="text-primary">Identitas Personal</h4>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="nama_nasabah"
                      component={Input}
                      placeholder="Nama Nasabah"
                      label="Nama Nasabah"
                      withFeedbackLabel={false}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select name="tipe_identitas" label="Tipe Identitas">
                      <option value="0">Pilih Identitas</option>
                      <option value="KTP">KTP</option>
                      <option value="NPWP">NPWP</option>
                      <option value="SIM">SIM</option>
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="nomor_identitas"
                      component={Input}
                      placeholder="Nomor Identitas"
                      label="Nomor Identitas"
                      withFeedbackLabel={false}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="tempat_lahir"
                      component={Input}
                      placeholder="Tempat Lahir"
                      label="Tempat Lahir"
                      withFeedbackLabel={false}
                    />
                  </div>
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy/MM/dd"
                      name="tanggal_lahir"
                      label="Tanggal Lahir"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="nomor_hp"
                      component={Input}
                      placeholder="Nomor HP"
                      label="Nomor HP"
                      withFeedbackLabel={false}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="nomor_telepon_rumah"
                      component={Input}
                      placeholder="Telepon Rumah"
                      label="Telepon Rumah"
                      withFeedbackLabel={false}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="nama_ibu_kandung"
                      component={Input}
                      placeholder="Nama Ibu Kandung"
                      label="Nama Ibu Kandung"
                      withFeedbackLabel={false}
                    />
                  </div>
                </div>

                <br />
                <h4 className="text-primary">Keadaan Darurat</h4>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="nama_darurat"
                      component={Input}
                      placeholder="Nama yang Dapat Dihubungi"
                      label="Nama yang Dapat Dihubungi"
                      withFeedbackLabel={false}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="nomor_hp_darurat"
                      component={Input}
                      placeholder="Nomor HP Darurat"
                      label="Nomor HP Darurat"
                      withFeedbackLabel={false}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select name="status_hubungan" label="Status Hubungan">
                      <option value="0">Pilih Status Hubungan</option>
                      <option value="ORANGTUA">Orangtua</option>
                      <option value="SAUDARA KANDUNG">Saudara Kandung</option>
                      <option value="SUAMI / ISTRI">Suami / Istri</option>
                    </Select>
                  </div>
                </div>

                <br />
                <h4 className="text-primary">Alamat KTP</h4>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="alamat_ktp"
                      component={Input}
                      placeholder="Alamat KTP"
                      label="Alamat"
                      withFeedbackLabel={false}
                      value={alamatKTP}
                      onChange={e => {
                        setAlamatKTP(e.target.value);
                        setFieldValue(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select
                      name="provinsi_ktp"
                      label="Provinsi KTP"
                      value={selectedProvinceKTP}
                      onChange={e => {
                        setSelectedProvinceKTP(e.target.value);
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
                      label="Kota KTP"
                      value={selectedRegencyKTP}
                      onChange={e => {
                        setSelectedRegencyKTP(e.target.value);
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
                      label="Kecamatan KTP"
                      value={selectedDistrictKTP}
                      onChange={e => {
                        setSelectedDistrictKTP(e.target.value);
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
                      label="Kelurahan KTP"
                      value={selectedVillageKTP}
                      onChange={e => {
                        setSelectedVillageKTP(e.target.value);
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
                <h4 className="text-primary">Alamat Sekarang</h4>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="alamat_sekarang"
                      component={Input}
                      placeholder="Alamat Sekarang"
                      label="Alamat"
                      withFeedbackLabel={false}
                      value={alamatSekarang}
                      onChange={e => {
                        setAlamatSekarang(e.target.value);
                        setFieldValue(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select
                      name="provinsi_sekarang"
                      label="Provinsi Sekarang"
                      value={selectedProvinceSekarang}
                      onChange={e => {
                        setSelectedProvinceSekarang(e.target.value);
                        setFieldValue(e.target.name, e.target.value);
                      }}>
                      <option value="0">Pilih Provinsi</option>
                      {provincesSekarang.map(item => {
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
                      disabled={selectedProvinceSekarang === '' ? true : false}
                      name="kota_sekarang"
                      label="Kota Sekarang"
                      value={selectedRegencySekarang}
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
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select
                      disabled={selectedRegencySekarang === '' ? true : false}
                      name="kecamatan_sekarang"
                      label="Kecamatan Sekarang"
                      value={selectedDistrictSekarang}
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
                  </div>
                  <div className="col-lg-4">
                    <Select
                      disabled={selectedDistrictSekarang === '' ? true : false}
                      name="kelurahan_sekarang"
                      label="Kelurahan Sekarang"
                      value={selectedVillageSekarang}
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
                  </div>
                  <div className="col-lg-4">
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

                        values.alamat_sekarang = alamatKTP;
                        values.provinsi_sekarang = selectedProvinceKTP;
                        values.kota_sekarang = selectedRegencyKTP;
                        values.kecamatan_sekarang = selectedDistrictKTP;
                        values.kelurahan_sekarang = selectedVillageKTP;
                      }}
                      className="btn btn-success btn-elevate form-control">
                      Salin
                    </button>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" onClick={onHide} className="btn btn-light btn-elevate">
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate">
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
