import React, { useEffect, useState } from 'react';
import { CloseOutlined, MenuOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { Button, Col, Drawer, Row } from 'antd';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import qs from 'query-string';
import useFilter from '../../hooks/usefilter';

import './styles.less';
import Filter from '../../Components/Filter';
import FilterModel from '../../model/Filter.model';

const Header = () => {
  let location = useLocation();
  let history = useHistory();
  const { clearAllFilter, getFilterFromUrl } = useFilter();

  const [visible, setVisible] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);

  useEffect(() => {
    let filterData = getFilterFromUrl();
    if (!isEmpty(filterData)) {
      setFilter(true);
    }
  }, []);

  const isEmpty = (obj: any): boolean => {
    return Object.keys(obj).length === 0;
  };

  const showDrawer = (): void => {
    setVisible(true);
  };
  const onClose = (): void => {
    setVisible(false);
  };

  return (
    <div className="fixed-position">
      <div className="hero-container">
        <div className="header-wrapper">
          <div className="flex space-between flex-align-center full-width pc-menu">
            <div className="left-menu flex">
              <div
                className="left-menu-logo primary black mr-15 cursor"
                onClick={() => {
                  history.push('/search');
                }}
              >
                SUPERSEARCH
              </div>

              <div className="nav-bar-menu-items">
                <nav className="flex">
                  <div className="left-menu-item">
                    <NavLink to={`/search`}>
                      <span>Super Heroes</span>
                    </NavLink>
                  </div>

                  <div className="left-menu-item">
                    <NavLink to={`/team`}>
                      <span className="">Team</span>
                    </NavLink>
                  </div>
                </nav>
              </div>
            </div>

            {location.pathname == '/search' && (
              <div className="right-menu flex-align-center">
                <div className="filters flex flex-align-center">
                  {filter && (
                    <div
                      className="mr-10 filter-text cursor"
                      onClick={() => {
                        setFilter(false);
                        clearAllFilter();
                        history.push('/search');
                      }}
                    >
                      <CloseOutlined style={{ color: '#000' }} /> Clear filter
                    </div>
                  )}

                  <Button
                    onClick={() => {
                      setFilter(!filter);
                    }}
                    ghost={!filter}
                    icon={<MenuUnfoldOutlined />}
                    type="primary"
                  >
                    Filter
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="mobile-menu">
            <div className="mobile-menu-wrapper">
              <Row>
                <Col span="6">
                  <div onClick={showDrawer}>
                    <MenuOutlined style={{ fontSize: '20px', color: '#000' }} />
                  </div>
                </Col>
                <Col span="12">
                  <div
                    className="left-menu-logo primary black mr-15 cursor"
                    onClick={() => {
                      history.push('/search');
                    }}
                  >
                    SUPERSEARCH
                  </div>
                </Col>
                <Col span="6">
                  {location.pathname == '/search' && (
                    <div className="text-right">
                      <div className="">
                        <Button
                          onClick={() => {
                            setFilter(!filter);
                          }}
                          ghost={!filter}
                          icon={<MenuUnfoldOutlined />}
                          type="primary"
                        >
                          Filter
                        </Button>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </div>
        {filter && <Filter />}
      </div>
      <Drawer
        width="100%"
        title={
          <Row>
            <Col span="2">
              <CloseOutlined
                onClick={() => {
                  onClose();
                }}
              />
            </Col>
            <Col span="20">
              <div className="primary black mr-15 text-align">SUPERSEARCH</div>
            </Col>
            <Col span="2" />
          </Row>
        }
        placement="left"
        // onClose={onClose}
        visible={visible}
        closable={false}
      >
        <div className="nav-bar-menu-items">
          <nav className="text-center">
            <div className="left-menu-item mb-15">
              <NavLink to={`/search`}>
                <span>Super Heroes</span>
              </NavLink>
            </div>

            <div className="left-menu-item">
              <NavLink to={`/team`}>
                <span className="">Team</span>
              </NavLink>
            </div>
          </nav>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
