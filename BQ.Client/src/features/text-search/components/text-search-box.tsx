import useTextSearch from '../hooks/use-text-search';
import TextSearchBar from './text-search-bar';
import TextSearchResults from './text-search-results';

const TextSearchBox: React.FC = () => {
    const { loading, monographs, handleSearch } = useTextSearch();

    return (
        <div className="h-full w-full p-2 flex flex-col gap-6 items-center">
            <TextSearchBar
                loading={loading}
                handleSearch={handleSearch}
            ></TextSearchBar>
            <TextSearchResults loading={loading} monographs={monographs} />
        </div>
    );
};

export default TextSearchBox;
