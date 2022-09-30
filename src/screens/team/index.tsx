import React, { useEffect, useState } from 'react';
import Header from '@layout/header';
import HeroCard from '../../Components/HeroCard';
// import Header from '@layout/header';

import './index.less';
import { Col, Row } from 'antd';
import useTeam from '../../hooks/useTeam';
import { useHistory } from 'react-router';

const Search = (props: any) => {
  useEffect(() => {}, []);
  let history = useHistory();
  const { allTeams } = useTeam();

  return (
    <div className="">
      <Header />

      <div className="hero-container">
        {allTeams.length <= 0 && (
          <>
            <div className="black size-18 mt-20">
              You do not have any team members selected. Please make selections on
            </div>
            <div
              className="secondary size-18 cursor"
              onClick={() => {
                history.push('/search');
              }}
            >
              Superheroes page
            </div>
          </>
        )}
        <div className="body-container">
          <Row gutter={[25, 25]}>
            {allTeams.map((data: any) => (
              <Col key={data.id} md={{ span: 6 }} xs={{ span: 24 }}>
                <HeroCard hero={data} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Search;
