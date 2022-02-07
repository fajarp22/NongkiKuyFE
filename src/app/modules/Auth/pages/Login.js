import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import * as auth from '../_redux/authRedux';
import { login } from '../_redux/authCrud';

const initialValues = {
  username: '',
  password: ''
};

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD'
        })
      ),
    password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD'
        })
      )
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        login(values.username, values.password)
          .then(({ data: { authToken } }) => {
            disableLoading();

            props.login(authToken);
          })
          .catch(() => {
            setStatus(
              intl.formatMessage({
                id: 'AUTH.VALIDATION.INVALID_LOGIN'
              })
            );
          })
          .finally(() => {
            disableLoading();
            setSubmitting(false);
          });
      }, 1000);
    }
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">Enter your username and password</p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework">
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : (
          <div className="mb-10 alert alert-custom alert-light-info alert-dismissible">
            <div className="alert-text ">Silahkan isi username dan password untuk melanjutkan.</div>
          </div>
        )}

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Username"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="username"
            {...formik.getFieldProps('username')}
          />
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6`}
            name="password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot">
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}>
            <span>Sign In</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
