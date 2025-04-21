import { useContext, useState } from 'react';
import {
    ServiceContainerContext,
    TYPES,
} from '../../../services/injection/container';
import { IPlantService } from '../../../services/api-service';
import { MessageServiceContext } from '../../../services/messages';

export const useGetPlant = () => {
    const [loading, setLoading] = useState(false);
    const [monograph, setMonograph] = useState<Monograph | null>(null);
    const ServiceContainer = useContext(ServiceContainerContext);
    const plantService = ServiceContainer.get<IPlantService>(
        TYPES.IPlantService,
    );
    const { messageService } = useContext(MessageServiceContext);

    const getPlant = async (id: number) => {
        setLoading(true);
        const result = await plantService.get(id, messageService!);
        setMonograph(result);
        setLoading(false);
    };

    const updatePlant = async (monograph: Monograph) => {
        setLoading(true);
        await plantService.update(monograph, messageService!);
        setLoading(false);
    };

    const createPlant = async (monograph: Monograph) => {
        setLoading(true);
        await plantService.create(monograph, messageService!);
        setLoading(false);
    };

    const deletePlant = async (id: number) => {
        setLoading(true);
        await plantService.delete(id, messageService!);
        setLoading(false);
    };

    return {
        loading,
        monograph,
        getPlant,
        setMonograph,
        updatePlant,
        createPlant,
        deletePlant,
    };
};
