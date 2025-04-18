interface Props {
    monograph: Monograph;
}

function SearchResult({ monograph: monograph }: Props) {
    const truncateText = (text: string, maxLength: number): string => {
        return text.length > maxLength
            ? text.substring(0, maxLength) + '...'
            : text;
    };

    return (
        <div className="w-full border bg-gray-50 shadow-sm border-gray-300 rounded-lg hover:cursor-pointer hover:bg-yellow-50 hover:transition-all ease-in-out duration-300 p-4">
            <label className="text-2xl font-montserrat text-primary font-semibold hover:cursor-pointer">
                {monograph.name}
            </label>
            <p className="text-info font-quicksand text-sm">
                {monograph.genus} {monograph.species} {monograph.authors}{' '}
                {monograph.var} {monograph.subsp} {monograph.f}
            </p>
            <p className="font-quicksand">{truncateText(monograph.hab, 150)}</p>
        </div>
    );
}

export default SearchResult;
