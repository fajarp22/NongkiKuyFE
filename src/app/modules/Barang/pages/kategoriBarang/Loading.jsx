// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { Component } from 'react';

// import "./loading.css";

export default class Loading extends Component {
  render() {
    return (
      <div className="rg-loader">
        <h2>
          <span className="label label-danger">
            {/* <i className="fa fa-spinner fa-spin" /> */}
            Loading{' '}
          </span>{' '}
        </h2>{' '}
      </div>
    );
  }
}
