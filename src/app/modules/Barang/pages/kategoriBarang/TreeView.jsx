// 👉🏻 https://linktr.ee/rifqiahmad.f

import React, { Component } from 'react';
import { object, func, arrayOf } from 'prop-types';

// import "./treeview.css";

export default class Treeview extends Component {
  static propTypes = {
    data: arrayOf(object),
    onClickNode: func
  };

  static defaultProps = {
    data: null,
    onClickNode: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedId: 0
    };
  }

  onClickNode = id => () => {
    if (this.state.selectedId !== id) {
      this.setState({
        selectedId: id
      });
    } else {
      this.setState({
        selectedId: 0
      });
    }
    this.props.onClickNode(id);
  };

  renderList = data => {
    return (
      <ul className="list-group">
        {' '}
        {data.map((item, index) => {
          return (
            <li className={`list-group-item`} key={`list-${item.id}`}>
              <span
                className={item.id === this.state.selectedId ? 'active' : ''}
                onClick={this.onClickNode(item.id)}>
                {item.text}{' '}
              </span>{' '}
              {item.children && item.children.length > 0 && this.renderList(item.children)}{' '}
            </li>
          );
        })}{' '}
      </ul>
    );
  };

  render() {
    return <div className="treeview"> {this.renderList(this.props.data)} </div>;
  }
}
