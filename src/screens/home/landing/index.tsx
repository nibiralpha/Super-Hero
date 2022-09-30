import React, { useEffect, useState } from 'react';
import Button from '../../../Components/Button';

import 'animate.css';
import './landing.less';

const Landing = (props: any) => {
  useEffect(() => {}, []);

  return (
    <div className="enter-bg">
      <div className="hero-container">
        <div className="landing-hero-bg">
          <div className="landing-wrapper">
            <div className="hanging-spider-man">
              <img
                className="haning-spider animate__animated animate__bounceInDown"
                src="/images/spider-man.png"
              />
            </div>

            <div className="landing-items flex">
              <div className="landing-item text-right">
                <img className="hero-img" src="/images/all-heroes.png" />
              </div>
              <div className="landing-item flex flex-center">
                <div className="landing-content">
                  <div className="landing-content-text text-center">
                    <h1 className="primary white size-40 bold">
                      Create Your own Team of Superheroes
                    </h1>
                  </div>
                  <div className="landing-content-action mt-20 text-center">
                    <Button
                      onTap={(e: any) => {
                        props.history.push('/search');
                      }}
                    >
                      Enter
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
