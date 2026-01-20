import { useContext, useEffect, useState } from 'react';
import { ServiceContainer, TYPES } from '../../../services/injection/container';
import { IAppService } from '../services/app-service';
import { MessageServiceContext } from '../../../services/messages';

export const useAppList = (onAppSelected: (app: AppItem) => void) => {
    const [apps, setApps] = useState<AppItem[]>([]);
    const [filteredApps, setFilteredApps] = useState<AppItem[]>([]);
    const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const appService = ServiceContainer.get<IAppService>(TYPES.IAppService);
    const { messageService } = useContext(MessageServiceContext);

    const getApps = async () => {
        setLoading(true);
        const result = await appService.getAll(messageService!);
        setApps(result);
        setFilteredApps(result);
        setSelectedApp(result[0]);
        onAppSelected(result[0]);
        setLoading(false);
    };

    const handleSearch = async (query: string) => {
        const result = apps.filter((x) =>
            x.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
        );
        setFilteredApps(result);
    };

    const handleAppSelected = (app: AppItem) => {
        setSelectedApp(app);
        onAppSelected(app);
    };

    useEffect(() => {
        getApps();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        loading,
        apps: filteredApps,
        selectedApp,
        handleSearch,
        handleAppSelected,
    };
};
