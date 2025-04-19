import { useContext, useState } from 'react';
import { ServiceContainer, TYPES } from '../../../services/injection/container';
import { ITextSearchService } from '../services/text-search-service';
import { MessageServiceContext } from '../../../services/messages';

const useTextSearch = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [monographs, setMonographs] = useState<Monograph[]>([]);
    const textSearchService = ServiceContainer.get<ITextSearchService>(
        TYPES.ITextSearchService,
    );
    const { messageService } = useContext(MessageServiceContext);

    const handleSearch: (data: { query?: string }) => void = async (data) => {
        setLoading(true);
        const result = await textSearchService.search(
            data.query!,
            messageService!,
        );

        setMonographs(result);
        setLoading(false);
    };

    return {
        handleSearch,
        loading,
        monographs,
    };
};

export default useTextSearch;
