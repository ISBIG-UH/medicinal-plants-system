interface Monograph {
    id: number,
    name: string,
    genus: string,
    subsp: string,
    f: string,
    species: string,
    authors: string,
    family: string,
    var: string,
    subfamily: string,
    Sy: string[],
    Vul: string[],
    Hab: string,
    Des: string,
    Cmp: string,
    Use: string,
    Pro: string,
    App: string,
    Cul: string,
    Bib: string[]
}

interface MonographBasic {
    id: number,
    name: string
}


interface AppItem {
    id: number,
    name: string,
}

interface App {
    id: number,
    name: string,
    plants: string[],
    sys: string[]
}

interface AppInfo {
    name: string,
    plants: string[],
    sys: string[]
}