import { Button } from 'primereact/button';
import React from 'react';
import { PiPlantBold } from 'react-icons/pi';
import { useAppPlantPanel } from '../hooks/use-app-plant-panel';
import { PlantCard } from '../../plant-details';

interface AppPlantPanelProps {
    app: AppItem;
    onSelectedPlant: (plant: Monograph) => void;
}

const AppPlantPanel: React.FC<AppPlantPanelProps> = React.memo(
    ({ app, onSelectedPlant }) => {
        const { loading, plants } = useAppPlantPanel(app);

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
                        <Button
                            rounded
                            icon="pi pi-pencil"
                            size="small"
                        ></Button>
                        <Button
                            rounded
                            icon="pi pi-trash"
                            severity="danger"
                            size="small"
                        ></Button>
                    </div>
                </div>
                <div className="h-[90%] overflow-y-scroll px-2 lg:px-4">
                    {!loading && (
                        <div className="h-full gap-2 grid md:grid-cols-2">
                            {plants.map((p, i) => (
                                <PlantCard
                                    monograph={p}
                                    onClickHandler={() => onSelectedPlant(p)}
                                    onEditHandler={() => console.log('editing')}
                                    key={i}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    },
);

export default AppPlantPanel;
