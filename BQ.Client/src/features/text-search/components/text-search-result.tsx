interface Props {
    monograh: Monograph;
}

function SearchResult({ monograh }: Props) {
    const truncateText = (text: string, maxLength: number): string => {
        return text.length > maxLength
            ? text.substring(0, maxLength) + '...'
            : text;
    };

    return (
        <div className="w-full border bg-gray-50 shadow-sm border-gray-300 rounded-lg hover:cursor-pointer hover:bg-yellow-50 hover:transition-all ease-in-out duration-300 p-4">
            <label className="text-2xl font-montserrat text-primary font-semibold hover:cursor-pointer">
                {monograh.name}
            </label>
            <p className="text-info font-quicksand text-sm">
                {monograh.genus} {monograh.species} {monograh.authors}{' '}
                {monograh.var} {monograh.subsp} {monograh.f}
            </p>
            <p className="font-quicksand">{truncateText(monograh.hab, 150)}</p>
        </div>
    );
}

export default SearchResult;
