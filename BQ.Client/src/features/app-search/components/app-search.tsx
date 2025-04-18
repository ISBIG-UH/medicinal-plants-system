import { useState } from 'react';
import AppList from './app-list';
import AppPlantPanel from './app-plant-panel';

const AppSearch: React.FC = () => {
    const [app, setApp] = useState<AppItem | null>(null);

    return (
        <div className="flex h-full w-full">
            <div className="w-64 h-full">
                <AppList onAppSelect={setApp} />
            </div>
            <div className="grow h-full">
                {app && <AppPlantPanel app={app} />}
            </div>
        </div>
    );
};

export default AppSearch;
