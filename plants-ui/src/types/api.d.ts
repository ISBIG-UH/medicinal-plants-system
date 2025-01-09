interface SearchResponseItem{
    id: number,
    name: string,
    monograph: SRMonograph,
}

interface SRMonograph{
    genus: string,
    species: string,
    authors: string,
    var: string,
    subsp: string,
    f: string,
    family: string,
    subfamily: string
    sy: string[],
    vul: string[],
    hab: string,
    des: string,
    cmp: string,
    use: string,
    pro: string,
    app: string,
    cul: string,
    bib: string[]
}