/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { ContentRoute } from '../../../../_metronic/layout';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import '../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss';

export function AuthPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login">
          <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden">
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute path="/auth/forgot-password" component={ForgotPassword} />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
