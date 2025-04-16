interface Monograph {
    id: number;
    name: string;
    genus: string;
    subsp: string;
    f: string;
    species: string;
    authors: string;
    family: string;
    var: string;
    subfamily: string;
    sy: string[];
    vul: string[];
    hab: string;
    des: string;
    cmp: string;
    use: string;
    pro: string;
    app: string;
    cul: string;
    bib: string[];
}

interface MonographBasic {
    id: number;
    name: string;
}

interface AppItem {
    id: number;
    name: string;
}

interface App {
    id: number;
    name: string;
    plants: string[];
    sys: string[];
}

interface AppInfo {
    name: string;
    plants: string[];
    sys: string[];
}
