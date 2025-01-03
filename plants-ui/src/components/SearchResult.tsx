interface Props {
  monograh: Monograph;
  clickHandler: (id: number) => void;
}

function SearchResult({ monograh, clickHandler }: Props) {
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div
      className="border bg-gray-50 shadow-sm border-gray-300 rounded-lg hover:cursor-pointer hover:bg-yellow-50 hover:transition-all ease-in-out duration-300 p-4 my-4"
      onClick={() => clickHandler(monograh.Id)}
    >
      <label className="text-2xl text-primary font-semibold hover:cursor-pointer">
        {monograh.Name}
      </label>
      <p className="text-info text-sm">
        {monograh.genus} {monograh.species} {monograh.authors}{" "}
        {monograh.var} {monograh.subsp} {monograh.f}
      </p>
      <p>{truncateText(monograh.Hab, 150)}</p>
    </div>
  );
}

export default SearchResult;
