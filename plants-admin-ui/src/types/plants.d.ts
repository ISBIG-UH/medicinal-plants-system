interface Monograph {
    Id: number,
    genus: string,
    subsp: string,
    f: string,
    species: string,
    authors: string,
    family: string,
    var: string,
    subfamily: string,
    Name: string,
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
    Id: number,
    Name: string
}