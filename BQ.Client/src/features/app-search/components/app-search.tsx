import { useState } from 'react';
import AppList from './app-list';
import AppPlantPanel from './app-plant-panel';
import { useMediaQuery } from '@react-hook/media-query';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { FaHandHoldingMedical } from 'react-icons/fa';
import { PlantDetails, useGetPlant } from '../../plant-details';

const AppSearch: React.FC = () => {
    const [app, setApp] = useState<AppItem | null>(null);
    const [activePanel, setActivePanel] = useState<'apps' | 'plants'>('apps');
    const { getPlant, monograph, setMonograph } = useGetPlant();

    const isMobile = useMediaQuery('(max-width: 768px)');

    const onAppChangeHandler = (app: AppItem) => {
        setApp(app);

        if (isMobile) setActivePanel('plants');
    };

    const onPlantChangeHandler = (plant: Monograph) => {
        getPlant(plant.id);
    };

    return (
        <div className="flex h-full w-full">
            <div
                className={classNames(
                    'md:max-w-64 md:w-64 md:grow-0 grow h-full transition-all duration-500 ease-in-out',
                    {
                        'max-w-0 w-0': activePanel === 'plants',
                        'max-w-full': activePanel === 'apps',
                    },
                )}
            >
                <div
                    className={classNames('w-full h-full', {
                        'hidden md:block': activePanel === 'plants',
                        block: activePanel === 'apps',
                    })}
                >
                    <AppList onAppSelect={onAppChangeHandler} />
                </div>
            </div>
            <div
                className={classNames(
                    'md:max-w-full grow h-full transition-all duration-500 ease-in-out',
                    {
                        'max-w-0': activePanel === 'apps',
                        'max-w-full': activePanel === 'plants',
                    },
                )}
            >
                {app && (
                    <div
                        className={classNames(
                            'h-full flex flex-col w-full gap-2',
                            {
                                block: activePanel === 'plants',
                                'hidden md:block': activePanel === 'apps',
                            },
                        )}
                    >
                        <div className="px-3 block md:hidden">
                            <Button
                                className="w-full"
                                label="Aplicaciones"
                                onClick={() => setActivePanel('apps')}
                            >
                                <FaHandHoldingMedical />
                            </Button>
                        </div>
                        <div className="h-[94%] md:h-full w-full">
                            <AppPlantPanel
                                app={app}
                                onSelectedPlant={onPlantChangeHandler}
                            />
                        </div>
                    </div>
                )}
            </div>
            {monograph && (
                <PlantDetails
                    visible={monograph != null}
                    onHide={() => setMonograph(null)}
                    monograph={monograph}
                />
            )}
        </div>
    );
};

export default AppSearch;
