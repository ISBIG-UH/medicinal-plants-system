import { useState } from 'react';
import AppList from './app-list';
import AppPlantPanel from './app-plant-panel';
import { useMediaQuery } from '@react-hook/media-query';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { FaHandHoldingMedical } from 'react-icons/fa';
import { PlantDetails, useGetPlant } from '../../plant-details';
import PlantFormDialog from '../../plant-details/components/plant-form-dialog';

const AppSearch: React.FC = () => {
    const [app, setApp] = useState<AppItem | null>(null);
    const [activePanel, setActivePanel] = useState<'apps' | 'plants'>('apps');
    const { getPlant, monograph, setMonograph, updatePlant, deletePlant } =
        useGetPlant();
    const [detailsDialogVisible, setDetailsDialogVisible] =
        useState<boolean>(false);
    const [editDialogVisible, setEditDialogVisible] = useState<boolean>(false);

    const isMobile = useMediaQuery('(max-width: 768px)');

    const onAppChangeHandler = (app: AppItem) => {
        setApp(app);

        if (isMobile) setActivePanel('plants');
    };

    const onPlantChangeHandler = (plant: Monograph) => {
        getPlant(plant.id);
        setDetailsDialogVisible(true);
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
                                onEditPlant={(monograph) => {
                                    getPlant(monograph.id);
                                    setEditDialogVisible(true);
                                }}
                                onDeletePlant={(monograph) => {
                                    deletePlant(monograph.id);
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
            {monograph && (
                <PlantDetails
                    visible={detailsDialogVisible}
                    onHide={() => {
                        setMonograph(null);
                        setDetailsDialogVisible(false);
                    }}
                    monograph={monograph}
                />
            )}
            {monograph && (
                <PlantFormDialog
                    visible={editDialogVisible}
                    onHide={() => {
                        setMonograph(null);
                        setEditDialogVisible(false);
                    }}
                    monograph={monograph}
                    onSave={(monograph) => {
                        updatePlant(monograph);
                        setMonograph(null);
                        setEditDialogVisible(false);
                    }}
                />
            )}
        </div>
    );
};

export default AppSearch;
