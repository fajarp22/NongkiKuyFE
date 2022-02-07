// 👉🏻 https://linktr.ee/rifqiahmad.f

/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import * as _ from 'lodash';
import tools from './tools';
import * as helperCategoryAPI from './catAPI';
import { Card, CardBody, CardHeader } from '../../../../../_metronic/_partials/controls';
import { DropDown } from './DropDown';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../../../../_metronic/_helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DEFAULT_INDICATOR_LIST = [
  {
    categoryId: 0,
    id: 0,
    indicatorName: '',
    indicatorchoices: [
      {
        choiceName: '',
        decrement: '',
        id: 0,
        indicatorId: 0,
        sequence: 0
      }
    ],
    sequence: 0
  }
];

export class kategoriBarangPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfIndicator: DEFAULT_INDICATOR_LIST,
      categoryId: 0,
      dataCategory: [],
      dataTreeCategory: [],
      loading: true,
      selectedData: {
        categoryName: '',
        parentId: 0,
        sequence: 0
      }
    };
    this.notify = this.notify.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeChoiceName = this.handleChangeChoiceName.bind(this);
    this.handleChangeDecrement = this.handleChangeDecrement.bind(this);
    this.handleChangeIndicator = this.handleChangeIndicator.bind(this);
  }

  componentDidMount() {
    helperCategoryAPI.getTreeView().then(result => {
      let map = {};
      let node;
      let roots = [];

      result.forEach((item, idx) => {
        map[result[idx].id] = idx;
        result[idx].children = [];
      });

      result.forEach((item, idx) => {
        node = result[idx];
        if (node.parentId !== 0) {
          result[map[node.parentId]].children.push(node);
        } else {
          roots.push(node);
        }
      });

      this.setState({ dataTreeCategory: roots });
    });

    helperCategoryAPI.getAll().then(result => {
      this.setState({
        dataCategory: result.data[0] || [],
        loading: false
      });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.listOfIndicator !== prevState.listOfIndicator) {
      this.fetchAllData();
    }
  }

  notify = status => {
    if (status === 'success') {
      toast.success('Berhasil Mengubah Data Kategori', {
        position: 'bottom-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
    } else if (status === 'failed') {
      toast.error('Gagal Mengubah Data Kategori', {
        position: 'bottom-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
    }
  };

  fetchAllData = () => {
    this.setState({ loading: true });
    helperCategoryAPI.getTreeView().then(result => {
      let map = {};
      let node;
      let roots = [];

      result.forEach((item, idx) => {
        map[result[idx].id] = idx;
        result[idx].children = [];
      });

      result.forEach((item, idx) => {
        node = result[idx];
        if (node.parentId !== 0) {
          result[map[node.parentId]].children.push(node);
        } else {
          roots.push(node);
        }
      });

      this.setState({ dataTreeCategory: roots });
    });

    helperCategoryAPI.getAll().then(result => {
      this.setState({
        dataCategory: result.data[0] || [],
        loading: false
      });
    });
  };

  handleChange = e => {
    const { selectedData } = this.state;
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      selectedData: { ...selectedData, [name]: value, loading: false }
    });
  };

  handleChangeIndicator = e => {
    let { listOfIndicator } = this.state;
    const name = e.target.name;
    const value = e.target.value;
    const index = name.split('-')[1];
    const temp = listOfIndicator[index];
    listOfIndicator[index] = {
      ...temp,
      indicatorName: value
    };

    this.setState({
      listOfIndicator: listOfIndicator
    });
  };

  handleChangeChoiceName = e => {
    let { listOfIndicator } = this.state;
    const name = e.target.name;
    const value = e.target.value;
    const [indicatorIndex, choiceIndex] = name.split('-');
    let tempIndicator = listOfIndicator[indicatorIndex];
    let tempChoice = tempIndicator.indicatorchoices[choiceIndex];
    tempIndicator.indicatorchoices[choiceIndex] = {
      ...tempChoice,
      choiceName: value
    };
    listOfIndicator[indicatorIndex] = tempIndicator;

    this.setState({
      listOfIndicator: listOfIndicator
    });
  };

  handleChangeDecrement = e => {
    let { listOfIndicator } = this.state;
    const name = e.target.name;
    const value = e.target.value;
    const newValue = tools.rmThousandSeparator(value);
    const [indicatorIndex, choiceIndex] = name.split('-');
    let tempIndicator = listOfIndicator[indicatorIndex];
    let tempChoice = tempIndicator.indicatorchoices[choiceIndex];
    tempIndicator.indicatorchoices[choiceIndex] = {
      ...tempChoice,
      decrement: newValue
    };
    listOfIndicator[indicatorIndex] = tempIndicator;

    this.setState({
      listOfIndicator: listOfIndicator
    });
  };

  handleClickNode = id => {
    if (id !== 0) {
      helperCategoryAPI.getOne(id).then(result => {
        this.setState(prevState => ({
          categoryId: id,
          selectedData: result.data[0][0] || [],
          loading: false
        }));
      });
      helperCategoryAPI.getIndicatorByCategory(id).then(result => {
        const indicators = _.get(result, 'data[0].categoryindicators') || [];
        this.setState({ listOfIndicator: indicators });
      });
    } else {
      this.setState({
        categoryId: 0,
        selectedData: { categoryName: '', parentId: 0, sequence: 0 },
        loading: false,
        listOfIndicator: DEFAULT_INDICATOR_LIST
      });
    }
  };

  handleClickAddChoice = e => {
    let { listOfIndicator } = this.state;
    const index = parseInt(e.currentTarget.dataset.id, 10);
    const objChoice = {
      choiceName: '',
      decrement: '',
      id: 0,
      indicatorId: 0,
      sequence: 0
    };
    listOfIndicator[index].indicatorchoices.push(objChoice);
    this.setState({ listOfIndicator: listOfIndicator });
  };

  handleClickRemoveChoice = e => {
    let { listOfIndicator } = this.state;
    const index = parseInt(e.currentTarget.dataset.id, 10);
    const length = listOfIndicator[index].indicatorchoices.length;
    if (length > 1) {
      listOfIndicator[index].indicatorchoices.pop();
    }
    this.setState({ listOfIndicator: listOfIndicator });
  };

  handleClickAddIndicator = () => {
    let { listOfIndicator, categoryId } = this.state;
    const objIndicator = {
      categoryId: categoryId,
      indicatorName: '',
      indicatorchoices: [
        {
          choiceName: '',
          decrement: '',
          id: 0,
          indicatorId: 0,
          sequence: 0
        }
      ],
      sequence: 0
    };
    listOfIndicator.push(objIndicator);

    this.setState({ listOfIndicator: listOfIndicator });
  };

  handleClickRemoveIndicator = () => {
    let { listOfIndicator } = this.state;
    if (listOfIndicator.length > 1) {
      listOfIndicator.pop();
    }
    this.setState({ listOfIndicator: listOfIndicator });
  };

  handleSave = () => {
    const { categoryId, listOfIndicator, selectedData } = this.state;
    this.setState({ loading: true });
    if (categoryId) {
      const variables = {
        itemCategoryId: categoryId,
        parentId: parseInt(selectedData.parentId, 10),
        categoryName: selectedData.categoryName,
        sequence: parseInt(selectedData.sequence, 10),
        categoryIndicators: listOfIndicator.map((result, index) => {
          return {
            indicatorName: result.indicatorName,
            sequence: index + 1,
            indicatorChoices: result.indicatorchoices.map((res, idx) => {
              return {
                choiceName: res.choiceName,
                decrement: res.decrement,
                sequence: idx + 1
              };
            })
          };
        })
      };
      helperCategoryAPI
        .updateIndicatorTree(variables)
        .then(result => {
          if (result.status === 'SUCCESS') {
            this.setState({
              categoryId: 0,
              selectedData: {
                categoryName: '',
                parentId: 0,
                sequence: 0
              },
              loading: false,
              listOfIndicator: DEFAULT_INDICATOR_LIST
            });
            this.notify('success');
            this.fetchAllData();
          } else {
            this.notify('failed');
            this.setState({ loading: false });
          }
        })
        .catch(err => {
          this.setState({ loading: false });
        });
    } else {
      // create
      this.setState({ loading: false });
    }
  };

  renderIndicator = () => {
    const { listOfIndicator } = this.state;
    return (
      <>
        <table className="table table-borderless table-hover table-sm">
          <thead>
            <tr>
              <th>Indikator</th>
              <th>Pilihan</th>
              <th>Pengurangan</th>
            </tr>
          </thead>
          <tbody className="table-borderless">
            {listOfIndicator.map((indicator, idx) => {
              const indicatorLen = indicator.indicatorchoices.length ?? 0;
              return (
                <tr key={idx}>
                  <td>
                    <table className="table table-borderless table-sm">
                      <tbody>
                        <tr key={`indicator-${idx}-${indicator.id}`}>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={indicator.indicatorName}
                              name={`indicator-${idx}`}
                              onChange={this.handleChangeIndicator}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <table className="table-borderless table-sm">
                      <tbody>
                        {indicator.indicatorchoices.map((choice, cIdx) => {
                          return (
                            <tr key={`choice-${cIdx}-${choice.id}`}>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name={`${idx}-${cIdx}`}
                                  value={choice.choiceName}
                                  onChange={this.handleChangeChoiceName}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <table className="table-borderless table-sm">
                      <tbody>
                        {indicator.indicatorchoices.map((choice, cIdx) => {
                          return (
                            <tr key={`decrement-${cIdx}-${choice.id}`}>
                              <td>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name={`${idx}-${cIdx}`}
                                    value={choice.decrement}
                                    onChange={this.handleChangeDecrement}
                                  />
                                  {indicatorLen - 1 === cIdx && (
                                    <a
                                      className="btn btn-icon btn-warning btn-sm mx-2"
                                      data-id={idx}
                                      onClick={this.handleClickRemoveChoice}>
                                      <span className="svg-icon svg-icon-md svg-icon">
                                        <SVG
                                          src={toAbsoluteUrl('/media/svg/icons/Code/Minus.svg')}
                                        />
                                      </span>
                                    </a>
                                  )}
                                  {indicatorLen - 1 === cIdx && (
                                    <a
                                      className="btn btn-icon btn-primary btn-sm"
                                      data-id={idx}
                                      onClick={this.handleClickAddChoice}>
                                      <span className="svg-icon svg-icon-md svg-icon">
                                        <SVG
                                          src={toAbsoluteUrl('/media/svg/icons/Code/Plus.svg')}
                                        />
                                      </span>
                                    </a>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={3}>
                <button
                  disabled={listOfIndicator.length === 0}
                  className="btn btn-warning ml-1 mr-3 btn-lg"
                  onClick={this.handleClickRemoveIndicator}>
                  <i className="fa fa-minus" /> Indikator
                </button>
                <button
                  disabled={listOfIndicator.length === 0}
                  className="btn btn-success mx-1 btn-lg"
                  onClick={this.handleClickAddIndicator}>
                  <i className="fa fa-plus" /> Indikator
                </button>
                <button
                  disabled={listOfIndicator.length === 0}
                  className="btn btn-primary mx-3 btn-lg"
                  onClick={this.handleSave}>
                  <i className="fa fa-save" /> Simpan
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };

  renderForm = () => {
    return <>{this.renderIndicator()}</>;
  };

  render() {
    return (
      <>
        <ToastContainer
          position="bottom-center"
          autoClose={1500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Card>
          <CardHeader title="Data Kategori Barang" />
          <CardBody>
            <div className="row">
              <div className="col-xl-8">
                <DropDown data={this.state.dataTreeCategory} onClickNode={this.handleClickNode} />
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Tambah/Ubah Kategori Barang" />
          <CardBody>
            <div className="row">
              <div className="col-xl-8">{this.renderForm()}</div>
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
}
