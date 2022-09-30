import { useSelector } from 'react-redux';
import HeroModel from '../model/Hero.model';

const useHero = () => {

    const allHeroes: HeroModel[] = useSelector((state: any) => state.hero.heroes)
    const isLoading :boolean = useSelector((state: any) => state.hero.loading)

    return { allHeroes, isLoading };
};

export default useHero;