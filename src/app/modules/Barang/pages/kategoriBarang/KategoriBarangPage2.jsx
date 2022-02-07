//  

import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';
import tools from './tools';
import { toastr } from 'react-redux-toastr';
import lang from './lang';
import Loading from './Loading';
import TreeView from './TreeView';
import * as helperCategoryAPI from './catAPI';

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

export default function KategoriBarangPage2() {
  const [listOfIndicator, setListOfIndicator] = useState(DEFAULT_INDICATOR_LIST);
  const [categoryId, setCategoryId] = useState(0);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataTreeCategory, setDataTreeCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState({
    categoryName: '',
    parentId: 0,
    sequence: 0
  });

  useEffect(() => {
    let unmounted = false;
    async function fetchAPI() {
      if (!unmounted) {
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
          setDataTreeCategory(roots);

          helperCategoryAPI.getAll().then(result => {
            setDataCategory(result.data[0] || []);
            setLoading(false);
          });
        });
      }
    }
    fetchAPI();
    return () => {
      unmounted = true;
    };
  }, []);

  const fetchAllData = () => {
    setLoading(true);
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

      setDataTreeCategory(roots);
    });

    helperCategoryAPI.getAll().then(result => {
      setDataCategory(result.data[0] || []);
      setLoading(false);
    });
  };

  const handleChange = e => {
    const handleSelectedData = selectedData;
    const name = e.target.name;
    const value = e.target.value;
    setSelectedData({ ...handleSelectedData, [name]: value, loading: false });
  };

  const handleChangeIndicator = e => {
    const handleListOfIndicator = listOfIndicator;
    const name = e.target.name;
    const value = e.target.value;
    const index = name.split('-')[1];
    const temp = handleListOfIndicator[index];
    handleListOfIndicator[index] = {
      ...temp,
      indicatorName: value
    };
    setListOfIndicator(handleListOfIndicator);
  };

  const handleChangeChoiceName = e => {
    const handleListOfIndicator = listOfIndicator;
    const name = e.target.name;
    const value = e.target.value;
    const [indicatorIndex, choiceIndex] = name.split('-');
    let tempIndicator = handleListOfIndicator[indicatorIndex];
    let tempChoice = tempIndicator.indicatorchoices[choiceIndex];
    tempIndicator.indicatorchoices[choiceIndex] = {
      ...tempChoice,
      choiceName: value
    };
    handleListOfIndicator[indicatorIndex] = tempIndicator;
    setListOfIndicator(handleListOfIndicator);
  };

  const handleChangeDecrement = e => {
    const handleListOfIndicator = listOfIndicator;
    const name = e.target.name;
    const value = e.target.value;
    const newValue = tools.rmThousandSeparator(value);
    const [indicatorIndex, choiceIndex] = name.split('-');
    let tempIndicator = handleListOfIndicator[indicatorIndex];
    let tempChoice = tempIndicator.indicatorchoices[choiceIndex];
    tempIndicator.indicatorchoices[choiceIndex] = {
      ...tempChoice,
      decrement: newValue
    };
    handleListOfIndicator[indicatorIndex] = tempIndicator;
    setListOfIndicator(handleListOfIndicator);
  };

  const handleClickNode = id => {
    if (id !== categoryId) {
      helperCategoryAPI.getOne(id).then(result => {
        setCategoryId(id);
        setSelectedData(result.data[0][0] || []);
        setLoading(false);
      });
      helperCategoryAPI.getIndicatorByCategory(id).then(result => {
        const indicators = _.get(result, 'data[0].categoryindicators') || [];
        setListOfIndicator(indicators);
      });
    } else {
      setCategoryId(0);
      setSelectedData({ categoryName: '', parentId: 0, sequence: 0 });
      setLoading(false);
    }
  };

  const handleClickAddChoice = e => {
    const handleListOfIndicator = listOfIndicator;
    const index = parseInt(e.currentTarget.dataset.id, 10);
    const objChoice = {
      choiceName: '',
      decrement: '',
      id: 0,
      indicatorId: 0,
      sequence: 0
    };
    handleListOfIndicator[index].indicatorchoices.push(objChoice);
    setListOfIndicator(handleListOfIndicator);
  };

  const handleClickRemoveChoice = e => {
    const handleListOfIndicator = listOfIndicator;
    const index = parseInt(e.currentTarget.dataset.id, 10);
    const length = handleListOfIndicator[index].indicatorchoices.length;
    if (length > 1) {
      handleListOfIndicator[index].indicatorchoices.pop();
    }
  };

  const handleClickAddIndicator = () => {
    const handleListOfIndicator = listOfIndicator;
    const handleCategoryId = categoryId;
    const objIndicator = {
      categoryId: handleCategoryId,
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
    handleListOfIndicator.push(objIndicator);
    setListOfIndicator(handleListOfIndicator);
  };

  const handleClickRemoveIndicator = () => {
    const handleListOfIndicator = listOfIndicator;
    if (handleListOfIndicator.length > 1) {
      handleListOfIndicator.pop();
    }
    setListOfIndicator(handleListOfIndicator);
  };

  const handleSave = () => {
    const handleCategoryId = categoryId;
    const handleListOfIndicator = listOfIndicator;
    const handleSelectedData = selectedData;
    setLoading(true);
    if (handleCategoryId) {
      const variables = {
        itemCategoryId: handleCategoryId,
        parentId: parseInt(handleSelectedData.parentId, 10),
        categoryName: handleSelectedData.categoryName,
        sequence: parseInt(handleSelectedData.sequence, 10),
        categoryIndicators: handleListOfIndicator.map((result, index) => {
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
            setCategoryId(0);
            setSelectedData({
              categoryName: '',
              parentId: 0,
              sequence: 0
            });
            setLoading(false);
            fetchAllData();
          } else {
            toastr.error(lang.failedUpdate);
            setLoading(false);
          }
        })
        .catch(err => {
          toastr.error(lang.failedUpdate);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const renderIndicator = () => {
    const renderListOfIndicator = listOfIndicator;
    return renderListOfIndicator.length ? (
      <table className="table borderless">
        <thead>
          <tr>
            <th>Indikator</th>
            <th>Pilihan</th>
            <th>Pengurangan</th>
          </tr>
        </thead>
        <tbody>
          {renderListOfIndicator.map((indicator, idx) => {
            const indicatorLen = _.get(indicator, 'indicatorchoices', []).length;
            return (
              <tr key={`indicator-${idx}-${indicator.id}`}>
                <td className="mb-4">
                  <input
                    type="text"
                    className="form-control"
                    value={indicator.indicatorName}
                    name={`indicator-${idx}`}
                    onChange={handleChangeIndicator}
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
                                onChange={handleChangeChoiceName}
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
                                  onChange={handleChangeDecrement}
                                />
                                {indicatorLen - 1 === cIdx && (
                                  <div
                                    className="input-group-addon delete-addon"
                                    data-id={idx}
                                    onClick={handleClickRemoveChoice}>
                                    <i className="fa fa-minus" />
                                  </div>
                                )}
                                {indicatorLen - 1 === cIdx && (
                                  <div
                                    className="input-group-addon add-addon"
                                    data-id={idx}
                                    onClick={handleClickAddChoice}>
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
              <button className="btn red" onClick={handleClickRemoveIndicator}>
                <i className="fa fa-minus" /> Indikator
              </button>
              <button className="btn green" onClick={handleClickAddIndicator}>
                <i className="fa fa-plus" /> Indikator
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    ) : null;
  };

  const renderForm = () => {
    const renderSelectedData = selectedData;

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
              value={renderSelectedData.categoryName}
              onChange={handleChange}
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
              value={renderSelectedData.parentId}
              onChange={handleChange}>
              <option value={0}>Pilih Induk Kategori</option>
              {dataTreeCategory.map((item, index) => {
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
              value={renderSelectedData.sequence}
              onChange={handleChange}
            />
          </div>
          {categoryId ? renderIndicator() : null}
          <div className="form-actions right">
            <button className="btn red" onClick={handleSave}>
              <i className="fa fa-save" /> Simpan
            </button>
          </div>
        </div>
      </div>
    );
  };

  // render() {
  return (
    <div className="page-content-wrapper">
      {loading && <Loading />}
      <div className="page-content">
        <h3 className="page-title">Kategori Barang</h3>
        <div className="row">
          <div className="col-md-5">
            <div className="portlet light bordered">
              <div className="portlet-title">
                <div className="caption">
                  <span className="caption-subject font-red bold uppercase">
                    Data Kategori Barang
                  </span>
                </div>
              </div>
              <TreeView data={dataTreeCategory} onClickNode={handleClickNode} />
            </div>
          </div>
          <div className="col-md-7">{renderForm()}</div>
        </div>
      </div>
    </div>
  );
  // }

  // return (
  //   <>
  //     <h1>Hello World</h1>
  //   </>
  // );
}
