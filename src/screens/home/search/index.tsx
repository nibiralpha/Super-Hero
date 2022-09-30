import React, { useEffect, useState } from 'react';
import Header from '@layout/header';
import HeroCard from '../../../Components/HeroCard';

import './index.less';
import { Col, Row, Spin } from 'antd';
import { connect } from 'react-redux';
import { getHeroes } from '../../../service/getHeroes';

import useHero from '../../../hooks/useHero';
import useFilter from '../../../hooks/usefilter';

import HeroModel from '../../../model/Hero.model';
import FilterModel, { FilterListItems } from '../../../model/Filter.model';

const Search = ({ getHeroesData }: any) => {
  const { allHeroes, isLoading }: { allHeroes: HeroModel[]; isLoading: boolean } = useHero();
  const { filter }: { filter: FilterModel } = useFilter();

  type ObjectKey = keyof typeof filter;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getHeroesData();
  };

  const filterByName = (data: HeroModel[]): HeroModel[] => {
    if (filter == null) {
      return data;
    }
    return data.filter((hero: HeroModel) => {
      let filterName = filter.name;
      if (!filterName || filterName == '') return true;
      let lowerCaseName = hero.name.toLowerCase();
      return lowerCaseName.startsWith(filterName.toLowerCase());
    });
  };

  const filterByGender = (data: HeroModel[]): HeroModel[] => {
    if (filter == null) {
      return data;
    }
    return data.filter((hero: HeroModel) => {
      let filtergender = filter.gender;
      if (!filtergender || filtergender == '') return true;
      let lowerCaseGender = hero.appearance.gender.toLowerCase();
      return lowerCaseGender.startsWith(filtergender.toLowerCase());
    });
  };

  const filterByAlignment = (data: HeroModel[]): HeroModel[] => {
    if (filter == null) {
      return data;
    }
    return data.filter((hero: HeroModel) => {
      let filterAlignment = filter.alignment;
      if (!filterAlignment || filterAlignment == '') return true;
      let lowerCaseAlignment = hero.biography.alignment.toLowerCase();
      return lowerCaseAlignment.startsWith(filterAlignment.toLowerCase());
    });
  };

  const filterByState = (data: HeroModel[], type: FilterListItems): HeroModel[] => {
    if (filter == null) {
      return data;
    }
    return data.filter((hero: any) => {
      const key = type as ObjectKey;
      let filterState = filter[key];

      if (!filterState || filterState == '') return true;
      let powerState = hero.powerstats[type];
      let filterValues = filterState.split(',');

      return (
        parseInt(powerState) > parseInt(filterValues[0]) &&
        parseInt(powerState) < parseInt(filterValues[1])
      );
    });
  };

  const isPowerStateSelected = (power: FilterListItems): boolean => {
    let states = filter.powerStat.split(',');
    return states.some((state: string) => state.toLowerCase() == power.toLowerCase());
  };

  const isEmpty = (obj: object): boolean => {
    return Object.keys(obj).length === 0;
  };

  const filterData = (): HeroModel[] => {
    let filteredHeroes: HeroModel[] = allHeroes;
    if (!filteredHeroes) {
      return [];
    }

    filteredHeroes = filterByName(filteredHeroes);
    filteredHeroes = filterByGender(filteredHeroes);
    filteredHeroes = filterByAlignment(filteredHeroes);

    if (filter && !isEmpty(filter)) {
      if (isPowerStateSelected('intelligence')) {
        filteredHeroes = filterByState(filteredHeroes, 'intelligence');
      }

      if (isPowerStateSelected('speed')) {
        filteredHeroes = filterByState(filteredHeroes, 'speed');
      }

      if (isPowerStateSelected('power')) {
        filteredHeroes = filterByState(filteredHeroes, 'power');
      }

      if (isPowerStateSelected('durability')) {
        filteredHeroes = filterByState(filteredHeroes, 'durability');
      }
    }

    return filteredHeroes;
  };

  return (
    <div>
      <Header />
      <div className="hero-container">
        {!isLoading && filterData().length <= 0 && (
          <>
            <div className="black size-18 mt-20">
              There are no Superheroes based on the filters you have selected. Please clear filters
              and try again.
            </div>
          </>
        )}
        <div className="body-container">
          {isLoading ? (
            <div className="text-center">
              <Spin />
            </div>
          ) : (
            <div>
              <Row gutter={[25, 25]}>
                <Row gutter={[25, 25]}>
                  {filterData().map((data: HeroModel) => (
                    <Col key={data.id} md={{ span: 6 }} sm={{ span: 24 }}>
                      <HeroCard hero={data} />
                    </Col>
                  ))}
                </Row>
              </Row>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  getHeroesData: getHeroes
};

export default connect(
  null,
  mapDispatchToProps
)(Search);
