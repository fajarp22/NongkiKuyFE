/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl, checkIsActive } from '../../../../_helpers';

export function AsideMenuList({ layoutProps }) {
  // useSelector
  const { user } = useSelector(state => state.auth);

  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && 'menu-item-active'} menu-item-open menu-item-not-hightlighted`
      : '';
  };

  const accessCustomer = user?.peran_user?.akses?.find(data => data?.nama_akses === 'NASABAH');
  const accessTransaction = user?.peran_user?.akses?.find(data => data?.nama_akses === 'TRANSAKSI');
  const accessTransactionReport = user?.peran_user?.akses?.find(
    data => data?.nama_akses === 'REKAPTRANSAKSI'
  );
  const accessItem = user?.peran_user?.akses?.find(data => data?.nama_akses === 'BARANG');
  const accessUser = user?.peran_user?.akses?.find(data => data?.nama_akses === 'USER');
  // const accessUserRole = user?.peran_user?.akses?.find(data => data?.nama_akses === 'PERAN_USER');
  const accessBranch = user?.peran_user?.akses?.find(data => data?.nama_akses === 'CABANG');
  // const accessMortgagedItem = user?.peran_user?.akses?.find(
  //   data => data?.nama_akses === 'BARANG_LELANG'
  // );

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li className={`menu-item ${getMenuItemActive('/dashboard', false)}`} aria-haspopup="true">
          {/* <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink> */}
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        {/* <li
					className={`menu-item ${getMenuItemActive(
						"/builder",
						false
					)}`}
					aria-haspopup="true"
				>
					<NavLink className="menu-link" to="/builder">
						<span className="svg-icon menu-icon">
							<SVG
								src={toAbsoluteUrl(
									"/media/svg/icons/Home/Library.svg"
								)}
							/>
						</span>
						<span className="menu-text">Layout Builder</span>
					</NavLink>
				</li> */}
        {/*end::1 Level*/}

        {/* Program Utama */}
        {/* begin::section */}
        <li className="menu-section">
          <h4 className="menu-text">Menu Utama</h4>
        </li>
        {/* end::section */}

        {/* Transaksi */}
        {/*begin::1 Level*/}
        {accessTransaction.showMenu ? (
          <li
            className={`menu-item menu-item-submenu ${getMenuItemActive('/transaksi', true)}`}
            aria-haspopup="true"
            data-menu-toggle="hover">
            {/* <NavLink className="menu-link menu-toggle" to="/transaksi">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl('/media/svg/icons/Shopping/Dollar.svg')} />
              </span>
              <span className="menu-text">Form Input</span>
              <i className="menu-arrow" />
            </NavLink> */}
            <div className="menu-submenu">
              <i className="menu-arrow" />
              <ul className="menu-subnav">
                <li className="menu-item menu-item-parent" aria-haspopup="true">
                  <span className="menu-link">
                    <span className="menu-text">Daftar Menu</span>
                  </span>
                </li>

                {/*begin::2 Level*/}
                {/* <li
                  className={`menu-item ${getMenuItemActive('/transaksi/cek-harga')}`}
                  aria-haspopup="true">
                  <NavLink className="menu-link" to="/transaksi/cek-harga">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Makanan</span>
                  </NavLink>
                </li> */}
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                {/* {accessTransaction.create ? (
                  <li
                    className={`menu-item ${getMenuItemActive('/transaksi/input-sbg')}`}
                    aria-haspopup="true">
                    <NavLink className="menu-link" to="/transaksi/input-sbg">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Input Data Kedai</span>
                    </NavLink>
                  </li>
                ) : (
                  ''
                )} */}
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                {/* {accessTransaction.read ? (
                  <li
                    className={`menu-item ${getMenuItemActive('/transaksi/cari-sbg')}`}
                    aria-haspopup="true">
                    <NavLink className="menu-link" to="/transaksi/cari-sbg">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Cari Data SBG</span>
                    </NavLink>
                  </li>
                ) : (
                  ''
                )} */}
                {/*end::2 Level*/}
              </ul>
            </div>
          </li>
        ) : (
          ''
        )}
        {/* end::1 Level */}

        {/* begin:: 1 Level */}
        {accessCustomer.showMenu ? (
          <li className={`menu-item ${getMenuItemActive('/nasabah', false)}`} aria-haspopup="true">
            <NavLink className="menu-link" to="/nasabah">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl('/media/svg/icons/General/User.svg')} />
              </span>
              <span className="menu-text">Daftar Kedai</span>
            </NavLink>
          </li>
        ) : (
          ''
        )}
        {/* end::section */}

        {/* Barang */}
        {/*begin::1 Level*/}
        {accessItem.showMenu ? (
          <li
            className={`menu-item menu-item-submenu ${getMenuItemActive('/barang', true)}`}
            aria-haspopup="true"
            data-menu-toggle="hover">
            <NavLink className="menu-link menu-toggle" to="/barang">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl('/media/svg/icons/Shopping/Bag2.svg')} />
              </span>
              <span className="menu-text">Daftar Menu</span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu">
              <i className="menu-arrow" />
              <ul className="menu-subnav">
                <li className="menu-item menu-item-parent" aria-haspopup="true">
                  <span className="menu-link">
                    <span className="menu-text">Menu</span>
                  </span>
                </li>
                {/*begin::2 Level*/}
                {!accessItem.limited ? (
                  <li
                    className={`menu-item ${getMenuItemActive('/barang/kategori-barang')}`}
                    aria-haspopup="true">
                    {/* <NavLink className="menu-link" to="/barang/kategori-barang">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Kategori Barang</span>
                    </NavLink> */}
                  </li>
                ) : (
                  ''
                )}
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                {accessItem.read ? (
                  <li
                    className={`menu-item ${getMenuItemActive('/barang/data-barang')}`}
                    aria-haspopup="true">
                    <NavLink className="menu-link" to="/barang/data-barang">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Menu</span>
                    </NavLink>
                  </li>
                ) : (
                  ''
                )}
                {/*end::2 Level*/}
              </ul>
            </div>
          </li>
        ) : (
          ''
        )}
        {/*end::1 Level*/}

        {/* Laporan Transaksi */}
        {/*begin::1 Level*/}
        {accessTransactionReport.showMenu ? (
          <li
            className={`menu-item menu-item-submenu ${getMenuItemActive('/report', true)}`}
            aria-haspopup="true"
            data-menu-toggle="hover">
            {/* <NavLink className="menu-link menu-toggle" to="/report">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl('/media/svg/icons/Shopping/Chart-line1.svg')} />
              </span>
              <span className="menu-text">Laporan Transaksi</span>
              <i className="menu-arrow" />
            </NavLink> */}
            <div className="menu-submenu">
              <i className="menu-arrow" />
              <ul className="menu-subnav">
                <li className="menu-item menu-item-parent" aria-haspopup="true">
                  <span className="menu-link">
                    <span className="menu-text">Laporan Transaksi</span>
                  </span>
                </li>

                {/*begin::2 Level*/}
                {accessTransactionReport.read ? (
                  <li
                    className={`menu-item ${getMenuItemActive('/report/dailyreport')}`}
                    aria-haspopup="true">
                    <NavLink className="menu-link" to="/report/dailyreport">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Laporan Harian</span>
                    </NavLink>
                  </li>
                ) : (
                  ''
                )}
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                {!accessTransactionReport.limited ? (
                  <li
                    className={`menu-item ${getMenuItemActive('/report/recapdailyreport')}`}
                    aria-haspopup="true">
                    <NavLink className="menu-link" to="/report/recapdailyreport">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Rekap Laporan Harian</span>
                    </NavLink>
                  </li>
                ) : (
                  ''
                )}
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                {!accessTransactionReport.limited ? (
                  <li
                    className={`menu-item ${getMenuItemActive('/report/stockopname')}`}
                    aria-haspopup="true">
                    <NavLink className="menu-link" to="/report/stockopname">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Stock Opname</span>
                    </NavLink>
                  </li>
                ) : (
                  ''
                )}
                {/*end::2 Level*/}
              </ul>
            </div>
          </li>
        ) : (
          ''
        )}
        {/*end::1 Level*/}

        {/* Coming Soon */}
        {/* begin::section */}
        {/* <li className="menu-section">
          <h4 className="menu-text">Coming Soon</h4>
        </li> */}
        {/* end::section */}

        {/* begin:: 1 Level */}
        {/* <li
          className={`menu-item ${getMenuItemActive("/comingsoon", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/comingsoon">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Code/Plus.svg")} />
            </span>
            <span className="menu-text">Coming Soon 1</span>
          </NavLink>
        </li> */}
        {/* end::section */}

        {/* Custom */}
        {/* begin::section */}
        {/* <li className="menu-section ">
          <h4 className="menu-text">Pengaturan</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li> */}
        {/* end:: section */}

        {/* begin:: 1 Level */}
        {/* {accessBranch.showMenu ? (
          <li className={`menu-item ${getMenuItemActive('/cabang', false)}`} aria-haspopup="true">
            <NavLink className="menu-link" to="/cabang">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Home.svg')} />
              </span>
              <span className="menu-text">Kantor Cabang</span>
            </NavLink>
          </li>
        ) : (
          ''
        )} */}
        {/* end::section */}

        {/* begin:: 1 Level */}
        {/* {accessUser.showMenu ? (
          <li className={`menu-item ${getMenuItemActive('/user', false)}`} aria-haspopup="true">
            <NavLink className="menu-link" to="/user">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl('/media/svg/icons/Communication/Shield-user.svg')} />
              </span>
              <span className="menu-text">User</span>
            </NavLink>
          </li>
        ) : (
          ''
        )} */}
        {/* end::section */}
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
