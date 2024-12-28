
interface Props{
    monograh: Monograph
}

function SearchResult({ monograh }: Props){
    const truncateText = (text: string, maxLength: number): string => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return(
        <div className="border bg-gray-50 shadow-sm border-gray-300 rounded-lg hover:cursor-pointer hover:bg-gray-100 hover:transition-all ease-in-out duration-300 p-4 my-4">
            <label className="text-2xl text-accent font-semibold hover:cursor-pointer">{monograh.Name}</label>
            <p className="text-info text-sm">{monograh.Sc.genus} {monograh.Sc.species} {monograh.Sc.authors} {monograh.Sc.var} {monograh.Sc.subsp} {monograh.Sc.f}</p>
            <p>{truncateText(monograh.Hab, 150)}</p>
        </div>
    );
}

export default SearchResult;