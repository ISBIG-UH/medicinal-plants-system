import { useState } from 'react';
import { PlantDetails } from '../../plant-details';
import useTextSearch from '../hooks/use-text-search';
import TextSearchBar from './text-search-bar';
import TextSearchResults from './text-search-results';

const TextSearchBox: React.FC = () => {
    const { loading, monographs, handleSearch } = useTextSearch();
    const [monograph, setMonograph] = useState<Monograph | null>(null);

    return (
        <div className="h-full w-full p-2 flex flex-col gap-6 items-center">
            <TextSearchBar
                loading={loading}
                handleSearch={handleSearch}
            ></TextSearchBar>
            <TextSearchResults
                loading={loading}
                monographs={monographs}
                onSelectMonograph={(monograph) => setMonograph(monograph)}
            />
            {monograph != null && (
                <PlantDetails
                    visible={monograph != null}
                    onHide={() => {
                        setMonograph(null);
                    }}
                    monograph={monograph!}
                ></PlantDetails>
            )}
        </div>
    );
};

export default TextSearchBox;
