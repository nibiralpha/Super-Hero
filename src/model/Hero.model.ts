interface HeroModel {
    id: string,
    name: string,
    image: {
        url: string
    },
    appearance: {
        'eye-color': string,
        'hair-color': string,
        gender: string,
        height: Array<string>,
        weight: Array<string>,
        race: string
    },
    biography: {
        'alter-egos': string,
        'first-appearance': string,
        'full-name': string,
        'place-of-birth': string,
        aliases: Array<string>,
        alignment: string,
        publisher: string
    },
    connections: {
        'group-affiliation': string,
        'relatives': string
    },
    powerstats: {
        combat: string
        durability: string,
        intelligence: string,
        power: string,
        speed: string,
        strength: string
    },
    work: {
        base: string
        occupation: string
    }
}

export const DefaultHeroMode: HeroModel = {
    id: "",
    name: '',
    image: {
        url: ''
    },
    appearance: {
        'eye-color': '',
        'hair-color': '',
        gender: '',
        height: [''],
        weight: [''],
        race: ''
    },
    biography: {
        'alter-egos': '',
        'first-appearance': '',
        'full-name': '',
        'place-of-birth': '',
        aliases: [''],
        alignment: '',
        publisher: ''
    },
    connections: {
        'group-affiliation': '',
        'relatives': ''
    },
    powerstats: {
        combat: '',
        durability: '',
        intelligence: '',
        power: '',
        speed: '',
        strength: ''
    },
    work: {
        base: '',
        occupation: ''
    }
}


export default HeroModel 