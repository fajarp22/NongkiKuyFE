import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import * as auth from '../_redux/authRedux';

function ForgotPassword() {
  const isRequested = false;
  return (
    <>
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: 'block' }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="text-danger font-size-h1">Lupa Password ?</h3>
            <div className="font-weight-bold">
              Silahkan hubungi bagian <strong>Staff IT</strong>
            </div>
          </div>
          <form>
            <div className="form-group d-flex flex-wrap flex-center">
              <Link to="/auth">
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4">
                  Kembali
                </button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
