import React from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, Select, DatePickerField } from '../../../../../../_metronic/_partials/controls';

// Validation schema
const CustomerEditSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Firstname is required'),
  lastName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Lastname is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  userName: Yup.string().required('Username is required'),
  dateOfBbirth: Yup.mixed()
    .nullable(false)
    .required('Date of Birth is required'),
  ipAddress: Yup.string().required('IP Address is required')
});

export function CustomerShowForm({ saveCustomer, customer, actionsLoading, onHide }) {
  return (
    <>
      <Modal.Body className="overlay overlay-block cursor-default">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th scope="row">Nama Nasabah</th>
              <td>{customer.nama_nasabah}</td>
            </tr>
            <tr>
              <th scope="row">Identitas</th>
              <td>
                {customer.nomor_identitas} ({customer.tipe_identitas})
              </td>
            </tr>
            <tr>
              <th scope="row">Tempat / Tanggal Lahir</th>
              <td>
                {customer.tempat_lahir} / {customer.tanggal_lahir}
              </td>
            </tr>
            <tr>
              <th scope="row">Nomor Telepon Aktif</th>
              <td>{customer.nomor_telepon_rumah}</td>
            </tr>
            <tr>
              <th scope="row">Nomor Handphone Aktif</th>
              <td>{customer.nomor_hp}</td>
            </tr>
            <tr>
              <th scope="row">Ibu Kandung</th>
              <td>{customer.nama_ibu_kandung}</td>
            </tr>
            <tr>
              <th scope="row">Nama darurat yang dapat dihubungi</th>
              <td>{customer.nama_darurat}</td>
            </tr>
            <tr>
              <th scope="row">Nomor darurat yang dapat dihubungi</th>
              <td>{customer.nomor_hp_darurat}</td>
            </tr>
            <tr>
              <th scope="row">Status hubungan dengan nama darurat</th>
              <td>{customer.status_hubungan}</td>
            </tr>
            <tr>
              <th scope="row">Alamat KTP</th>
              <td>{customer.alamat_ktp}</td>
            </tr>
            <tr>
              <th scope="row">Alamat Domisili</th>
              <td>{customer.alamat_sekarang}</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={onHide} className="btn btn-light btn-elevate">
          Kembali
        </button>
      </Modal.Footer>
    </>
  );
}

// export function CustomerShowForm({
//   saveCustomer,
//   customer,
//   actionsLoading,
//   onHide,
// }) {
//   return (
//     <>
//       <Formik
//         enableReinitialize={true}
//         initialValues={customer}
//         validationSchema={CustomerEditSchema}
//         onSubmit={(values) => {
//           saveCustomer(values);
//         }}
//       >
//         {({ handleSubmit }) => (
//           <>
//             <Modal.Body className="overlay overlay-block cursor-default">
//               {actionsLoading && (
//                 <div className="overlay-layer bg-transparent">
//                   <div className="spinner spinner-lg spinner-success" />
//                 </div>
//               )}
//               <Form className="form form-label-right">
//                 <div className="form-group row">
//                   {/* First Name */}
//                   <div className="col-lg-4">
//                     <Field
//                       name="firstName"
//                       component={Input}
//                       placeholder="First Name"
//                       label="First Name"
//                     />
//                   </div>
//                 </div>
//               </Form>
//             </Modal.Body>
//             <Modal.Footer>
//               <button
//                 type="button"
//                 onClick={onHide}
//                 className="btn btn-light btn-elevate"
//               >
//                 Kembali
//               </button>
//               <> </>
//             </Modal.Footer>
//           </>
//         )}
//       </Formik>
//     </>
//   );
// }
