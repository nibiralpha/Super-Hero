interface FilterModel {
    name: string,
    gender: string,
    alignment: string,
    powerStat: string,
    intelligence: string,
    speed: string,
    power: string,
    durability: string
}

export type FilterListItems = 'name' | 'gender' | 'alignment' | 'powerStat' | 'intelligence' | 'speed' | 'power' | 'durability';
export default FilterModel