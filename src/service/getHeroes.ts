import { API_END_POINT } from '@constants/general';
import axios, { AxiosResponse } from 'axios';
import { setHeroes, startLoading, stopLoading } from '../../src/store/heroes';
import HeroModel from "../model/Hero.model";

interface HeroListResponse {
    response: string
    results: HeroModel[]
    'results-for': string
}

const getHeroes = () => {
    return async (dispatch: any) => {
        try {
            dispatch(startLoading())
            const response: AxiosResponse = await axios.get<HeroListResponse>(`${API_END_POINT}/search/a`)
            dispatch(setHeroes(response.data.results))
            dispatch(stopLoading())
        } catch (error) {
            console.log(error);
            dispatch(stopLoading())
            throw error
        }
    }
}

const getHeroDetail = async (id: number): Promise<HeroModel> => {

    try {
        const response: AxiosResponse = await axios.get<HeroModel>(`${API_END_POINT}/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}


export { getHeroes, getHeroDetail }
