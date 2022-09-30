import React from 'react';
import { useDispatch } from 'react-redux';
import { setTeam } from '../../store/teams';
import store from '../../store/store';
import HeroModel from '../../model/Hero.model';

const LocalStorageComponent = () => {
  const dispatch = useDispatch();
  let teams = localStorage.getItem('teams');

  if (teams != null && teams.length != 0) {
    let myTeams: HeroModel[] = JSON.parse(teams);
    dispatch(setTeam(myTeams));
  }

  store.subscribe(() => {
    localStorage.setItem('teams', JSON.stringify(store.getState().teams));
  });

  return <></>;
};

export default LocalStorageComponent;
