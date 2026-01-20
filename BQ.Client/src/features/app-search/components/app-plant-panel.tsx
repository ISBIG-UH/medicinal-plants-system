import { Button } from 'primereact/button';
import React from 'react';
import { PiPlantBold } from 'react-icons/pi';
import { useAppPlantPanel } from '../hooks/use-app-plant-panel';
import { PlantCard } from '../../plant-details';
import { LoadingPlaceholder } from '../../../components';
import useDelayedLoading from '../../../hooks/use-delayed-loading';

interface AppPlantPanelProps {
    app: AppItem;
    onSelectedPlant: (plant: Monograph) => void;
    onEditPlant: (plant: Monograph) => void;
    onDeletePlant: (plant: Monograph) => void;
}

const AppPlantPanel: React.FC<AppPlantPanelProps> = React.memo(
    ({ app, onSelectedPlant, onEditPlant, onDeletePlant }) => {
        const { loading, plants } = useAppPlantPanel(app);
        const delayedLoading = useDelayedLoading(loading, 300);

        return (
            <div className="h-full w-full">
                <div className="flex justify-between px-2 pl-4 py-2 mb-2 items-center bg-gray-200 rounded-l-lg">
                    <div className="flex items-center space-x-2">
                        <PiPlantBold fontSize={20} />
                        <p className="text-center font-montserrat font-semibold text-xl">
                            {app.name}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {/* <Button
                            rounded
                            icon="pi pi-pencil"
                            size="small"
                        ></Button>
                        <Button
                            rounded
                            icon="pi pi-trash"
                            severity="danger"
                            size="small"
                        ></Button> */}
                    </div>
                </div>
                <div className="h-[90%] overflow-y-scroll px-2 lg:px-4">
                    {!delayedLoading && (
                        <div className="gap-2 grid md:grid-cols-2">
                            {plants.map((p, i) => (
                                <PlantCard
                                    monograph={p}
                                    onClickHandler={() => onSelectedPlant(p)}
                                    onEditHandler={() => onEditPlant(p)}
                                    onDeleteHandler={() => onDeletePlant(p)}
                                    key={i}
                                />
                            ))}
                        </div>
                    )}
                    {delayedLoading && (
                        <div className="h-full">
                            <LoadingPlaceholder />
                        </div>
                    )}
                </div>
            </div>
        );
    },
);

export default AppPlantPanel;
