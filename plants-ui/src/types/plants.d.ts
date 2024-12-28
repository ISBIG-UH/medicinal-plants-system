interface ScientificName {
    raw: string;
    genus: string;
    subsp: string;
    f: string;
    species: string;
    authors: string;
    family: string;
    var: string;
    subfamily: string;
}

interface VulgarNames {
    [country: string]: string[];
}

interface Monograph {
    Name: string,
    Sc: ScientificName,
    Sy: string[],
    Vul: VulgarNames,
    Hab: string,
    Des: string,
    Cmp: string,
    Use: string,
    Pro: string,
    App: string,
    Cul: string,
    Bib: string[]
}