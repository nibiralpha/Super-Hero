import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToTeam, removeFromTeam } from '../store/teams';
import HeroModel from "../model/Hero.model";

const useTeam = () => {
    const dispatch = useDispatch()

    const allTeams: HeroModel[] = useSelector((state: any) => state.teams)

    const handleAddRemove = (hero: HeroModel): void => {
        !isOnTeam(hero) ? dispatch(addToTeam(hero)) : dispatch(removeFromTeam(hero))
    }

    const addMemberToTeam = (hero: HeroModel): void => {
        dispatch(addToTeam(hero))
    }

    const removeMemberFromTeam = (hero: HeroModel): void => {
        dispatch(removeFromTeam(hero))
    }

    const isOnTeam = (hero: HeroModel): boolean => {
        return allTeams.some(team => team.id == hero.id);
    }

    const isGoodBadMixed = (hero: HeroModel): boolean => {
        return allTeams.some(team => team.biography.alignment != hero.biography.alignment)
    }

    const isMaxReached = (): boolean => {
        return allTeams.length >= 8 ? true : false
    }



    return { allTeams, handleAddRemove, isOnTeam, isMaxReached, isGoodBadMixed, addMemberToTeam, removeMemberFromTeam };
};

export default useTeam;