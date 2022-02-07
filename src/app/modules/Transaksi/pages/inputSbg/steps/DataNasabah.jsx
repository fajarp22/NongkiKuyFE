// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  CardFooter
} from '../../../../../../_metronic/_partials/controls/Card';
import { Form, Col, Button } from 'react-bootstrap';
import ModalDataNasabah from './ModalDataNasabah';
import { getMonth, getYear } from 'date-fns';
import range from 'lodash/range';
import DatePicker from 'react-datepicker';
import * as transactionAPI from '../../../api/transactionAPI';

const DataNasabah = function(props) {
  const [show, setShow] = useState(false);
  const [customer, setCustomer] = useState({
    _id: '',
    nama_nasabah: '',
    identitasKtp: '',
    identitasSim: '',
    identitasNpwp: '',
    tempat_lahir: '',
    nomor_telepon_rumah: '',
    nomor_hp: '',
    nama_ibu_kandung: '',
    nama_darurat: '',
    nomor_hp_darurat: '',
    status_hubungan: '',
    alamat_ktp: '',
    provinsi_ktp: '',
    kota_ktp: '',
    kecamatan_ktp: '',
    kelurahan_ktp: '',
    alamat_sekarang: '',
    provinsi_sekarang: '',
    kota_sekarang: '',
    kecamatan_sekarang: '',
    kelurahan_sekarang: '',
    modifiedBy: '',
    tanggal_lahir: Date.now()
  });

  const [provincesKTP, setProvincesKTP] = useState([]);
  const [regenciesKTP, setRegenciesKTP] = useState([]);
  const [districtsKTP, setDistrictsKTP] = useState([]);
  const [villagesKTP, setVillagesKTP] = useState([]);
  const [provincesSekarang, setProvincesSekarang] = useState([]);
  const [regenciesSekarang, setRegenciesSekarang] = useState([]);
  const [districtsSekarang, setDistrictsSekarang] = useState([]);
  const [villagesSekarang, setVillagesSekarang] = useState([]);
  const [id, setId] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [noKtp, setNoKtp] = useState('');
  const [noSim, setNoSim] = useState('');
  const [noNpwp, setNoNpwp] = useState('');
  const [nomorHp, setNomorHp] = useState('');
  const [teleponRumah, setTeleponRumah] = useState('');
  const [ibuKandung, setIbuKandung] = useState('');
  const [namaDarurat, setNamaDarurat] = useState('');
  const [nomorDarurat, setNomorDarurat] = useState('');
  const [hubungan, setHubungan] = useState('');
  const [alamatKTP, setAlamatKTP] = useState('');
  const [selectedProvinceKTP, setSelectedProvinceKTP] = useState('');
  const [selectedRegencyKTP, setSelectedRegencyKTP] = useState('');
  const [selectedDistrictKTP, setSelectedDistrictKTP] = useState('');
  const [selectedVillageKTP, setSelectedVillageKTP] = useState('');
  const [alamatSekarang, setAlamatSekarang] = useState('');
  const [selectedProvinceSekarang, setSelectedProvinceSekarang] = useState('');
  const [selectedRegencySekarang, setSelectedRegencySekarang] = useState('');
  const [selectedDistrictSekarang, setSelectedDistrictSekarang] = useState('');
  const [selectedVillageSekarang, setSelectedVillageSekarang] = useState('');

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCustomer = customer => {
    setCustomer(customer);
  };
  const handleSave = useCallback(() => {
    if (customer._id) {
      setId(customer._id);
      setNamaLengkap(customer.nama_nasabah);
      setNoKtp(customer.identitasKtp);
      setNoSim(customer.identitasSim);
      setNoNpwp(customer.identitasNpwp);
      setTempatLahir(customer.tempat_lahir);
      setTanggalLahir(new Date(customer.tanggal_lahir));
      setNomorHp(customer.nomor_hp);
      setTeleponRumah(customer.nomor_telepon_rumah);
      setIbuKandung(customer.nama_ibu_kandung);
      setNamaDarurat(customer.nama_darurat);
      setNomorDarurat(customer.nomor_hp_darurat);
      setHubungan(customer.status_hubungan);
      setAlamatKTP(customer.alamat_ktp);
      setSelectedProvinceKTP(customer.provinsi_ktp);
      setSelectedRegencyKTP(customer.kota_ktp);
      setSelectedDistrictKTP(customer.kecamatan_ktp);
      setSelectedVillageKTP(customer.kelurahan_ktp);
      setAlamatSekarang(customer.alamat_sekarang);
      setSelectedProvinceSekarang(customer.provinsi_sekarang);
      setSelectedRegencySekarang(customer.kota_sekarang);
      setSelectedDistrictSekarang(customer.kecamatan_sekarang);
      setSelectedVillageSekarang(customer.kelurahan_sekarang);
    }
    setShow(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer._id]);

  const handleReset = () => {
    if (localStorage.getItem('customer_id')) {
      localStorage.removeItem('customer_id');
      props.dataNasabah({});
    }
    setId('');
    setNamaLengkap('');
    setNoKtp('');
    setNoSim('');
    setNoNpwp('');
    setTempatLahir('');
    setTanggalLahir(Date.now());
    setNomorHp('');
    setTeleponRumah('');
    setIbuKandung('');
    setNamaDarurat('');
    setNomorDarurat('');
    setHubungan('');
    setAlamatKTP('');
    setSelectedProvinceKTP('');
    setSelectedRegencyKTP('');
    setSelectedDistrictKTP('');
    setSelectedVillageKTP('');
    setAlamatSekarang('');
    setSelectedProvinceSekarang('');
    setSelectedRegencySekarang('');
    setSelectedDistrictSekarang('');
    setSelectedVillageSekarang('');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted) {
        transactionAPI.getProvinces().then(response => setProvincesKTP(response));
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
        transactionAPI
          .getRegencies(selectedProvinceKTP)
          .then(response => setRegenciesKTP(response));
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
        transactionAPI.getDistricts(selectedRegencyKTP).then(response => setDistrictsKTP(response));
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
        transactionAPI.getVillages(selectedDistrictKTP).then(response => setVillagesKTP(response));
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
        transactionAPI.getProvinces().then(response => setProvincesSekarang(response));
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
        transactionAPI
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
        transactionAPI
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
        transactionAPI
          .getVillages(selectedDistrictSekarang)
          .then(response => setVillagesSekarang(response));
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
  }, [selectedDistrictSekarang]);

  useEffect(() => {
    if (localStorage.getItem('customer_id')) {
      transactionAPI.findUserId(localStorage.getItem('customer_id')).then(response => {
        setCustomer(response);
      });
      handleSave();
    }
  }, [handleSave]);

  const handleNext = () => {
    const dataCustomer = {
      nama_nasabah: namaLengkap,
      tempat_lahir: tempatLahir,
      tanggal_lahir: tanggalLahir,
      nomor_hp: nomorHp,
      nomor_telepon_rumah: teleponRumah,
      nama_ibu_kandung: ibuKandung,
      nama_darurat: namaDarurat,
      nomor_hp_darurat: nomorDarurat,
      status_hubungan: hubungan,
      alamat_ktp: alamatKTP,
      provinsi_ktp: selectedProvinceKTP,
      kota_ktp: selectedRegencyKTP,
      kecamatan_ktp: selectedDistrictKTP,
      kelurahan_ktp: selectedVillageKTP,
      alamat_sekarang: alamatSekarang,
      provinsi_sekarang: selectedProvinceSekarang,
      kota_sekarang: selectedRegencySekarang,
      kecamatan_sekarang: selectedDistrictSekarang,
      kelurahan_sekarang: selectedVillageSekarang,
      identitasKtp: noKtp,
      identitasSim: noSim,
      identitasNpwp: noNpwp,
      modifiedBy: props.user._id
    };
    if (id) {
      transactionAPI.editUser(id, dataCustomer).then(response => {
        if (response.status === 'error') {
          props.notify('error', 'Silahkan cek kembali data nasabah yang dipakai.');
        } else {
          localStorage.setItem('customer_id', response._id);
          props.dataNasabah(response._id);
          props.nextStep();
        }
      });
    } else {
      transactionAPI.createUser(dataCustomer).then(response => {
        if (response.status === 'error') {
          props.notify('error', 'Silahkan cek kembali form inputan data nasabah.');
        } else {
          localStorage.setItem('customer_id', response._id);
          props.dataNasabah(response._id);
          props.nextStep();
        }
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader title="Data Nasabah">
          <CardHeaderToolbar>
            <Button className="mx-1" variant="success" onClick={handleShow}>
              Cari Nasabah
            </Button>
            <Button className="mx-1" variant="warning" onClick={handleReset}>
              Bersihkan Form
            </Button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Form>
            <h4 className="text-primary">Identitas Personal</h4>
            <Form.Row>
              <Form.Group as={Col} md="4">
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Lengkap"
                  disabled={id}
                  value={namaLengkap}
                  onChange={e => {
                    setNamaLengkap(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Tempat Lahir</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tempat Lahir"
                  disabled={id}
                  value={tempatLahir}
                  onChange={e => {
                    setTempatLahir(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Tanggal Lahir</Form.Label>
                <br />
                <DatePicker
                  disabled={id}
                  className="form-control"
                  renderCustomHeader={({ date, changeYear, changeMonth }) => (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center'
                      }}>
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
                        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
                        {months.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  selected={tanggalLahir}
                  onChange={date => {
                    setTanggalLahir(date);
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="4">
                <Form.Label>Nomor KTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nomor KTP"
                  disabled={id}
                  value={noKtp}
                  onChange={e => {
                    setNoKtp(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Nomor SIM</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nomor SIM"
                  disabled={id}
                  value={noSim}
                  onChange={e => {
                    setNoSim(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Nomor NPWP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nomor NPWP"
                  disabled={id}
                  value={noNpwp}
                  onChange={e => {
                    setNoNpwp(e.target.value);
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="4">
                <Form.Label>Nomor HP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nomor HP"
                  // disabled={id}
                  value={nomorHp}
                  onChange={e => {
                    setNomorHp(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Telepon Rumah</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Telepon Rumah"
                  // disabled={id}
                  value={teleponRumah}
                  onChange={e => {
                    setTeleponRumah(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Nama Ibu Kandung</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Ibu Kandung"
                  disabled={id}
                  value={ibuKandung}
                  onChange={e => {
                    setIbuKandung(e.target.value);
                  }}
                />
              </Form.Group>
            </Form.Row>
            <h4 className="text-primary">Keadaan Darurat</h4>
            <Form.Row>
              <Form.Group as={Col} md="4">
                <Form.Label>Nama yang Dapat Dihubungi</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama yang Dapat Dihubungi"
                  // disabled={id}
                  value={namaDarurat}
                  onChange={e => {
                    setNamaDarurat(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Nomor Darurat</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nomor Darurat"
                  // disabled={id}
                  value={nomorDarurat}
                  onChange={e => {
                    setNomorDarurat(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Status Hubungan</Form.Label>
                <Form.Control
                  as="select"
                  // disabled={id}
                  value={hubungan}
                  onChange={e => {
                    setHubungan(e.target.value);
                  }}>
                  <option value="0">Pilih Status Hubungan</option>
                  <option value="ORANGTUA">Orangtua</option>
                  <option value="SAUDARA KANDUNG">Saudara Kandung</option>
                  <option value="SUAMI / ISTRI">Suami / Istri</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <h4 className="text-primary">Alamat KTP</h4>
            <Form.Row>
              <Form.Group as={Col} md="4">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Alamat KTP"
                  disabled={id}
                  value={alamatKTP}
                  onChange={e => {
                    setAlamatKTP(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Provinsi KTP</Form.Label>
                <Form.Control
                  as="select"
                  disabled={id}
                  value={selectedProvinceKTP}
                  onChange={e => {
                    setSelectedProvinceKTP(e.target.value);
                    setSelectedRegencyKTP('');
                    setSelectedDistrictKTP('');
                    setSelectedVillageKTP('');
                    setRegenciesKTP([]);
                    setDistrictsKTP([]);
                    setVillagesKTP([]);
                  }}>
                  <option value="">Pilih Provinsi</option>
                  {provincesKTP.map(item => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.province}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Kota KTP</Form.Label>
                <Form.Control
                  as="select"
                  disabled={id}
                  value={selectedRegencyKTP}
                  onChange={e => {
                    setSelectedRegencyKTP(e.target.value);
                    setSelectedDistrictKTP('');
                    setSelectedVillageKTP('');
                    setDistrictsKTP([]);
                    setVillagesKTP([]);
                  }}>
                  <option value="">Pilih Kota</option>
                  {regenciesKTP.map(item => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.regency}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="4">
                <Form.Label>Kecamatan KTP</Form.Label>
                <Form.Control
                  as="select"
                  disabled={id}
                  value={selectedDistrictKTP}
                  onChange={e => {
                    setSelectedDistrictKTP(e.target.value);
                    setSelectedVillageKTP('');
                    setVillagesKTP([]);
                  }}>
                  <option value="">Pilih Kecamatan</option>
                  {districtsKTP.map(item => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.district}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Kelurahan KTP</Form.Label>
                <Form.Control
                  as="select"
                  disabled={id}
                  value={selectedVillageKTP}
                  onChange={e => {
                    setSelectedVillageKTP(e.target.value);
                  }}>
                  <option value="">Pilih Kelurahan</option>
                  {villagesKTP.map(item => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.village}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <h4 className="text-primary">Alamat Sekarang</h4>
            <Form.Row>
              <Form.Group as={Col} md="4">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Alamat Sekarang"
                  // disabled={id}
                  value={alamatSekarang}
                  onChange={e => {
                    setAlamatSekarang(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Provinsi Sekarang</Form.Label>
                <Form.Control
                  as="select"
                  // disabled={id}
                  value={selectedProvinceSekarang}
                  onChange={e => {
                    setSelectedProvinceSekarang(e.target.value);
                    setSelectedRegencySekarang('');
                    setSelectedDistrictSekarang('');
                    setSelectedVillageSekarang('');
                    setRegenciesSekarang([]);
                    setDistrictsSekarang([]);
                    setVillagesSekarang([]);
                  }}>
                  <option value="">Pilih Provinsi</option>
                  {provincesSekarang.map(item => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.province}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Kota Sekarang</Form.Label>
                <Form.Control
                  as="select"
                  // disabled={id}
                  value={selectedRegencySekarang}
                  onChange={e => {
                    setSelectedRegencySekarang(e.target.value);
                    setSelectedDistrictSekarang('');
                    setSelectedVillageSekarang('');
                    setDistrictsSekarang([]);
                    setVillagesSekarang([]);
                  }}>
                  <option value="">Pilih Kota</option>
                  {regenciesSekarang.map(item => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.regency}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="4">
                <Form.Label>Kecamatan Sekarang</Form.Label>
                <Form.Control
                  as="select"
                  // disabled={id}
                  value={selectedDistrictSekarang}
                  onChange={e => {
                    setSelectedDistrictSekarang(e.target.value);
                    setSelectedVillageSekarang('');
                    setVillagesSekarang([]);
                  }}>
                  <option value="">Pilih Kecamatan</option>
                  {districtsSekarang.map(item => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.district}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Kelurahan Sekarang</Form.Label>
                <Form.Control
                  as="select"
                  // disabled={id}
                  value={selectedVillageSekarang}
                  onChange={e => {
                    setSelectedVillageSekarang(e.target.value);
                  }}>
                  <option value="">Pilih Kelurahan</option>
                  {villagesSekarang.map(item => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.village}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Salin Alamat KTP</Form.Label>
                <Button
                  variant="success"
                  // disabled={id}
                  block
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
                  }}>
                  Salin
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </CardBody>
        <CardFooter>
          <Button
            variant="primary"
            className="float-right"
            onClick={() => {
              handleNext();
            }}>
            Selanjutnya
          </Button>
        </CardFooter>
      </Card>
      <ModalDataNasabah
        show={show}
        onHide={handleClose}
        onSave={handleSave}
        customer={handleCustomer}
      />
    </>
  );
};

export default DataNasabah;
