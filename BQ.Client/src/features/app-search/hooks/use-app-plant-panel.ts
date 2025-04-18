import { useContext, useEffect, useState } from 'react';
import { ServiceContainer, TYPES } from '../../../services/injection/container';
import { IAppService } from '../services/app-service';
import { MessageServiceContext } from '../../../services/messages';

export const useAppPlantPanel = (app: AppItem) => {
    const [plants, setPlants] = useState<Monograph[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const appService = ServiceContainer.get<IAppService>(TYPES.IAppService);
    const { messageService } = useContext(MessageServiceContext);

    const getPlants = async () => {
        setLoading(true);
        const result = await appService.get(app.id, messageService!);
        setPlants(result.plants);
        setLoading(false);
    };

    useEffect(() => {
        getPlants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [app]);

    return { loading, plants };
};
