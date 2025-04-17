import { useContext, useState } from 'react';
import {
    ServiceContainer,
    ServiceContainerContext,
    TYPES,
} from '../../../services/injection/container';
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
        console.log(data.query);
        const result = await textSearchService.search(
            data.query!,
            messageService!,
        );
        // await new Promise((f) => setTimeout(f, 5000));
        // setMonographs([
        //     {
        //         id: 0,
        //         name: 'Moruno abey',
        //         genus: 'Jacaranda',
        //         subsp: '',
        //         f: '',
        //         species: 'coerulea',
        //         authors: '(L.) Griseb',
        //         family: '',
        //         var: '',
        //         subfamily: '',
        //         sy: [],
        //         vul: [],
        //         hab: 'Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud. Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.',
        //         des: '',
        //         cmp: '',
        //         use: '',
        //         pro: '',
        //         app: '',
        //         cul: '',
        //         bib: [],
        //     },
        //     {
        //         id: 0,
        //         name: 'Moruno abey',
        //         genus: 'Jacaranda',
        //         subsp: '',
        //         f: '',
        //         species: 'coerulea',
        //         authors: '(L.) Griseb',
        //         family: '',
        //         var: '',
        //         subfamily: '',
        //         sy: [],
        //         vul: [],
        //         hab: 'Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud. Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.',
        //         des: '',
        //         cmp: '',
        //         use: '',
        //         pro: '',
        //         app: '',
        //         cul: '',
        //         bib: [],
        //     },
        //     {
        //         id: 0,
        //         name: 'Moruno abey',
        //         genus: 'Jacaranda',
        //         subsp: '',
        //         f: '',
        //         species: 'coerulea',
        //         authors: '(L.) Griseb',
        //         family: '',
        //         var: '',
        //         subfamily: '',
        //         sy: [],
        //         vul: [],
        //         hab: 'Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud. Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.',
        //         des: '',
        //         cmp: '',
        //         use: '',
        //         pro: '',
        //         app: '',
        //         cul: '',
        //         bib: [],
        //     },
        //     {
        //         id: 0,
        //         name: 'Moruno abey',
        //         genus: 'Jacaranda',
        //         subsp: '',
        //         f: '',
        //         species: 'coerulea',
        //         authors: '(L.) Griseb',
        //         family: '',
        //         var: '',
        //         subfamily: '',
        //         sy: [],
        //         vul: [],
        //         hab: 'Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud. Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.',
        //         des: '',
        //         cmp: '',
        //         use: '',
        //         pro: '',
        //         app: '',
        //         cul: '',
        //         bib: [],
        //     },
        //     {
        //         id: 0,
        //         name: 'Moruno abey',
        //         genus: 'Jacaranda',
        //         subsp: '',
        //         f: '',
        //         species: 'coerulea',
        //         authors: '(L.) Griseb',
        //         family: '',
        //         var: '',
        //         subfamily: '',
        //         sy: [],
        //         vul: [],
        //         hab: 'Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud. Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.',
        //         des: '',
        //         cmp: '',
        //         use: '',
        //         pro: '',
        //         app: '',
        //         cul: '',
        //         bib: [],
        //     },
        //     {
        //         id: 0,
        //         name: 'Moruno abey',
        //         genus: 'Jacaranda',
        //         subsp: '',
        //         f: '',
        //         species: 'coerulea',
        //         authors: '(L.) Griseb',
        //         family: '',
        //         var: '',
        //         subfamily: '',
        //         sy: [],
        //         vul: [],
        //         hab: 'Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud. Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.Aute proident nostrud esse fugiat veniam commodo adipisicing officia ut proident enim magna aute proident nostrud.',
        //         des: '',
        //         cmp: '',
        //         use: '',
        //         pro: '',
        //         app: '',
        //         cul: '',
        //         bib: [],
        //     },
        // ]);

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
