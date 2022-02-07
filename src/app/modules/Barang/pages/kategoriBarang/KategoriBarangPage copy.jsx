//  

import React, { Component } from 'react';
import * as _ from 'lodash';
import tools from './tools';
import { toastr } from 'react-redux-toastr';
import lang from './lang';
import Loading from './Loading';
import TreeView from './TreeView';
import * as helperCategoryAPI from './catAPI';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from '../../../../../_metronic/_partials/controls';
import { DropDown } from './DropDown';
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
      this.setState({ dataCategory: result.data[0] || [], loading: false });
    });
  }

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
      this.setState({ dataCategory: result.data[0] || [], loading: false });
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
    if (id !== this.state.categoryId) {
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
        loading: false
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
            toastr.success(lang.success, lang.successUpdate);
            this.setState({
              categoryId: 0,
              selectedData: { categoryName: '', parentId: 0, sequence: 0 },
              loading: false
            });
            this.fetchAllData();
          } else {
            toastr.error(lang.failedUpdate);
            this.setState({ loading: false });
          }
        })
        .catch(err => {
          toastr.error(lang.failedUpdate);
          this.setState({ loading: false });
        });
    } else {
      // create
      this.setState({ loading: false });
    }
  };

  renderIndicator = () => {
    const { listOfIndicator } = this.state;
    return listOfIndicator.length ? (
      <table className="table borderless">
        <thead>
          <tr>
            <th>Indikator</th>
            <th>Pilihan</th>
            <th>Pengurangan</th>
          </tr>
        </thead>
        <tbody>
          {listOfIndicator.map((indicator, idx) => {
            const indicatorLen = _.get(indicator, 'indicatorchoices', []).length;
            return (
              <tr key={`indicator-${idx}-${indicator.id}`}>
                <td className="mb-4">
                  <input
                    type="text"
                    className="form-control"
                    value={indicator.indicatorName}
                    name={`indicator-${idx}`}
                    onChange={this.handleChangeIndicator}
                  />
                </td>
                <td>
                  <table>
                    <tbody>
                      {_.get(indicator, 'indicatorchoices', []).map((choice, cIdx) => {
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
                  <table>
                    <tbody>
                      {_.get(indicator, 'indicatorchoices', []).map((choice, cIdx) => {
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
                                  <div
                                    className="input-group-addon delete-addon"
                                    data-id={idx}
                                    onClick={this.handleClickRemoveChoice}>
                                    <i className="fa fa-minus" />
                                  </div>
                                )}
                                {indicatorLen - 1 === cIdx && (
                                  <div
                                    className="input-group-addon add-addon"
                                    data-id={idx}
                                    onClick={this.handleClickAddChoice}>
                                    <i className="fa fa-plus" />
                                  </div>
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
              <button className="btn red" onClick={this.handleClickRemoveIndicator}>
                <i className="fa fa-minus" /> Indikator
              </button>
              <button className="btn green" onClick={this.handleClickAddIndicator}>
                <i className="fa fa-plus" /> Indikator
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    ) : null;
  };

  renderForm = () => {
    const { selectedData } = this.state;
    return (
      <div className="portlet light bordered">
        <div className="portlet-title">
          <div className="caption">
            <span className="caption-subject font-red bold uppercase">
              Tambah / Ubah Kategori Barang
            </span>
          </div>
        </div>
        <div className="portlet-body form">
          <div className="form-group">
            <label className="control-label">Nama Kategori</label>
            <input
              className="form-control"
              type="text"
              name="categoryName"
              value={selectedData.categoryName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label className="control-label">
              Induk Kategori{' '}
              <small className="text-default">(tidak perlu dipilih jika induk)</small>
            </label>
            <select
              className="form-control"
              name="parentId"
              value={selectedData.parentId}
              onChange={this.handleChange}>
              <option value={0}>Pilih Induk Kategori</option>
              {this.state.dataTreeCategory.map((item, index) => {
                return (
                  <option key={`category-${index}`} value={item.id}>
                    {`${item.categoryName}`}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label className="control-label">Urutan</label>
            <input
              className="form-control"
              type="text"
              name="sequence"
              value={selectedData.sequence}
              onChange={this.handleChange}
            />
          </div>

          {this.state.categoryId ? this.renderIndicator() : null}
          <div className="form-actions right">
            {/* <button className="btn red"> */}
            <button className="btn red" onClick={this.handleSave}>
              <i className="fa fa-save" /> Simpan
            </button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      // <div className="page-content-wrapper">
      //   {this.state.loading && <Loading />}
      //   <div className="page-content">
      //     <h3 className="page-title">Kategori Barang</h3>
      //     <div className="row">
      //       <div className="col-md-5">
      //         <div className="portlet light bordered">
      //           <div className="portlet-title">
      //             <div className="caption">
      //               <span className="caption-subject font-red bold uppercase">
      //                 Data Kategori Barang
      //               </span>
      //             </div>
      //           </div>
      //           <TreeView
      //             data={this.state.dataTreeCategory}
      //             onClickNode={this.handleClickNode}
      //           />
      //         </div>
      //       </div>
      //       <div className="col-md-7">{this.renderForm()}</div>
      //     </div>
      //   </div>
      // </div>

      <>
        <Card>
          <CardHeader title="Data Kategori Barang" />
          <CardBody>
            <DropDown
              importedData={this.state.dataTreeCategory}
              onClickNode={this.handleClickNode}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Tambah/Ubah Kategori Barang" />
          <CardBody>{this.renderForm()}</CardBody>
        </Card>
      </>
    );
  }
}
