// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { object } from 'prop-types';

export default class NavigationBar extends Component {
  render() {
    return (
      <div className="page-bar">
        <ul className="page-breadcrumb">
          <li>
            <i className="fa fa-home" />
            <Link to="/"> Home </Link> <i className="fa fa-angle-right" />
          </li>{' '}
          <li>
            <Link to={this.props.parentMenu.url}> {this.props.parentMenu.name} </Link>{' '}
            <i className="fa fa-angle-right" />
          </li>{' '}
          <li>
            <Link to={this.props.childMenu.url}> {this.props.childMenu.name} </Link>{' '}
          </li>{' '}
        </ul>{' '}
      </div>
    );
  }
}

NavigationBar.propTypes = {
  parentMenu: object,
  childMenu: object
};
