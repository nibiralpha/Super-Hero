import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Select, Slider } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import useFilter from '../../hooks/usefilter';
import FilterModel from "../../model/Filter.model";

import './styles.less';

let firstLoad: boolean = true;
const { Option } = Select;

const Filter = (props: any) => {
  const { updateFilter, setInitialFilter, getFilterFromUrl, filter } = useFilter()

  const history = useHistory();

  const isEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  };

  useEffect(() => {

    if (!firstLoad) {
      history.push({
        pathname: '/search',
        search: qs.stringify(filter)
      });
    }

  }, [filter]);

  useEffect(() => {
    firstLoad = false;
    
    let filterData: FilterModel = getFilterFromUrl();

    if (!isEmpty(filter)) {
      setInitialFilter(filterData)
    }
 
  }, []);

  const searchByName = (e: any) => {
    let value = e.target.value;
    updateFilter({ type: 'name', value: value })
  };

  const searchByGender = (e: any) => {
    updateFilter({ type: 'gender', value: e })
  };

  const searchByAlignment = (e: any) => {
    updateFilter({ type: 'alignment', value: e })
  };

  const searchByPowerStat = (e: any) => {
    let values = e.join(',');
    updateFilter({ type: 'powerStat', value: values })
  };

  const searchByIntelligence = (e: any) => {
    let values = e.join(',');
    updateFilter({ type: 'intelligence', value: values })
  };

  const searchBySpeed = (e: any) => {
    let values = e.join(',');
    updateFilter({ type: 'speed', value: values })
  };

  const searchByPower = (e: any) => {
    let values = e.join(',');
    updateFilter({ type: 'power', value: values })
  };

  const searchByDurability = (e: any) => {
    let values = e.join(',');
    updateFilter({ type: 'durability', value: values })
  };

  const isPowerStateSelected = (power: any) => {
    let states = filter.powerStat.split(',');
    return states.some((state: any) => state.toLowerCase() == power.toLowerCase())
  }

  return (
    <div className="filter-wrapper">
      <Row gutter={[16, 16]}>
        <Col md={{ span: 4 }} xs={{ span: 24 }}>
          <div className="size-14 mb-5">Keyword</div>
          <Input
            value={filter.name}
            placeholder="Keyword"
            onChange={(e) => {
              searchByName(e);
            }}
          />
        </Col>

        <Col md={{ span: 4 }} xs={{ span: 24 }}>
          <div className="size-14 mb-5">Gender</div>
          <Select
            value={filter.gender}
            getPopupContainer={trigger => trigger.parentNode}
            style={{ width: '100%' }}
            onChange={(e: any) => {
              searchByGender(e);
            }}
          >
            <Option value="">Choose Gender</Option>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Col>

        <Col md={{ span: 4 }} xs={{ span: 24 }}>
          <div className="size-14 mb-5">Alignment</div>
          <Select
            value={filter.alignment}
            style={{ width: '100%' }}
            getPopupContainer={trigger => trigger.parentNode}
            onChange={(e: any) => {
              searchByAlignment(e);
            }}
          >
            <Option value="">Choose Alignment</Option>
            <Option value="good">Good</Option>
            <Option value="bad">Bad</Option>
          </Select>
        </Col>

        <Col md={{ span: 4 }} xs={{ span: 24 }}>
          <div className="size-14 mb-5">Powerstats</div>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            getPopupContainer={trigger => trigger.parentNode}
            placeholder="Please select"
            //@ts-ignore
            value={filter?.powerStat ? filter?.powerStat?.split(',') : []}
            onChange={(e: any) => {
              searchByPowerStat(e);
            }}
          >
            <Option value="Intelligence">Intelligence</Option>
            <Option value="speed">Speed</Option>
            <Option value="power">Power</Option>
            <Option value="durability">Durability</Option>
          </Select>
        </Col>

        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <Row gutter={[16, 16]}>
            {isPowerStateSelected('intelligence') && (
              <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <div className="sliders-item">
                  <div>Intelligence</div>
                  <Slider
                    range
                    value={filter?.intelligence.split(',')}
                    onChange={(e: any) => {
                      searchByIntelligence(e);
                    }}
                  />
                </div>
              </Col>
            )}
            {isPowerStateSelected('speed') && (
              <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <div className="sliders-item">
                  <div>Speed</div>
                  <Slider
                    range
                    value={filter?.speed.split(',')}
                    onChange={(e: any) => {
                      searchBySpeed(e);
                    }}
                  />
                </div>
              </Col>
            )}
            {isPowerStateSelected('power') && (
              <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <div className="sliders-item">
                  <div>Power</div>
                  <Slider
                    range
                    value={filter?.power.split(',')}
                    onChange={(e: any) => {
                      searchByPower(e);
                    }}
                  />
                </div>
              </Col>
            )}
            {isPowerStateSelected('durability') && (
              <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <div className="sliders-item">
                  <div>Durability</div>
                  <Slider
                    range
                    value={filter?.durability.split(',')}
                    onChange={(e: any) => {
                      searchByDurability(e);
                    }}
                  />
                </div>
              </Col>
            )}

          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
