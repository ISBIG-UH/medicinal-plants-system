import { useContext, useEffect, useState } from 'react';
import { ServiceContainer, TYPES } from '../../../services/injection/container';
import { MessageServiceContext } from '../../../services/messages';
import { IIndexSearchService } from '../services/index-search-service';

export const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function useIndexSearch() {
    const [selectedLetter, setSelectedLetter] = useState<string>('A');
    const [monographBasics, setMonographBasics] = useState<Monograph[]>([]);
    const [loading, setLoading] = useState(true);
    const indexSearchService = ServiceContainer.get<IIndexSearchService>(
        TYPES.IIndexSearchService,
    );
    const { messageService } = useContext(MessageServiceContext);

    const getMonograhsByLetter = async (letter: string) => {
        setLoading(true);

        await new Promise((f) => setTimeout(f, 1000));
        const result = await indexSearchService.search(letter, messageService!);

        setMonographBasics(result);
        setLoading(false);
    };

    const handleSelectLetter = (letter: string) => {
        setSelectedLetter(letter);
        getMonograhsByLetter(letter);
    };

    useEffect(() => {
        getMonograhsByLetter(selectedLetter);
    }, []);

    return { selectedLetter, monographBasics, loading, handleSelectLetter };
}
