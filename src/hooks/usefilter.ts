import { useDispatch, useSelector } from 'react-redux';
import { updateFilterData, setDefaultFilter, clearFilter } from '../store/filters';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import FilterModel, { FilterListItems } from "../model/Filter.model";

interface filterTypes {
    type: FilterListItems,
    value: string
}

const useFilter = () => {
    const dispatch = useDispatch()
    let location = useLocation();
    const filter = useSelector((state: any) => state.filter)

    const updateFilter = (filterType: filterTypes): void => {
        dispatch(updateFilterData({ [filterType.type]: filterType.value }));
    }

    const getFilterFromUrl = (): FilterModel => {
        return qs.parse(location.search, {
            arrayFormat: 'bracket-separator',
            arrayFormatSeparator: ','
        }) as unknown as FilterModel;
    }

    const setInitialFilter = (filter: FilterModel): void => {
        dispatch(setDefaultFilter(filter));
    }

    const clearAllFilter = (): void => {
        dispatch(clearFilter());
    }

    return { updateFilter, setInitialFilter, getFilterFromUrl, clearAllFilter, filter };
};

export default useFilter;